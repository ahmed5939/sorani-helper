# Test Coverage Summary

## Overview
Complete test suite for the **sorani-helper** TypeScript library using Bun's native test runner.

## Test Results
✅ **174 tests passing** across 10 test files  
⏱️ Average runtime: **~50ms**  
📊 **346 expect() calls** executed

## Test Files

### 1. `test/KurdishProcessor.test.ts` (3 tests)
Basic smoke tests for core functionality:
- Arabic to Kurdish conversion
- English keyboard layout conversion
- Latin script validation blocking

### 2. `test/constants.test.ts` (19 tests)
Tests for all constants and mappings:
- **KURDISH_SORANI_33_LETTERS**: Validates 33-letter alphabet
- **ARABIC_TO_KURDISH_MAP**: Tests all 9 character conversions (ك→ک, ي→ی, etc.)
- **ENGLISH_TO_KURDISH_LAYOUT**: Tests keyboard mapping (letters, digits, punctuation, reversed brackets)
- **Regex patterns**: ARABIC_VARIANTS_TO_REJECT, NON_KURDISH_SCRIPTS, EMOJI_REGEX

### 3. `test/KurdishProcessor.options.test.ts` (26 tests)
Comprehensive option testing:
- **allowDigits**: Filter/keep Western & Arabic-Indic digits
- **allowPunctuation**: Filter/keep Kurdish & Latin punctuation
- **allowSpaces**: Handle spaces, tabs, newlines
- **allowEmojis**: Filter/keep emoji characters
- **autoConvertArabic**: Convert Arabic variants to Kurdish standard
- **autoConvertEnglishLayout**: QWERTY → Kurdish keyboard mapping
- **blockOtherScripts**: Block/allow non-Kurdish scripts
- **strict**: Strict vs. permissive validation
- **updateOptions**: Dynamic option changes
- **Combined scenarios**: Multiple options working together

### 4. `test/KurdishProcessor.validation.test.ts` (18 tests)
Validation method testing:
- Pure Kurdish text validation
- Converted text validation
- Error detection (forbidden scripts, invalid characters, emojis)
- Edge cases (empty strings, whitespace, all 33 letters, Unicode normalization)
- Real-world Kurdish text:
  - City names: هەولێر (Erbil), سلێمانی (Sulaymaniyah), کەرکوک (Kirkuk), دهۆک (Duhok)
  - Common phrases: سڵاو، چۆنی؟ (Hello, how are you?)
  - Personal names: کەیوان, شیلان, دارا, ڕەنگین

### 5. `test/utils.test.ts` (24 tests)
Utility function testing:
- **createStrictKurdishValidator**: Strict validation preset
- **createKurdishKeyboardProcessor**: Keyboard conversion preset
- **createKurdishInputHandler**: Real-time input processing
  - Event handling
  - Cursor position maintenance
  - Callback invocation
  - Value processing
- **Integration scenarios**: Real-world usage patterns

## Coverage Areas

### ✅ Fully Tested
1. **Core Processing**
   - Arabic variant conversion (9 mappings)
   - English keyboard layout conversion (100+ key mappings)
   - Text filtering based on options
   - Option combinations

2. **Validation**
   - Character set validation
   - Script detection
   - Error reporting
   - Edge cases

3. **Utilities**
   - Convenience factory functions
   - Input event handlers
   - Cursor position management

4. **Constants**
   - 33-letter Kurdish alphabet
   - Character mappings
   - Regex patterns

### 📋 Test Categories
- **Unit tests**: Individual functions and methods
- **Integration tests**: Combined features working together
- **Real-world tests**: Actual Kurdish text (cities, phrases, names)
- **Edge case tests**: Empty strings, Unicode, special characters

## Running Tests

```bash
# Run all tests
bun test

# Run specific test file
bun test constants.test

# Run with coverage (if configured)
bun test --coverage
```

## Test Framework
- **Runner**: Bun native test suite (no Jest)
- **Syntax**: Compatible with Jest API (describe, test, expect)
- **TypeScript**: Direct TS execution, no transpilation needed
- **Speed**: ~50ms for 174 tests

## Key Features Tested

### Character Conversions
- ✅ Arabic Kaf (ك) → Kurdish Kaf (ک)
- ✅ Arabic Yeh (ي/ى) → Kurdish Yeh (ی)
- ✅ Heh Doachashmee (ھ) → Standard Heh (ه)
- ✅ Hamza variants → Base letters
- ✅ Taa Marbutah (ة) → Heh (ه)

### Keyboard Layout
- ✅ QWERTY → Kurdish letters
- ✅ Digits → Arabic-Indic numerals (1→١, 2→٢, etc.)
- ✅ Reversed brackets: ( → ), { → }, < → >
- ✅ Arabic punctuation: , → ،, ; → ؛, / → ؟
- ✅ Shifted keys: R→ڕ, T→ڵ, Y→ێ

### Options Behavior
- ✅ Selective character filtering
- ✅ Auto-conversion toggles
- ✅ Script blocking
- ✅ Strict vs. permissive modes
- ✅ Dynamic option updates

### Real-World Scenarios
- ✅ Form validation
- ✅ Live input fields
- ✅ Chat applications (with emoji support)
- ✅ Text processing pipelines

## Notes
- Emoji regex covers common ranges but not all Unicode emoji
- Tests use actual Kurdish text to verify real-world usage
- Both TypeScript source and compiled JavaScript are tested
- Tests are deterministic and run consistently across environments
