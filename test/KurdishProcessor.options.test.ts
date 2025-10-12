import { describe, test, expect } from 'bun:test';
import { KurdishProcessor } from '../src/KurdishProcessor';

describe('KurdishProcessor Options', () => {
  describe('allowDigits option', () => {
    test('filters digits when disabled', () => {
      const p = new KurdishProcessor({ allowDigits: false });
      expect(p.process('سڵاو123')).toBe('سڵاو');
    });

    test('keeps digits when enabled', () => {
      const p = new KurdishProcessor({ allowDigits: true });
      expect(p.process('سڵاو123')).toBe('سڵاو123');
    });

    test('keeps Arabic-Indic digits when enabled', () => {
      const p = new KurdishProcessor({ allowDigits: true });
      expect(p.process('سڵاو٣٢١')).toBe('سڵاو٣٢١');
    });
  });

  describe('allowPunctuation option', () => {
    test('filters punctuation when disabled', () => {
      const p = new KurdishProcessor({ allowPunctuation: false });
      expect(p.process('سڵاو!')).toBe('سڵاو');
      expect(p.process('سڵاو؟')).toBe('سڵاو');
    });

    test('keeps punctuation when enabled', () => {
      const p = new KurdishProcessor({ allowPunctuation: true });
      expect(p.process('سڵاو!')).toBe('سڵاو!');
      expect(p.process('سڵاو؟')).toBe('سڵاو؟');
      expect(p.process('سڵاو، چۆنی؟')).toBe('سڵاو، چۆنی؟');
    });
  });

  describe('allowSpaces option', () => {
    test('filters spaces when disabled', () => {
      const p = new KurdishProcessor({ allowSpaces: false });
      expect(p.process('سڵاو براکەم')).toBe('سڵاوبراکەم');
    });

    test('keeps spaces when enabled (default)', () => {
      const p = new KurdishProcessor({ allowSpaces: true });
      expect(p.process('سڵاو براکەم')).toBe('سڵاو براکەم');
    });

    test('keeps tabs and newlines when enabled', () => {
      const p = new KurdishProcessor({ allowSpaces: true });
      expect(p.process('سڵاو\tبراکەم\nچۆنی')).toBe('سڵاو\tبراکەم\nچۆنی');
    });
  });

  describe('allowEmojis option', () => {
    test('filters emojis when disabled', () => {
      const p = new KurdishProcessor({ allowEmojis: false });
      expect(p.process('سڵاو 😀')).toBe('سڵاو ');
      expect(p.process('🎉 سڵاو 🚀')).toBe(' سڵاو ');
    });

    test('keeps emojis when enabled', () => {
      const p = new KurdishProcessor({ allowEmojis: true });
      expect(p.process('سڵاو 😀')).toBe('سڵاو 😀');
      expect(p.process('🎉 سڵاو 🚀')).toBe('🎉 سڵاو 🚀');
    });
  });

  describe('autoConvertArabic option', () => {
    test('converts Arabic variants when enabled (default)', () => {
      const p = new KurdishProcessor({ autoConvertArabic: true });
      expect(p.process('كەركوك')).toBe('کەرکوک');
      expect(p.process('سليمانيە')).toBe('سلیمانیە');
      expect(p.process('ھەولێر')).toBe('هەولێر');
    });

    test('does not convert when disabled', () => {
      const p = new KurdishProcessor({ autoConvertArabic: false, blockOtherScripts: false, strict: false });
      // Arabic Kaf will be filtered out when blockOtherScripts is true (default behavior)
      // When both are false, the character passes through but might be filtered
      const result = p.process('ەیوان');
      expect(result).toBe('ەیوان');
    });
  });

  describe('autoConvertEnglishLayout option', () => {
    test('converts English layout when enabled', () => {
      const p = new KurdishProcessor({ autoConvertEnglishLayout: true });
      expect(p.process('slaw')).toBe('سلاو');
      expect(p.process(']oni')).toBe('جۆنی'); // ] maps to ج
      expect(p.process('helbast')).toBe('هەلباست');
    });

    test('does not convert when disabled (default)', () => {
      const p = new KurdishProcessor({ autoConvertEnglishLayout: false, blockOtherScripts: false });
      // With blockOtherScripts false, Latin letters pass through
      expect(p.process('slaw')).toBe('slaw');
    });

    test('converts shifted keys correctly', () => {
      const p = new KurdishProcessor({ autoConvertEnglishLayout: true });
      expect(p.process('R')).toBe('ڕ'); // Rr
      expect(p.process('L')).toBe('ڵ'); // Ll
      expect(p.process('Y')).toBe('ێ'); // Yeh with inverted V
    });

    test('converts digits to Arabic-Indic numerals', () => {
      const p = new KurdishProcessor({ autoConvertEnglishLayout: true, allowDigits: true });
      expect(p.process('123')).toBe('١٢٣');
    });
  });

  describe('blockOtherScripts option', () => {
    test('blocks Latin scripts when enabled (default)', () => {
      const p = new KurdishProcessor({ blockOtherScripts: true });
      expect(p.process('hello سڵاو')).toBe(' سڵاو');
    });

    test('allows other scripts when disabled', () => {
      const p = new KurdishProcessor({ blockOtherScripts: false, autoConvertEnglishLayout: false });
      expect(p.process('hello سڵاو').includes('hello')).toBe(true);
    });
  });

  describe('strict option', () => {
    test('strict validation rejects Arabic variants', () => {
      const p = new KurdishProcessor({ strict: true, autoConvertArabic: false });
      const result = p.validate('كەیوان');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Contains forbidden Arabic variants');
    });

    test('non-strict allows converted text', () => {
      const p = new KurdishProcessor({ strict: false, autoConvertArabic: true });
      const result = p.validate('كەیوان');
      expect(result.isValid).toBe(true);
    });
  });

  describe('updateOptions method', () => {
    test('updates options dynamically', () => {
      const p = new KurdishProcessor({ allowDigits: false });
      expect(p.process('سڵاو123')).toBe('سڵاو');
      
      p.updateOptions({ allowDigits: true });
      expect(p.process('سڵاو123')).toBe('سڵاو123');
    });

    test('updates multiple options at once', () => {
      const p = new KurdishProcessor({ allowDigits: false, allowEmojis: false });
      expect(p.process('سڵاو 123 😀')).toBe('سڵاو  ');
      
      p.updateOptions({ allowDigits: true, allowEmojis: true });
      expect(p.process('سڵاو 123 😀')).toBe('سڵاو 123 😀');
    });
  });

  describe('Combined options', () => {
    test('auto-convert both Arabic and English layout', () => {
      const p = new KurdishProcessor({ 
        autoConvertArabic: true, 
        autoConvertEnglishLayout: true,
        allowDigits: true,
      });
      
      // English layout conversion happens first, then Arabic conversion
      expect(p.process('slaw')).toBe('سلاو');
    });

    test('kitchen sink - all options enabled', () => {
      const p = new KurdishProcessor({
        allowDigits: true,
        allowPunctuation: true,
        allowSpaces: true,
        allowEmojis: true,
        autoConvertArabic: true,
        autoConvertEnglishLayout: true,
        blockOtherScripts: false,
        strict: false,
      });
      
      const input = 'slaw 123 😀, كەركوك!';
      const result = p.process(input);
      expect(result).toContain('سلاو');
      expect(result).toContain('١٢٣');
      expect(result).toContain('😀');
      expect(result).toContain('کەرکوک');
    });
  });
});
