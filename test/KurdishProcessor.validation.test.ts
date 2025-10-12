import { describe, test, expect } from 'bun:test';
import { KurdishProcessor } from '../src/KurdishProcessor';

describe('KurdishProcessor Validation', () => {
  describe('validate method', () => {
    test('returns valid for pure Kurdish text', () => {
      const p = new KurdishProcessor();
      const result = p.validate('سڵاو چۆنی');
      expect(result.isValid).toBe(true);
      expect(result.errors).toEqual([]);
      expect(result.converted).toBe('سڵاو چۆنی');
    });

    test('returns converted text for Arabic variants', () => {
      const p = new KurdishProcessor({ autoConvertArabic: true });
      const result = p.validate('كەیوان');
      expect(result.isValid).toBe(true);
      expect(result.converted).toBe('کەیوان');
    });

    test('rejects Latin text when blocking', () => {
      const p = new KurdishProcessor({ blockOtherScripts: true });
      const result = p.validate('hello');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Contains non-Kurdish script characters');
      expect(result.converted).toBeUndefined();
    });

    test('rejects Arabic variants in strict mode', () => {
      const p = new KurdishProcessor({ strict: true, autoConvertArabic: false });
      const result = p.validate('كەیوان');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Contains forbidden Arabic variants');
    });

    test('rejects emojis when not allowed', () => {
      const p = new KurdishProcessor({ allowEmojis: false });
      const result = p.validate('سڵاو 😀');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Emojis are not allowed');
    });

    test('accepts emojis when allowed', () => {
      const p = new KurdishProcessor({ allowEmojis: true });
      const result = p.validate('سڵاو 😀');
      expect(result.isValid).toBe(true);
      expect(result.converted).toBe('سڵاو 😀');
    });

    test('rejects invalid characters', () => {
      const p = new KurdishProcessor({ 
        allowDigits: false, 
        allowPunctuation: false,
        blockOtherScripts: true,
      });
      const result = p.validate('سڵاو123!@#');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Contains invalid characters');
    });

    test('validates with all options allowed', () => {
      const p = new KurdishProcessor({
        allowDigits: true,
        allowPunctuation: true,
        allowSpaces: true,
        allowEmojis: true,
      });
      const result = p.validate('سڵاو 123، چۆنی؟ 😀');
      expect(result.isValid).toBe(true);
      expect(result.converted).toBe('سڵاو 123، چۆنی؟ 😀');
    });

    test('applies conversions before validation', () => {
      const p = new KurdishProcessor({ 
        autoConvertArabic: true,
        autoConvertEnglishLayout: true,
        allowDigits: true,
      });
      const result = p.validate('slaw 123');
      expect(result.isValid).toBe(true);
      expect(result.converted).toBe('سلاو ١٢٣');
    });

    test('returns multiple errors when applicable', () => {
      const p = new KurdishProcessor({ 
        strict: true, 
        autoConvertArabic: false,
        blockOtherScripts: true,
      });
      const result = p.validate('hello كەیوان');
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(1);
    });
  });

  describe('Edge cases', () => {
    test('validates empty string', () => {
      const p = new KurdishProcessor();
      const result = p.validate('');
      expect(result.isValid).toBe(true);
      expect(result.converted).toBe('');
    });

    test('validates whitespace-only string', () => {
      const p = new KurdishProcessor({ allowSpaces: true });
      const result = p.validate('   \t\n  ');
      expect(result.isValid).toBe(true);
    });

    test('validates Kurdish text with all 33 letters', () => {
      const p = new KurdishProcessor();
      const result = p.validate('ئابپتجچحخدرڕزژسشعغفڤقکگلڵمنوۆهەیێ');
      expect(result.isValid).toBe(true);
    });

    test('handles mixed valid and invalid characters', () => {
      const p = new KurdishProcessor({ 
        allowDigits: true,
        blockOtherScripts: true,
      });
      const result = p.validate('سڵاو 123 hello');
      expect(result.isValid).toBe(false);
    });

    test('handles Unicode normalization', () => {
      const p = new KurdishProcessor();
      // Test with pre-composed and decomposed forms
      const result1 = p.validate('سڵاو');
      const result2 = p.validate('سڵاو');
      expect(result1.isValid).toBe(true);
      expect(result2.isValid).toBe(true);
    });
  });

  describe('Real-world Kurdish text', () => {
    test('validates Kurdish city names', () => {
      const p = new KurdishProcessor({ autoConvertArabic: true });
      
      expect(p.validate('هەولێر').isValid).toBe(true); // Erbil
      expect(p.validate('سلێمانی').isValid).toBe(true); // Sulaymaniyah
      expect(p.validate('کەرکوک').isValid).toBe(true); // Kirkuk
      expect(p.validate('دهۆک').isValid).toBe(true); // Duhok
    });

    test('validates Kurdish phrases', () => {
      const p = new KurdishProcessor({ 
        allowPunctuation: true,
        allowSpaces: true,
      });
      
      expect(p.validate('سڵاو، چۆنی؟').isValid).toBe(true);
      expect(p.validate('سپاس بۆ یارمەتیەکەت').isValid).toBe(true);
      expect(p.validate('زۆر باشم، سوپاس').isValid).toBe(true);
    });

    test('validates Kurdish names', () => {
      const p = new KurdishProcessor({ autoConvertArabic: true });
      
      expect(p.validate('کەیوان').isValid).toBe(true);
      expect(p.validate('شیلان').isValid).toBe(true);
      expect(p.validate('دارا').isValid).toBe(true);
      expect(p.validate('ڕەنگین').isValid).toBe(true);
    });
  });
});
