import { Component, HostListener, signal } from '@angular/core';

type ModuleKey = 'reception' | 'production' | 'conditioning' | 'inventory' | 'finance' | 'hr' | 'control';

interface ProductModule {
  key: ModuleKey;
  number: string;
  label: string;
  title: string;
  summary: string;
  features: string[];
}

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly currentYear = new Date().getFullYear();
  protected readonly menuOpen = signal(false);
  protected readonly scrolled = signal(false);
  protected readonly selectedKey = signal<ModuleKey>('reception');

  protected readonly modules: ProductModule[] = [
    {
      key: 'reception',
      number: '01',
      label: 'Réception',
      title: 'Réception & fournisseurs',
      summary: 'Enregistrez chaque arrivée d’olives ou d’huile et créez une traçabilité fiable dès le quai.',
      features: ['Fournisseurs, transporteurs et types d’opération', 'Lots d’olives et réceptions d’huile liées', 'Pesée, variété, qualité et documents', 'Paiement en argent ou en huile']
    },
    {
      key: 'production',
      number: '02',
      label: 'Production',
      title: 'Production & huile',
      summary: 'Suivez la transformation, les volumes et tous les mouvements d’huile jusqu’à la vente.',
      features: ['Planification et suivi de production', 'Cuves, contenants et unités de stockage', 'Filtration, déchets et rendement', 'Qualité, traçabilité, ventes et transactions d’huile']
    },
    {
      key: 'conditioning',
      number: '03',
      label: 'Conditionnement',
      title: 'Conditionnement & expédition',
      summary: 'Transformez l’huile en produits finis contrôlés, étiquetés, stockés et prêts à livrer.',
      features: ['Projets et ordres de fabrication', 'Réservation et consommation des composants', 'Plans qualité, étiquettes et certifications', 'Expédition et synchronisation mobile']
    },
    {
      key: 'inventory',
      number: '04',
      label: 'Inventaire',
      title: 'Inventaire & approvisionnement',
      summary: 'Maîtrisez les composants, produits finis, emplacements et mouvements de stock.',
      features: ['Articles, produits finis et nomenclatures', 'Stocks, réservations et mouvements', 'Emplacements et lignes de conditionnement', 'Bons de commande, fournisseurs et audits']
    },
    {
      key: 'finance',
      number: '05',
      label: 'Finance',
      title: 'Finance & facturation',
      summary: 'Reliez automatiquement les opérations du moulin à leurs conséquences financières.',
      features: ['Transactions entrantes et sortantes', 'Factures, dépenses et comptes bancaires', 'Crédits d’huile et règlements fournisseurs', 'Documents de vente et suivi financier']
    },
    {
      key: 'hr',
      number: '06',
      label: 'Ressources humaines',
      title: 'Ressources humaines',
      summary: 'Gérez le cycle collaborateur, le temps de travail, la paie et la conformité.',
      features: ['Employés, postes, départements et contrats', 'Pointage, feuilles de temps et horaires', 'Congés, heures supplémentaires et avances', 'Paie, prêts, règles légales et conformité']
    },
    {
      key: 'control',
      number: '07',
      label: 'Pilotage',
      title: 'Pilotage, sécurité & administration',
      summary: 'Donnez à la direction une vision consolidée sans compromettre l’isolation des données.',
      features: ['Tableaux de bord et rapports opérationnels', 'Multi-tenant et profils de sociétés', 'Utilisateurs, rôles et permissions fines', 'Notifications, recherche, support et paramètres']
    }
  ];

  protected get selectedModule(): ProductModule {
    return this.modules.find((module) => module.key === this.selectedKey()) ?? this.modules[0];
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
