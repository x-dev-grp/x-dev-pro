# x-dev.pro — Studio + products plan

Marketing facade for **www.x-dev.pro**. Product app stays on Render at **https://zitflow.x-dev.pro**.

## Domain map

```
www.x-dev.pro      → GitHub Pages (this site — x-dev studio)
zitflow.x-dev.pro  → Render (ZitFlow application)
```

## Positioning

- **Who:** x-dev — small development team  
- **What:** business platforms  
- **Product #1:** ZitFlow (olive oil mill management)  
- **Languages:** FR (default), EN, Tunisian Arabic (RTL)  
- **No public GitHub links** on the site  

## Repo & deploy

| Choice | Decision |
|--------|----------|
| Repo | `x-dev-grp/x-dev-pro` |
| Branch | `github-pages` |
| Host | GitHub Pages + `www.x-dev.pro` |
| Stack | Angular 21, static prerender |
| Deploy | Actions → `actions/deploy-pages` |

## Page structure

1. `/` — Header x-dev + lang switcher · Hero · About · Products · Approach · Contact · Footer  
2. `/zitflow` — Dedicated ZitFlow product page (workflow, modules, capabilities, teams)  

Product deep-dive lives on `/zitflow`. Home keeps a short ZitFlow card with link to that page and the live app.  

## DNS (OVH)

- **www** → CNAME → `x-dev-grp.github.io`  
- Leave **zitflow** on Render  

Confirm apex / QR (`/q`) before pointing apex at Pages.
