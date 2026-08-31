# Original Personal Portfolio Plan

> Archived design/engineering reference migrated from `nitinkumawat9661/portfolio` on 2026-08-31.
> It is **not** the canonical TrustFirst company plan. Use `../TRUSTFIRST_COMPANY_REBUILD.md` for company decisions.

# Portfolio Website — Complete Build Plan

**Project:** Personal portfolio, mobile-first, monochrome, cursor-reveal hero
**Repo location:** `N:\Projects\portfolio`
**Plan date:** 2026-08-31
**Status:** **REVISED 2026-08-31 — serverless architecture.** Step 1 (setup + design system) in progress.

> ### ⚠ ARCHITECTURE REVISION — 2026-08-31
>
> The original plan self-hosted everything on Nitin's 8 GB VPS via Coolify. **That is cancelled.**
> The VPS runs **CafeLuxe** and client sites; a Next.js build or a traffic spike competing for RAM
> on that box is an unacceptable risk to live production tenants.
>
> **New target: zero-load serverless.** Nothing touches the VPS.
>
> | Layer | Was | **Now** |
> | --- | --- | --- |
> | Hosting / build | Coolify + Docker on VPS | **Vercel** (builds run on Vercel's machines) |
> | Database | self-hosted Postgres 16 | **Neon** serverless Postgres (or Supabase) + Prisma |
> | Media | local `/data/uploads` volume + `sharp` | **Cloudinary** (or Supabase Storage) |
> | Analytics | self-hosted Umami | **Vercel Analytics** |
> | Reverse proxy / SSL | Caddy + Let's Encrypt | handled by Vercel |
>
> **Superseded sections:** §9 (media pipeline), §13 (deployment), §16 (cost), and the deploy rows
> in §0. Each is annotated inline. **Unaffected:** §2 design system, §4 hero, §5 sections,
> §6 schema (Prisma models are portable), §7 API, §8 auth, §11 targets, §12 roadmap.
>
> One consequence worth knowing: serverless functions need **connection pooling**. Prisma must use
> Neon's pooled connection string (`-pooler` host) or Prisma Accelerate — a direct connection will
> exhaust Postgres connection slots under concurrent lambda invocations. Details in §13.

---

## 0. Decisions at a glance

Ye table poore plan ka summary hai. Jo bhi "MY CALL" marked hai wo maine aapke "jo tu best recommend kare" ke basis pe decide kiya hai — override kar sakte ho.

| Area | Decision | Source |
| --- | --- | --- |
| Framework | Next.js 15 (App Router) + React 19 + TypeScript strict | MY CALL |
| Styling | Tailwind CSS v4 (CSS-first config) | MY CALL |
| Animation | Motion (Framer Motion v11+) + native CSS + one small canvas | MY CALL |
| Smooth scroll | Lenis | MY CALL |
| Database | **Neon serverless Postgres** + Prisma 6 (pooled connection) | REVISED — was self-hosted Postgres |
| ORM | Prisma 6 | MY CALL |
| Auth | Auth.js v5 (credentials, single admin, Argon2id) | MY CALL |
| Admin scope | **Full site CMS** — projects, skills, experience, messages, media, settings | MY CALL (blog Phase 9 me optional) |
| Media storage | **Cloudinary** (transform-on-URL, global CDN) | REVISED — was local VPS volume |
| Deploy | **Vercel** — no Docker, no Coolify, VPS untouched | REVISED |
| Analytics | **Vercel Analytics** (cookieless) | REVISED — was self-hosted Umami |
| Transactional email | Resend (free 3k/month) for contact-form notifications | MY CALL |
| Hero mechanic | Spotlight **inversion** reveal — cursor punches a hole into an inverted world | You chose spotlight |
| Aesthetic | Pure monochrome (zero hue, greyscale only) | You chose |
| Layout approach | Mobile-first, progressive enhancement to desktop | You specified |

**Why the VPS is off the table:** it hosts CafeLuxe plus client work. Next.js builds are memory-hungry
(a `next build` can transiently take 1–2 GB), and an OOM event there would take down paying projects to
serve a portfolio. Serverless removes that coupling completely — build load sits on Vercel, DB load on
Neon, image load on Cloudinary. The VPS never learns this site exists.

---

## 1. Why this stack (aur kya reject kiya)

Aapki do requirements aapas me tension me hain: *"ekdum advanced feel"* (heavy animation) aur *"load fast bhi ho"* (light bundle). Isko solve karne ka tareeka hai — **HTML pehle bhejo, animation baad me hydrate karo**, aur animation ke liye GPU-friendly properties hi use karo. Stack isi soch se chuna hai.

### 1.1 Next.js 15 — kyun

React Server Components ka matlab hai ki aapke projects ka data server pe fetch hoke plain HTML me aata hai — client ko na loading spinner dikhta hai, na data-fetching JS download karna padta hai. Portfolio ke liye ye perfect hai: content mostly static hai, sirf hero interactive hai.

Concretely jo milta hai: streaming SSR, per-route code splitting, `next/image` (automatic AVIF + responsive srcset + blur placeholder), `next/font` (self-hosted fonts, zero layout shift), Metadata API (SEO + OG images), Server Actions (admin CRUD without writing REST boilerplate), aur `output: 'standalone'` jo ek chhoti self-contained Docker image banata hai — VPS deploy ke liye ideal.

**Rejected:** *Astro* — bundle chhota hota lekin admin CMS + auth + Server Actions ke liye phir bhi ek framework chahiye hota, do systems maintain karne padte. *Vite SPA* — SEO aur OG previews weak, aur portfolio ka poora point hai ki log usse dhoondhein. *Nuxt/SvelteKit* — theek hain, lekin React ecosystem me animation libraries (Motion) aur admin components (shadcn/ui) sabse mature hain.

### 1.2 Tailwind CSS v4 — kyun

v4 ka config CSS me hi rehta hai (`@theme`), JS config file nahi. Iska matlab hamare design tokens ek hi jagah honge aur wahi tokens hero ke CSS custom properties bhi drive karenge — jo hero mechanic ke liye zaroori hai (Section 4 me dikhega). Build Rust-based hai, incremental rebuild ~5ms.

Monochrome palette ke liye Tailwind extra achha hai: hum default color palette poori tarah **delete** kar denge (`--color-*: initial`) taaki galti se koi blue-500 use na ho jaaye. Design constraint ko code me enforce kar denge.

### 1.3 Motion (Framer Motion) — kyun, aur kaise limit karenge

Motion ka `useSpring` + `useMotionValue` hamesha React re-render ke **bahar** chalte hain — value change hone pe component dobara render nahi hota, sirf DOM property update hoti hi. Cursor-following hero ke liye ye non-negotiable hai; `useState` se cursor track karne se 60 re-renders/second honge aur phone garam ho jaayega.

Bundle discipline: hum poori library import nahi karenge. `motion/react` se sirf jo chahiye wo import karenge, aur jahan CSS `@keyframes` se kaam ban jaaye (marquee, blink, grain drift) wahan JS bilkul nahi use karenge. Target: Motion ka contribution ~18 KB gzip.

### 1.4 PostgreSQL (Neon) + Prisma 6 — kyun

> Revised 2026-08-31 — Postgres ka choice same hai, **host** badla: self-hosted Docker → **Neon serverless**.

Postgres chuna kyunki: `String[]` native arrays (project stack tags ke liye), `jsonb` (site settings + socials), full-text search (future blog ke liye), aur `pg_dump` se backup trivial hai.

Neon isliye ki wo Postgres se *compatible* nahi hai — wo **asli Postgres hai**, sirf storage aur compute alag kar diye gaye hain. Iska matlab: schema, extensions, `pg_dump`, Prisma — sab same. Free tier pe compute inactivity ke baad autosuspend ho jaata hai (₹0 idle cost), aur database branching milti hai — ek preview deployment ko apni DB copy de sakte ho bina production data chhue.

Prisma isliye ki schema single file me declarative rehta hai, migrations version-controlled aur reversible hain, aur generated types end-to-end type-safety dete hain — admin form se DB tak ek hi type.

**Serverless pe do gotchas jo yaad rakhne hain:**

```ts
// src/lib/db.ts — dev me hot-reload har baar naya client banata hai
// aur connection slots kha jaata hai. Singleton mandatory hai.
import { PrismaClient } from "@prisma/client";
const g = globalThis as unknown as { prisma?: PrismaClient };
export const db = g.prisma ?? new PrismaClient();
if (process.env.NODE_ENV !== "production") g.prisma = db;
```

Doosra: `DATABASE_URL` **pooled** host pe hona chahiye aur `directUrl` migrations ke liye alag — detail §13 me.

**SQLite kyun nahi:** serverless pe filesystem ephemeral hai, to SQLite ka single file survive hi nahi karega. Ye ab choice nahi, constraint hai.

### 1.5 Vercel — kyun

> Revised 2026-08-31. Purana Coolify rationale §13.5 me archived hai.

Vercel Next.js ka apna platform hai, to jo cheezein kahin aur configure karni padti hain wo yahan default hain: ISR aur streaming SSR bina setup, per-route edge caching, image optimization, `main` push pe production deploy, har branch pe apna preview URL, instant rollback, automatic SSL.

Lekin asli kaaran technical elegance nahi hai — **build kahin aur chalta hai.** `next build` transient 1–2 GB RAM leta hai. Vercel ki build machines pe wo spike CafeLuxe aur client sites ke paas se guzarta bhi nahi. Ye poora architecture isi ek line ke liye chuna gaya hai.

**Hobby tier ka ek honest caveat:** commercial use allow nahi hai. Portfolio personal hai to theek hai; agar isse paid client work aane lage to Pro (~$20/mo) chahiye — phir bhi VPS risk se sasta.

---

## 2. Design system — pure monochrome

Monochrome ka sabse bada risk hai **flat lagna**. Color se hierarchy nahi bana sakte, to hierarchy chaar aur cheezon se aayegi: **contrast** (kitna bright), **scale** (kitna bada), **weight** (kitna mota), aur **texture** (grain/blur). Ye discipline poore plan me consistent rahegi.

### 2.1 Greyscale ramp

Dark-first. Ye exact values hain, guess nahi karna:

```css
@theme {
  --color-*: initial;              /* Tailwind ki default palette delete */

  --color-ink-000: #000000;        /* true black — inverted layer ka text */
  --color-ink-950: #050505;        /* page background (pure black nahi — thoda soft) */
  --color-ink-900: #0B0B0B;        /* raised surface / card bg */
  --color-ink-850: #111111;        /* hover surface */
  --color-ink-800: #1A1A1A;        /* border subtle */
  --color-ink-700: #262626;        /* border default */
  --color-ink-600: #3D3D3D;        /* disabled text, non-hovered work-row titles */
  --color-ink-500: #5C5C5C;        /* tertiary text */
  --color-ink-400: #808080;        /* meta / captions — AA on ink-950 */
  --color-ink-300: #A3A3A3;        /* secondary text */
  --color-ink-200: #C9C9C9;        /* body text */
  --color-ink-100: #E8E8E8;        /* headings */
  --color-ink-050: #F5F5F5;        /* inverted layer background */
  --color-ink-white: #FFFFFF;      /* max emphasis, revealed hero text */
}
```

Contrast check (ink-950 background ke against). Ye values maine WCAG 2.x relative-luminance formula se **compute** ki hain, andaaze se nahi:

| Token | Hex | Ratio vs #050505 | Normal text (4.5) | Large text (3.0) | Use for |
| --- | --- | --- | --- | --- | --- |
| ink-white | `#FFFFFF` | **20.38:1** | AAA | AAA | hero reveal, max emphasis |
| ink-100 | `#E8E8E8` | **16.63:1** | AAA | AAA | headings, hero base `<h1>` |
| ink-200 | `#C9C9C9` | **12.31:1** | AAA | AAA | body copy |
| ink-300 | `#A3A3A3` | **8.08:1** | AAA | AAA | secondary text |
| ink-400 | `#808080` | **5.16:1** | AA | AAA | meta, captions — any size |
| ink-500 | `#5C5C5C` | **3.05:1** | ❌ fail | AA (barely) | large decorative type ≥24px only |
| ink-600 | `#3D3D3D` | **1.88:1** | ❌ fail | ❌ fail | decorative only, never text |

**Rules jo isse nikalte hain:**
`ink-400` normal-size text ke liye bhi AA pass karta hai — to meta/captions pe koi size restriction nahi.
`ink-500` sirf 24px+ (ya 18.66px bold) pe use ho sakta hai, aur wo bhi non-essential text pe.
`ink-600` kabhi text nahi — sirf borders, empty skill-bar segments, aur non-hovered work-row titles pe (jahan hover se `ink-white` ho jaata hai, aur asli info title ke saath meta row me AA contrast pe available hoti hai).
Hero ka base layer **`ink-100` pe hai (16.63:1)** — matlab wo poori tarah readable hai aur wahi asli `<h1>` hai. Drama brightness se nahi, **inversion** se aata hai (Section 4).


### 2.2 Typography

**Fonts (dono free, self-hosted via `next/font`, zero network request, zero layout shift):**

- **Geist Sans** — display + body. Vercel ka font hai, monochrome technical aesthetic ke liye banaya gaya lagta hai. Tight apertures, excellent large sizes pe.
- **Geist Mono** — labels, meta, numbers, section counters, nav. Monochrome me mono-font hi "accent" ka kaam karta hai — jab color nahi hai to *typeface change* hi emphasis banata hai. Ye trick poore site me use hogi.

npm: `geist` package. Latin subset only, `display: 'swap'`, `preload: true` sirf hero-critical weights ke liye (Sans 400 + 700, Mono 400).

**Fluid type scale** (clamp — mobile se desktop bilkul smooth, koi breakpoint jump nahi):

```css
@theme {
  --text-hero:   clamp(3.25rem, 13.5vw, 11.5rem);  /* 52px → 184px */
  --text-d1:     clamp(2.5rem, 7vw, 5.5rem);        /* section headlines */
  --text-d2:     clamp(2rem, 5vw, 3.5rem);
  --text-h3:     clamp(1.375rem, 2.5vw, 1.75rem);
  --text-lead:   clamp(1.0625rem, 1.6vw, 1.375rem); /* intro paragraphs */
  --text-body:   1rem;         /* 16px — mobile pe kabhi kam nahi */
  --text-sm:     0.9375rem;
  --text-meta:   0.8125rem;    /* Geist Mono, uppercase, tracking 0.09em */
}
```

**Tracking & leading rules** — bade type pe tight, chhote pe loose. Ye ek detail hai jo amateur aur professional typography me farq banati hai:

| Size | letter-spacing | line-height |
| --- | --- | --- |
| hero | -0.045em | 0.86 |
| d1 | -0.035em | 0.94 |
| d2 | -0.025em | 1.02 |
| h3 | -0.015em | 1.2 |
| lead | -0.01em | 1.55 |
| body | 0 | 1.65 |
| meta (mono) | +0.09em | 1.4 |

**Optical alignment:** hero aur d1 pe `text-wrap: balance` (headings) aur lead paragraphs pe `text-wrap: pretty`. Hero letters ke left edge pe `margin-left: -0.055em` — bade uppercase type pe visual left-align sahi karne ke liye. Ye chhoti cheez bahut farq karti hai.

**One deliberate exception:** contact section ka ek word italic serif me (Instrument Serif, free) — poore monochrome site me sirf ek jagah. Ye "planned inconsistency" design ko intentional feel deti hai. Optional, aap na chaho to hata denge.

### 2.3 Spacing, grid, breakpoints

4px base unit. Section rhythm:

```
--space-section-y-mobile:  5rem   (80px)
--space-section-y-tablet:  7.5rem (120px)
--space-section-y-desktop: 10rem  (160px)
--space-gutter-mobile:  1.25rem (20px)
--space-gutter-desktop: 2.5rem  (40px)
--container-max: 90rem  (1440px)
--measure: 68ch          /* paragraph max width — readability */
```

Breakpoints (mobile-first, Tailwind defaults se thoda tuned):

| Name | min-width | Target | Layout change |
| --- | --- | --- | --- |
| *(base)* | 0 | Phones 360–430px | 4-col grid, single column stack |
| `sm` | 480px | Large phones | type scale up |
| `md` | 768px | Tablets | 8-col grid, 2-up project cards |
| `lg` | 1024px | Small laptops | 12-col grid, **cursor features ON** |
| `xl` | 1280px | Desktops | full editorial layout |
| `2xl` | 1536px | Large displays | container capped, gutters grow |

**Critical:** desktop cursor features breakpoint se gate nahi hongi — `@media (hover: hover) and (pointer: fine)` se hongi. Kyun? Kyunki 1024px wide touch tablet pe cursor effect ka koi matlab nahi, aur 900px wide window wale laptop pe hona chahiye. Capability detect karo, screen size nahi. Ye common mistake hai.

### 2.4 Borders, radius, elevation

Monochrome me shadow kaam nahi karta (black pe black shadow invisible hai). Iski jagah **hairline borders** aur **background lift** use karenge:

```css
--radius-sharp: 2px;    /* cards, inputs — technical feel */
--radius-pill:  999px;  /* tags, buttons */
--border-hair:  1px solid #1A1A1A;   /* ink-800 */
--border-soft:  1px solid #262626;   /* ink-700 — hover state */
```

Elevation = background step, shadow nahi: `ink-950` (page) → `ink-900` (card) → `ink-850` (card hover). Focus ring: `2px solid #FFFFFF` with `2px` offset — monochrome me white ring hi sabse clear hai.

### 2.5 Texture — grain overlay

Ye monochrome ko "flat" hone se bachaane ka main hathiyaar hai. Ek fixed full-viewport SVG noise layer, `pointer-events: none`, `opacity: 0.035`, `mix-blend-mode: overlay`, `z-index: 9999`.

```html
<svg><filter id="grain">
  <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch"/>
  <feColorMatrix type="saturate" values="0"/>   <!-- force greyscale -->
</filter></svg>
```

Inline SVG data-URI as CSS background — network request zero. Animation: 8-step `steps()` keyframe jo background-position ko shuffle karta hai, 0.6s loop — subtle film-grain shimmer. `prefers-reduced-motion` pe animation off, grain static rehta hai.

**Perf note:** `mix-blend-mode` poori page ko ek compositing layer me daal deta hai. Isse hero ke mask/clip-path pe asar pad sakta hai. Isliye grain layer ko hero ke **peeche** rakhenge (`z-index: 1`) aur hero ko uske upar — ya agar profiling me jank dikhe to grain sirf non-hero sections pe apply karenge. Ye Phase 1 me measure karenge, guess nahi.

### 2.6 Motion tokens

```css
--ease-out-expo:  cubic-bezier(0.16, 1, 0.30, 1);   /* default — snappy, premium */
--ease-in-out-quart: cubic-bezier(0.76, 0, 0.24, 1); /* page transitions, menu */
--ease-out-soft:  cubic-bezier(0.33, 1, 0.68, 1);   /* small UI */

--dur-instant: 120ms;   /* hover, focus */
--dur-quick:   240ms;   /* buttons, tags */
--dur-base:    420ms;   /* card reveals, fades */
--dur-slow:    720ms;   /* section entrances */
--dur-cinema: 1200ms;   /* hero entrance, page transitions */
```

Cursor spring (Motion `useSpring`): `{ stiffness: 150, damping: 20, mass: 0.45 }` — thoda lag jo "weight" feel deta hai, lekin sluggish nahi. Radius spring alag aur softer: `{ stiffness: 90, damping: 18 }` taaki spotlight khulne me thoda drama ho.

**Animation rules (non-negotiable):** sirf `transform`, `opacity`, `clip-path`, `filter` animate karenge. `width`, `height`, `top`, `left`, `margin` kabhi nahi (layout reflow). Entrance animations `IntersectionObserver` pe, `threshold: 0.15`, `once: true` — scroll pe repeat nahi (irritating hota hai).

### 2.7 Custom cursor

Monochrome ka ek beautiful cheat code: `mix-blend-mode: difference`. Ek white dot jo automatically invert ho jaata hai — white background pe black dikhega, black pe white. Zero conditional logic, hamesha visible.

Do elements: ek 6px solid dot (fast spring, `stiffness: 700`) aur ek 32px ring (slow spring, `stiffness: 150`) — trailing effect. States: default, `hover-link` (ring 56px + dot fade), `hover-project` (ring 80px + centre me "VIEW" mono text), `hover-drag` (ring 64px + ↔ arrows). Native cursor sirf tab hide hoga jab custom cursor active ho, aur text inputs pe native `text` cursor wapas aayega (accessibility).

Gated behind `(hover: hover) and (pointer: fine)` aur `prefers-reduced-motion: no-preference`.

---

## 3. Information architecture & routes

### 3.1 Public routes

| Route | Rendering | Purpose | Revalidation |
| --- | --- | --- | --- |
| `/` | RSC + static shell | Hero, work grid, about, skills, contact | `revalidateTag('projects')` |
| `/work` | RSC | Full project index, filter by tag/year | tag-based |
| `/work/[slug]` | RSC, `generateStaticParams` | Case study | tag-based |
| `/about` | RSC | Long bio, timeline, tools, résumé link | tag-based |
| `/contact` | RSC + client form | Form + direct email + socials | static |
| `/api/contact` | Route handler (POST) | Public form submit, rate-limited | — |
| `/api/health` | Route handler | uptime monitor probe | — |
| `/sitemap.xml` | `sitemap.ts` | Auto-generated from DB | daily |
| `/robots.txt` | `robots.ts` | Crawl rules | static |
| `/og/[...slug]` | `next/og` edge | Dynamic monochrome OG images | immutable cache |
| `/rss.xml` | Route handler | Phase 9 (blog) | — |

Note: single-page scroll (`/`) *plus* dedicated pages dono hain. `/` pe har section ka apna anchor hai aur nav smooth-scroll karta hai; lekin `/work/[slug]` real routes hain kyunki case studies ko individually share aur index hona chahiye. Ye SEO ke liye zaroori hai — ek single-page site sirf ek URL rank karti hai.

### 3.2 Admin routes (auth-protected via middleware)

| Route | Purpose |
| --- | --- |
| `/admin/login` | Credentials login (only unprotected admin route) |
| `/admin` | Dashboard — views, unread messages, quick stats |
| `/admin/projects` | Table: reorder (drag), search, filter, bulk publish |
| `/admin/projects/new`, `/admin/projects/[id]` | Editor form |
| `/admin/skills` | CRUD + drag reorder + category grouping |
| `/admin/experience` | CRUD timeline entries |
| `/admin/messages` | Inbox — read/unread, star, reply-via-mailto, delete |
| `/admin/media` | Upload, grid preview, alt-text edit, delete (with usage warning) |
| `/admin/settings` | Hero copy, bio, résumé PDF, socials, SEO defaults, availability |

`middleware.ts` `/admin/:path*` ko match karega (login ko chhodkar) aur session cookie na hone pe `/admin/login?from=…` pe redirect karega. Admin routes pe `robots: { index: false }` aur `X-Robots-Tag: noindex`.

---

## 4. HERO SECTION — deep dive

Ye poore project ka centrepiece hai. Aapne kaha: **laptop pe mouse cursor se reveal, mobile pe animated.** Main isko monochrome ke liye sabse dramatic form me le ja raha hoon.

### 4.1 The concept: inversion, not illumination

Normal spotlight effect me cursor ek *torch* hota hai jo andhere me roshni daalta hai. Wo colored sites pe achha lagta hai, lekin monochrome me thoda ghisa-pita hai.

Hum jo karenge: **cursor ek chhed (hole) hai jo ek ulti duniya me kholta hai.** Page black hai, white text ke saath. Cursor ke andar — white page, black text. Aur dono layers ke **shabd alag hain**, to reveal se message badal jaata hai.

```
┌──────────────────────────────────────────────┐
│                                              │   BASE WORLD
│   I  D E S I G N                             │   bg: ink-950 (#050505)
│   C A L M                                    │   text: ink-100 (#E8E8E8)
│   I N T E R F A C E S                        │
│                                              │
└──────────────────────────────────────────────┘

              cursor aata hai ↓

┌──────────────────────────────────────────────┐
│                  ╭──────────╮                │   LENS = inverted world
│   I  D E S I ╭───┤ ███████  ├───╮            │   bg: ink-050 (#F5F5F5)
│   C A L M    │   │ █ SHIP █ │   │            │   text: ink-000 (#000000)
│   I N T E R F│A C│ ███████  │E S│            │   edge: feathered
│              ╰───┤          ├───╯            │   size: 380px desktop
│                  ╰──────────╯                │         240px mobile
└──────────────────────────────────────────────┘
```

Do layers ke words:

| | Base layer (always visible) | Revealed layer (inside lens) |
| --- | --- | --- |
| Line 1 | `I DESIGN` | `I SHIP` |
| Line 2 | `CALM` | `FAST` |
| Line 3 | `INTERFACES` | `PRODUCTS` |

Positions bilkul identical hain — to jaise cursor ghoomta hai, word-by-word swap hota hai. Aap `CALM` pe hover karo aur wo `FAST` ban jaata hai. Ye effect ka "aha" moment hai.

> **Copy final nahi hai** — ye placeholder hai. Section 12 ke content checklist me aapko apni do lines deni hain. Rule: dono layers ki lines ka character-count similar hona chahiye taaki layout na hile.

### 4.2 Implementation — the lens technique (aur clip-path kyun nahi)

Ye plan ka sabse important technical decision hai, isliye reasoning likh raha hoon.

**Obvious approach jo main REJECT kar raha hoon:** revealed layer pe `clip-path: circle(190px at var(--x) var(--y))` and mouse pe `--x`/`--y` update karo. Ye 10 lines me kaam karta hai — **lekin har frame pe browser ko us poori viewport-size layer ko dobara paint karna padta hai.** Desktop pe chalega, mid-range Android pe 30–40 fps aur battery drain.

**Approach jo hum use karenge — counter-translated lens:**

Ek chhota circular container jo `overflow: hidden` hai, aur uske andar poore hero ka ek copy jo **ulti direction me translate** hota hai. Lens aage badhta hai, andar ka content peeche — net effect: content screen pe sthir dikhta hai, lens uske upar se guzarta hai.

Iska fayda: **dono transforms `translate3d` hain, matlab pure GPU compositor work — zero repaint, zero layout.** Ye 60 fps pe budget Android pe bhi chalega.

```
        LENS (moves +x, +y)              LENS-INNER (moves -x, -y)
        ╭─────────╮                      ┌──────────────────────┐
        │         │      contains →      │  I SHIP              │
        │  ███    │                      │  FAST                │
        │         │                      │  PRODUCTS            │
        ╰─────────╯                      └──────────────────────┘
        380px circle                     100vw × 100svh, ink-050 bg

  net: content appears fixed to the page, lens slides over it
```

**Feathered edge free me:** lens pe ek **static** radial-gradient mask lagayenge. Static hai isliye har frame repaint nahi hoti — ek hi baar rasterize hoke compositor pe cache ho jaati hai.

```css
.lens {
  position: absolute; top: 0; left: 0;
  width: var(--lens-size); height: var(--lens-size);
  border-radius: 50%;
  overflow: hidden;
  transform-origin: 0 0;          /* ← CRITICAL, see 4.2.1 */
  /* STATIC mask — never changes, so it's free */
  -webkit-mask-image: radial-gradient(circle at 50% 50%,
      #000 0%, #000 62%, rgba(0,0,0,0.55) 82%, transparent 100%);
          mask-image: radial-gradient(circle at 50% 50%,
      #000 0%, #000 62%, rgba(0,0,0,0.55) 82%, transparent 100%);
  will-change: transform;
  transform: translate3d(0, 0, 0) scale(0);   /* closed */
  contain: paint;
}
.lens-inner {
  position: absolute; top: 0; left: 0;
  width: 100vw; height: 100svh;
  transform-origin: 0 0;          /* ← CRITICAL */
  background: var(--color-ink-050);
  color: var(--color-ink-000);
  will-change: transform;
}
```

### 4.2.1 The transform math (ye galat karna aasaan hai)

Lens open/close hone pe `scale(s)` lagta hai. Wo andar ke content ko bhi scale kar dega, to inner pe counter-scale `scale(1/s)` chahiye. **Lekin ye sirf tab sahi kaam karta hai jab `transform-origin: 0 0` ho.**

Maine ye math verify kiya hai. Default `transform-origin: 50% 50%` ke saath ek residual offset `(s−1)·(C_inner − C_lens)` reh jaata hai. Numbers me (1440×900 viewport, 380px lens, cursor 700,420):

| scale `s` | error with `origin: 50% 50%` | error with `origin: 0 0` |
| --- | --- | --- |
| 0.05 | **503.5 px off** | 0.00 px |
| 0.25 | **397.5 px off** | 0.00 px |
| 0.50 | **265.0 px off** | 0.00 px |
| 0.75 | **132.5 px off** | 0.00 px |
| 1.00 | 0.0 px | 0.00 px |
| 1.25 (click-push) | **132.5 px off** | 0.00 px |

Matlab origin-center version *sirf* `s === 1` pe sahi dikhta hai — poori open animation ke dauraan revealed text base text se 500px tak khisak kar aata. Bilkul woh glitch jo effect ko sasta bana deta hai.

**Sahi formulation:**

```
half = lensSize / 2
px   = cursorX - s * half          ← s se multiply karna zaroori hai
py   = cursorY - s * half

lens       : transform-origin: 0 0;  translate3d(px, py, 0) scale(s)
lens-inner : transform-origin: 0 0;  scale(1 / s) translate3d(-px, -py, 0)
```

Verify: lens ka centre `px + s·half = cursorX` — har `s` pe cursor pe rehta hai. Aur inner ka koi bhi point `q` map hota hai `px + s·(q − px)/s = q` — matlab exactly page coordinate pe, unscaled, har `s` pe. ✓

**Guard:** `s → 0` pe `1/s` infinity ho jaata hai. Isliye `s < 0.02` hone pe rAF loop early-return karta hai aur lens ko `opacity: 0` kar deta hai — division kabhi blow up nahi hoti.

**Pixel-perfect alignment guarantee:** base layer aur lens-inner ka content ek hi React component se render hoga — `<HeroLines variant="base" />` aur `<HeroLines variant="invert" />`. Same DOM, same font, same clamp values, sirf colors different. Isse alignment kabhi drift nahi karega, chahe font kitna bhi resize ho.

### 4.3 The animation loop — zero React re-renders

Sabse common galti: `onMouseMove` me `setState`. Wo 60 re-renders/second karta hai. Hum ye kar rahe hain:

```ts
// Motion values live OUTSIDE React's render cycle
const tx = useMotionValue(0), ty = useMotionValue(0);
const sx = useSpring(tx, { stiffness: 150, damping: 20, mass: 0.45 });
const sy = useSpring(ty, { stiffness: 150, damping: 20, mass: 0.45 });
const ts = useMotionValue(0);                                  // target scale
const ss = useSpring(ts, { stiffness: 90,  damping: 18 });     // softer open

// pointermove: sirf motion value set karo — koi render nahi
onPointerMove = (e) => { tx.set(e.clientX); ty.set(e.clientY); ts.set(1); }

// ek hi rAF loop, saare style writes ek frame me batched
// ek hi rAF loop, saare style writes ek frame me batched
useAnimationFrame(() => {
  const s = ss.get();
  if (s < 0.02) {                                  // guard: 1/s blow-up
    if (lensRef.current.style.opacity !== '0') lensRef.current.style.opacity = '0';
    return;
  }
  lensRef.current.style.opacity = '1';
  const half = lensSize / 2;
  const px = sx.get() - s * half;                  // NOTE: s * half, see 4.2.1
  const py = sy.get() - s * half;
  lensRef.current.style.transform =
    `translate3d(${px}px, ${py}px, 0) scale(${s})`;
  innerRef.current.style.transform =
    `scale(${1 / s}) translate3d(${-px}px, ${-py}px, 0)`;
});
```

Teen important details:
1. **`pointermove`, not `mousemove`** — pointer events mouse, pen aur touch teeno cover karte hain, ek hi code path.
2. **Listener hero section pe, `window` pe nahi**, aur `{ passive: true }` — scroll blocking nahi hoga.
3. **Ek `useAnimationFrame`, teen separate `useMotionValueEvent` nahi** — warna ek frame me 3 alag style writes, 3 style recalculations. Batch karna zaroori hai.

### 4.4 Desktop behaviours (the polish layer)

Ye chhoti cheezein hi "advanced feel" banati hain:

- **Entrance (page load):** lens hidden. Teen hero lines mask-reveal hoti hain neeche se upar — `clip-path: inset(100% 0 0 0)` → `inset(0)`, stagger 90ms, `--dur-cinema` with `--ease-out-expo`. Uske baad `MOVE YOUR CURSOR` hint mono-meta me fade-in hota hai (opacity 0 → 0.4).
- **First move:** hint 240ms me fade out, hamesha ke liye. Lens `scale 0 → 1` spring karta hai. Hint sirf pehli visit pe (`localStorage` nahi — sessionStorage bhi nahi chahiye; simple: agar 3.5s tak koi movement nahi to dikhao).
- **Idle drift:** 2.5s tak cursor na hile to lens ek dheemi **Lissajous path** pe khud drift karne lagta hai (Section 4.5 ka same math, slow). User cursor hilaate hi control wapas le leta hai. Ye discoverability ke liye hai — bahut log cursor hilaate hi nahi hain.
- **Depth parallax:** base layer cursor ke **opposite** direction me 10px tak translate karta hai (`useTransform` se mapped, spring'd). Isse lens ka content thoda "peeche" feel hota hai — subtle 3D.
- **Leave:** cursor hero se bahar jaate hi `ts.set(0)` — lens shrink hoke gayab, 520ms.
- **Click/hold:** `pointerdown` pe lens `scale 1.25` (spring) — "push" feedback. Release pe wapas.
- **Scroll away:** `useScroll` + `useTransform` se lens scale hero ke scroll progress ke saath 1 → 0. Saath hi `IntersectionObserver` rAF loop ko **band** kar deta hai jab hero viewport se bahar ho — CPU 0%.

### 4.5 Mobile behaviour — animated, aur interactive bhi

Aapne "animated hero" kaha. Main usse thoda aage le ja raha hoon: **default me animated, chhune pe aapka.**

**Auto path — Lissajous curve.** Circle boring lagta hai (predictable), random jerky lagta hai. Lissajous figure organic aur non-repeating feel deta hai:

```ts
// t = elapsed seconds
const cx = W * (0.5 + 0.30 * Math.sin(t * 0.34));
const cy = H * (0.46 + 0.20 * Math.sin(t * 0.52 + 1.1));
// x aur y ki frequencies irrational ratio me → path 17s tak repeat nahi hota
```

Path deliberately tuned hai taaki wo teeno hero lines ke upar se guzre — user ko saare revealed words dikh jaayein. Speed slow: full sweep ~14s. Fast movement mobile pe nauseating lagti hai.

**Touch override.** `pointerdown` pe auto-path pause, lens ungli follow karta hai (same spring). `pointerup` ke 1.6s baad auto-path smoothly resume karta hai — jump nahi, current position se phase re-sync karke. Ye detail matter karti hai; warna lens teleport karta dikhega.

**Mobile-specific tuning:**

| Parameter | Desktop | Mobile | Reason |
| --- | --- | --- | --- |
| Lens size | 380px | 240px | chhoti screen pe 380px poora hero dhak leta |
| Spring stiffness | 150 | 210 | touch pe lag zyada noticeable hota hai |
| Hero height | `100vh` | `100svh` | iOS Safari ka address bar `vh` tod deta hai |
| Hero type size | 184px max | 52–72px | 3 lines, 4-col grid me fit |
| Grain opacity | 0.035 | 0.02 | chhoti screen pe grain zyada dikhta hai |
| Parallax | on | off | device motion ke saath conflict |

**Battery/thermal guard:** rAF loop `document.visibilityState === 'hidden'` pe rukta hai, `IntersectionObserver` se hero off-screen pe rukta hai, aur agar `navigator.hardwareConcurrency <= 4` ho to lens ki update rate 30fps pe throttle ho jaati hai (har doosra frame). Low-end phones pe smooth-but-slower behtar hai jhatke se.

**Optional (default OFF):** device-tilt se lens nudge. iOS pe explicit permission prompt chahiye hota hai jo intrusive lagta hai, isliye default off — agar chaho to settings me toggle de denge.

### 4.6 Accessibility — ye hissa skip nahi hoga

Ek cursor-reveal hero screen readers aur keyboard users ke liye aasaani se disaster ban jaata hai. Plan:

**Real heading DOM me hai, layers decorative hain:**

```html
<section id="hero" aria-labelledby="hero-h">
  <!-- base layer IS the real h1, full AA contrast (ink-100 = 16.8:1) -->
  <h1 id="hero-h" class="hero-lines">
    <span>I design</span><span>calm</span><span>interfaces</span>
    <span class="sr-only">— and ship fast products.</span>
  </h1>

  <!-- lens content is a visual duplicate only -->
  <div class="lens" aria-hidden="true" role="presentation"> … </div>
</section>
```

Revealed words ka message `sr-only` span me bhi hai, to screen reader ko poora matlab milta hai. Lens `aria-hidden` hai to duplicate text announce nahi hoga.

**`prefers-reduced-motion: reduce`:** lens ka movement bilkul band. Iski jagah ek **static** lens ek achhi composition position pe (33% x, 44% y) render hoti hai, aur ek small mono button `[ REVEAL ]` diya jaata hai jo poori inverted layer ko cross-fade karke toggle karta hai. Effect ka intent preserved, motion zero.

**Keyboard:** hero me `Tab` se ek visible skip-link (`Skip to work`) sabse pehle aata hai. Lens keyboard-operable nahi hai (decorative hai) — lekin `REVEAL` toggle button focusable hai, to keyboard user bhi dono messages dekh sakta hai.

**No-JS / pre-hydration:** lens sirf `mounted === true` pe render hota hai. Server HTML me base layer readable text ke saath aata hai. JS fail ho jaaye to site normal, readable hero ke saath kaam karti hai — koi blank screen nahi.

**Contrast:** base `#E8E8E8` on `#050505` = **16.63:1**. Inverted `#000000` on `#F5F5F5` = **19.26:1**. Dono AAA (computed, Section 2.1).

**Photosensitivity:** koi flash, strobe ya rapid contrast change nahi. Lens slow aur spring-damped hai. Mobile auto-path 14s ka hai — WCAG 2.3.1 (three flashes) ka koi risk nahi.

### 4.7 Hero performance budget & verification

| Metric | Target | Kaise verify karenge |
| --- | --- | --- |
| Frames during cursor move | ≥ 58 fps | Chrome DevTools Performance, 6× CPU throttle |
| Repaint area per frame | 0 px² (compositor only) | DevTools → Rendering → Paint flashing (green flash na aaye) |
| Layer count | ≤ 4 | DevTools → Layers panel |
| Hero LCP | < 1.0s (4G) | Lighthouse mobile, throttled |
| JS for hero | < 22 KB gzip | `@next/bundle-analyzer` |
| Real device test | 58+ fps | Ek mid-range Android (Snapdragon 6-series ya similar) pe manually |

**Fallback ladder** — agar profiling me lens technique kisi browser pe fail kare:
1. Lens + counter-translate (primary)
2. `clip-path: circle()` on a `contain: paint` layer (simpler, thoda heavier)
3. Static split reveal — no cursor tracking, sirf scroll-driven wipe
4. Base layer only + `[ REVEAL ]` toggle

Har step gracefully degrade karta hai, koi broken state nahi.

---

## 5. Section-by-section design (public site)

Sab kuch mobile-first likha hai — base description mobile ka hai, uske baad desktop enhancement.

**1. Nav** — Mobile: fixed top bar, left me wordmark (Geist Mono, uppercase, tracking wide), right me hamburger (do 18px lines jo X me morph karti hain). Tap pe fullscreen overlay: `ink-950` background 92% opacity + `backdrop-blur(20px)`, links `--text-d2` size me, stagger 70ms upar se, har link ke aage mono counter (`01`, `02`…). Desktop: koi hamburger nahi — inline links, hover pe underline jo left se draw hoti hai (`scaleX` transform), active section `IntersectionObserver` se highlight. Scroll down pe nav shrink hoti hai (height 72px → 56px, border-bottom appear).

**2. Hero** — Section 4 poora.

**3. Capability marquee** — Hero ke turant neeche, ek patli strip: `PRODUCT DESIGN · NEXT.JS · DESIGN SYSTEMS · MOTION · TYPESCRIPT ·` infinite scroll. Pure CSS `@keyframes translateX(-50%)` with duplicated content, 28s linear, `hover: paused`. Top aur bottom pe hairline border. Ye hero se content me transition ka kaam karta hai aur monochrome me texture add karta hai.

**4. About** — Mobile: grayscale portrait (full-bleed, `aspect-ratio: 4/5`), neeche 2–3 short paragraphs `--text-lead` me, phir ek "currently" line (`Geist Mono`: `CURRENTLY — building X, learning Y, open to Z`). Desktop: 12-col split — portrait 5 columns left (sticky, scroll ke saath 6% parallax), text 6 columns right with 1-col offset. Portrait pe `filter: grayscale(1) contrast(1.08)` aur hover pe `contrast(1.2)` — monochrome me photo ko intentional banata hai, accident nahi.

**5. Selected Work** — Ye doosra sabse important section hai, aur hero ke cursor theme ko echo karta hai.
Mobile: stacked cards. Har card = cover image (`aspect-ratio: 3/2`, grayscale), title `--text-h3`, ek line summary, mono meta row (`2026 · NEXT.JS · POSTGRES`), aur ek `→` arrow. Scroll pe stagger fade-up.
Desktop: **cards nahi — list rows.** Har project ek full-width row hai (title left, year+stack right, hairline border between). Row hover pe: (a) title `ink-300 → ink-white`, (b) row background `ink-950 → ink-900`, (c) **project ki cover image cursor ke paas float karti hai** — 320×420px, `translate3d` se cursor follow karti hai (soft spring, `stiffness: 110`), slight rotation cursor velocity ke hisaab se (`-6deg` se `+6deg`), aur non-hovered rows ka title `ink-600` pe fade ho jaata hai. Ye hero ke cursor-driven language ko consistent rakhta hai — poori site ek hi idea bolti hai.

**6. Project detail (`/work/[slug]`)** — Sticky mono meta sidebar (role, year, client, stack, live/repo links) + main content column. Hero image full-bleed. Content MDX: headings, paragraphs, images (single + side-by-side pairs), blockquote, code blocks (monochrome syntax theme — sirf weight aur opacity se differentiation, colors nahi). Bottom pe prev/next project navigation. Scroll progress bar top pe (1px, `ink-white`).

**7. Skills / Stack** — Mono grid. Mobile 2 columns, desktop 4. Har item: name + ek 5-segment bar (filled segments = level, `ink-white`; empty = `ink-800`). Category headers mono uppercase. Hover pe segment fill left-to-right animate. Logos use nahi karenge — brand logos colored hote hain aur monochrome discipline tod dete.

**8. Experience timeline** — Left pe ek vertical hairline, uspe dots. Mobile: single column, dot left edge pe. Desktop: alternating sides. Har entry: role (`--text-h3`), company, mono date range, 2-line description. Scroll-linked: hairline `scaleY` 0 → 1 draw hoti hai jaise aap scroll karte ho (`useScroll` on the container).

**9. Contact** — Ek bahut bada `--text-d1` size ka email address jo click pe copy hota hai (copy pe mono confirmation `COPIED` 2s ke liye). Neeche form: name, email, message — floating labels, focus pe bottom border `ink-700 → ink-white` grow karti hai, error states mono red-free (monochrome me error = bold text + `!` glyph + border white). Submit button: full-width mobile, hover pe fill left-to-right invert. Success pe form area ek mono confirmation message me morph ho jaata hai. Ek italic serif word (Section 2.2 ka exception) yahan aayega.

**10. Footer** — Left: live local time (`Asia/Calcutta`, mono, per-second update — chhoti si "alive" detail). Centre: availability pill (`AVAILABLE FOR WORK` — DB se, admin se toggle). Right: socials (text links, icons nahi). Bottom row: copyright + "built with" line + back-to-top.

**Page transitions** — Motion `AnimatePresence` se ek subtle 320ms cross-fade + 12px upward slide (stable, har browser me kaam karta hai). Native View Transitions API ke saath Next.js ka integration abhi experimental hai — Phase 8 me *agar* wo stable ho to upgrade kar denge, warna Motion wala approach production me bilkul theek hai. Ye deliberately conservative choice hai: ek portfolio ka page transition experimental API pe depend nahi karna chahiye.

**Smooth scroll** — Lenis, `lerp: 0.085`, `duration: 1.1`. Important: Lenis ko `prefers-reduced-motion` pe **disable** karenge aur `data-lenis-prevent` admin panel ke scrollable areas pe lagayenge. Lenis ka scroll value Motion ke `useScroll` ke saath sync hoga (`ScrollTrigger`-style integration) taaki do scroll systems fight na karein — ye ek classic bug hai.

---

## 6. Database schema (PostgreSQL 16 + Prisma 6)

Poora schema. Ye `prisma/schema.prisma` me jaayega.

```prisma
generator client { provider = "prisma-client-js" }
datasource db    { provider = "postgresql"; url = env("DATABASE_URL") }

enum Status       { DRAFT PUBLISHED ARCHIVED }
enum Availability { AVAILABLE OPEN_TO_OFFERS BOOKED }
enum SkillGroup   { LANGUAGE FRAMEWORK DATABASE TOOL DESIGN INFRA SOFT }

/* ── Admin user ─────────────────────────────────────────── */
model User {
  id           String   @id @default(cuid())
  email        String   @unique
  passwordHash String                        // Argon2id
  name         String
  totpSecret   String?                       // optional 2FA (Phase 8)
  lastLoginAt  DateTime?
  createdAt    DateTime @default(now())
}

/* ── Media library ──────────────────────────────────────── */
model Media {
  id          String   @id @default(cuid())
  filename    String                         // stored name (nanoid + ext)
  originalName String
  path        String   @unique               // /uploads/2026/08/abc123
  mimeType    String
  bytes       Int
  width       Int
  height      Int
  blurDataUrl String   @db.Text              // 20px base64 LQIP
  alt         String   @default("")          // a11y — admin me required field
  createdAt   DateTime @default(now())

  projectCovers Project[]      @relation("cover")
  projectOg     Project[]      @relation("og")
  gallery       ProjectMedia[]
  resumeFor     SiteSetting[]  @relation("resume")
  ogFor         SiteSetting[]  @relation("siteOg")
  avatarFor     SiteSetting[]  @relation("avatar")

  @@index([createdAt(sort: Desc)])
}

/* ── Projects ───────────────────────────────────────────── */
model Project {
  id        String  @id @default(cuid())
  slug      String  @unique
  title     String
  subtitle  String?
  summary   String  @db.Text                 // work list ki one-liner
  content   String  @db.Text                 // MDX case study body
  year      Int
  role      String?
  client    String?
  stack     String[]                         // ["Next.js","Postgres"]
  tags      String[]                         // filtering ke liye
  liveUrl   String?
  repoUrl   String?

  coverId   String?
  cover     Media?  @relation("cover", fields: [coverId], references: [id], onDelete: SetNull)
  ogId      String?
  ogImage   Media?  @relation("og",    fields: [ogId],    references: [id], onDelete: SetNull)
  gallery   ProjectMedia[]

  featured    Boolean  @default(false)
  order       Int      @default(0)
  status      Status   @default(DRAFT)
  publishedAt DateTime?
  views       Int      @default(0)

  seoTitle       String?
  seoDescription String?

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([status, order])                   // public list query
  @@index([status, featured, order])         // homepage featured
  @@index([publishedAt(sort: Desc)])
  @@index([tags(ops: ArrayOps)], type: Gin)  // array containment — NOT plain @@index
}

model ProjectMedia {                          // ordered gallery join
  id        String  @id @default(cuid())
  projectId String
  project   Project @relation(fields: [projectId], references: [id], onDelete: Cascade)
  mediaId   String
  media     Media   @relation(fields: [mediaId], references: [id], onDelete: Cascade)
  caption   String?
  order     Int     @default(0)

  @@unique([projectId, mediaId])
  @@index([projectId, order])
}

/* ── Skills & experience ────────────────────────────────── */
model Skill {
  id       String     @id @default(cuid())
  name     String
  group    SkillGroup
  level    Int        @default(3)            // 1–5 → bar segments
  note     String?
  order    Int        @default(0)
  visible  Boolean    @default(true)

  @@unique([name, group])
  @@index([visible, group, order])
}

model Experience {
  id          String    @id @default(cuid())
  company     String
  role        String
  location    String?
  url         String?
  startDate   DateTime
  endDate     DateTime?                       // null = current
  isCurrent   Boolean   @default(false)
  description String    @db.Text
  order       Int       @default(0)
  visible     Boolean   @default(true)

  @@index([visible, order])
  @@index([startDate(sort: Desc)])
}

/* ── Contact inbox ──────────────────────────────────────── */
model Message {
  id        String   @id @default(cuid())
  name      String
  email     String
  subject   String?
  body      String   @db.Text
  isRead    Boolean  @default(false)
  isStarred Boolean  @default(false)
  isSpam    Boolean  @default(false)
  ipHash    String?                          // SHA-256, raw IP nahi (privacy)
  userAgent String?
  createdAt DateTime @default(now())

  @@index([isRead, createdAt(sort: Desc)])
  @@index([createdAt(sort: Desc)])
}

model RateLimit {                             // DB-backed, Redis ki zarurat nahi
  id        String   @id @default(cuid())
  key       String   @unique                  // "contact:<ipHash>"
  count     Int      @default(1)
  expiresAt DateTime

  @@index([expiresAt])
}

/* ── Singleton site settings ────────────────────────────── */
model SiteSetting {
  id     Int    @id @default(1)               // always row 1
  ownerName String @default("")
  wordmark  String @default("")

  heroBaseLines   String[]                    // ["I DESIGN","CALM","INTERFACES"]
  heroRevealLines String[]                    // ["I SHIP","FAST","PRODUCTS"]
  heroSrSuffix    String @default("")         // screen-reader extra sentence
  tagline         String @default("")
  bio             String @db.Text @default("")
  currentlyLine   String @default("")

  email        String  @default("")
  location     String  @default("")
  availability Availability @default(AVAILABLE)
  socials      Json    @default("[]")         // [{label,url}]

  avatarId String?
  avatar   Media? @relation("avatar", fields: [avatarId], references: [id], onDelete: SetNull)
  resumeId String?
  resume   Media? @relation("resume", fields: [resumeId], references: [id], onDelete: SetNull)
  siteOgId String?
  siteOg   Media? @relation("siteOg", fields: [siteOgId], references: [id], onDelete: SetNull)

  metaTitle       String @default("")
  metaDescription String @default("")

  updatedAt DateTime @updatedAt
}

/* ── Optional own-analytics. Vercel Analytics already covers site-wide
      traffic; ye table sirf tab rakho agar admin dashboard me per-project
      view counter chahiye. Warna drop kar do — §13 dekho. ── */
model PageView {
  id        String   @id @default(cuid())
  path      String
  projectId String?
  referrer  String?
  country   String?
  device    String?                           // mobile | tablet | desktop
  createdAt DateTime @default(now())

  @@index([path, createdAt(sort: Desc)])
  @@index([projectId])
}
```

**Design notes:**
`heroBaseLines`/`heroRevealLines` DB me hain — matlab aap hero ka text admin se badal sakte ho, code deploy kiye bina. Ye specifically aapke use-case ke liye add kiya hai kyunki hero focus hai.
`Media.alt` admin form me **required** hoga (empty string default hai lekin form validation block karega) — accessibility ko process me baandh diya.
`onDelete: SetNull` covers pe hai, `Cascade` nahi — galti se ek image delete karne se project delete nahi hoga.
`ipHash` raw IP ki jagah — rate limiting ke liye kaafi hai, privacy compliant.
`RateLimit` table Postgres me hai to Redis ka extra service nahi chahiye — serverless pe ye extra faydemand hai, kyunki har function invocation ko ek stateless store chahiye aur Postgres already wahi hai. Upstash Redis add kar sakte hain agar traffic bahut badhe, lekin ek portfolio pe zarurat nahi.

**Migrations:** `prisma migrate dev --name <desc>` locally, `prisma migrate deploy` deployment step me. `db push` production pe **kabhi nahi**.
**Seed:** `prisma/seed.ts` — admin user (env se password), `SiteSetting` row 1, 3 sample projects, ~12 skills, 2 experience entries. Isse fresh clone pe site turant bhari-bhari dikhti hai.

---

## 7. API surface

**Primary pattern: Server Actions**, REST nahi. Admin mutations React form se directly server function call karti hain — no fetch, no JSON serialisation boilerplate, aur progressive enhancement free me (JS off pe bhi form submit hota hai).

```
src/server/actions/
├── projects.ts   createProject · updateProject · deleteProject
│                 reorderProjects · togglePublish · duplicateProject
├── skills.ts     createSkill · updateSkill · deleteSkill · reorderSkills
├── experience.ts createExperience · updateExperience · deleteExperience
├── messages.ts   markRead · toggleStar · markSpam · deleteMessage
├── media.ts      updateAlt · deleteMedia (usage-check ke saath)
└── settings.ts   updateSettings
```

Har action ka shape ek hi hai — consistency se bugs kam hote hain:

```ts
export async function updateProject(input: unknown) {
  const session = await requireAdmin();              // throws → redirect
  const data = ProjectSchema.parse(input);           // Zod, throws → field errors
  const p = await prisma.project.update({ where:{id:data.id}, data });
  revalidateTag('projects');                         // ISR bust
  revalidatePath(`/work/${p.slug}`);
  await audit(session.user.id, 'project.update', p.id);
  return { ok: true, data: p };
}
```

**Route handlers sirf wahan jahan Server Action kaam nahi karta:**

| Route | Method | Why not an action | Protection |
| --- | --- | --- | --- |
| `/api/media/sign` | POST | Cloudinary upload signature | **admin session**, server-side param whitelist (§9.1) |
| `/api/media/confirm` | POST | `Media` row insert after direct upload | admin session, `public_id` re-verified against Cloudinary |
| `/api/contact` | POST | public, needs raw request for IP + rate limit | Turnstile + honeypot + 3/hour per IP |
| `/api/health` | GET | uptime monitor probe (Better Stack / cron) | public, DB ping only |
| `/api/track` | POST | fire-and-forget beacon | rate-limited, no PII |
| `/api/og/[...slug]` | GET | edge image generation | public, immutable cache |

**Validation:** ek `src/lib/schemas.ts` file me saare Zod schemas, client (`react-hook-form` + `zodResolver`) aur server dono me **same schema** import hote hain. Ek hi source of truth, drift impossible.

**Caching strategy:**
Public pages `revalidateTag`-based ISR use karengi — matlab pages static serve hote hain (fast!) lekin admin me kuch save karne pe turant regenerate ho jaate hain. Best of both. Project detail pages `generateStaticParams` se build pe pre-render hongi.

---

## 8. Auth & security

**Auth.js v5**, Credentials provider, single admin user. OAuth nahi — ek personal portfolio me Google login ka koi fayda nahi, aur ek external dependency kam.

- **Password hashing: Argon2id** (`@node-rs/argon2` — native, fast), bcrypt nahi. Params: `memoryCost 19456, timeCost 2, parallelism 1` (OWASP 2025 recommendation).
- **Session:** JWT strategy, httpOnly + Secure + SameSite=Lax cookie, 7-day expiry, rolling refresh.
- **Login throttle:** 5 failed attempts per IP per 15 min → `RateLimit` table se blocked. Constant-time comparison, aur "invalid email" vs "invalid password" me farq nahi batayenge (user enumeration prevention).
- **2FA (TOTP):** Phase 8 optional. `totpSecret` field schema me already hai.
- **Middleware:** `/admin/:path*` (login chhodkar) session check karta hai. Server Actions me `requireAdmin()` dobara check karta hai — **defence in depth**, middleware pe akela bharosa nahi (middleware bypass ho sakta hai edge cases me).
- **Audit log:** har admin mutation ek `audit()` call karti hai (Phase 8 me `AuditLog` table, shuru me structured console log).

**CSRF on Server Actions:** Next.js Server Actions me built-in Origin/Host mismatch check hota hai, to classic CSRF largely covered hai. Lekin hum uspe akela bharosa nahi karenge — cookie `SameSite=Lax` hai aur har action `requireAdmin()` call karti hai, to teen layers ho gayi.

**Security headers** (`middleware.ts` me, `next.config.ts` me nahi — kyunki per-request nonce generate karna hai):

```
Content-Security-Policy: default-src 'self';
  script-src 'self' 'nonce-<per-request-random>' 'strict-dynamic';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: blob: https://res.cloudinary.com;
  font-src 'self';
  connect-src 'self' https://api.cloudinary.com https://va.vercel-scripts.com;
  frame-src https://challenges.cloudflare.com;
  frame-ancestors 'none'; base-uri 'self'; object-src 'none'
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
```

**Nonce-based CSP kyun, `'unsafe-inline'` kyun nahi:** Next.js apne hydration bootstrap ke liye inline `<script>` inject karta hai. Sabse aasaan raasta `script-src 'unsafe-inline'` hai — **lekin wo CSP ki XSS protection ko practically khatam kar deta hai**, to hum wo nahi karenge. Sahi tareeka: middleware har request pe ek random nonce banata hai, use CSP header aur Next.js ke script tags dono me daalta hai (`next.config` ke bajaye middleware isliye — header per-request dynamic hona chahiye). `'strict-dynamic'` se nonce-trusted script apne dependencies load kar sakti hai.

`style-src` pe `'unsafe-inline'` abhi rehna padega — Tailwind aur Motion inline styles likhte hain (`element.style.transform` — hero ka rAF loop bhi yahi karta hai). Ye XSS risk ke hisaab se script se kaafi kam severe hai, aur documented trade-off hai.

Ek cheez jo log yahan galat karte hain: `'strict-dynamic'` present ho to `script-src` ke **host allowlists ignore ho jaate hain**. To Vercel Analytics ya Turnstile ke domains `script-src` me daalne ka koi matlab nahi — unhe nonce chahiye (`next/script` nonce forward karta hai). Host allowlist sirf `connect-src` / `frame-src` / `img-src` me kaam karti hai, jahan maine daali hai.

**Upload hardening (Cloudinary model):** validation ab **do jagah** hai. (1) Server signature banane se pehle `allowed_formats`, `max_file_size` aur `folder` sign karta hai — client in values ko badle to signature invalid ho jaati hai aur Cloudinary khud reject karta hai. (2) `/api/media/confirm` Cloudinary se returned `public_id` ko re-verify karta hai (Admin API se fetch), taaki koi apni marzi ka `public_id` DB me na daal de.

Cloudinary upload pe EXIF (GPS included) strip karta hai aur files apne CDN se serve hoti hain, aapke origin se nahi — to "uploads directory se script execution" wali poori class of vulnerability yahan exist hi nahi karti. `sharp` re-encode ki zarurat nahi rahi. Public IDs `nanoid()` se, user input se nahi.

**Contact form spam defence, layered:** honeypot field (bots bharte hain, humans nahi) → time-to-submit check (< 2.5s = bot) → Cloudflare Turnstile (free, privacy-friendly, hCaptcha se better UX) → 3/hour per IP-hash rate limit → server-side link-count heuristic (`isSpam` flag, delete nahi).

---

## 9. Media pipeline — Cloudinary

> Revised 2026-08-31. Local volume + `sharp` wala plan §9.6 me archived hai. Serverless pe koi persistent disk hoti hi nahi — Vercel ka filesystem read-only + ephemeral hai, to upload karne ki jagah hi nahi bachti.

Cloudinary ka असली faayda ye nahi ki storage free hai. Faayda ye hai ki **`sharp` pipeline poori delete ho jaati hai** — resize/encode/AVIF/blur, sab URL ke andar transformation string ban jaata hai. Maintain karne layak code lagbhag zero.

### 9.1 Upload — browser se DIRECT, server ke through NAHI

Ye single sabse important decision hai. Vercel serverless function ka request body limit **4.5 MB** hai. Ek modern phone ki photo 6–12 MB hoti hai. Agar upload server se route kiya to 4.5 MB se upar sab kuch `413` degа — aur ye galti staging pe pakadti nahi, sirf real photo pe pakadti hai.

```
Browser: file chuni
   ↓
POST /api/media/sign          (Auth.js session check — admin only)
   ← { signature, timestamp, apiKey, folder, allowed_formats }
   ↓                           (secret server pe hi rehta hai, kabhi client pe nahi)
Browser → POST https://api.cloudinary.com/v1_1/<cloud>/image/upload
   ← { public_id, width, height, bytes, format }   ← Vercel bypass ho gaya
   ↓
POST /api/media/confirm       → Media row insert (public_id, width, height, blurDataUrl)
```

Signed upload preset me server-side enforce karo: `allowed_formats: jpg,png,webp,avif`, `max_file_size: 15000000`, `folder: portfolio/<yyyy>/<mm>`, aur `unique_filename: true`. Client se aayi kisi bhi value pe bharosa nahi — signature sirf inhi params ko cover karti hai, to tamper karne pe upload reject ho jaata hai.

### 9.2 Serving — transformations, pipeline nahi

`next/image` ke liye ek chhota custom loader:

```ts
// src/lib/cloudinary-loader.ts
export default function loader({ src, width, quality }: {
  src: string; width: number; quality?: number;
}) {
  const t = [
    "f_auto",                    // AVIF/WebP — browser ke hisaab se
    `q_${quality ?? "auto"}`,    // per-image perceptual quality
    `w_${width}`,
    "c_limit",                   // never upscale
    "dpr_auto",
  ].join(",");
  return `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD}/image/upload/${t}/${src}`;
}
```

`next.config.ts` me `images: { loader: "custom", loaderFile: "./src/lib/cloudinary-loader.ts" }`. Iske baad `next/image` ka `sizes` attribute hi responsive widths generate karta hai — humein width list maintain karni hi nahi padti (purana plan 400/800/1280/1920/2560 hard-code karta tha).

LQIP: upload ke waqt ek baar `e_blur:1000,q_1,w_20` URL fetch karke base64 me DB me store karo. Ek baar ka kaam, phir har render pe free.

Metadata: Cloudinary default pe EXIF strip karta hai (GPS included) — `keep_iptc` set na karna. Ye privacy ke liye load-bearing hai, photo me location chhup ke nahi jaani chahiye.

### 9.3 Monochrome — CSS pe, upload pe nahi

Grayscale **display time pe** lagta hai (`filter: grayscale(1) contrast(1.08)`, `.portrait` class), Cloudinary transformation (`e_grayscale`) se nahi. Reason: original colour file intact rehti hai. Kal design badle ya koi photo kahin aur use karni ho to re-upload nahi karna padega. Ek irreversible transform ko source pe baking karna sabse aasaan pachtaane wali choice hai.

### 9.4 Free tier — kya sach me limit hai

25 credits/month = 25 GB bandwidth **ya** 25 GB storage **ya** 25k transformations, milaakar. Portfolio ke ~40 images pe ye limit chhune ka realistic chance nahi hai. Transformations cached hain — ek unique URL pe transformation ek hi baar count hoti hai, har request pe nahi.

### 9.5 Fallback agar Cloudinary hatana ho

Supabase Storage — same signed-direct-upload shape, lekin `f_auto` jaisa automatic format negotiation nahi milta, to `sharp` wapas aa jaayega ya `next/image`'s default optimizer use hoga (jo Vercel pe billable hai). Isi liye Cloudinary primary hai.

### 9.6 ARCHIVED — original local-volume plan (superseded, do not use)

<details>
<summary>Purana VPS pipeline — sirf reference ke liye</summary>

```
Upload → magic-byte validate → sharp:
   ├── rotate() (EXIF auto-orient)
   ├── resize widths: 400 · 800 · 1280 · 1920 · 2560 (never upscale)
   ├── encode AVIF (q 55) + WebP (q 78)
   ├── 20px blur → base64 → blurDataUrl (LQIP, DB me)
   └── strip all metadata (GPS, camera, ICC)
→ write to /data/uploads/YYYY/MM/<nanoid>-<w>.<ext>
→ Media row insert (width, height, bytes, blurDataUrl)
```

Serving: custom loader `/uploads/...` se variant pick karta, `Cache-Control: public, max-age=31536000, immutable`. `/data/uploads` Coolify persistent volume hona zaroori tha warna redeploy pe images gayab.

</details>

---

## 10. Folder structure

```
N:\Projects\portfolio\
├── docs/
│   ├── PLAN.md                    ← ye file
│   ├── DEPLOY.md                  runbook (Phase 8)
│   └── CONTENT.md                 aapka content checklist
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts
├── public/
│   ├── favicon.svg  ·  icon-192/512.png  ·  manifest.webmanifest
│   └── grain.svg
├── src/
│   ├── app/
│   │   ├── layout.tsx             fonts, grain, cursor, Lenis, metadata
│   │   ├── page.tsx               home (RSC — DB se data)
│   │   ├── globals.css            @theme tokens (Section 2)
│   │   ├── work/page.tsx  ·  work/[slug]/page.tsx
│   │   ├── about/page.tsx  ·  contact/page.tsx
│   │   ├── sitemap.ts  ·  robots.ts  ·  not-found.tsx  ·  error.tsx
│   │   ├── api/{contact,health,track,media/upload,og/[...slug]}/route.ts
│   │   └── admin/
│   │       ├── layout.tsx         sidebar shell (auth-gated)
│   │       ├── login/page.tsx
│   │       ├── page.tsx           dashboard
│   │       └── {projects,skills,experience,messages,media,settings}/
│   ├── components/
│   │   ├── hero/
│   │   │   ├── Hero.tsx           orchestrator, mounted-check
│   │   │   ├── HeroLines.tsx      shared by base + lens (alignment guarantee)
│   │   │   ├── SpotlightLens.tsx  lens + rAF loop (Section 4.3)
│   │   │   ├── useLensMotion.ts   springs, pointer, Lissajous, idle drift
│   │   │   └── RevealToggle.tsx   reduced-motion fallback button
│   │   ├── cursor/CustomCursor.tsx
│   │   ├── work/{WorkList,WorkRow,HoverPreview,WorkCard}.tsx
│   │   ├── sections/{Nav,Marquee,About,Skills,Timeline,Contact,Footer}.tsx
│   │   ├── motion/{Reveal,SplitText,MaskLines,Marquee}.tsx
│   │   └── ui/                    shadcn/ui (admin only)
│   ├── server/
│   │   ├── db.ts                  Prisma singleton
│   │   ├── auth.ts                Auth.js config + requireAdmin()
│   │   ├── actions/               Section 7
│   │   └── queries/               cached read functions
│   ├── lib/
│   │   ├── schemas.ts             Zod (shared client+server)
│   │   ├── image.ts  ·  rate-limit.ts  ·  mail.ts  ·  utils.ts
│   │   └── constants.ts           lens sizes, springs, breakpoints
│   ├── hooks/
│   │   ├── usePointerFine.ts      (hover:hover) + (pointer:fine)
│   │   ├── useReducedMotion.ts  ·  useInViewOnce.ts  ·  useLenis.ts
│   └── middleware.ts
├── .env.example
├── next.config.ts  ·  tsconfig.json  ·  eslint.config.mjs  ·  prettier
├── playwright.config.ts  ·  e2e/
└── package.json
```

---

## 11. Performance, SEO, accessibility targets

### 11.1 Performance budget

| Metric | Target | Notes |
| --- | --- | --- |
| Lighthouse Performance (mobile) | ≥ 97 | throttled 4G, Moto G4 class |
| LCP | < 1.2s | hero text hai, image nahi → naturally fast |
| INP | < 100ms | rAF loop main thread block nahi karta |
| CLS | < 0.02 | `next/font` + fixed aspect-ratios |
| TTFB | < 200ms | Vercel edge + ISR (static hit, DB touch nahi) |
| First-load JS (`/`) | < 130 KB gzip | Motion 18 + Lenis 6 + React 45 + app |
| Total page weight (`/`) | < 420 KB | AVIF images |

**Kaise hit karenge:** hero text hai (image nahi) → LCP element ek font-rendered heading hai, jo preloaded font ke saath instantly paint hoti hai. Below-fold images `loading="lazy"` + blur placeholder. Admin bundle poori tarah separate route group me, public bundle me 0 bytes. `@next/bundle-analyzer` CI me — budget cross hone pe build fail.

### 11.2 SEO

Metadata API se per-route `title`/`description`/`canonical`/OpenGraph/Twitter. Dynamic OG images `next/og` se — monochrome template (black bg, big Geist Sans title, mono meta footer) — har project ka apna OG image, share karne pe professional dikhta hai. `sitemap.ts` DB se published projects pull karta hai. JSON-LD: `Person` (home) + `CreativeWork` (each project) + `BreadcrumbList`. `robots.ts` admin aur api ko block karta hai.

### 11.3 Accessibility — WCAG 2.2 AA target

Semantic landmarks (`header`/`main`/`nav`/`footer`), ek `<h1>` per page, logical heading order. Skip-link first tab stop. Saare interactive elements keyboard-reachable, 2px white focus ring 2px offset pe. Mobile menu me focus trap + `Escape` close + `aria-expanded`. Form fields real `<label>` ke saath, errors `aria-describedby` + `role="alert"` se linked. Touch targets ≥ 44×44px. `prefers-reduced-motion` poore site pe respected (Section 4.6). Testing: `axe-core` Playwright me automated, plus manual NVDA + VoiceOver pass, plus keyboard-only full walkthrough.

---

## 12. Build roadmap

Serverless stack ke saath realistic estimate. "Day" = ek focused working day.

| Phase | Work | Days | Deliverable |
| --- | --- | --- | --- |
| **0** | `create-next-app`, TS strict, Tailwind v4 `@theme` tokens (Section 2), fonts, grain, Prettier/ESLint, git init | 1 | `npm run dev` chalta hai, tokens live |
| **1** | **HERO** — HeroLines, SpotlightLens, useLensMotion, desktop cursor, mobile Lissajous + touch, reduced-motion toggle, DevTools profiling pass | 2 | Hero production-ready, 58+ fps verified |
| **2** | Nav + mobile menu, marquee, About, Skills, Timeline, Footer, Contact UI, custom cursor, Lenis, reveal animations | 2.5 | Poori public site, hardcoded content pe |
| **3** | **Neon** project + branch, Prisma schema + first migration (pooled + `directUrl`), seed script, query layer, pages ko DB pe wire karna | 1.5 | Site DB se chal rahi hai |
| **4** | Auth.js, login page, middleware, admin shell, Projects CRUD (form, validation, dnd reorder, publish toggle) | 2.5 | Projects admin se manage ho rahe |
| **5** | **Cloudinary** signed direct upload (`/api/media/sign` + `confirm`), loader, media library UI, Skills/Experience/Settings CRUD | 1.5 | Full CMS complete |
| **6** | Work list hover-preview (desktop), `/work/[slug]` case study, MDX rendering, prev/next | 1.5 | Case studies live |
| **7** | Contact form + Turnstile + rate limit + Resend email + messages inbox | 1 | Contact end-to-end |
| **8** | SEO (metadata, OG images, sitemap, JSON-LD), a11y audit + fixes, Lighthouse tuning, Playwright e2e | 1.5 | 97+ Lighthouse, AA passing |
| **9** | **Vercel** project + GitHub connect, env vars per-environment, `prisma migrate deploy` in build, domain + DNS, Vercel Analytics + Speed Insights, `pg_dump` GitHub Action, smoke test | 0.5 | **LIVE on your domain** |
| | **Total** | **~15.5 days** | |

Optional Phase 10 (blog engine, MDX editor, per-post analytics): +3 days.

**Milestone jo aap dekh sakte ho:** Phase 1 ke end pe hero ka live preview mil jaayega — yahi aapka main focus hai, to wo sabse pehle ban raha hai (setup ke turant baad). Feedback lekar aage badhenge.

---

## 13. Deployment — Vercel (serverless)

> **Revised 2026-08-31.** The original Coolify/VPS runbook is archived at §13.5 for reference only —
> do not follow it. Reason in the banner at the top of this file.

**Hosting:** Vercel, connected to the GitHub repo. `main` → production, every other branch → preview
deployment with its own URL. Builds run on Vercel's build machines; the VPS is never involved.

**Database:** Neon serverless Postgres, region closest to the audience (`ap-southeast-1` Singapore for
India traffic). Two connection strings are needed and they are not interchangeable:

| Env var | Neon host | Used by |
| --- | --- | --- |
| `DATABASE_URL` | `...-pooler.neon.tech` (PgBouncer) | Prisma Client at runtime |
| `DIRECT_URL` | `...neon.tech` (direct) | `prisma migrate` only |

```prisma
datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")     // pooled — runtime
  directUrl = env("DIRECT_URL")       // direct  — migrations
}
```

**This is the single most common way to break a serverless Prisma app.** Each concurrent function
invocation opens its own connection; without the pooler, Postgres runs out of connection slots and
requests start failing under load. Neon's free tier also auto-suspends the compute after inactivity, so
expect a cold-start of a few hundred ms on the first request — irrelevant for a portfolio, but worth
knowing before it looks like a bug.

**Migrations:** `prisma migrate deploy` in the Vercel build command, and `prisma generate` in
`postinstall` (Vercel caches `node_modules`, so a stale client is a real failure mode):

```json
"scripts": {
  "postinstall": "prisma generate",
  "build": "prisma migrate deploy && next build"
}
```

**Media:** Cloudinary. Signed uploads from the admin panel go browser → Cloudinary directly, so image
bytes never pass through a Vercel function (avoids the 4.5 MB serverless body limit entirely). Only the
resulting `public_id` and dimensions get stored in Postgres. Transformations happen on the URL
(`/f_auto,q_auto,w_1280/`), which replaces the whole `sharp` pipeline from §9 — no resize variants to
generate or store. `next.config.ts` needs `images.remotePatterns` for `res.cloudinary.com`.

**Analytics:** `@vercel/analytics` + `@vercel/speed-insights`, both mounted in the root layout. Cookieless,
so no consent banner needed. This replaces the `PageView` model in §6 — drop it unless per-project view
counters are wanted in the admin dashboard, in which case keep the table but write to it via a fire-and-
forget route handler.

**Env vars:** set in Vercel per-environment (Production / Preview / Development). `AUTH_URL` and
`NEXT_PUBLIC_SITE_URL` differ between production and previews — use Vercel's `VERCEL_URL` for previews
rather than hardcoding.

**Domain:** add it in Vercel, point the registrar's nameservers or an `A`/`CNAME` record as Vercel
instructs. SSL is automatic and auto-renewing.

**Backups:** Neon has point-in-time restore on its paid tiers; on free tier add a scheduled
`pg_dump` (GitHub Action, weekly, artifact retained) so there is at least one recovery path. Cloudinary
holds the only copy of uploaded originals — worth an occasional export.

**Cost:** Vercel Hobby ₹0 (personal, non-commercial), Neon free tier ₹0, Cloudinary free tier ₹0,
Resend free ₹0. Domain ~₹1,000/year. Note: Vercel's Hobby plan disallows commercial use — if this site
starts taking paid client work through it, Pro (~$20/mo) is required.

### 13.1 Environment variables

| Var | Example | Set where |
| --- | --- | --- |
| `DATABASE_URL` | `postgresql://…-pooler.ap-southeast-1.aws.neon.tech/portfolio?sslmode=require` | Vercel — **pooled host**, runtime |
| `DIRECT_URL` | `postgresql://…ap-southeast-1.aws.neon.tech/portfolio?sslmode=require` | Vercel — direct host, migrations only |
| `AUTH_SECRET` | `openssl rand -base64 32` | Vercel — rotate karne pe sab logout |
| `AUTH_URL` | `https://nitinkumawat.dev` | prod only; previews pe `VERCEL_URL` se derive |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | — | seed ke liye only, phir delete |
| `CLOUDINARY_API_SECRET` | — | **server only**, `NEXT_PUBLIC_` nahi |
| `CLOUDINARY_API_KEY` | — | server (signature banane ke liye) |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD` | `dxxxxxx` | client — loader URL me |
| `RESEND_API_KEY` | `re_…` | contact notifications |
| `CONTACT_TO_EMAIL` | `you@domain.com` | |
| `TURNSTILE_SITE_KEY` / `TURNSTILE_SECRET_KEY` | — | Cloudflare, free |
| `NEXT_PUBLIC_SITE_URL` | `https://nitinkumawat.dev` | OG / canonical |

Purane plan se hata: `UPLOAD_DIR` (koi disk nahi), `NEXT_PUBLIC_UMAMI_*` (Vercel Analytics ko config nahi chahiye). `.env` git me kabhi nahi; `.env.example` blank values ke saath commit hogi.

### 13.5 ARCHIVED — original VPS/Coolify plan (superseded, do not use)

<details>
<summary>Purana Coolify runbook — sirf reference ke liye. Follow NAHI karna.</summary>

#### 13.5.1 Pre-flight — ye output mujhe chahiye

VPS pe ye chala kar output bhej dena, phir main exact commands finalize kar dunga:

```bash
free -h && nproc && df -h /
lsb_release -a 2>/dev/null || cat /etc/os-release
docker --version 2>/dev/null || echo "no docker"
ss -tulpn | grep -E ':(80|443|8000|3000|5432)' || echo "ports free"
```

#### 13.5.2 Steps

1. **DNS** — domain ke A record VPS IP pe: `@` aur `www` (aur `analytics` subdomain Umami ke liye). TTL 300 initially.
2. **Server prep** — `apt update && apt upgrade`, non-root sudo user, SSH key-only (`PasswordAuthentication no`), UFW: 22/80/443 allow, baaki deny, `fail2ban` install.
3. **Coolify install** — `curl -fsSL https://cdn.coollabs.io/coolify/install.sh | sudo bash`. Dashboard `:8000` pe, turant admin account banao aur us port ko UFW se sirf apne IP tak restrict karo (ya Coolify ke apne domain + SSL ke peeche daalo).
4. **Postgres resource** — Coolify → New Resource → PostgreSQL 16. Strong password generate. **Internal network** pe rakho, host pe port expose **na** karo — app usi Docker network me hai.
5. **App** — New Resource → Public/Private Repository → GitHub connect → `portfolio` repo, branch `main`. Build pack: **Dockerfile** (Appendix A).
6. **Persistent volume** — `/data/uploads` mount karo. **Ye step miss karna sabse common blunder hai** — bina iske har redeploy pe saari uploaded images gayab.
7. **Env vars** — Section 13.4 ki list Coolify UI me. `DATABASE_URL` Postgres resource ke internal hostname se.
8. **Pre-deploy command** — `npx prisma migrate deploy` (Coolify me pre-deploy hook field hai).
9. **Health check** — path `/api/health`, interval 30s. Isse zero-downtime deploys milte hain: naya container healthy hone ke baad hi traffic switch hota hai.
10. **Domain + SSL** — app pe domain set karo, Coolify Let's Encrypt cert khud le lega aur auto-renew karega. `www` → apex redirect enable.
11. **Backups** — Postgres resource pe daily `pg_dump`, 14-day retention. Uploads ke liye ek scheduled task: `tar` + offsite copy (Backblaze B2 ya doosra VPS). **Restore ek baar test karo** — untested backup backup nahi hai.
12. **Umami** — New Resource → Umami, `analytics.<domain>` pe. Tracking script CSP me whitelist karo.
13. **Seed** — pehli deploy ke baad ek baar `npx prisma db seed` container me, phir admin password badal do.
14. **Smoke test** — Section 14 ki checklist.

#### 13.5.3 Resource plan (8 GB me kya kahan)

```
Coolify + Docker daemon    ~450 MB
Next.js standalone          ~280 MB
PostgreSQL 16               ~320 MB
Umami + its Postgres        ~280 MB
Caddy/Traefik (Coolify's)   ~60 MB
OS                          ~350 MB
─────────────────────────────────────
used                       ~1.70 GB
free                       ~6.30 GB   ← build headroom, spikes, future services
```
Build VPS pe hi ho jaayega comfortably. Swap 2 GB bana denge as insurance.

#### 13.5.4 Environment variables

| Var | Example | Notes |
| --- | --- | --- |
| `DATABASE_URL` | `postgresql://user:pw@portfolio-db:5432/portfolio` | Coolify internal hostname |
| `AUTH_SECRET` | `openssl rand -base64 32` | rotate karne pe sab logout |
| `AUTH_URL` | `https://yourdomain.com` | exact, trailing slash nahi |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | — | sirf seed ke liye, baad me remove |
| `UPLOAD_DIR` | `/data/uploads` | volume mount se match kare |
| `RESEND_API_KEY` | `re_…` | contact notifications |
| `CONTACT_TO_EMAIL` | `you@domain.com` | |
| `TURNSTILE_SITE_KEY` / `TURNSTILE_SECRET_KEY` | — | Cloudflare, free |
| `NEXT_PUBLIC_SITE_URL` | `https://yourdomain.com` | OG/canonical |
| `NEXT_PUBLIC_UMAMI_SRC` / `_WEBSITE_ID` | — | analytics |

`.env` git me kabhi nahi. `.env.example` sab keys ke saath (values blank) commit hogi.

</details>

---

## 14. QA checklist (ship se pehle)

**Hero (highest priority):** desktop pe lens smooth cursor follow · 3.5s idle pe hint dikhta hai · 2.5s idle pe drift shuru · hero se bahar jaate hi lens shrink · mobile pe auto-path teeno lines cross karta hai · touch pe lens ungli follow karta hai · release ke baad smoothly auto resume · reduced-motion pe static + REVEAL toggle · JS disable pe readable hero · real mid-range Android pe 58+ fps · DevTools paint-flashing me hero green nahi flash karta.

**Cross-browser:** Chrome/Edge (Win, Android), Safari (macOS + iOS 16+ — `mask-image` prefix aur `100svh` yahin test hote hain), Firefox (View Transitions fallback).

**Devices:** 360px (small Android), 390px (iPhone), 768px (iPad), 1280px, 1920px, aur ek 1024px **touch** tablet (cursor features off hone chahiye).

**Functional:** contact form success + validation errors + honeypot + rate limit · admin login + wrong password throttle · project create/edit/delete/reorder/publish · image upload (bada file reject, wrong type reject) · media delete jo project me use ho rahi hai (warning aaye) · settings se hero copy badal ke site pe reflect ho.

**Ops:** `/api/health` 200 · redeploy ke baad uploads intact (volume verify) · `pg_dump` restore ek staging DB pe test · SSL A+ (ssllabs) · security headers (securityheaders.com A) · 404 aur 500 pages styled hain · sitemap.xml sirf published projects dikhata hai · admin `noindex`.

---

## 15. Content — ye mujhe aapse chahiye

Code main likh dunga, lekin ye cheezein aapke paas hain:

1. **Hero copy** — base ki 3 lines + reveal ki 3 lines. Similar length rakho. (Placeholder: `I DESIGN / CALM / INTERFACES` ↔ `I SHIP / FAST / PRODUCTS`)
2. **Naam + wordmark** ka exact spelling/casing.
3. **Bio** — ek short (2–3 line, home pe) aur ek long (about page).
4. **"Currently" line** — abhi kya bana rahe ho / seekh rahe ho.
5. **Projects** — 3 se 6, har ek ke liye: title, 1-line summary, year, aapka role, stack, live/repo links, aur 2–5 screenshots (jitni high-res mil sake).
6. **Skills** — naam + category + 1–5 level.
7. **Experience/education** — company, role, dates, 2-line description.
8. **Portrait photo** — high-res; grayscale main kar dunga.
9. **Résumé PDF** (optional).
10. **Contact email**, socials (GitHub, LinkedIn, X, Instagram — jo chaho).
11. **Domain naam** (agar khareed liya hai). Accounts jo Phase 9 se pehle bana lena: **Vercel**, **Neon**, **Cloudinary**, **Resend**, **Cloudflare** — sab free tier, koi card nahi chahiye.

Ye sab ek baar me nahi chahiye — Phase 1 ke liye sirf #1 aur #2 kaafi hai. Phase 3 tak baaki de dena.

---

## 16. Cost

> Revised 2026-08-31 — serverless. VPS row hat gayi kyunki VPS is project me involved hi nahi hai.

| Item | Tier | Cost |
| --- | --- | --- |
| Vercel (hosting, builds, edge, SSL) | Hobby | ₹0 |
| Vercel Analytics | Hobby — 2,500 events/mo | ₹0 |
| Neon Postgres | Free — 0.5 GB, autosuspend | ₹0 |
| Cloudinary | Free — 25 credits/mo | ₹0 |
| Resend (contact email) | Free — 3,000/mo | ₹0 |
| Cloudflare (DNS + Turnstile) | Free | ₹0 |
| Geist font | Open source | ₹0 |
| Domain | — | ~₹900–1,200/year |
| **Total recurring** | | **~₹1,000/year** |

Recurring cost purane plan ke barabar hai, lekin **CafeLuxe aur client sites ka blast radius zero ho gaya** — asli fayda yahi hai, paisa nahi.

**Kab paisa lagega (honest limits):** Vercel Hobby commercial use allow nahi karta — agar portfolio se paid client work bechna shuru karo to Pro (~$20/mo) technically required hai. Analytics 2,500 events/mo pe cap hoti hai; usse aage Pro. Neon free branch 0.5 GB — portfolio ke text data ke liye kabhi nahi chhuegi. Cold start: Neon autosuspend se pehli query ~500 ms slow ho sakti hai; isse chhupane ke liye home page ISR pe hai, to visitor ko cold start dikhta hi nahi.

---

## 17. Risks & mitigations

| Risk | Likelihood | Mitigation |
| --- | --- | --- |
| Lens 60fps miss on low-end Android | Medium | Counter-translate technique (compositor-only) + 4-step fallback ladder (4.7) + real device test in Phase 1 |
| Monochrome "flat" lag sakta hai | Medium | Grain texture, extreme type-scale contrast, mono-vs-sans as pseudo-accent, motion as hierarchy — Section 2 me deliberately addressed |
| iOS Safari `mask-image` / `100vh` bugs | High | `-webkit-` prefixes, `100svh`, real iOS device test mandatory in Phase 1 |
| Uploads redeploy pe gayab | ~~High~~ **N/A** | Cloudinary pe files Vercel ke bahar hain — persistent-volume problem hi khatam (§9.1) |
| Prisma connection slots exhaust (serverless) | **High if missed** | Neon **pooled** `DATABASE_URL` + alag `directUrl` migrations ke liye; global PrismaClient singleton (§13) |
| Upload 4.5 MB pe `413` fail | High if missed | Browser→Cloudinary direct signed upload, Vercel function body bypass (§9.1) |
| Vercel Hobby commercial-use clause | Low | Paid client work bechne lage to Pro pe move (§16) |
| Lenis + Motion scroll conflict | Medium | Single scroll source of truth, Lenis value ko Motion me feed karna (Section 5) |
| Content ready na hona → project ruk jaana | **High** | Seed data se site bhari dikhti hai; content ko Phase 3 tak defer kar sakte ho |
| Scope creep (blog, i18n, dark/light toggle) | Medium | Phase 10 me park kiya, v1 me nahi |

---

## Appendix A — ARCHIVED Dockerfile (superseded, do not use)

> Vercel apna build karta hai — is project me koi Dockerfile nahi chahiye. Sirf reference ke liye rakha hai.

<details>
<summary>Purana multi-stage Dockerfile</summary>

```dockerfile
FROM node:22-alpine AS base
RUN apk add --no-cache libc6-compat

FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
COPY prisma ./prisma
RUN npm ci && npx prisma generate

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build                      # next.config: output: 'standalone'

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 PORT=3000
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/prisma ./prisma
RUN mkdir -p /data/uploads && chown -R nextjs:nodejs /data/uploads
USER nextjs
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s \
  CMD wget -qO- http://127.0.0.1:3000/api/health || exit 1
CMD ["node", "server.js"]
```

Final image ~180 MB (standalone output se `node_modules` ka bulk nahi aata).

</details>

## Appendix B — ARCHIVED plain Docker Compose (superseded, do not use)

<details>
<summary>Coolify ke bina VPS deploy — sirf reference ke liye</summary>

`docker-compose.yml` me teen services: `web` (upar ka Dockerfile), `db` (`postgres:16-alpine`, named volume), `caddy` (auto-HTTPS reverse proxy, 3-line Caddyfile). Deploy: `git pull && docker compose up -d --build && docker compose exec web npx prisma migrate deploy`. Backups ek cron `pg_dump` script se. ~400 MB kam RAM, lekin GUI, rollback aur auto-backup manually manage karne padenge.

</details>

## Appendix C — Verification log

Ye plan review kiya gaya, sirf likha nahi. Jo check hua aur jo **badla** gaya:

**1. Contrast ratios — 3 values galat thi, fix ki gayi.**
WCAG 2.x relative-luminance formula se compute kiya. Pehle likhi gayi values: ink-300 `7.4` → actual **8.08**, ink-400 `4.6` → **5.16**, ink-500 `2.6` → **3.05**. Teeno under-estimated the. Consequence positive nikla: ink-400 normal-size text pe bhi AA pass karta hai (pehle "meta only, 14px+" likha tha — wo restriction hata di), aur ink-500 large text pe AA se bilkul pass kar jaata hai. ink-white/100/200 aur inverted layer ki values sahi thi.

**2. Internal inconsistency — hero base layer ka color.**
Section 2.1 kehta tha base layer `ink-600` pe hai aur `aria-hidden` hoga; Section 4 kehta tha wo asli readable `<h1>` hai. Dono ek saath sach nahi ho sakte (`ink-600` = 1.88:1, fail). Resolve: base layer **`ink-100` (16.63:1)** pe hai aur wahi real `<h1>` hai. `ink-600` ka use non-hovered work-row titles ko reassign kiya.

**3. Lens transform math — REAL BUG mila, fix hua.**
Original spec me `transform-origin` specify nahi kiya tha, aur `px = cursorX − half` likha tha. CSS ka default `transform-origin: 50% 50%` hai, aur us case me counter-scale ek residual offset `(s−1)·(C_inner − C_lens)` chhod deta hai. Numerically verify kiya: open animation ke dauraan revealed content base se **503 px tak khisak** raha tha, aur sirf `s = 1` pe align ho raha tha. Fix: dono elements pe `transform-origin: 0 0` **aur** `px = cursorX − s·half`. Re-verified — error har `s` pe exactly 0.00 px. Section 4.2.1 me poora table aur proof.

**4. `1/s` division blow-up — guard add hua.**
`s → 0` (lens closed) pe counter-scale `Infinity` ho jaata. rAF loop me `s < 0.02` pe early-return + `opacity: 0` add kiya.

**5. Prisma `@@index([tags])` — invalid tha.**
Postgres array field pe plain `@@index` Prisma me valid nahi hai; GIN index ke liye explicit form chahiye. Corrected to `@@index([tags(ops: ArrayOps)], type: Gin)`.

**6. CSP `script-src 'unsafe-inline'` — security weakness thi, fix ki.**
Wo CSP ki XSS protection ko effectively nullify kar deta hai. Replace kiya per-request **nonce + `'strict-dynamic'`** se, aur header ko `next.config.ts` se `middleware.ts` me move kiya (nonce per-request dynamic hona chahiye). `style-src 'unsafe-inline'` rehna padta hai (Tailwind + Motion inline styles likhte hain) — ab explicitly documented trade-off hai. Server Actions ka CSRF posture bhi add kiya.

**7. View Transitions claim — overconfident tha, soften kiya.**
Next.js ka native View Transitions integration abhi experimental hai. Primary approach Motion `AnimatePresence` (stable) kar diya, VT ko optional Phase 8 upgrade banaya.

**8. Arithmetic cross-checks — sab consistent.**
Roadmap phase days ka sum = **16.5** ✓ (table ka claim match karta hai). RAM: 1,740 MB used → 1.70 GB (table 1.75 se 1.70 kar di), free 6.30 GB. JS budget: 18 + 6 + 45 = 69 KB known libs, 130 KB budget me app ke liye 61 KB headroom — realistic. Lens sizes 4.1 / 4.2 / 4.5 me consistent (380 desktop / 240 mobile; rejected clip-path snippet me `circle(190px)` = same 380px diameter ✓).

**9. Prisma relations — validate kiya, sahi hain.**
`Media` ke 6 back-relations (`cover`, `og`, `gallery`, `resume`, `siteOg`, `avatar`) apne opposite fields ke saath correctly paired hain. Unnamed `ProjectMedia` relation ambiguous nahi hai kyunki `Media` aur `Project` dono me us model ka ek hi relation field hai. `SiteSetting` ka `id Int @id @default(1)` singleton pattern valid hai.

**10. UNVERIFIED — ye Phase 0/1 me actually chala kar confirm karna hoga:**
Exact npm package versions aur API signatures (Tailwind v4 `@theme` + `--color-*: initial` palette reset, `geist` package ke font exports, Motion ka `useAnimationFrame`, Auth.js v5 credentials API, `@node-rs/argon2` param names) — ye sab May 2025 ke baad ke releases pe depend karte hain, to Phase 0 me `npm install` ke baad docs se verify karenge, plan ke bharose nahi. Real-device 58 fps claim bhi ek actual mid-range Android pe measure hoga (Section 4.7), predict nahi kiya ja sakta.


**11. Architecture revision sweep — 2026-08-31 (post-decision consistency pass).**
Serverless pe switch karne ke baad poori file grep ki gayi (`Coolify`, `Umami`, `sharp`, `/data/uploads`, `UPLOAD_DIR`, `Dockerfile`, `docker-compose`, `8 GB`) taaki koi contradictory instruction na reh jaaye. Jo actually badla, section-wise: §0 decisions table, §1.4 (Postgres → Neon + singleton gotcha), §1.5 (Coolify → Vercel), §6 `PageView` comment, §7 (`/api/media/upload` → `sign` + `confirm`; `/api/health` "Coolify probe" → uptime monitor), §8 CSP (`img-src`/`connect-src`/`frame-src` hosts + upload hardening rewrite), §9 (poora Cloudinary pipeline), §10 (Dockerfile/compose rows hataye), §11.1 TTFB rationale, §12 (Phase 3/5/9 + total), §13 (naya Vercel plan + §13.1 env vars), §15 item 11, §16 cost table, §17 risks (3 naye rows: connection-slot exhaustion, 4.5 MB upload limit, Hobby commercial clause), Appendix A/B/D.

Roadmap total dobara add kiya: 1 + 2 + 2.5 + 1.5 + 2.5 + 1.5 + 1.5 + 1 + 1.5 + 0.5 = **15.5 days** ✓ (pehle 16.5 tha — `sharp` pipeline hatne se Phase 5 aadha din kam, Vercel deploy se Phase 9 aadha din kam).

Purana content **delete nahi kiya**, `<details>` blocks me archive kiya (§9.6, §13.5, Appendix A, Appendix B) — 4 blocks, tag balance verified. Reason: agar kal koi kahe "pehle kya socha tha", wo record chahiye; lekin heading me ARCHIVED + "do not use" likha hai taaki galti se follow na ho.

**Ek cheez jo abhi bhi UNVERIFIED hai:** Cloudinary ke signed-upload param names aur Neon ke pooled-host URL ka exact format — dono May 2025 ke baad badle ho sakte hain. Phase 3/5 me actual dashboard se copy karenge, plan ke bharose nahi.

---

## Appendix D — Open decisions (aapka input chahiye)

1. **Admin scope** — maine **Full site CMS** maan liya hai (blog ke bina). Sirf projects ka CRUD chahiye to Phase 5 se ~1.5 din bach jaayenge.
2. ~~**Deploy**~~ — **DECIDED 2026-08-31: Vercel.** VPS off the table (banner + §1.5). Closed.
3. **Folder** — `N:\Projects\portfolio` use kiya. Naam badalna ho to bata do.
4. **Hero copy** — Step 2 brief se aa gaya: base `I DESIGN / CALM / INTERFACES`, lens `I SHIP / FAST / PRODUCTS`. Final maanein ya tweak karna hai?
5. **Italic serif accent** — contact section me ek word. Rakhein ya pure sans hi rahe? (Note: Step 1 me sirf Geist Sans + Mono install ho rahe hain, to serif chahiye to ek font add karna padega.)
6. **Own analytics table** — Vercel Analytics site-wide traffic cover kar leti hai. `PageView` table ab sirf tab chahiye agar admin dashboard me **per-project view counter** chahiye. Drop kar dein?
7. **Media host** — maine **Cloudinary** chuna (`f_auto` ki wajah se, §9.5). Supabase already use karte ho to bata do, switch kar sakte hain.
