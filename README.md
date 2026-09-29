# GARWEVIA website

Next.js site for GARWEVIA apparel sourcing and manufacturing services.

## Local development

Use Node.js 24 and npm. Install dependencies with `npm ci`, then run `npm run dev`. Open <http://localhost:3000>.

Before committing, run `npm run lint`, `npx tsc --noEmit`, and `npm run build`. The build fetches the configured Google Fonts, so it needs internet access.

## Configuration

Copy `.env.example` to `.env.local` and set values for your environment:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL used by the sitemap and robots file. Defaults to `https://garwevia.com`. |
| `LEAD_STORAGE_DIR` | Persistent directory for RFQ submissions and uploaded files. Defaults to `data/leads` locally. |
| `RESEND_API_KEY` and `MAIL_FROM` | Optional buyer confirmation email. Both are required to enable it. |

RFQ submissions are currently saved to the server filesystem. A production host must provide persistent writable storage or the lead route must be connected to a database or object store before the form is relied on. Keep the storage directory and API keys out of Git.

## GitHub

The repository includes a CI workflow that installs dependencies, lints, checks TypeScript, and builds on pushes and pull requests. After creating a GitHub repository, add it as `origin` and push the `main` branch.
