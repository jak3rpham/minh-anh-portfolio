# Minh Anh portfolio — 2026-09-25

## Approved direction
User approved a bright, creative, cute scrapbook redesign. Cream paper, peach,
butter yellow and leafy green; portrait collage, handwritten notes, Polaroid
personal photos. Keep real campaign content and readable recruiter navigation.

## Implementation
- Static HTML/CSS/JS, no new dependencies.
- `index.html`: new hero and section headings; work now precedes experience.
- `assets/css/scrapbook.css`: art direction and responsive overrides, loaded after
  the original base stylesheet. Edit this file for the current visual design.
- Light is the default; optional dark mode uses `ma-scrapbook-theme` storage key.
- All seven project galleries and existing published-post links retained.
- Favicon and browser theme colors updated.

## Verification performed
- Visually reviewed desktop hero, projects and hobbies; mobile hero, projects and contact.
- Checked document width at 320, 375, 768 and 1440px: no horizontal overflow.
- Opened and closed all seven galleries on mobile.
- YSL next-page button advanced 1 of 9 to 2 of 9; Escape closed the dialog.
- Theme toggle changed to dark and back to light.
- No browser console errors observed.
- Static validation: 84 local asset references exist, including all 42 gallery
  images; no missing anchor targets or duplicate IDs. JS syntax check passed.
- External published-post destinations were preserved, not independently checked.

## Follow-up session (same day)
Fixed: the butter sticker in the hero collage covered 44% of the polaroid caption
"Minh Anh, in her element." on desktop and 65% on mobile.
- Desktop (>=901px): caption right-aligned, sticker shifted to `left: -1.4rem`.
- Mobile (<=900px): sticker moved out of absolute positioning into normal flow,
  centred below the polaroid, so overlap is impossible at any narrow width.
Measured caption coverage after the fix: 0% at 320, 375 and 1440.

Re-verified by measuring the live DOM (not screenshots):
- No horizontal overflow at 320, 375, 390, 400, 430, 768, 1440.
- Nav stays on one line, 68px; every link and the theme toggle on screen at 320+.
- All 37 images report naturalWidth > 0. The 7 client logos sit on one row at 1440.
- Lightbox: opens, paginates 1..n, shows the right published-post link, Escape
  closes it, focus returns to the card, body scroll lock released.
- Zero em-dashes in rendered text.

Note on tooling: headless Chrome screenshots of this page are misleading. Images
decode after the virtual-time budget, so photos appear as blank polaroid frames
even though they load correctly in a real browser. Verify with DOM measurement.

## Preview
Current session serves the site at http://127.0.0.1:4174 using a temporary Node
static server. No deployment performed. Existing Claude launch config uses 4173
and Python; do not assume Python is installed on this machine.

## Full showcase and portrait crop — 2026-09-25
- User requested preserving the Canva original's full showcase and distinct section colors.
- Work now displays all 42 slides inline across 7 brand sections, grouped by content type; published-post links are visible beside captions.
- Added assets/css/showcase.css. Each brand has its own palette, with one-column mobile layout and project jump links.
- Clicking a slide opens that exact slide in the existing gallery; verified YSL 5/9 and Shu 4/4.
- Hero now uses a CSS crop focused on face and shoulders (original asset unchanged), visually checked on desktop and 375px mobile.
- Preserved existing caption/sticker overlap fix in scrapbook.css.
- Local build and JS syntax passed; 42 slides appear once each with intrinsic dimensions; mobile has no horizontal overflow.

## Compact campaign boards — 2026-09-25
- Shifted hero crop origin horizontally from 66% to 87%, centering the subject visually.
- Reworked desktop projects as compact boards: brand-specific group column spans, contained image previews, reduced heading/section spacing.
- All 42 slides remain visible; mobile uses two-column previews with full-size lightbox.
- Desktop review at 1280px showed project heights between 530 and 866px. Mobile 375px had no horizontal overflow; selected-slide lightbox verified.

