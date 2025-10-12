export interface KurdishProcessorOptions {
  allowDigits?: boolean;
  allowPunctuation?: boolean;
  allowSpaces?: boolean;
  allowEmojis?: boolean;
  autoConvertArabic?: boolean;
  autoConvertEnglishLayout?: boolean;
  blockOtherScripts?: boolean;
  strict?: boolean;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  converted?: string;
}
