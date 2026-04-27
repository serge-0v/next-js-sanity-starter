# Schema UI - Next.js Sanity Starter Template

This starter is a part of [Schema UI](https://schemaui.com) project, a comprehensive page builder that provides production-ready React components with pre-built Sanity schemas and GROQ queries, enabling rapid development of content-driven websites with Sanity CMS and Next.js. **Content Agent & MCP ready**.

**Monorepo:** The template now uses a **pnpm workspace** with a `frontend/` (Next.js) app and a `studio/` (Sanity Studio) app in one repository. Older guides referred to a single app folder; here, schemas and `sanity` CLI commands live under `studio/`, and the site lives under `frontend/`. Root scripts run both together (`pnpm dev`).

![Screenshot of Sanity Studio using Content Agent](https://cdn.sanity.io/images/a03xrv11/schemaui-starter/2a4db6a79de3606c2669464dfee38a3dac7fdad1-1920x841.webp)

[![Next.js][next-js]][next-js-url] [![Sanity][sanity]][sanity-url] [![React][react]][react-url] [![Typescript][typescript]][typescript-url] [![Tailwind][tailwind]][tailwind-url] [![Shadcn][shadcn]][shadcn-url]

[Docs](https://schemaui.com/docs) | [Components](https://schemaui.com/docs/components) | [Demo](https://starter.schemaui.com)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fserge-0v%2Fnext-js-sanity-starter&env=NEXT_PUBLIC_SITE_URL,NEXT_PUBLIC_SITE_ENV,NEXT_PUBLIC_SANITY_API_VERSION,NEXT_PUBLIC_SANITY_PROJECT_ID,NEXT_PUBLIC_SANITY_DATASET,SANITY_API_READ_TOKEN,RESEND_API_KEY,RESEND_AUDIENCE_ID&demo-title=Next.js%20Sanity%20Starter&demo-description=Next.js%20Sanity%20Starter%20by%20Schema%20UI&demo-url=https%3A%2F%2Fstarter.schemaui.com)

For this monorepo, set the Vercel project **Root Directory** to `frontend` and add `NEXT_PUBLIC_STUDIO_URL` (and other vars from `frontend/.env.local.example`) in the project settings.

## Monorepo layout

| Path        | Role                                                                 |
| ----------- | -------------------------------------------------------------------- |
| `frontend/` | Next.js app (pages, API routes, `sanity.types.ts` from TypeGen)      |
| `studio/`   | Sanity Studio (`sanity dev`, `sanity deploy`, `schema.json` extract) |

Install and dev commands are meant to be run from the **repository root** unless noted.

## Getting Started

### Installing the template

#### 1. Initialize template with Sanity CLI

Run the command in your Terminal to initialize this template on your local computer:

```bash
npm create sanity@latest -- --template serge-0v/next-js-sanity-starter
```

See the documentation if you are [having issues with the CLI](https://www.sanity.io/help/cli-errors).

This command will:

- Create a new Sanity project
- Add API Read Token
- Configure CORS origin for http://localhost:3000
- Set up environment variables
- Clone the repository
- Install dependencies

#### Alternative: clone the monorepo

If you prefer not to use the CLI bootstrap:

```bash
git clone https://github.com/serge-0v/next-js-sanity-starter.git
cd next-js-sanity-starter
pnpm install
```

Then create a project in [Sanity Manage](https://www.sanity.io/manage), add CORS origins for `http://localhost:3000` and `http://localhost:3333`, and copy `frontend/.env.local.example` → `frontend/.env.local` and `studio/.env.local.example` → `studio/.env.local`, filling in project ID, dataset, and tokens (see [Environment variables](#environment-variables)).

This project uses [pnpm](https://pnpm.io). To install pnpm globally:

```bash
npm install -g pnpm
```

For dataset import and Studio deploy, log in to the CLI:

```bash
pnpm install --global sanity@latest
sanity login
```

#### 2. Run the template locally

From the **repository root**:

```bash
pnpm dev
```

This starts the Next.js app and Studio together. To run only one workspace:

```bash
pnpm dev:frontend    # frontend only
pnpm dev:studio  # studio only
```

#### 3. Open the app and sign in to the Studio

- Open the Next.js app at [http://localhost:3000](http://localhost:3000)
- Open the Studio and sign in. In this monorepo, Studio runs at [http://localhost:3333](http://localhost:3333) when you use `pnpm dev` from the root (not at `/studio` inside Next.js). Use the same service (Google, GitHub, or email) that you used when you logged in to the CLI.

Set `NEXT_PUBLIC_STUDIO_URL` in `frontend/.env.local` to `http://localhost:3333` locally, and `SANITY_STUDIO_PREVIEW_URL` in `studio/.env.local` to `http://localhost:3000`, so draft mode and Presentation previews resolve correctly.

### Adding content with Sanity

#### 1. Import Sample Data (Optional)

Import the demo dataset to get started with sample content. In the monorepo the archive is `studio/sample-data.tar.gz`. From the `studio` directory:

```bash
cd studio
sanity dataset import sample-data.tar.gz production --replace
```

Be careful with the `--replace` flag: it replaces existing data in the dataset.

#### 2. Publish your first document

The template comes pre-defined with a schema containing `Author`, `Category`, `FAQ`, `Page`, `Post`, and `Testimonial` document types (and additional types such as `Navigation` and `Settings` in the Studio).

From the Studio, click "+ Create" and select the `Page` document type. Go ahead and create and publish the document.

Your content should now appear in your Next.js app ([http://localhost:3000](http://localhost:3000))

#### 3. Extending the Sanity schema

The schema for the `Page` document type lives at `studio/schemas/documents/page.ts` (legacy single-repo path: `sanity/schemas/document/page.ts`). You can [add more document types](https://www.sanity.io/docs/schema-types) to the schema to suit your needs.

#### 4. Adding new components

This template includes components aligned with the [Schema UI](https://schemaui.com/docs/components) library. Visit [Schema UI Docs](https://schemaui.com/docs/how-to-use) to learn how to add new components.

### Deploying your application

#### 1. Configure CORS settings

Add your production URL to the CORS Origins in your Sanity project settings to allow your deployed site to communicate with Sanity. Also add your deployed Studio origin (for example `https://your-hostname.sanity.studio`) if you host Studio separately.

#### 2. Deploy to Vercel

Deploy your website to Vercel:

1. Create a new repository on [GitHub](https://docs.github.com/en/migrations/importing-source-code/using-the-command-line-to-import-source-code/adding-locally-hosted-code-to-github).
2. Push your code to GitHub
3. Create a [new Vercel project](https://vercel.com/new)
4. Connect your GitHub repository and import the project. For this monorepo, set **Root Directory** to `frontend`.
5. Copy the environment variables from `frontend/.env.local` and paste them to your Vercel project settings. Vercel supports pasting all variables at once. Include `NEXT_PUBLIC_STUDIO_URL` pointing at your hosted Studio URL (no trailing slash).
6. Deploy

#### 3. Deploy Sanity Studio (`sanity deploy`)

Recommended: host Studio on `*.sanity.studio`.

1. Set production values in `studio/.env.local` (or in CI — see below).
2. From `studio`:

```bash
cd studio
sanity deploy
```

After the first deploy, set `SANITY_STUDIO_APP_ID` from the CLI output so later deploys skip the hostname prompt.

#### 4. GitHub Actions (Studio)

The repo includes [`.github/workflows/deploy-studio.yml`](.github/workflows/deploy-studio.yml): it deploys Studio when `studio/**` changes on **`master`** or **`develop`**.

Configure GitHub **Environments** (`Production` for `master`, `development` for `develop`):

- **Variables**: `SANITY_STUDIO_PREVIEW_URL`, `SANITY_STUDIO_PROJECT_ID`, `SANITY_STUDIO_DATASET`, `SANITY_STUDIO_HOSTNAME`, `SANITY_STUDIO_API_VERSION`, `SANITY_STUDIO_APP_ID`
- **Secret**: `SANITY_AUTH_TOKEN` (Sanity Manage → API → Tokens, deploy-capable token)

See the workflow file for the exact names checked during deploy.

#### 5. Deploy Studio to Vercel (optional)

Create a separate Vercel project with **Root Directory** `studio` and the same `studio` environment variables as in `studio/.env.local`.

### Inviting collaborators

Now that you've deployed your Next.js application and Sanity Studio, you can optionally invite a collaborator to your Studio. Open up [Manage](https://www.sanity.io/manage), select your project and click "Invite project members"

They will be able to access the deployed Studio, where you can collaborate together on creating content.

### Configuring Resend (optional)

To use the newsletter form, you need to configure Resend.

1. Create a new [Resend account](https://resend.com/signup)
2. Create a new [API key](https://resend.com/api-keys)
3. Copy the [audience](https://resend.com/audiences) id
4. Set the API key and audience ID in `frontend/.env.local` as `RESEND_API_KEY` and `RESEND_AUDIENCE_ID` (or in Vercel project settings)

## Sanity TypeGen

To generate the types, run the following commands from the **`studio`** folder (where `sanity.cli.ts` lives):

```bash
cd studio
npx sanity schema extract
```

This generates `schema.json` in the `studio` folder.

```bash
npx sanity typegen generate
```

This generates `frontend/sanity.types.ts` (output paths are set in `studio/sanity.cli.ts`).

**From the repository root** you can use the workspace shortcut:

```bash
pnpm typegen
```

Run TypeGen whenever you change schemas or queries so the frontend stays in sync.

## Workspace commands

### Installing packages

**Frontend:**

```bash
pnpm add <package-name> --filter frontend
```

**Studio:**

```bash
pnpm add <package-name> --filter studio
```

**Root:**

```bash
pnpm add -w <package-name>
```

### Updating dependencies

**Update all packages in all workspaces:**

```bash
pnpm up --latest --recursive
```

**Update specific workspace:**

```bash
pnpm up --latest --filter frontend
pnpm up --latest --filter studio
```

## Environment variables

All environment variables and their descriptions:

**Next.js (`frontend/.env.local`):**

- `NEXT_PUBLIC_SITE_URL` - your website url. For example, `https://yourwebsite.com` without trailing slash. Used for sitemap.ts , robots.ts , and for client.ts
- `NEXT_PUBLIC_SITE_ENV` - specifies the environment type (development/production) and affects metadata configuration. Setting this to "development" prevents search engine indexing, which is useful for staging environments (e.g., `staging.yourwebsite.com`).
- `NEXT_PUBLIC_STUDIO_URL` - your Sanity Studio url. For example, `https://your-sanity-hostname.sanity.studio` or `http://localhost:3333` locally, without trailing slash. Used for Draft Mode (Open in Studio URL).
- `NEXT_PUBLIC_SANITY_API_VERSION` - your Sanity API version. You don't have to use specific dates, any past or present date is valid, and today's date will always give you the latest version - no need to check release history. For example: YYYY-MM-DD.
- `NEXT_PUBLIC_SANITY_PROJECT_ID` - your Sanity project ID. For example, abc12345.
- `NEXT_PUBLIC_SANITY_DATASET` - your Sanity dataset name. For example, production.
- `SANITY_API_READ_TOKEN` - your Sanity read token for Next.js to fetch data.
- `RESEND_API_KEY` - your RESEND api key for the newsletter form.
- `RESEND_AUDIENCE_ID` - your RESEND audience id for the newsletter form to store contacts.

**Studio (`studio/.env.local`):**

- `SANITY_STUDIO_PREVIEW_URL` - your Next.js site url for preview. For example, `https://yourwebsite.com` or `http://localhost:3000` locally, without trailing slash. Used for Draft Mode in Presentation Tool or iframe preview.
- `SANITY_STUDIO_PROJECT_ID` - your Sanity project ID. For example, abc12345.
- `SANITY_STUDIO_DATASET` - your Sanity dataset name. For example, production.
- `SANITY_STUDIO_HOSTNAME` - your Sanity Studio hostname for `sanity deploy` (unique on `.sanity.studio`).
- `SANITY_STUDIO_API_VERSION` - your Sanity API version (same guidance as above). For example: YYYY-MM-DD.
- `SANITY_AUTH_TOKEN` - your Sanity auth token for Studio deploy via GitHub Actions. Generate in Sanity Manage → API → Tokens with deploy permission.
- `SANITY_STUDIO_APP_ID` - your Sanity Studio app ID from the first `sanity deploy`; avoids repeated hostname prompts.

[react-url]: https://reactjs.org/
[next-js-url]: https://nextjs.org/
[typescript-url]: https://www.typescriptlang.org/
[tailwind-url]: https://tailwindcss.com/
[shadcn-url]: https://ui.shadcn.com/
[sanity-url]: https://www.sanity.io/
[react]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[next-js]: https://img.shields.io/badge/Next.js-20232A?style=for-the-badge&logo=Next.js
[typescript]: https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white
[tailwind]: https://img.shields.io/badge/Tailwind_CSS-20232A?style=for-the-badge&logo=tailwindcss&logoColor=319795
[shadcn]: https://img.shields.io/badge/shadcn/ui-20232A?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTYgMjU2IiBjbGFzcz0iaC02IHctNiI+PHJlY3Qgd2lkdGg9IjI1NiIgaGVpZ2h0PSIyNTYiIGZpbGw9Im5vbmUiPjwvcmVjdD48bGluZSB4MT0iMjA4IiB5MT0iMTI4IiB4Mj0iMTI4IiB5Mj0iMjA4IiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMzIiPjwvbGluZT48bGluZSB4MT0iMTkyIiB5MT0iNDAiIHgyPSI0MCIgeTI9IjE5MiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9IjMyIj48L2xpbmU+PC9zdmc+&logoColor=ffffff
[sanity]: https://img.shields.io/badge/Sanity-20232A?style=for-the-badge&logo=sanity&logoColor=F97316
