import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ar } from './ar';
import { en } from './en';
import { fr } from './fr';
import { LANG_META, type Dict, type Lang } from './types';

const STORAGE_KEY = 'xdev.lang';
const DICTS: Record<Lang, Dict> = { fr, en, ar };

export type PageContext = 'studio' | 'zitflow';

@Injectable({ providedIn: 'root' })
export class I18nService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly browser = isPlatformBrowser(this.platformId);

  readonly lang = signal<Lang>('fr');
  readonly page = signal<PageContext>('studio');

  constructor() {
    this.lang.set(this.resolveInitialLang());
    this.applyDocument();
  }

  setPage(next: PageContext): void {
    this.page.set(next);
    this.applyDocument();
  }

  t(key: string, vars?: Record<string, string | number>): string {
    const dict = DICTS[this.lang()] ?? fr;
    let value = dict[key] ?? fr[key] ?? key;
    if (vars) {
      for (const [k, v] of Object.entries(vars)) {
        value = value.replaceAll(`{{${k}}}`, String(v));
      }
    }
    return value;
  }

  setLang(next: Lang): void {
    if (!LANG_META[next]) return;
    this.lang.set(next);
    if (this.browser) {
      localStorage.setItem(STORAGE_KEY, next);
      const url = new URL(window.location.href);
      url.searchParams.set('lang', next);
      window.history.replaceState({}, '', url.toString());
    }
    this.applyDocument();
  }

  private resolveInitialLang(): Lang {
    if (!this.browser) return 'fr';

    const fromQuery = new URLSearchParams(window.location.search).get('lang');
    if (fromQuery && fromQuery in LANG_META) {
      return fromQuery as Lang;
    }

    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && saved in LANG_META) {
      return saved as Lang;
    }

    const nav = navigator.languages?.length ? navigator.languages : [navigator.language];
    for (const raw of nav) {
      const lower = (raw || '').toLowerCase();
      if (lower.startsWith('fr')) return 'fr';
      if (lower.startsWith('en')) return 'en';
      if (lower.startsWith('ar')) return 'ar';
    }
    return 'fr';
  }

  private applyDocument(): void {
    if (!this.browser) return;
    const meta = LANG_META[this.lang()];
    const root = document.documentElement;
    root.lang = meta.htmlLang;
    root.dir = meta.dir;

    const titleKey = this.page() === 'zitflow' ? 'zf.meta.title' : 'meta.title';
    const descKey = this.page() === 'zitflow' ? 'zf.meta.description' : 'meta.description';
    document.title = this.t(titleKey);
    this.setMeta('description', this.t(descKey));
    this.setMeta('og:title', this.t(titleKey), 'property');
    this.setMeta('og:description', this.t(descKey), 'property');
    this.setMeta(
      'og:locale',
      meta.htmlLang === 'ar-TN' ? 'ar_TN' : meta.htmlLang === 'en' ? 'en_US' : 'fr_FR',
      'property'
    );
    this.setMeta('twitter:title', this.t(titleKey));
    this.setMeta('twitter:description', this.t(descKey));
  }

  private setMeta(name: string, content: string, attr: 'name' | 'property' = 'name'): void {
    let el = document.head.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attr, name);
      document.head.appendChild(el);
    }
    el.content = content;
  }
}
