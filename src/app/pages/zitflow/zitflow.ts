import { Component, HostListener, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../../../i18n/i18n.service';
import { LANG_META, type Lang } from '../../../i18n/types';

type ModuleKey =
  | 'reception'
  | 'production'
  | 'conditioning'
  | 'inventory'
  | 'finance'
  | 'hr'
  | 'control';

interface ProductModule {
  key: ModuleKey;
  number: string;
}

@Component({
  selector: 'app-zitflow',
  imports: [RouterLink],
  templateUrl: './zitflow.html',
  styleUrl: './zitflow.css'
})
export class ZitflowPage {
  private readonly i18n = inject(I18nService);

  protected readonly currentYear = new Date().getFullYear();
  protected readonly menuOpen = signal(false);
  protected readonly scrolled = signal(false);
  protected readonly selectedKey = signal<ModuleKey>('reception');
  protected readonly langs: Lang[] = ['fr', 'en', 'ar'];
  protected readonly langMeta = LANG_META;
  protected readonly lang = this.i18n.lang;

  protected readonly modules: ProductModule[] = [
    { key: 'reception', number: '01' },
    { key: 'production', number: '02' },
    { key: 'conditioning', number: '03' },
    { key: 'inventory', number: '04' },
    { key: 'finance', number: '05' },
    { key: 'hr', number: '06' },
    { key: 'control', number: '07' }
  ];

  protected readonly selectedModule = computed(() => {
    const key = this.selectedKey();
    return this.modules.find((module) => module.key === key) ?? this.modules[0];
  });

  constructor() {
    this.i18n.setPage('zitflow');
  }

  protected t(key: string): string {
    return this.i18n.t(key);
  }

  protected moduleLabel(key: ModuleKey): string {
    return this.i18n.t(`zf.mod.${key}.label`);
  }

  protected moduleTitle(key: ModuleKey): string {
    return this.i18n.t(`zf.mod.${key}.title`);
  }

  protected moduleSummary(key: ModuleKey): string {
    return this.i18n.t(`zf.mod.${key}.summary`);
  }

  protected moduleFeatures(key: ModuleKey): string[] {
    return [1, 2, 3, 4].map((n) => this.i18n.t(`zf.mod.${key}.f${n}`));
  }

  protected footerCopy(): string {
    return this.i18n.t('zf.footer.copy', { year: this.currentYear });
  }

  protected demoMailto(): string {
    const subjects: Record<Lang, string> = {
      fr: 'Demande de démonstration ZitFlow',
      en: 'ZitFlow demo request',
      ar: 'طلب عرض تجريبي لـ ZitFlow'
    };
    return `mailto:contact@x-dev.pro?subject=${encodeURIComponent(subjects[this.lang()])}`;
  }

  protected setLang(next: Lang): void {
    this.i18n.setLang(next);
    this.closeMenu();
  }

  @HostListener('window:scroll')
  protected onScroll(): void {
    this.scrolled.set(window.scrollY > 24);
  }

  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  protected closeMenu(): void {
    this.menuOpen.set(false);
  }

  protected selectModule(key: ModuleKey): void {
    this.selectedKey.set(key);
  }

  protected moveTab(event: KeyboardEvent, index: number): void {
    if (!['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault();
    const direction = ['ArrowDown', 'ArrowRight'].includes(event.key) ? 1 : -1;
    const targetIndex = (index + direction + this.modules.length) % this.modules.length;
    const target = document.getElementById(`tab-${this.modules[targetIndex].key}`) as HTMLButtonElement | null;
    target?.focus();
    this.selectModule(this.modules[targetIndex].key);
  }
}
