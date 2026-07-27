export type Lang = 'fr' | 'en' | 'ar';

export type Dict = Record<string, string>;

export const LANG_META: Record<
  Lang,
  { htmlLang: string; dir: 'ltr' | 'rtl'; label: string; short: string }
> = {
  fr: { htmlLang: 'fr', dir: 'ltr', label: 'Français', short: 'FR' },
  en: { htmlLang: 'en', dir: 'ltr', label: 'English', short: 'EN' },
  ar: { htmlLang: 'ar-TN', dir: 'rtl', label: 'العربية', short: 'ع' }
};
