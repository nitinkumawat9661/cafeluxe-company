# TrustFirst Sanity CMS Setup

This project has a Sanity CMS foundation for future blog posts, case studies, resources, services, testimonials, FAQs, media/images and site settings.

## 1. Create a Sanity project

Create a Sanity project from the Sanity dashboard or CLI. Use the dataset name `production` unless you intentionally choose another dataset.

Required values:

- `NEXT_PUBLIC_SANITY_PROJECT_ID`: the Sanity project ID from your Sanity dashboard.
- `NEXT_PUBLIC_SANITY_DATASET`: usually `production`.
- `NEXT_PUBLIC_SANITY_API_VERSION`: use `2026-01-01` unless the project intentionally upgrades API behavior.

## 2. Add environment variables

Local development:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-01-01
```

Vercel:

Add the same variables in the Vercel project settings for Production, Preview and Development environments.

Do not commit `.env.local`.

## 3. Open Sanity Studio

Start the site:

```bash
npm run dev
```

Open:

```text
http://localhost:3000/studio
```

Sanity may ask you to log in and allow the local URL as a CORS origin.

## 4. Create the first blog post

1. Open `/studio`.
2. Choose `Blog Post`.
3. Add a title.
4. Generate or type a slug.
5. Add excerpt, body and featured image.
6. Add alt text for every uploaded image.
7. Set `Status` to `Published`.
8. Fill SEO title, SEO description and OG image when available.

Public blog pages are not connected to CMS content yet. This Phase 2 setup only creates the admin foundation and query helpers.

## 5. Publish and unpublish content

For Blog Posts, Case Studies and Resources, use the `Status` field:

- `draft`: not intended for public display
- `published`: ready for future public queries

For Services, Testimonials and FAQs, use the `Published` boolean.

## 6. Image guidance

Upload original, clear images where possible. Always fill image alt text with a short description of what the image shows. Avoid uploading private client material unless you have permission to publish it.
