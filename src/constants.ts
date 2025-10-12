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
// Based on official Kurdish Standard keyboard layout
export const ENGLISH_TO_KURDISH_LAYOUT: Record<string, string> = {
  // Number row (unshifted) - Arabic-Indic numerals
  '`': '‍', // Zero-width joiner
  '1': '١', // U+0661
  '2': '٢', // U+0662
  '3': '٣', // U+0663
  '4': '٤', // U+0664
  '5': '٥', // U+0665
  '6': '٦', // U+0666
  '7': '٧', // U+0667
  '8': '٨', // U+0668
  '9': '٩', // U+0669
  '0': '٠', // U+0660
  '-': '-',
  '=': '=',
  
  // Number row (shifted)
  '~': '‌', // Zero-width non-joiner
  '!': '!',
  '@': '@',
  '#': '#',
  '$': '$',
  '%': '%',
  '^': '×',
  '&': '&',
  '*': '*',
  '(': ')',  // Parentheses reversed
  ')': '(',  // Parentheses reversed
  '_': 'ـ',  // Tatweel/Kashida
  '+': '+',
  
  // First letter row (unshifted) - from left to right on QWERTY
  'q': 'ق', // U+0642
  'w': 'و', // U+0648
  'e': 'ە', // U+06D5 Kurdish E
  'r': 'ر', // U+0631
  't': 'ت', // U+062A
  'y': 'ی', // U+06CC
  'u': 'ئ', // U+0626
  'i': 'ی', // U+06CC
  'o': 'ۆ', // U+06C6 Kurdish O (ۆ)
  'p': 'پ', // U+067E
  '[': 'چ', // U+0686
  ']': 'ج', // U+062C
  '\\': '\\',
  
  // First letter row (shifted)
  'Q': 'ق',
  'W': 'و',
  'E': 'ە',
  'R': 'ڕ', // U+0695 Kurdish Rr
  'T': 'ت', // U+062A
  'Y': 'ێ', // U+06CE Kurdish Yeh with small v
  'U': 'ء', // Hamza
  'I': 'ی',
  'O': '[',
  'P': ']',
  '{': 'چ',
  '}': 'ج',
  '|': '|',
  
  // Second letter row (unshifted) - from left to right on ASDF
  'a': 'ا', // U+0627
  's': 'س', // U+0633
  'd': 'د', // U+062F
  'f': 'ف', // U+0641
  'g': 'گ', // U+06AF Kurdish G
  'h': 'ه', // U+0647
  'j': 'ژ', // U+0698 Kurdish Jh/Zh
  'k': 'ک', // U+06A9 Kurdish K
  'l': 'ل', // U+0644
  ';': '؛', // U+061B Arabic semicolon
  "'": '"',
  
  // Second letter row (shifted)
  'A': 'آ', // Alif with Madda
  'S': 'ش', // U+0634 Sheen
  'D': 'د',
  'F': 'ف',
  'G': 'گ',
  'H': 'ح', // U+062D Haa
  'J': 'ژ', // U+0698 Kurdish Jh/Zh
  'K': 'ک',
  'L': 'ڵ', // U+06B5 Kurdish Ll
  ':': ':',
  '"': '"',
  
  // Third letter row (unshifted) - from left to right on ZXCV
  'z': 'ز', // U+0632
  'x': 'ر', // U+0631
  'c': 'ج', // U+062C
  'v': 'ح', // U+062D
  'b': 'ج', // U+062C
  'n': 'ب', // U+0628
  'm': 'ن', // U+0646
  ',': 'م', // U+0645
  '.': '،', // U+060C Arabic comma
  '/': '.',
  
  // Third letter row (shifted)
  'Z': 'ز',
  'X': 'ر',
  'C': 'ج',
  'V': 'ح',
  'B': 'ج',
  'N': 'ب',
  'M': 'ن',
  '<': '>',  // Angle brackets reversed
  '>': '<',  // Angle brackets reversed
  '?': '/',
};

// Characters to reject (non-Kurdish scripts)
export const ARABIC_VARIANTS_TO_REJECT = /[كيىةؤأإآھ]/u;
export const NON_KURDISH_SCRIPTS = /[A-Za-z\u4E00-\u9FFF\u0590-\u05FF\u0750-\u077F]/u;

// Emoji regex - matches common emoji ranges
export const EMOJI_REGEX = /[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{FE00}-\u{FE0F}]|[\u{1F000}-\u{1F02F}]|[\u{1F0A0}-\u{1F0FF}]|[\u{1F100}-\u{1F64F}]|[\u{1F680}-\u{1F6FF}]|[\u{1F910}-\u{1F96B}]|[\u{1F980}-\u{1F9E0}]/gu;
