# x-dev.pro — ZitFlow marketing facade

Public site for **[www.x-dev.pro](https://www.x-dev.pro)** (GitHub Pages).

The product app lives at **[zitflow.x-dev.pro](https://zitflow.x-dev.pro)** (Render) — not in this repo.

## Branch

Work and publish from **`github-pages`**. Full build plan: [`PLAN.md`](./PLAN.md).

## Status

Plan + placeholder only. **Build the real Astro/HTML facade online on this branch next.**

## Enable Pages (after first real build)

1. Repo **Settings → Pages**
2. Source: **Deploy from a branch** → `github-pages` / `/ (root)`  
   — or switch to **GitHub Actions** once Astro build workflow exists
3. Custom domain: `www.x-dev.pro` (matches [`CNAME`](./CNAME))
4. Enforce HTTPS after DNS propagates

### DNS sketch

- `www` → `CNAME` → `x-dev-grp.github.io`
- Leave `zitflow` on Render

## Local

```bash
git clone https://github.com/x-dev-grp/x-dev-pro.git
cd x-dev-pro
git checkout github-pages
```
