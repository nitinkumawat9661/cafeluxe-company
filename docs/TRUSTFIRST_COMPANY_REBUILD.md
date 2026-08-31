# TrustFirst Solutions Company Rebuild

**Canonical repository:** `nitinkumawat9661/cafeluxe-company`  
**Rebuild branch:** `rebuild/trustfirstsolutions-company`  
**Production branch:** `main`  
**Public domain:** `trustfirstsolutions.in`

## 1. Product decision

The existing site is no longer treated as a digital-marketing-agency website.

TrustFirst Solutions will be positioned as a premium software engineering company that designs and builds serious software systems for real businesses.

Marketing may remain as a secondary launch/growth capability, but it must not define the company.

## 2. Primary positioning

TrustFirst Solutions builds:

1. Custom business software
2. Web applications
3. ERP, POS and billing systems
4. Business automation
5. Mobile applications
6. AI integrations
7. Premium business websites

The first impression must communicate engineering capability, reliability, delivered systems and long-term ownership, not cheap lead generation or generic agency services.

## 3. Website information architecture

Primary navigation:

- Home
- Services
- Products
- Work
- About
- Contact

Homepage order:

1. Premium positioning hero
2. Credibility / proof
3. Core software capabilities
4. Featured products and systems
5. Selected work / case studies
6. Engineering process
7. Why TrustFirst
8. Testimonials / client proof
9. Final contact CTA

## 4. Existing code to preserve

The mature company repository already contains production-grade infrastructure that should not be discarded unnecessarily:

- Next.js application structure
- Sanity CMS and Studio
- SEO infrastructure
- structured-data work
- blog/resources foundation
- contact flows
- loading/error/offline states
- deployment scripts
- brand assets and production history

The rebuild should refactor the presentation and positioning around this foundation rather than restarting from the small personal `portfolio` codebase.

## 5. Portfolio repository migration decision

`nitinkumawat9661/portfolio` was created as a personal portfolio experiment.

Useful concepts from it are adopted as design references:

- monochrome premium visual direction
- strong typography
- restrained grain/texture
- mobile-first layout
- accessible focus/reduced-motion handling
- high-end interactive hero concept
- capability-based pointer effects
- performance-first motion

Its personal identity, personal CMS architecture and personal portfolio route model are not copied blindly.

The company repository is now the single development source of truth.

## 6. Product proof to surface

The new site should eventually present real shipped systems such as:

- CafeLuxe POS / restaurant software
- QR ordering workflows
- staff/mobile applications
- TrustFirst POS
- Mangalam / TrustFirst business ERP work
- client portals
- custom business websites

Each serious project should become a case study showing problem, system scope, engineering decisions, screenshots and outcome.

## 7. Rebuild stages

### Stage A: Foundation
Freeze positioning, navigation, information architecture and design tokens.

### Stage B: Homepage
Replace marketing-agency-first messaging with software-company positioning and premium proof-led layout.

### Stage C: Work and products
Create strong case studies and product pages from real systems.

### Stage D: Services
Build detailed service pages for software, web apps, ERP/POS, automation, mobile and AI.

### Stage E: Trust
Company story, process, technical capability, testimonials, ownership/support and transparent project engagement.

### Stage F: SEO migration
Retain useful existing search equity while removing or de-emphasizing agency-first pages safely. Redirect URLs rather than deleting ranked pages blindly.

### Stage G: Verification
Run lint, typecheck, production build, responsive checks, accessibility review and deployment smoke tests before production migration.

## 8. Safety rules

- Do not overwrite or destroy the current production website while rebuilding.
- Work on the rebuild branch until explicitly approved for production.
- Preserve Sanity content and production integrations.
- Do not delete SEO routes without checking their traffic/search value and adding redirects where needed.
- Make changes in reviewable, atomic commits.
- Do not claim tests passed unless they were actually executed.
