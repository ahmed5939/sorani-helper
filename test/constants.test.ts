import { describe, test, expect } from 'bun:test';
import {
  KURDISH_SORANI_33_LETTERS,
  ARABIC_TO_KURDISH_MAP,
  ENGLISH_TO_KURDISH_LAYOUT,
  ARABIC_VARIANTS_TO_REJECT,
  NON_KURDISH_SCRIPTS,
  EMOJI_REGEX,
} from '../src/constants';

describe('Constants', () => {
  describe('KURDISH_SORANI_33_LETTERS', () => {
    test('contains exactly 33 letters', () => {
      expect(KURDISH_SORANI_33_LETTERS.length).toBe(33);
    });

    test('contains unique characters', () => {
      const chars = KURDISH_SORANI_33_LETTERS.split('');
      const uniqueChars = new Set(chars);
      expect(uniqueChars.size).toBe(33);
    });

    test('includes essential Kurdish letters', () => {
      expect(KURDISH_SORANI_33_LETTERS).toContain('ڕ'); // Rr
      expect(KURDISH_SORANI_33_LETTERS).toContain('ڵ'); // Ll
      expect(KURDISH_SORANI_33_LETTERS).toContain('ژ'); // Jh
      expect(KURDISH_SORANI_33_LETTERS).toContain('ۆ'); // O
      expect(KURDISH_SORANI_33_LETTERS).toContain('ێ'); // Yeh with inverted V
      expect(KURDISH_SORANI_33_LETTERS).toContain('ە'); // Kurdish E
      expect(KURDISH_SORANI_33_LETTERS).toContain('ک'); // Kurdish K
      expect(KURDISH_SORANI_33_LETTERS).toContain('گ'); // Kurdish G
      expect(KURDISH_SORANI_33_LETTERS).toContain('چ'); // Kurdish Ch
      expect(KURDISH_SORANI_33_LETTERS).toContain('ڤ'); // Kurdish V
    });
  });

  describe('ARABIC_TO_KURDISH_MAP', () => {
    test('converts Arabic Kaf to Kurdish Kaf', () => {
      expect(ARABIC_TO_KURDISH_MAP['ك']).toBe('ک');
    });

    test('converts Arabic Yeh variants to Kurdish Yeh', () => {
      expect(ARABIC_TO_KURDISH_MAP['ي']).toBe('ی');
      expect(ARABIC_TO_KURDISH_MAP['ى']).toBe('ی');
    });

    test('converts Heh Doachashmee to standard Heh', () => {
      expect(ARABIC_TO_KURDISH_MAP['ھ']).toBe('ه');
    });

    test('converts Hamza variants to base letters', () => {
      expect(ARABIC_TO_KURDISH_MAP['أ']).toBe('ا');
      expect(ARABIC_TO_KURDISH_MAP['إ']).toBe('ا');
      expect(ARABIC_TO_KURDISH_MAP['آ']).toBe('ا');
      expect(ARABIC_TO_KURDISH_MAP['ؤ']).toBe('و');
    });

    test('converts Taa Marbutah to Heh', () => {
      expect(ARABIC_TO_KURDISH_MAP['ة']).toBe('ه');
    });
  });

  describe('ENGLISH_TO_KURDISH_LAYOUT', () => {
    test('converts basic letters', () => {
      expect(ENGLISH_TO_KURDISH_LAYOUT['s']).toBe('س');
      expect(ENGLISH_TO_KURDISH_LAYOUT['l']).toBe('ل');
      expect(ENGLISH_TO_KURDISH_LAYOUT['a']).toBe('ا');
      expect(ENGLISH_TO_KURDISH_LAYOUT['w']).toBe('و');
    });

    test('converts Kurdish-specific letters', () => {
      expect(ENGLISH_TO_KURDISH_LAYOUT['e']).toBe('ە'); // Kurdish E
      expect(ENGLISH_TO_KURDISH_LAYOUT['o']).toBe('ۆ'); // Kurdish O
      expect(ENGLISH_TO_KURDISH_LAYOUT['R']).toBe('ڕ'); // Rr (shifted)
      expect(ENGLISH_TO_KURDISH_LAYOUT['L']).toBe('ڵ'); // Ll (shifted)
      expect(ENGLISH_TO_KURDISH_LAYOUT['J']).toBe('ژ'); // Jh (shifted)
      expect(ENGLISH_TO_KURDISH_LAYOUT['j']).toBe('ژ'); // Jh (unshifted)
    });

    test('converts digits to Arabic-Indic numerals', () => {
      expect(ENGLISH_TO_KURDISH_LAYOUT['0']).toBe('٠');
      expect(ENGLISH_TO_KURDISH_LAYOUT['1']).toBe('١');
      expect(ENGLISH_TO_KURDISH_LAYOUT['5']).toBe('٥');
      expect(ENGLISH_TO_KURDISH_LAYOUT['9']).toBe('٩');
    });

    test('reverses parentheses and brackets', () => {
      expect(ENGLISH_TO_KURDISH_LAYOUT['(']).toBe(')');
      expect(ENGLISH_TO_KURDISH_LAYOUT[')']).toBe('(');
      expect(ENGLISH_TO_KURDISH_LAYOUT['{']).toBe('چ');
      expect(ENGLISH_TO_KURDISH_LAYOUT['}']).toBe('ج');
      expect(ENGLISH_TO_KURDISH_LAYOUT['<']).toBe('>');
      expect(ENGLISH_TO_KURDISH_LAYOUT['>']).toBe('<');
    });

    test('converts punctuation marks', () => {
      expect(ENGLISH_TO_KURDISH_LAYOUT['.']).toBe('،'); // Arabic comma
      expect(ENGLISH_TO_KURDISH_LAYOUT[';']).toBe('؛'); // Arabic semicolon
      expect(ENGLISH_TO_KURDISH_LAYOUT['/']).toBe('.'); // period
    });
  });

  describe('ARABIC_VARIANTS_TO_REJECT regex', () => {
    test('matches Arabic variants that should be rejected', () => {
      expect(ARABIC_VARIANTS_TO_REJECT.test('ك')).toBe(true); // Arabic Kaf
      expect(ARABIC_VARIANTS_TO_REJECT.test('ي')).toBe(true); // Arabic Yeh
      expect(ARABIC_VARIANTS_TO_REJECT.test('ھ')).toBe(true); // Heh Doachashmee
      expect(ARABIC_VARIANTS_TO_REJECT.test('ة')).toBe(true); // Taa Marbutah
    });

    test('does not match Kurdish letters', () => {
      expect(ARABIC_VARIANTS_TO_REJECT.test('ک')).toBe(false); // Kurdish Kaf
      expect(ARABIC_VARIANTS_TO_REJECT.test('ی')).toBe(false); // Kurdish Yeh
      expect(ARABIC_VARIANTS_TO_REJECT.test('ه')).toBe(false); // Standard Heh
    });
  });

  describe('NON_KURDISH_SCRIPTS regex', () => {
    test('matches Latin letters', () => {
      expect(NON_KURDISH_SCRIPTS.test('a')).toBe(true);
      expect(NON_KURDISH_SCRIPTS.test('Z')).toBe(true);
      expect(NON_KURDISH_SCRIPTS.test('hello')).toBe(true);
    });

    test('does not match Kurdish letters', () => {
      expect(NON_KURDISH_SCRIPTS.test('ک')).toBe(false);
      expect(NON_KURDISH_SCRIPTS.test('سڵاو')).toBe(false);
    });
  });

  describe('EMOJI_REGEX', () => {
    test('matches some emojis (basic test)', () => {
      // Test with a few known emojis in our ranges
      expect(EMOJI_REGEX.test('😀')).toBe(true); // U+1F600 - in range
      // Note: Emoji support varies; testing basic functionality
    });

    test('does not match regular text', () => {
      const text = 'سڵاو hello 123';
      expect(text.match(EMOJI_REGEX)).toBeNull();
    });
  });
});
