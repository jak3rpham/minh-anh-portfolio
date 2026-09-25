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