## Free-form brand spreads — 2026-09-25 (Claude)
User feedback: the campaign boards felt rigid; wanted the free layout of the Canva
original, with each brand's logo inside its own section.
- The 7 `.project` sections are replaced by `.spread` boards (assets/css/spreads.css).
  Each board is rebuilt from the Canva page geometry: every slide keeps its original
  position, size, crop and stacking order on a 1366 x 768 board, written inline as
  `--x/--y/--w` (percent), `--ar` (aspect), `--z` (layer), `--r` (tilt), `--op` (crop).
  To move a piece, edit those values in index.html.
- Brand logo is the section heading (`h3.spread__logo`), placed and cropped as in Canva.
- Captions and the 11 published-post links sit next to their slide groups, as in Canva.
- One deliberate deviation: the Bup Non title overlapped its bleeding logo in Canva and
  was unreadable, so it moved into open space above the content direction pieces.
- DOM order is the reading order. At <=760px the board becomes a loose stack: logo,
  captions, slides at 84% width alternating left/right with slight overlap and tilt.
- Shu uemura background changed from dark to light stone so its black logo is visible.
- Clients: uniform logo row replaced by the scattered cluster from the Canva page;
  each logo links to its brand spread.
- Experience toolrow: added the unidentified pink mark (alt "AI content tool"), as the
  user asked. Its baked-in fake transparency checkerboard was removed.
- showcase.css now holds only the work intro and project index; dead .project rules removed.

Verified with headless Chrome over CDP (waits for every image to decode, see note above):
- No horizontal overflow at 320, 375, 390, 768, 820, 1024, 1280, 1440, 1920.
- Clicking Eugica slide 4 opens the lightbox at 4 of 5 with its post link; Escape closes.
- No console errors. `node scripts/build-site.mjs` validates 7 projects, 42 slides.
- Visually reviewed all 7 spreads + clients at 1440, three spreads at 390, two at 820.

## "Marketer's desk" pass — 2026-09-25 (Claude)
User approved the "marketer's desk" direction: freer and more creative, not a 1:1 Canva copy.
- Type: headings now Bricolage Grotesque, handwritten notes Patrick Hand (both self-hosted,
  Vietnamese subsets, appended to fonts.css). `--font-display` / `--font-hand` set in desk.css;
  every Segoe Print/Comic Sans stack in scrapbook.css now uses `var(--font-hand)`.
- Spreads (spreads.css): dotted board surface, torn-paper top edge on each spread, outlined
  project numbers 01-07, masking tape on every other slide, hand-drawn arrows (`#i-doodle-arrow`
  in the sprite) pointing from each post link and from "We won this pitch!" to their slide.
  Note boxes are clamped inside the board so nothing clips at tablet widths.
- Logos: La Roche-Posay and Eugica re-cut from originals with transparent backgrounds.
  Bup Non uses `logo-bupnon-emblem.webp` (emblem cut out of its lime square) filling a
  full-height lime band. User asked for no white outline on logos: soft shadow only.
- Clients (desk.css): kraft board, tilted logos, taped Palmolive/GazGo, handwritten
  "I've worked with" and "and more."; two-column sticker sheet under 600px.
- Contact: portrait re-cropped onto Minh Anh; section is now a taped polaroid plus a
  postcard (stamp, "Ho Chi Minh City 2026" postmark, ruled lines for email/phone/LinkedIn).
  Postcard colours are fixed so it stays paper in dark mode.
- Verified: no overflow 320-1920, notes never clip, lightbox + link, no console errors,
  build passes; desktop spreads/clients/contact and mobile hero/spreads/clients/contact reviewed.
- Follow-up: user saw white boxes behind the La Roche-Posay/Eugica logos. The files were
  already transparent; the browser was showing the cached old image with the same name.
  build-site.mjs now appends content hashes to images (webp/png/jpg/svg) as well as CSS/JS,
  so replaced images can't go stale after a Pages deploy. Fonts are not hashed (CSS loads them).
- Toolkit marks (Canva, CapCut, unnamed AI mark) enlarged to 52-64px, tilted, soft shadow;
  Canva re-cut with a transparent background (border flood fill keeps its white wordmark).
