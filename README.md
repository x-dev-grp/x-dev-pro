# x-dev.pro — ZitFlow marketing facade

Public site for **[www.x-dev.pro](https://www.x-dev.pro)** (GitHub Pages).

The product app lives at **[zitflow.x-dev.pro](https://zitflow.x-dev.pro)** (Render) — not in this repo.

## Stack

- Angular 21 standalone application
- Static prerendered production build for crawlable page content
- GitHub Actions deployment to GitHub Pages
- Custom domain: `www.x-dev.pro`

## Development

```sh
npm ci
npm start
```

Production validation:

```sh
npm run build
```

## Deployment

Pushes to **`github-pages`** trigger [the Pages workflow](./.github/workflows/deploy-pages.yml). The workflow prerenders Angular, uploads `dist/x-dev-pro/browser`, and deploys it to GitHub Pages.

Full product and domain plan: [`PLAN.md`](./PLAN.md).
