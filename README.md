# Daniel Christopher Portfolio

A statically exported Next.js portfolio configured for GitHub Pages.

## Local development

```bash
npm install
npm run dev
```

Run the full validation before pushing:

```bash
npm run check
```

## GitHub Pages deployment

1. Push the project to the repository's `main` branch.
2. In GitHub, open **Settings → Pages**.
3. Set **Source** to **GitHub Actions**.

The included workflow deploys automatically. It uses `/` for a user-site
repository such as `dccchidera-lgtm.github.io`, and automatically adds the
repository name as the base path for a project site.
