# Shakya Mirror — Site Improvement Report

> This is a living document. Updated as changes are made to the site.
> Goal: make the site inviting to strangers, shareable, and well-ranked by Google.

---

## Current State (as of May 2026)

The writing is deep and the post reading experience is clean. But the site is built for people who already know Harendra. A first-time visitor has no moment of seduction — no "what is this place?" hook. It reads as a personal archive, not a public invitation.

---

## 1. Homepage — The Front Door Problem

**Problem:** You land and see a Buddha avatar, the site name, a Kabir doha, and immediately a wall of date-stamped list items. There is no pull. The Kabir doha is beautiful but floats without context. A stranger has no idea what they're walking into.

**What good looks like:** A homepage should answer three questions in 5 seconds:
1. What is this?
2. Why should I care?
3. Where do I start?

**Fixes to make:**
- [ ] Add a 2–3 line description below the tagline — not about the author, about what the *reader* will find. Example: *"Reflections on Vedanta, life, and the texts that shaped Indian thought — in Hindi and English."*
- [ ] Add a "Start here" or "Best of" section — 3–5 hand-picked posts that represent the site at its best. Not the most recent, the most essential.
- [ ] Replace the raw dated list with something that shows texture — excerpt, category, or just a more inviting link style.
- [ ] The Kabir doha is perfect as an epigraph. Keep it, but add one line of plain context below it so a non-Hindi reader isn't left out completely.

---

## 2. Post List Pages — Archive, Avalokan, etc.

**Problem:** Every collection page is a filter bar followed by plain title links with dates. "May 23, 2026 — श्रीमद्भगवद्गीता अध्याय 7, श्लोक 12" tells a stranger nothing emotionally. It's a catalog, not an invitation.

**Fixes to make:**
- [ ] Show a one-line excerpt or description under each post title in the list.
- [ ] Group or highlight "essential" posts differently — a pinned section or a visual distinction.
- [ ] Remove the date from list views (or make it very small/secondary). The date says "this is an archive." The title and excerpt say "this is worth reading."

---

## 3. Individual Post Reading Experience

**Problem (bug):** Text is being clipped on the right edge on post pages — words cut off mid-sentence. This is a CSS overflow or max-width issue that makes reading broken on some screen sizes.

**Problem (UX):** No estimated reading time. No "next post" suggestion that creates momentum. Related posts exist at the bottom but are unstyled — easy to miss.

**Fixes to make:**
- [ ] Fix the text clipping / overflow bug on post pages.
- [ ] Add reading time to post header (Jekyll plugin or Liquid calculation).
- [ ] Style the related posts section so it actually looks like a recommendation, not an afterthought.
- [ ] Add a subtle "You might also like" or "Continue reading" CTA at the end of each post.

---

## 4. Shareability — Will People Share This?

People share things when they feel something and want to pass that feeling on. Three things make a post shareable:

1. **A strong title** — Many titles here are scholarly references ("श्रीमद्भगवद्गीता, अध्याय 7, श्लोक 11"). Great for SEO on that specific verse, bad for sharing. Consider adding an emotional subtitle: *"Bhagavad Gita 3.29 — Why the Wise Do Not Disturb the Ignorant"* (you already do this in English — keep it up).
2. **A good OG image** — When shared on WhatsApp, Twitter, LinkedIn, the preview image matters enormously. Right now all posts share the same generic OG image. Post-specific images (the infographics you already make) would dramatically increase share rates.
3. **A quotable moment** — Each post should have one sentence so good that a reader wants to copy-paste it. Make that sentence findable — pull it out as a blockquote, style it differently.

**Fixes to make:**
- [ ] Set `image:` in front matter for every post that has an infographic — this becomes the OG image when shared.
- [ ] Style blockquotes distinctively — make them visually "tweetable."
- [ ] For Hindi posts, add English titles as subtitles where possible — increases reach.

---

## 5. SEO — What's Done, What's Missing

