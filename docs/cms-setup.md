# TrustFirst Sanity CMS Setup

This project has a Sanity CMS foundation for future blog posts, case studies, resources, services, testimonials, FAQs, media/images and site settings.

## 1. Create a Sanity project

Create a Sanity project from the Sanity dashboard or CLI. Use the dataset name `production` unless you intentionally choose another dataset.

Required values:

- `NEXT_PUBLIC_SANITY_PROJECT_ID`: the Sanity project ID from your Sanity dashboard.
- `NEXT_PUBLIC_SANITY_DATASET`: usually `production`.
- `NEXT_PUBLIC_SANITY_API_VERSION`: use `2026-01-01` unless the project intentionally upgrades API behavior.
- `SANITY_PREVIEW_SECRET`: a private random string used to enable Draft Mode preview.
- `SANITY_API_READ_TOKEN`: a Sanity read token that can read draft documents.

## 2. Add environment variables

Local development:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-01-01
SANITY_PREVIEW_SECRET=use-a-long-random-secret
SANITY_API_READ_TOKEN=your-sanity-read-token
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

Published Blog Posts, Case Studies, Resources and Services are shown on the public website when their required fields are filled and their publish controls are enabled.

## 5. Publish and unpublish content

For Blog Posts, Case Studies and Resources, use the `Status` field:

- `draft`: not intended for public display
- `published`: ready for future public queries

For Services, Testimonials and FAQs, use the `Published` boolean.

## 6. Preview unpublished content

Draft Mode lets editors preview unpublished Blog Posts, Case Studies, Resources and Site Settings without publishing them.

Required setup:

1. Create a Sanity API token with read access.
2. Add `SANITY_API_READ_TOKEN` and `SANITY_PREVIEW_SECRET` locally and in Vercel.
3. Keep both values private. Do not expose them in client-side code.

Local preview workflow:

```text
http://localhost:3000/api/draft/enable?secret=YOUR_SECRET&slug=/blog/your-post-slug
http://localhost:3000/api/draft/enable?secret=YOUR_SECRET&slug=/work/your-case-study-slug
http://localhost:3000/api/draft/enable?secret=YOUR_SECRET&slug=/resources/your-resource-slug
http://localhost:3000/api/draft/enable?secret=YOUR_SECRET&slug=/services/your-service-slug
```

Production preview workflow:

```text
https://your-production-domain/api/draft/enable?secret=YOUR_SECRET&slug=/blog/your-post-slug
```

When preview is active, a small `Preview Mode Enabled` banner appears with an `Exit Preview` button. Public visitors who do not have Draft Mode enabled will continue seeing only published content.

If the secret is invalid, the preview endpoint returns `401`. If the preview token or secret is not configured, it returns a server configuration error instead of enabling preview.

## 7. Image guidance

Upload original, clear images where possible. Always fill image alt text with a short description of what the image shows. Avoid uploading private client material unless you have permission to publish it.
