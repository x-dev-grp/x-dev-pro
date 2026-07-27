# x-dev.pro — studio facade

Public site for **[www.x-dev.pro](https://www.x-dev.pro)** (GitHub Pages).

Introduces **x-dev** as a small software team and showcases products. First product: **ZitFlow** at [zitflow.x-dev.pro](https://zitflow.x-dev.pro).

## Languages

French (default), English, Tunisian Arabic (RTL). Switcher in the header; preference stored in `localStorage` and `?lang=`.

## Stack

- Angular 21 standalone application
- Static prerendered production build
- GitHub Actions → GitHub Pages
- Custom domain: `www.x-dev.pro`

## Development

```sh
npm ci
npm start
```

Production build:

```sh
npm run build
```

## Deployment

Pushes to **`github-pages`** trigger the Pages workflow. Artifact path: `dist/x-dev-pro/browser`.

See [`PLAN.md`](./PLAN.md).

**Public site policy:** do not expose GitHub / repository links in the UI, meta, or structured data.
