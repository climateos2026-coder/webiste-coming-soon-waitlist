# ClimateOS 2026 Website Implementation Plan

## Critical Fixes (Must Fix Before Launch)

### Fix #01: `.env` File Security
- Remove `.env` from git tracking: `git rm --cached .env`
- Add `ADMIN_SECRET` to `.env.example` with documentation
- Rotate all real credentials if they were ever committed

### Fix #02: Middleware Implementation
- Rename `proxy.ts` → `middleware.ts`
- Change `export function proxy` → `export function middleware`
- Remove `X-XSS-Protection` (deprecated)
- Add `X-Frame-Options: DENY` to `next.config.ts` headers
- Ensure CSRF and security headers work properly

### Fix #03: OG Image
- Generate a proper 1200×630px branded OG image (`public/og-default.png`)
- Consider adding page-specific OG images using `ImageResponse`

### Fix #04: `animate-ticker` Class Fix
- Change `animate-ticker` to `ticker` in `components/sections/climate-ticker.tsx` line 22
- OR register the animation in Tailwind config

### Fix #05: Main Content ID for Skip Link
- Add `id="main-content"` to all `<main>` elements:
  - `app/page.tsx` home page
  - `app/tracks/TracksClient.tsx`
  - `app/faq/FAQClient.tsx`
  - `app/recruitment/RecruitmentClient.tsx`
  - `app/terms/page.tsx`
  - `app/privacy/page.tsx`
  - `app/timeline/page.tsx`
  - `app/sponsors/page.tsx`

### Fix #06: Semantic HTML - Footer Outside Main
- Move `<Footer />` outside `<main>` in:
  - `app/tracks/TracksClient.tsx`
  - `app/faq/FAQClient.tsx`
  - `app/recruitment/RecruitmentClient.tsx`
  - `app/terms/page.tsx`
  - `app/privacy/page.tsx`
  - `app/timeline/page.tsx`
  - `app/sponsors/page.tsx`

### Fix #07: ParticipantCounter Fake Count
- Remove hardcoded `1247` fallback
- Return neutral state (`null` or empty) when Supabase fails

## High Priority Fixes (1-2 Weeks)

### Fix #08: Recruitment Modal Accessibility
- Add `role="dialog"`, `aria-modal="true"`, `aria-labelledby`
- Implement focus trap on modal
- Add Escape key handler
- Return focus to trigger button on close

### Fix #09: ClimateTicker ARIA Attributes
- Remove `role="marquee"` (deprecated/non-standard)
- Remove `aria-live="polite"` (causes screen reader spam)
- Add `aria-hidden="true"` for decorative ticker

### Fix #10: CountdownTimer UTC Label
- Make UTC time label dynamic based on phase target date
- Use `formatUTC` utility function

### Fix #11: Google Fonts Import
- Replace Google Fonts `@import url(...)` with `next/font/google`
- Remove external network request for fonts

### Fix #12: Sitemap Missing Routes
- Add missing routes to `app/sitemap.ts`:
  - /blog, /about, /contact, /judging, /mentors, /press, /prizes, /schedule, /community, /register, /resources, /code-of-conduct

### Fix #13: Footer Email Link
- Change plain text email to `mailto:` link in `components/layout/footer.tsx`

### Fix #14: FAQ ID Generation
- Use `useId()` from React instead of string manipulation

## Medium Priority Fixes

### Fix #15: Container Component
- Use `cn()` utility instead of template string in `components/layout/container.tsx`

### Fix #16: WaitlistSection useEffect
- Remove `showDirectLink` from dependency array
- Use `useRef` or initialize from localStorage

### Fix #17: ParticipantCounter Supabase Client
- Create single client instance outside effect
- Memoize client with `useMemo`

### Fix #18: ClimateGlobe Accessibility
- Add `aria-hidden="true"` to canvas (decorative)

### Fix #19: CSP unsafe-inline
- Implement nonce-based CSP for inline scripts
- Remove `'unsafe-inline'` from CSP

### Fix #20: Font Utility Conflicts
- Rename `.font-display`, `.font-stat`, `.font-mono` in globals.css to avoid Tailwind conflicts

### Fix #21: animate-spin-slow
- Add to globals.css keyframes or Tailwind config

### Fix #22: vercel.json /waitlist Rewrite
- Handle hash fragment properly for scroll to anchor

## Tests & Infrastructure

### Fix #23: NoTest Suite
- Add unit tests for `lib/utils.ts` functions
- Add integration tests for ParticipantCounter
- Add form validation tests
- Add axe accessibility tests for pages

### Fix #24: No loading.tsx
- Add loading.tsx files for streaming UX

### Fix #25: noscript Fallback
- Add `<noscript>` tag in layout.tsx

## New Features

### Feature #26: JSON-LD Structured Data
- Add Event schema markup to layout.tsx

### Feature #27: Preconnect Hints
- Add `<link rel="preconnect">` for fonts.googleapis.com, fonts.gstatic.com, Supabase

### Feature #28: Touch Events for Globe
- Add touch event handlers to ClimateGlobe

## Low Priority Polish

### Fix #29: package.json Typo
- Change `webiste` to `website` in name field

### Fix #30: Apple Touch Icon
- Create 180×180px apple-touch-icon.png

## Files to Create

1. `middleware.ts` (renamed from proxy.ts)
2. `public/og-default.png` (1200×630px)
3. `public/apple-touch-icon.png` (180×180px)
4. Loading states:
   - `app/loading.tsx`
   - `app/tracks/loading.tsx`
   - `app/faq/loading.tsx`
   - `app/recruitment/loading.tsx`
5. `app/waitlist/page.tsx` (for /waitlist route handling)
6. Tests:
   - `tests/utils.test.ts`
   - `tests/participant-counter.test.ts`
   - `e2e/waitlist-flow.spec.ts`
   - `e2e/accessibility.spec.ts`

## Execution Order

1. **Security First**: Fix middleware and remove .env from git
2. **Accessibility**: Add main-content ID, fix footer placement, fix ARIA
3. **Visual Fixes**: OG image, ticker animation, colors
4. **Content Fixes**: Participant counter, countdown timer
5. **Infrastructure**: Sitemap, fonts, CSP
6. **Tests**: Create comprehensive test suite
7. **Final Polish**: Noscript, apple icon, preconnect, JSON-LD