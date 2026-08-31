# TrustFirst Solutions

Canonical source repository for the **TrustFirst Solutions** company website.

## Current direction

TrustFirst Solutions is being repositioned from a marketing-led website into a premium software engineering company brand focused on:

- Custom business software
- Web applications
- ERP, POS and billing systems
- Business automation
- Mobile applications
- AI integrations
- Premium business websites

The live production code currently remains on `main`.

The new company rebuild is developed on:

```
rebuild/trustfirstsolutions-company
```

Do not merge the rebuild into `main` until the replacement website has been reviewed and verified.

## Architecture

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion
- Sanity CMS
- Vercel-compatible deployment

Existing CMS, SEO, content infrastructure, deployment tooling, error/loading states and production history should be preserved unless a rebuild task explicitly replaces them.

## Rebuild documentation

See:

- `docs/TRUSTFIRST_COMPANY_REBUILD.md`
- `docs/cms-setup.md`

The separate `portfolio` repository is no longer the development source of truth. Its premium monochrome design research remains a design reference for this rebuild.
