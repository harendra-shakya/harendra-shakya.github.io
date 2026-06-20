# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into Shakya Mirror, a Jekyll static site. Because this is a static site (no runtime Ruby server), all event tracking is client-side: a PostHog JS snippet was added to a shared `_includes/posthog.html` include, which is referenced from `_includes/footer.html` (covering all standard layouts) and from the two standalone pages that bypass the default layout (`pages/inquiry.html` and `pages/drop-the-rock.html`). The PostHog token and host were added as `posthog_token` and `posthog_host` variables in `_config.yml` so templates can reference them via Liquid. Environment variables were written to `.env` for local reference.

Ten custom events were instrumented across four JavaScript files, covering the site's three interactive features (the self-inquiry experience, the homepage video, and the post filter system) plus user navigation signals (tag clicks, related post links, backlinks, and theme toggle).

| Event | Description | File |
|---|---|---|
| `inquiry_started` | User begins the interactive self-inquiry consciousness experience | `assets/js/inquiry.js` |
| `inquiry_choice_selected` | User selects a choice during the inquiry questionnaire | `assets/js/inquiry.js` |
| `inquiry_completed` | User reaches the end of the inquiry and sees their dominant pattern result | `assets/js/inquiry.js` |
| `video_played` | User plays the paused homepage video | `assets/js/cosmos-video.js` |
| `video_unmuted` | User unmutes the homepage background video | `assets/js/cosmos-video.js` |
| `post_filter_applied` | User applies a language, tag, category, or series filter on the posts page | `assets/js/post-filters.js` |
| `theme_toggled` | User switches between dark and light mode | `assets/js/main.js` |
| `tag_clicked` | User clicks a category or tag link from a post page | `assets/js/main.js` |
| `related_post_clicked` | User clicks a related post link shown at the bottom of a post | `assets/js/main.js` |
| `backlink_clicked` | User clicks a backlink reference in a post | `assets/js/main.js` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- **Dashboard:** [Analytics basics (wizard)](https://eu.posthog.com/project/206475/dashboard/762871)
- [Inquiry: Started vs Completed](https://eu.posthog.com/project/206475/insights/lb3Cdgfc) — unique users who started vs completed the inquiry
- [Content Discovery Clicks](https://eu.posthog.com/project/206475/insights/jIxtO0Ae) — tag, related post, and backlink click trends
- [Homepage Video Engagement](https://eu.posthog.com/project/206475/insights/eF424n5P) — visitors who played or unmuted the homepage video
- [Post Filter Usage](https://eu.posthog.com/project/206475/insights/bIj3oteG) — how often visitors filter the posts page
- [Inquiry Choice Selections](https://eu.posthog.com/project/206475/insights/iLkmE5Nb) — total choices made during the inquiry

## Verify before merging

- [ ] Run a full production build (`bundle exec jekyll build`) and fix any lint or template errors introduced by the generated code.
- [ ] Run the test suite — call sites that were rewritten or instrumented may need updated mocks or fixtures.
- [ ] Add `POSTHOG_PROJECT_TOKEN` and `POSTHOG_HOST` to `.env.example` (if one exists) and any onboarding scripts so collaborators know what to set.

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.
