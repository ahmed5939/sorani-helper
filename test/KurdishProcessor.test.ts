import { describe, test, expect } from 'bun:test';
import { KurdishProcessor } from '../src/KurdishProcessor';

describe('KurdishProcessor', () => {
  test('converts Arabic variants to Kurdish', () => {
    const p = new KurdishProcessor({ autoConvertArabic: true });
    expect(p.process('كەیوان')).toBe('کەیوان');
    expect(p.process('ھەولێر')).toBe('هەولێر');
  });

  test('converts English layout when enabled', () => {
    const p = new KurdishProcessor({ autoConvertEnglishLayout: true });
    expect(p.process('slaw')).toBe('سلاو');
  });

  test('validate rejects Latin when blocking', () => {
    const p = new KurdishProcessor({ blockOtherScripts: true, autoConvertArabic: false, autoConvertEnglishLayout: false, strict: true });
    const res = p.validate('hello');
    expect(res.isValid).toBe(false);
    expect(res.errors.length).toBeGreaterThan(0);
  });
});
