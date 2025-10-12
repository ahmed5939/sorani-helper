import { describe, test, expect, mock } from 'bun:test';
import { 
  createKurdishInputHandler,
  createStrictKurdishValidator,
  createKurdishKeyboardProcessor,
} from '../src/utils';
import { KurdishProcessor } from '../src/KurdishProcessor';

describe('Utility Functions', () => {
  describe('createStrictKurdishValidator', () => {
    test('creates processor with strict validation settings', () => {
      const validator = createStrictKurdishValidator();
      expect(validator).toBeInstanceOf(KurdishProcessor);
    });

    test('allows digits, punctuation, and spaces', () => {
      const validator = createStrictKurdishValidator();
      const result = validator.validate('سڵاو 123، چۆنی؟');
      expect(result.isValid).toBe(true);
    });

    test('blocks emojis in strict mode', () => {
      const validator = createStrictKurdishValidator();
      const result = validator.validate('سڵاو 😀');
      expect(result.isValid).toBe(false);
    });

    test('converts Arabic variants automatically', () => {
      const validator = createStrictKurdishValidator();
      expect(validator.process('كەیوان')).toBe('کەیوان');
    });

    test('does not convert English layout', () => {
      const validator = createStrictKurdishValidator();
      expect(validator.process('hello').length).toBe(0);
    });

    test('blocks non-Kurdish scripts', () => {
      const validator = createStrictKurdishValidator();
      const result = validator.validate('hello');
      expect(result.isValid).toBe(false);
    });
  });

  describe('createKurdishKeyboardProcessor', () => {
    test('creates processor with keyboard conversion settings', () => {
      const processor = createKurdishKeyboardProcessor();
      expect(processor).toBeInstanceOf(KurdishProcessor);
    });

    test('converts English layout to Kurdish', () => {
      const processor = createKurdishKeyboardProcessor();
      expect(processor.process('slaw')).toBe('سلاو');
    });

    test('allows emojis', () => {
      const processor = createKurdishKeyboardProcessor();
      const result = processor.validate('سڵاو 😀');
      expect(result.isValid).toBe(true);
    });

    test('converts Arabic variants', () => {
      const processor = createKurdishKeyboardProcessor();
      expect(processor.process('كەیوان')).toBe('کەیوان');
    });

    test('allows digits and punctuation', () => {
      const processor = createKurdishKeyboardProcessor();
      expect(processor.process('slaw 123!').length).toBeGreaterThan(0);
    });

    test('is non-strict mode', () => {
      const processor = createKurdishKeyboardProcessor();
      // In non-strict, converted text should pass even if original had Arabic variants
      const result = processor.validate('كەیوان');
      expect(result.isValid).toBe(true);
    });
  });

  describe('createKurdishInputHandler', () => {
    test('creates event handler function', () => {
      const processor = new KurdishProcessor();
      const handler = createKurdishInputHandler(processor);
      expect(typeof handler).toBe('function');
    });

    test('processes input value when called', () => {
      const processor = new KurdishProcessor({ autoConvertArabic: true });
      const handler = createKurdishInputHandler(processor);
      
      // Mock input element
      const mockInput = {
        value: 'كەیوان',
        selectionStart: 5,
        setSelectionRange: mock(() => {}),
      };
      
      const mockEvent = { target: mockInput };
      handler(mockEvent as any);
      
      expect(mockInput.value).toBe('کەیوان');
    });

    test('maintains cursor position when text length unchanged', () => {
      const processor = new KurdishProcessor({ autoConvertArabic: true });
      const handler = createKurdishInputHandler(processor);
      
      const mockInput = {
        value: 'كەیوان',
        selectionStart: 3,
        setSelectionRange: mock(() => {}),
      };
      
      const mockEvent = { target: mockInput };
      handler(mockEvent as any);
      
      expect(mockInput.setSelectionRange).toHaveBeenCalledWith(3, 3);
    });

    test('adjusts cursor position if text becomes shorter', () => {
      const processor = new KurdishProcessor({ 
        autoConvertEnglishLayout: false,
        blockOtherScripts: true,
      });
      const handler = createKurdishInputHandler(processor);
      
      const mockInput = {
        value: 'سڵاوhello',
        selectionStart: 9,
        setSelectionRange: mock(() => {}),
      };
      
      const mockEvent = { target: mockInput };
      handler(mockEvent as any);
      
      // Cursor should be adjusted to end of processed text
      const finalLength = mockInput.value.length;
      expect(mockInput.setSelectionRange).toHaveBeenCalledWith(finalLength, finalLength);
    });

    test('calls callback with processed and original values', () => {
      const processor = new KurdishProcessor({ autoConvertArabic: true });
      const callback = mock(() => {});
      const handler = createKurdishInputHandler(processor, callback);
      
      const mockInput = {
        value: 'كەیوان',
        selectionStart: 5,
        setSelectionRange: mock(() => {}),
      };
      
      const mockEvent = { target: mockInput };
      handler(mockEvent as any);
      
      expect(callback).toHaveBeenCalledWith('کەیوان', 'كەیوان');
    });

    test('does not call callback if not provided', () => {
      const processor = new KurdishProcessor();
      const handler = createKurdishInputHandler(processor);
      
      const mockInput = {
        value: 'سڵاو',
        selectionStart: 4,
        setSelectionRange: mock(() => {}),
      };
      
      const mockEvent = { target: mockInput };
      
      // Should not throw
      expect(() => handler(mockEvent as any)).not.toThrow();
    });

    test('does not modify input if no changes needed', () => {
      const processor = new KurdishProcessor();
      const handler = createKurdishInputHandler(processor);
      
      const mockInput = {
        value: 'سڵاو',
        selectionStart: 4,
        setSelectionRange: mock(() => {}),
      };
      
      const mockEvent = { target: mockInput };
      handler(mockEvent as any);
      
      // setSelectionRange should not be called if value unchanged
      expect(mockInput.setSelectionRange).not.toHaveBeenCalled();
    });

    test('works with keyboard layout conversion', () => {
      const processor = new KurdishProcessor({ autoConvertEnglishLayout: true });
      const handler = createKurdishInputHandler(processor);
      
      const mockInput = {
        value: 'slaw',
        selectionStart: 4,
        setSelectionRange: mock(() => {}),
      };
      
      const mockEvent = { target: mockInput };
      handler(mockEvent as any);
      
      expect(mockInput.value).toBe('سلاو');
    });
  });

  describe('Integration: Real-world usage scenarios', () => {
    test('strict validator for form validation', () => {
      const validator = createStrictKurdishValidator();
      
      // Valid Kurdish input
      expect(validator.validate('ناو: کەیوان').isValid).toBe(true);
      
      // Invalid: contains English
      expect(validator.validate('Name: کەیوان').isValid).toBe(false);
      
      // Valid: Arabic converted automatically
      expect(validator.validate('كەیوان').isValid).toBe(true);
    });

    test('keyboard processor for live input fields', () => {
      const processor = createKurdishKeyboardProcessor();
      
      // User types English, gets Kurdish
      expect(processor.process('slaw choni')).toContain('سلاو');
      
      // User pastes Arabic text, gets converted
      expect(processor.process('كەیوان')).toBe('کەیوان');
      
      // Emojis allowed for modern chat apps
      expect(processor.process('سڵاو 😀').includes('😀')).toBe(true);
    });

    test('input handler for textarea with feedback', () => {
      const processor = createKurdishKeyboardProcessor();
      let lastProcessed = '';
      let lastOriginal = '';
      
      const handler = createKurdishInputHandler(processor, (processed, original) => {
        lastProcessed = processed;
        lastOriginal = original;
      });
      
      const mockInput = {
        value: 'slaw',
        selectionStart: 4,
        setSelectionRange: mock(() => {}),
      };
      
      handler({ target: mockInput } as any);
      
      expect(lastOriginal).toBe('slaw');
      expect(lastProcessed).toContain('سلاو');
      expect(mockInput.value).toContain('سلاو');
    });
  });
});
