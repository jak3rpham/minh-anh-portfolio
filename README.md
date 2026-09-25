# Minh Anh — Marketing Portfolio

A static scrapbook portfolio, built with HTML, CSS and JavaScript.

## Deployment

GitHub Actions validates and publishes the website to GitHub Pages on each push
to `main`. In repository Settings → Pages, select **GitHub Actions** as the source.
The workflow can also be run manually from the Actions tab.

The build reads the final Pages URL from `actions/configure-pages`, sets canonical
and social sharing URLs, then packages only `index.html` and the public assets.
Original source images, local tool settings and project notes are not deployed.

## Local build

Requires a recent Node.js version (22 or later). In PowerShell:

```powershell
$env:SITE_URL = 'http://127.0.0.1:4174/'
node scripts/build-site.mjs
```

The generated website is in `_site/`. No package install is needed.
