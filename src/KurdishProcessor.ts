import {
  KurdishProcessorOptions,
  ValidationResult,
} from './types';
import {
  KURDISH_SORANI_33_LETTERS,
  ARABIC_TO_KURDISH_REPLACEMENTS,
  ENGLISH_TO_KURDISH_LAYOUT,
  ARABIC_VARIANTS_TO_REJECT,
  NON_KURDISH_SCRIPTS,
  EMOJI_REGEX,
} from './constants';

// Pre-built lookup map for Arabic to Kurdish conversion
function buildArabicReplacementMap(): Map<string, string> {
  const map = new Map<string, string>();
  for (const [pattern, replacement] of ARABIC_TO_KURDISH_REPLACEMENTS) {
    map.set(pattern.source, replacement);
  }
  return map;
}

const ARABIC_REPLACEMENT_MAP = buildArabicReplacementMap();

// Build a single combined regex for Arabic conversion
function buildCombinedArabicRegex(): RegExp {
  const patterns = ARABIC_TO_KURDISH_REPLACEMENTS.map(([p]) => p.source);
  return new RegExp(patterns.join('|'), 'gu');
}

const COMBINED_ARABIC_REGEX = buildCombinedArabicRegex();

// Pre-built static sets for fast character validation
const KURDISH_SET = new Set(KURDISH_SORANI_33_LETTERS);
const DIGITS_SET = new Set('0123456789٠١٢٣٤٥٦٧٨٩');
const PUNCTUATION_SET = new Set('.,;:!?()\\-"\'\'،؛؟«»[]{}');
const SPACE_SET = new Set(' \t\n');
const LATIN_SET = new Set('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');

export class KurdishProcessor {
  private options: Required<KurdishProcessorOptions>;
  private allowedSet: Set<string> | null = null;

  constructor(options: KurdishProcessorOptions = {}) {
    this.options = {
      allowDigits: false,
      allowPunctuation: false,
      allowSpaces: true,
      allowEmojis: false,
      autoConvertArabic: true,
      autoConvertEnglishLayout: false,
      blockOtherScripts: true,
      strict: true,
      ...options,
    };
    this.rebuildAllowedSet();
  }

  private rebuildAllowedSet(): void {
    this.allowedSet = new Set(KURDISH_SET);
    if (this.options.allowDigits) {
      DIGITS_SET.forEach(c => this.allowedSet!.add(c));
    }
    if (this.options.allowPunctuation) {
      PUNCTUATION_SET.forEach(c => this.allowedSet!.add(c));
    }
    if (this.options.allowSpaces) {
      SPACE_SET.forEach(c => this.allowedSet!.add(c));
    }
    if (!this.options.blockOtherScripts) {
      LATIN_SET.forEach(c => this.allowedSet!.add(c));
    }
  }

  process(input: string): string {
    let processed = input;

    if (this.options.autoConvertEnglishLayout) {
      processed = this.convertEnglishLayoutToKurdish(processed);
    }

    if (this.options.autoConvertArabic) {
      processed = this.convertArabicToKurdish(processed);
    }

    // Only filter if blockOtherScripts is enabled, otherwise just apply allowed character filtering
    if (this.options.blockOtherScripts) {
      processed = this.filterText(processed);
    } else {
      // When not blocking other scripts, still filter based on allowed options
      processed = this.filterByAllowedOptions(processed);
    }

    return processed;
  }

  private filterByAllowedOptions(text: string): string {
    const allowedSet = this.allowedSet!;
    const emojiMatches = this.options.allowEmojis ? text.match(EMOJI_REGEX) || [] : [];

    // Single pass: filter characters without splitting string
    let result = '';
    let emojiIndex = 0;
    
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      
      // Handle emoji matching - simplified approach
      if (this.options.allowEmojis && /[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/u.test(char)) {
        result += emojiMatches[emojiIndex++] || '';
      } else if (allowedSet.has(char)) {
        result += char;
      }
    }

    return result;
  }

  validate(input: string): ValidationResult {
    const errors: string[] = [];
    let converted = input;

    if (this.options.autoConvertArabic) {
      converted = this.convertArabicToKurdish(converted);
    }
    if (this.options.autoConvertEnglishLayout) {
      converted = this.convertEnglishLayoutToKurdish(converted);
    }

    if (this.options.strict && ARABIC_VARIANTS_TO_REJECT.test(converted)) {
      errors.push('Contains forbidden Arabic variants');
    }

    if (this.options.blockOtherScripts && NON_KURDISH_SCRIPTS.test(converted)) {
      errors.push('Contains non-Kurdish script characters');
    }

    // Use pre-built allowed set
    const allowedChars = this.allowedSet!;
    const emojiMatches = converted.match(EMOJI_REGEX) || [];
    const textWithoutEmojis = converted.replace(EMOJI_REGEX, '');

    // Check if all non-emoji characters are allowed - optimized loop
    for (let i = 0; i < textWithoutEmojis.length; i++) {
      if (!allowedChars.has(textWithoutEmojis[i])) {
        errors.push('Contains invalid characters');
        break;
      }
    }

    if (emojiMatches.length > 0 && !this.options.allowEmojis) {
      errors.push('Emojis are not allowed');
    }

    return {
      isValid: errors.length === 0,
      errors,
      converted: errors.length === 0 ? converted : undefined,
    };
  }

  private convertArabicToKurdish(text: string): string {
    // Apply all Arabic to Kurdish replacements in order
    // Multi-character patterns must be processed first, then single characters
    let result = text;
    for (const [pattern, replacement] of ARABIC_TO_KURDISH_REPLACEMENTS) {
      result = result.replace(pattern, replacement);
    }
    return result;
  }

  private convertEnglishLayoutToKurdish(text: string): string {
    // Single pass without splitting string
    let result = '';
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      result += ENGLISH_TO_KURDISH_LAYOUT[char] || char;
    }
    return result;
  }

  private filterText(text: string): string {
    const allowedSet = this.allowedSet!;
    
    // Single pass: filter characters without splitting string
    let result = '';
    
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      if (allowedSet.has(char)) {
        result += char;
      }
    }

    return result;
  }

  private escapeRegExp(string: string): string {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  updateOptions(newOptions: Partial<KurdishProcessorOptions>): void {
    this.options = { ...this.options, ...newOptions };
    this.rebuildAllowedSet();
  }
}