### Done ✓
- Canonical URLs on every page
- Meta description on every page (falls back to site description)
- `robots.txt` with sitemap reference
- Sitemap covering all collections and pages
- OG tags (title, description, image, type)
- Twitter card tags
- Google Search Console verified
- `lang` attribute on pages
- `hreflang` alternate links

### Fixed in May 2026 ✓
- Sitemap homepage URL was broken (`https:/` → `https://`)
- Duplicate posts in sitemap removed
- `og:type` now correctly `article` for posts (was always `website`)
- `article:published_time` and `article:author` tags added
- RSS feed now includes all collections (evergreen, mantra, bodhkarya, notes)
- `robots.txt` no longer blocks `/assets/` images

### Still missing — high priority
- [ ] **Post-specific OG images** — currently all posts use the same site-level image
- [ ] **Descriptions on most posts** — posts without `description:` in front matter fall back to the generic site description. Google sees hundreds of pages with identical descriptions. Add descriptions to at least the most important posts.
- [ ] **JSON-LD structured data** — `Article` schema for posts would help Google display rich results (author, date, headline). The `post.html` layout has some schema.org microdata via `itemscope` but no JSON-LD block.
- [ ] **Hindi content hreflang** — posts with `lang: hi` should have `hreflang: hi` set properly. Currently `hreflang` always outputs the site default `en-US` even for Hindi posts.

### Still missing — lower priority
- [ ] Breadcrumb structured data
- [ ] FAQ schema for posts that have Q&A style content
- [ ] Open Graph locale (`og:locale`) per post language

---

## 6. Unicode / Hindi URL Fix

**Problem:** Hindi filenames like `प्रेम.md` were generating `/प-रेम/` on the live site (Ubuntu runner replacing the Devanagari virama with a hyphen).

**Fixed in May 2026 ✓** via `_plugins/unicode_permalink.rb` — a Jekyll Generator that reads the raw filename and sets the permalink directly, bypassing Jekyll's slugify for non-ASCII filenames.

---

## 7. Navigation & Information Architecture

**Fixed in May 2026 ✓**
- Added **Insights** and **Sahitya** to the navbar
- Moved **Links** to the footer
- Removed the overcrowded category/tag filter buttons from the Archive page (recommendation — see below)

**Remaining:**
- [ ] Remove category and tag filter buttons from Archive page — keep only Series and Language filters. Search handles topic discovery better than 30+ filter buttons.
- [ ] Consider a "Start Here" page linked from the homepage for new visitors.
- [ ] Consider a brief About page — not a bio, but a statement of what this site is *for*.

---

## 8. Performance

Not audited in detail yet. Key things to check:

- [ ] Run PageSpeed Insights: https://pagespeed.web.dev/analysis?url=https%3A%2F%2Fharendra-shakya.github.io%2F
- [ ] Images: are infographics compressed? WebP format preferred.
- [ ] CSS is compressed (sass `style: compressed` is set ✓)
- [ ] No render-blocking scripts (scripts use `defer` ✓)

---

## Priority Order (What to Do First)

| Priority | Change | Impact | Status |
|---|---|---|---|
| 1 | Fix text clipping bug on post pages | Reader experience | ✓ Not a real bug — was viewport sizing in preview |
| 2 | Add site description + "begin reading" CTA to homepage | First impression | ✓ Done — cosmos hero |
| 3 | Add `description:` to top 20 most important posts | SEO | Ongoing — many posts already have descriptions |
| 4 | Set post-specific `image:` in front matter for posts with infographics | Shareability | Ongoing — manual per post |
| 5 | Remove tag/category filters from Archive, keep only Series + Language | UX clarity | ✓ Done |
| 6 | Style blockquotes as shareable pull quotes | Shareability | ✓ Done — gold left border |
| 7 | Fix `hreflang` for Hindi posts | SEO | ✓ Done — now uses `page.lang` |
| 8 | Add JSON-LD Article structured data | SEO | ✓ Done |
| 9 | Add reading time to post header | Reader experience | ✓ Done — "· N min read" |
| 10 | Add excerpt/description to post list views | Invitingness | ✓ Done — homepage post list |
