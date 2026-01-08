# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/55c94d37-2c31-4c23-8ab8-8378ec48c68d

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/55c94d37-2c31-4c23-8ab8-8378ec48c68d) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/55c94d37-2c31-4c23-8ab8-8378ec48c68d) and click on Share -> Publish.

## WordPress deployment

The project now includes a WordPress-ready bundle and plugin so the React front-end can run inside a WordPress site while pulling content from WordPress editors.

### 1. Build assets for WordPress

```sh
npm run build:wordpress
```

This command compiles the React application into `wordpress/wp-plugin/instep-community-connect/assets/build` and generates the Vite manifest the plugin reads.

### 2. Install the plugin

1. Copy `wordpress/wp-plugin/instep-community-connect` into your WordPress site's `wp-content/plugins` directory.
2. In the WordPress admin, activate **In Step Community Connect**.
3. Create or edit a page and add the shortcode `[instep_community_connect]` (or use the Shortcode block) to mount the React application. Set that page as the site's homepage if desired.

### 3. Manage content from WordPress

The plugin adds an **In Step Content** menu item in the admin sidebar. Editors can:

- Update frequently edited fields (phone, hero copy, CTA labels, footer blurb) via the quick settings form.
- Use the JSON editor for full control of the site content. Paste a modified copy of the content JSON, following the structure defined by the React `SiteContent` schema.
- Reset the content to the defaults at any time.

The front-end automatically merges any saved content with the defaults so existing styling and layout stay intact.

### 4. WordPress data sources

- **Blog posts** are fetched live from the native WordPress posts endpoint (`/wp-json/wp/v2/posts`). Publishing a post in WordPress makes it visible on the React blog immediately.
- **Team members** are served from the plugin's REST endpoint (`/wp-json/instep/v1/team`). Populate them through the admin screen or by editing the JSON payload.
- The React app falls back to locally bundled defaults whenever a WordPress endpoint is unavailable so the site still renders gracefully during setup.

### 5. Reusable assets

- Default content used by both the React app and plugin lives in `content-defaults.json` (a copy is stored under the plugin's `data/` directory for distribution).
- When you change that JSON file, rebuild the WordPress bundle so the plugin ships with the matching defaults.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
