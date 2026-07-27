import { Component, HostListener, inject, signal } from '@angular/core';
import { I18nService } from '../i18n/i18n.service';
import { LANG_META, type Lang } from '../i18n/types';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private readonly i18n = inject(I18nService);

  protected readonly currentYear = new Date().getFullYear();
  protected readonly menuOpen = signal(false);
  protected readonly scrolled = signal(false);
  protected readonly langs: Lang[] = ['fr', 'en', 'ar'];
  protected readonly langMeta = LANG_META;

  protected readonly lang = this.i18n.lang;

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
