import {
  KurdishProcessorOptions,
  ValidationResult,
} from './types';
import {
  KURDISH_SORANI_33_LETTERS,
  ARABIC_TO_KURDISH_MAP,
  ENGLISH_TO_KURDISH_LAYOUT,
  ARABIC_VARIANTS_TO_REJECT,
  NON_KURDISH_SCRIPTS,
  EMOJI_REGEX,
} from './constants';

export class KurdishProcessor {
  private options: Required<KurdishProcessorOptions>;

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
    let allowed = KURDISH_SORANI_33_LETTERS;
    if (this.options.allowDigits) allowed += '0123456789٠١٢٣٤٥٦٧٨٩';
    if (this.options.allowPunctuation) allowed += '.,;:!?()\\-"\'\'،؛؟«»[]{}';
    if (this.options.allowSpaces) allowed += ' \t\n';
    
    // When blockOtherScripts is false, also allow Latin and other common scripts
    if (!this.options.blockOtherScripts) {
      allowed += 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    }

    const allowedSet = new Set(allowed);
    const emojiMatches = this.options.allowEmojis ? text.match(EMOJI_REGEX) || [] : [];

    let filtered = text
      .replace(EMOJI_REGEX, '※')
      .split('')
      .filter(char => char === '※' || allowedSet.has(char))
      .join('');

    if (this.options.allowEmojis) {
      let emojiIndex = 0;
      filtered = filtered.replace(/※/g, () => emojiMatches[emojiIndex++] || '');
    } else {
      filtered = filtered.replace(/※/g, '');
    }

    return filtered;
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

    // Build allowed character set
    const allowedChars = new Set(KURDISH_SORANI_33_LETTERS);
    if (this.options.allowDigits) {
      '0123456789٠١٢٣٤٥٦٧٨٩'.split('').forEach(c => allowedChars.add(c));
    }
    if (this.options.allowPunctuation) {
      '.,;:!?()-"\'،؛؟«»[]{}'.split('').forEach(c => allowedChars.add(c));
    }
    if (this.options.allowSpaces) {
      ' \t\n'.split('').forEach(c => allowedChars.add(c));
    }

    const emojiMatches = converted.match(EMOJI_REGEX) || [];
    const textWithoutEmojis = converted.replace(EMOJI_REGEX, '');

    // Check if all non-emoji characters are allowed
    for (const char of textWithoutEmojis) {
      if (!allowedChars.has(char)) {
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
    let result = text;
    for (const [arabic, kurdish] of Object.entries(ARABIC_TO_KURDISH_MAP)) {
      result = result.replace(new RegExp(arabic, 'g'), kurdish);
    }
    return result;
  }

  private convertEnglishLayoutToKurdish(text: string): string {
    return text
      .split('')
      .map(char => ENGLISH_TO_KURDISH_LAYOUT[char] || char)
      .join('');
  }

  private filterText(text: string): string {
    let allowed = KURDISH_SORANI_33_LETTERS;
    if (this.options.allowDigits) allowed += '0123456789٠١٢٣٤٥٦٧٨٩';
    if (this.options.allowPunctuation) allowed += '.,;:!?()\\-\"\'\'،؛؟«»[]{}';
    if (this.options.allowSpaces) allowed += ' \t\n';

    const allowedSet = new Set(allowed);
    const emojiMatches = this.options.allowEmojis ? text.match(EMOJI_REGEX) || [] : [];

    let filtered = text
      .replace(EMOJI_REGEX, '※')
      .split('')
      .filter(char => char === '※' || allowedSet.has(char))
      .join('');

    if (this.options.allowEmojis) {
      let emojiIndex = 0;
      filtered = filtered.replace(/※/g, () => emojiMatches[emojiIndex++] || '');
    } else {
      filtered = filtered.replace(/※/g, '');
    }

    return filtered;
  }

  private escapeRegExp(string: string): string {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  updateOptions(newOptions: Partial<KurdishProcessorOptions>): void {
    this.options = { ...this.options, ...newOptions };
  }
}
