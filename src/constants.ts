// Standard Central Kurdish 33-letter alphabet (KRG approved)
export const KURDISH_SORANI_33_LETTERS = "ئابپتجچحخدرڕزژسشعغفڤقکگلڵمنوۆهەیێ";

// Arabic to Kurdish mappings
export const ARABIC_TO_KURDISH_MAP: Record<string, string> = {
  'ك': 'ک', // U+0643 Arabic Kaf → U+06A9 Kurdish Kaf
  'ي': 'ی', // U+064A Arabic Yeh → U+06CC Kurdish Yeh
  'ى': 'ی', // Arabic Alif Maksura → Kurdish Yeh
  'ة': 'ه', // Arabic Taa Marbutah → Heh
  'أ': 'ا', // Arabic Alif with Hamza above → Alif
  'إ': 'ا', // Arabic Alif with Hamza below → Alif
  'آ': 'ا', // Arabic Alif with Madda → Alif
  'ؤ': 'و', // Arabic Waw with Hamza → Waw
  'ھ': 'ه', // U+06BE Arabic Heh Doachashmee → U+0647 (as per KRG standard)
};

// English QWERTY to Kurdish keyboard layout (Standard Central Kurdish - کوردی شێوازی نیگارگیری)
// Complete Windows/Linux Central Kurdish keyboard layout mapping
// Based on Unicode CLDR and Windows KBDKURD
// Reference: https://www.unicode.org/cldr/charts/40/keyboards/layouts/ckb.html
export const ENGLISH_TO_KURDISH_LAYOUT: Record<string, string> = {
  // ============ NUMBER ROW ============
  // Unshifted
  '`': '',
  '1': '١', // U+0661 Arabic-Indic digit 1
  '2': '٢', // U+0662 Arabic-Indic digit 2
  '3': '٣', // U+0663 Arabic-Indic digit 3
  '4': '٤', // U+0664 Arabic-Indic digit 4
  '5': '٥', // U+0665 Arabic-Indic digit 5
  '6': '٦', // U+0666 Arabic-Indic digit 6
  '7': '٧', // U+0667 Arabic-Indic digit 7
  '8': '٨', // U+0668 Arabic-Indic digit 8
  '9': '٩', // U+0669 Arabic-Indic digit 9
  '0': '٠', // U+0660 Arabic-Indic digit 0
  '-': '-',
  '=': '=',
  // Shifted
  '~': '~',
  '!': '!',
  '@': '@',
  '#': '#',
  '$': '$',
  '%': '٪', // U+066A Arabic percent sign
  '^': '^',
  '&': '&',
  '*': '*',
  '(': ')', // Note: Reversed
  ')': '(', // Note: Reversed
  '_': '_',
  '+': '+',

  // ============ TOP LETTER ROW (QWERTY) ============
  // Unshifted
  'q': 'ق', // U+0642 Qaf
  'w': 'و', // U+0648 Waw
  'e': 'ە', // U+06D5 Kurdish E
  'r': 'ر', // U+0631 Reh
  't': 'ت', // U+062A Teh
  'y': 'ی', // U+06CC Kurdish Yeh
  'u': 'ئ', // U+0626 Yeh with hamza above (HAMZA KEY!)
  'i': 'ی', // U+06CC Kurdish Yeh
  'o': 'ۆ', // U+06C6 Kurdish O (Waw with ring)
  'p': 'پ', // U+067E Peh
  '[': ']', // Bracket (reversed)
  ']': '[', // Bracket (reversed)
  '\\': '\\',
  // Shifted
  'Q': 'ٌ', // U+064C Arabic dammatan
  'W': 'ّ', // U+0651 Arabic shadda
  'E': 'ێ', // U+06CE Kurdish Yeh with inverted V above
  'R': 'ڕ', // U+0695 Kurdish Rr (Reh with small V below)
  'T': 'ث', // U+062B Theh (Arabic letter)
  'Y': 'ی', // U+06CC Kurdish Yeh (duplicate)
  'U': 'وو', // Double Waw
  'I': 'ى', // U+0649 Alif maksura
  'O': 'ۆ', // U+06C6 Kurdish O (duplicate)
  'P': 'پ', // U+067E Peh (duplicate)
  '{': '}', // Brace (reversed)
  '}': '{', // Brace (reversed)
  '|': '|',

  // ============ MIDDLE ROW (ASDF) ============
  // Unshifted
  'a': 'ا', // U+0627 Alif
  's': 'س', // U+0633 Seen
  'd': 'د', // U+062F Dal
  'f': 'ف', // U+0641 Feh
  'g': 'گ', // U+06AF Kurdish Gaf
  'h': 'ه', // U+0647 Heh
  'j': 'ژ', // U+0698 Kurdish Jeh (Reh with three dots above)
  'k': 'ک', // U+06A9 Kurdish Kaf
  'l': 'ل', // U+0644 Lam
  ';': '؛', // U+061B Arabic semicolon
  "'": 'ع', // U+0639 Ain
  // Shifted
  'A': 'ئ', // U+0626 Yeh with hamza above
  'S': 'ش', // U+0634 Sheen
  'D': 'ذ', // U+0630 Thal
  'F': 'ف', // U+0641 Feh (duplicate)
  'G': 'گ', // U+06AF Kurdish Gaf (duplicate)
  'H': 'ح', // U+062D Hah
  'J': 'ژ', // U+0698 Kurdish Jeh (duplicate)
  'K': 'ک', // U+06A9 Kurdish Kaf (duplicate)
  'L': 'ڵ', // U+06B5 Kurdish Ll (Lam with small V)
  ':': ':',
  '"': 'غ', // U+063A Ghain

  // ============ BOTTOM ROW (ZXCV) ============
  // Unshifted
  'z': 'ز', // U+0632 Zain
  'x': 'خ', // U+062E Khah
  'c': 'ج', // U+062C Jeem
  'v': 'ڤ', // U+06A4 Kurdish Veh
  'b': 'ب', // U+0628 Beh
  'n': 'ن', // U+0646 Noon
  'm': 'م', // U+0645 Meem
  ',': '،', // U+060C Arabic comma
  '.': '.',
  '/': '\\',
  // Shifted
  'Z': 'ض', // U+0636 Dad
  'X': 'غ', // U+063A Ghain
  'C': 'چ', // U+0686 Tcheh
  'V': 'ڤ', // U+06A4 Kurdish Veh (duplicate)
  'B': 'ب', // U+0628 Beh (duplicate)
  'N': 'ن', // U+0646 Noon (duplicate)
  'M': 'م', // U+0645 Meem (duplicate)
  '<': '>', // Angle bracket (reversed)
  '>': '<', // Angle bracket (reversed)
  '?': '؟', // U+061F Arabic question mark

  // ============ SPACE BAR ============
  ' ': ' ', // Space remains space
};

// Characters to reject (non-Kurdish scripts)
export const ARABIC_VARIANTS_TO_REJECT = /[كيىةؤأإآھ]/u;
export const NON_KURDISH_SCRIPTS = /[A-Za-z\u4E00-\u9FFF\u0590-\u05FF\u0750-\u077F]/u;

// Emoji regex - matches common emoji ranges
export const EMOJI_REGEX = /[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{FE00}-\u{FE0F}]|[\u{1F000}-\u{1F02F}]|[\u{1F0A0}-\u{1F0FF}]|[\u{1F100}-\u{1F64F}]|[\u{1F680}-\u{1F6FF}]|[\u{1F910}-\u{1F96B}]|[\u{1F980}-\u{1F9E0}]/gu;
