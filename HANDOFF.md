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

## Preview
Current session serves the site at http://127.0.0.1:4174 using a temporary Node
static server. No deployment performed. Existing Claude launch config uses 4173
and Python; do not assume Python is installed on this machine.
