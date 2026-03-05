// ==================== Central Kurdish Alphabet ====================
// Standard 33-letter Central Kurdish (Sorani) alphabet, approved by KRG
export const KURDISH_SORANI_33_LETTERS =
  "ئابپتجچحخدرڕزژسشعغفڤقکگلڵمنوۆهەیێ";

// ==================== Arabic → Kurdish Conversion Mappings ====================
// The order of replacements is important:
//   - Multi-character patterns (diacritics or ligatures) must be processed first.
//   - Then single-character substitutions are applied.
export const ARABIC_TO_KURDISH_REPLACEMENTS: Array<[RegExp, string]> = [
  // ---------- MULTI-CHARACTER COMBINATIONS (process first) ----------
  [/لآ/g, "ڵا"], // "La" + alif madda → Kurdish "ڵا" (lla)
  [/لاَ/g, "ڵا"], // "La" + alif with fatha → Kurdish "ڵا" (lla)
  [/لَ/g, "ڵ"], // Lam with fatha → Kurdish retroflex "ڵ"
  [/وَ/g, "ۆ"], // Waw with fatha → Kurdish "ۆ" (o)
  [/یَ/g, "ێ"], // Yeh with fatha → Kurdish "ێ" (ê)
  [/ىَ/g, "ێ"], // Alif maqṣūra with fatha → Kurdish "ێ"
  [/رِ/g, "ڕ"], // Ra with kasra → Kurdish "ڕ" (voiced retroflex r)

  // ---------- SINGLE CHARACTER MAPPINGS ----------
  // Arabic letters and their standardized Kurdish equivalents
  [/ك/g, "ک"], // Arabic Kaf → Kurdish Kaf
  [/ي/g, "ی"], // Arabic Yeh → Kurdish Yeh
  [/ى/g, "ی"], // Alif maqṣūra → Kurdish Yeh
  [/ة/g, "ه‌"], // Tā’ marbūṭa → Heh + ZWNJ (KRG standard form)
  [/أ/g, "ا"], // Alif with Hamza above → Alif
  [/إ/g, "ا"], // Alif with Hamza below → Alif
  [/آ/g, "ێ"], // Alif with madda → Kurdish Ê
  [/ؤ/g, "ۆ"], // Waw with Hamza → Kurdish O
  [/ھ/g, "ه"], // Heh Doachashmee → Standard Heh (U+0647)
  [/ذ/g, "ژ"], // Thal → Kurdish Zhe
  [/ث/g, "پ"], // Tha → Kurdish Pe (approximation)
  [/ط/g, "گ"], // Ta → Kurdish Gaf (approximation for Kurdish orthography)
  [/ض/g, "چ"], // Dad → Kurdish Che (approximation)
  [/ظ/g, "ڤ"], // Za → Kurdish Ve
  [/ء/g, "‌و"], // Hamza → ZWNJ + Waw
  [/'/g, "‌"], // ASCII apostrophe → Zero Width Non-Joiner (ZWNJ)

  // ---------- CHARACTERS THAT STAY UNCHANGED ----------
  [/ص/g, "ص"], // Arabic Ṣād remains identical in Kurdish
];

// ==================== Legacy Simple Mapping (Deprecated) ====================
// Maintained for backward compatibility.
// Use ARABIC_TO_KURDISH_REPLACEMENTS for accurate transformations.
export const ARABIC_TO_KURDISH_MAP: Record<string, string> = {
  ك: "ک",
  ي: "ی",
  ى: "ی",
  ة: "ه", // Simplified: uses plain Heh (without ZWNJ)
  أ: "ا",
  إ: "ا",
  آ: "ا", // Simplified to plain Alif (no Ê)
  ؤ: "و", // Simplified to Waw
  ھ: "ه",
};

// ==================== English → Kurdish Keyboard Layout ====================
// Complete Central Kurdish (Sorani) keyboard layout for Windows/Linux
// Based on the Unicode CLDR and official Windows KBDKURD layout
// Reference: https://www.unicode.org/cldr/charts/40/keyboards/layouts/ckb.html
export const ENGLISH_TO_KURDISH_LAYOUT: Record<string, string> = {
  // ---------- NUMBER ROW ----------
  // Unshifted - Arabic-Indic numerals
  "`": "",
  "1": "١",
  "2": "٢",
  "3": "٣",
  "4": "٤",
  "5": "٥",
  "6": "٦",
  "7": "٧",
  "8": "٨",
  "9": "٩",
  "0": "٠",
  "-": "-",
  "=": "=",
  // Shifted
  "~": "~",
  "!": "!",
  "@": "@",
  "#": "#",
  "$": "$",
  "%": "٪", // Arabic percent sign
  "^": "^",
  "&": "&",
  "*": "*",
  "(": ")", // Reversed order on keyboard
  ")": "(", // Reversed order on keyboard
  "_": "_",
  "+": "+",

  // ---------- TOP LETTER ROW ----------
  // Unshifted
  q: "ق",
  w: "و",
  e: "ە",
  r: "ر",
  t: "ت",
  y: "ی",
  u: "ئ", // Hamza key
  i: "ی", // Yeh
  o: "ۆ",
  p: "پ",
  "[": "]", // Reversed brackets
  "]": "[",
  "\\": "\\",
  // Shifted
  Q: "ٌ",
  W: "وو",
  E: "ێ",
  R: "ڕ",
  T: "ث",
  Y: "ی",
  U: "وو",
  I: "ع",
  O: "ۆ",
  P: "پ",
  "{": "}",
  "}": "{",
  "|": "|",

  // ---------- HOME ROW ----------
  // Unshifted
  a: "ا",
  s: "س",
  d: "د",
  f: "ف",
  g: "گ",
  h: "ه",
  j: "ژ",
  k: "ک",
  l: "ل",
  ";": "؛",
  "'": "ع",
  // Shifted
  A: "ئ",
  S: "ش",
  D: "ذ",
  F: "ف",
  G: "غ",
  H: "ه",
  J: "ژ",
  K: "ک",
  L: "ڵ",
  ":": ":",
  '"': '"',

  // ---------- BOTTOM ROW ----------
  // Unshifted
  z: "ز",
  x: "خ",
  c: "ج",
  v: "ڤ",
  b: "ب",
  n: "ن",
  m: "م",
  ",": "،",
  ".": ".",
  "/": "\\",
  // Shifted
  Z: "ض",
  X: "غ",
  C: "چ",
  V: "ڤ",
  B: "ب",
  N: "ن",
  M: "م",
  "<": ">",
  ">": "<",
  "?": "؟",

  // ---------- SPACEBAR ----------
  " ": " ", // Space remains unchanged
};

// ==================== Validation & Rejection Patterns ====================
// Reject Arabic variants that differ from KRG Kurdish orthography
export const ARABIC_VARIANTS_TO_REJECT = /[كيىةؤأإآھ]/u;

// Reject non-Kurdish scripts (Latin, Chinese, Hebrew, etc.)
export const NON_KURDISH_SCRIPTS =
  /[A-Za-z\u4E00-\u9FFF\u0590-\u05FF\u0750-\u077F]/u;

// ==================== Emoji Pattern ====================
// Matches most common emojis and variation selectors
export const EMOJI_REGEX =
  /[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{FE00}-\u{FE0F}]|[\u{1F000}-\u{1F02F}]|[\u{1F0A0}-\u{1F0FF}]|[\u{1F100}-\u{1F64F}]|[\u{1F680}-\u{1F6FF}]|[\u{1F910}-\u{1F96B}]|[\u{1F980}-\u{1F9E0}]/gu;