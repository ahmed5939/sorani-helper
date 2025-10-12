import { KurdishProcessor } from './KurdishProcessor';

export function createKurdishInputHandler(
  processor: KurdishProcessor,
  callback?: (processed: string, original: string) => void
) {
  return function (event: Event) {
    const target = event.target as HTMLInputElement;
    const original = target.value;
    const processed = processor.process(original);

    if (processed !== original) {
      const cursorPos = target.selectionStart || 0;
      target.value = processed;

      const newCursorPos = Math.min(cursorPos, processed.length);
      target.setSelectionRange(newCursorPos, newCursorPos);
    }

    callback?.(processed, original);
  };
}

export function createStrictKurdishValidator(): KurdishProcessor {
  return new KurdishProcessor({
    allowDigits: true,
    allowPunctuation: true,
    allowSpaces: true,
    allowEmojis: false,
    autoConvertArabic: true,
    autoConvertEnglishLayout: false,
    blockOtherScripts: true,
    strict: true,
  });
}

export function createKurdishKeyboardProcessor(): KurdishProcessor {
  return new KurdishProcessor({
    allowDigits: true,
    allowPunctuation: true,
    allowSpaces: true,
    allowEmojis: true,
    autoConvertArabic: true,
    autoConvertEnglishLayout: true,
    blockOtherScripts: true,
    strict: false,
  });
}
