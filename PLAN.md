# ZitFlow facade — GitHub Pages plan (`www.x-dev.pro`)

Build target for this repo/branch. Product app stays on Render at `https://zitflow.x-dev.pro`.

## Domain map

```
www.x-dev.pro     → GitHub Pages (this site)
x-dev.pro (apex)  → GitHub Pages (prefer 301 → www) — confirm /q QR first
zitflow.x-dev.pro → Render (Angular app — unchanged)
```

Optional later: `oosm.x-dev.pro` → 301 to `zitflow.x-dev.pro`.

## Repo & deploy

| Choice | Decision |
|--------|----------|
| Repo | `x-dev-grp/x-dev-pro` (this repo) |
| Branch | **`github-pages`** — dedicated source/deploy branch |
| Host | GitHub Pages + custom domain `www.x-dev.pro` |
| Stack | Prefer **Astro** (static). Plain HTML OK for ultra-MVP. |
| Deploy | GitHub Actions from `github-pages` → `actions/deploy-pages`, **or** publish this branch as Pages source once static files exist |
| CNAME | `www.x-dev.pro` (file in repo root) |

### DNS (OVH)

- **www** → `CNAME` → `x-dev-grp.github.io`
- **apex** → GitHub `A` records (`185.199.108.153` … `111.153`) or ALIAS → `x-dev-grp.github.io`
- Canonical URL: `https://www.x-dev.pro`
- Leave **zitflow** CNAME on Render

**Open before pointing apex at Pages:** backend may still use `https://x-dev.pro/q/v1` (QR). Do not break `/q/*` without a redirect/proxy plan.

## Scope (lean)

**MVP = one scrollable FR page** + thin footer. No blog, no docs portal.

| Route | Job |
|-------|-----|
| `/` | Sell ZitFlow → CTA to app / request access |
| `/mentions-legales` | Optional MVP+ |
| `/en` | Phase 2 |

## First viewport (brand-first)

- Full-bleed olive → cream atmosphere (`#3D4F2F`, `#F7F6F2`, gold `#D4A84B`)
- Font: **Quicksand** (product font — not Inter/Roboto)
- Hero brand: **ZitFlow** wordmark / full logo
- One line: *Système de gestion pour moulins d’huile d’olive*
- Support: *De la réception à la vente — une plateforme pour votre moulin*
- CTAs: **Ouvrir l’application** → `https://zitflow.x-dev.pro` · **Demander un accès** → mailto or form
- No cards, badges, or stat strips in the hero
- Motion: 2–3 intentional moves (logo fade-up, wash drift, CTA hover)

Footer whisper: *Un produit x-dev*.

## Sections after hero (one job each)

1. **Story** — one flow: olives → oil → stock → finance  
2. **Modules** — Réception · Production · Inventaire · Finance · RH (timeline/row, not card grid)  
3. **Trust** — multi-tenant, FR/EN/AR, PWA, mill context  
4. **Final CTA** — open app / request access  
5. **Footer** — x-dev, legal, app link  

## Brand assets

Copy from FE / PWA kit when building:

- `osm-ms-fe`: `src/assets/pwa/branding/*`
- or `oosm`: `ZitFlow_PWA_Complete_Kit/public/assets/pwa/branding/*`

Colors: `#3D4F2F` · `#8A9A6A` · `#D4A84B` · `#F7F6F2`

## SEO (facade ≠ app)

| | Facade (`www`) | App (`zitflow`) |
|--|----------------|-----------------|
| Role | Marketing / discoverability | Login / product |
| Index | Full | Home + login; dashboards disallowed |
| Canonical | `https://www.x-dev.pro/` | `https://zitflow.x-dev.pro/` |
| Schema | Organization (x-dev) + SoftwareApplication → app URL | Existing app JSON-LD |
| OG | Marketing crop | App `og-image.png` |

Ship facade `robots.txt` + `sitemap.xml` here. Do not duplicate app routes.

## Content outline (FR)

**Hero** — ZitFlow · Système de Gestion de l’Huile d’Olive · De la réception à la vente…  
**Story** — Une seule plateforme du quai à la facture.  
**Modules** — Réception · Production & cuves · Inventaire · Finance · RH  
**Trust** — Multi-sociétés · FR / EN / AR · PWA · Terrain du moulin  
**CTA** — Prêt à digitaliser votre moulin ?

## Phased delivery

### MVP (build online on this branch)

1. Scaffold Astro (or static HTML) on `github-pages`
2. Single-page FR facade + brand assets
3. Enable Pages + DNS `www` → GitHub + HTTPS
4. CTAs → zitflow + mailto
5. Meta / OG / sitemap / robots

### Polish

- Apex → www (after QR decision)
- EN locale
- Contact form (Formspree-style — not Angular)
- Cross-link schema www ↔ zitflow
- Redirect `oosm.x-dev.pro` → zitflow

## Open questions (answer while building)

1. www = **ZitFlow-only** facade, or company portfolio with ZitFlow as hero?
2. Apex: Pages-only, or must preserve `x-dev.pro/q/v1`?
3. Contact: mailto MVP vs form?
4. EN now or later?
5. Keep `oosm.x-dev.pro` or redirect?

## Defaults if unanswered

- ZitFlow-only one-pager  
- mailto for access requests  
- EN later  
- Canonical www; delay apex until `/q` is clarified  
