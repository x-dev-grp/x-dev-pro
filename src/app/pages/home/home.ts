import { Component, HostListener, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../../../i18n/i18n.service';
import { LANG_META, type Lang } from '../../../i18n/types';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomePage {
  private readonly i18n = inject(I18nService);

  protected readonly currentYear = new Date().getFullYear();
  protected readonly menuOpen = signal(false);
  protected readonly scrolled = signal(false);
  protected readonly langs: Lang[] = ['fr', 'en', 'ar'];
  protected readonly langMeta = LANG_META;
  protected readonly lang = this.i18n.lang;

  constructor() {
    this.i18n.setPage('studio');
  }

  protected t(key: string): string {
    return this.i18n.t(key);
  }

  protected footerCopy(): string {
    return this.i18n.t('footer.copy', { year: this.currentYear });
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
}
