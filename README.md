# 🎧 PMDE – Web Application (Next.js + TypeScript)

This is a web application built using [Next.js](https://nextjs.org/) and [TypeScript](https://www.typescriptlang.org/). It powers the PMDE platform and is structured for scalability, performance, and deployment via [Netlify](https://www.netlify.com/).

Even if you haven’t worked with Next.js before, this README will guide you through everything you need to get it up and running locally.

---

## 🚀 Getting Started (For Developers New to Next.js)

### 1. Clone the Repository

First, clone the project repository to your machine:

```bash
git clone <repo-url>
cd PMDE
```

> Replace `<repo-url>` with the actual Git URL of this repository.

---

### 2. Install Dependencies

The project uses [npm](https://www.npmjs.com/) to manage dependencies. Make sure you have Node.js installed (version 18+ recommended).

Then install the required packages:

```bash
npm install
```

This command will read the `package.json` file and install everything listed under `dependencies` and `devDependencies` into the `node_modules/` folder.

---

### 3. Environment Variables

The project relies on environment variables for configuration, such as Firebase keys, API routes, etc.

These variables are stored in a file called:

```
.env.development.local
```

This file:

- **Is not included in version control** (thanks to `.gitignore`)
- **Should never be pushed to GitHub or shared publicly**
- **Is required for the app to run properly**

> 🔐 **You can find the latest version of this file in the shared OneDrive folder used by the team.**  
> If you don’t have access, ask someone to share it with you.

Once added to the project root (same level as `package.json`), the app will be able to read from it automatically during development.

---

### 4. Run the Development Server

To start the app locally:

```bash
npm run dev
```

This runs the Next.js dev server at:

```
http://localhost:3000
```

Visit that URL in your browser. Any changes you make will auto-update thanks to hot reloading.

---

## 🗂 File & Folder Structure

Here’s a breakdown of the key files and directories:

| Path / File              | Description                                                                                 |
| ------------------------ | ------------------------------------------------------------------------------------------- |
| `.next/`                 | Auto-generated build files (ignored by Git). You can ignore this folder.                    |
| `.netlify/`              | Netlify-specific build settings. This enables easy deployment.                              |
| `.gitignore`             | Tells Git what files to exclude from version control (e.g. `.env`, `node_modules`)          |
| `components/`            | Reusable React components used throughout the app (e.g. buttons, headers, sections)         |
| `data/`                  | Local JSON or JS/TS files containing static data used for page content or configuration     |
| `node_modules/`          | All third-party packages installed via npm (auto-generated, should not be touched manually) |
| `pages/`                 | This folder defines the routing of the app. Every `.tsx` file is a route. For example:      |
|                          | - `pages/index.tsx` → `/`                                                                   |
|                          | - `pages/about.tsx` → `/about`                                                              |
|                          | - `pages/api/hello.ts` → `/api/hello` (this is an API route)                                |
| `public/`                | Static assets like images, icons, and fonts. Files here are publicly accessible             |
| `styles/`                | All global and modular stylesheets, written in CSS or SCSS                                  |
| `package.json`           | Lists project metadata, dependencies, and npm scripts                                       |
| `package-lock.json`      | Auto-generated lockfile to ensure consistent installs across machines                       |
| `tsconfig.json`          | TypeScript compiler settings (like path aliases, strictness, etc.)                          |
| `next.config.ts`         | Custom Next.js config. Useful for rewrites, redirects, and other tweaks                     |
| `next-sitemap.config.js` | Configuration file for generating sitemaps, important for SEO                               |
| `README.md`              | This file — your guide to the project                                                       |

---

## 🧪 Development Tips

- The app is written in **TypeScript**. If you're unfamiliar, don't worry — it's just JavaScript with extra type safety.
- Any page or component can be edited while the dev server is running. Changes are reflected immediately in the browser.
- You can add new routes simply by creating a new file inside the `pages/` folder.
- If you want to create server-side functions, place them under `pages/api/`.

---

## 📦 Useful Commands

| Command         | What It Does                                 |
| --------------- | -------------------------------------------- |
| `npm run dev`   | Starts the local development server          |
| `npm run build` | Creates a production build (used by Netlify) |
| `npm run start` | Starts the production build locally          |
| `npm run lint`  | Runs ESLint to check for code issues         |

---

## ☁️ Deployment

This app is set up for deployment on **Netlify**.

- It uses the `.netlify/` directory and `netlify.toml` config.
- When you push to the main branch, Netlify will auto-deploy using the build command:
  ```
  npm run build
  ```

> You don't need to manually upload or configure deployment unless otherwise noted.

---

## 📚 Resources

- [Next.js Docs](https://nextjs.org/docs) – main documentation
- [TypeScript Handbook](https://www.typescriptlang.org/docs/) – if you’re new to TypeScript
- [Netlify Docs](https://docs.netlify.com/) – deployment platform

---

## 👩‍💻 Support

If you're blocked or something doesn't make sense:

- Ask a teammate
- Check the `.env` file exists and is correct
- Check the terminal output when running `npm run dev`

You’re not expected to be a Next.js expert — we’ve got your back.

---

Happy coding!
