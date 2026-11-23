# Pixel Campus — Student Laptop Finder

**SW302 — Assignment 2 | Individual submission**

Student: Laila Mohamed | ID: 202400388

Five connected pages built with **HTML5, plain JavaScript ES modules, and locally installed Tailwind CSS 4** (no React, jQuery, Bootstrap, or Tailwind CDN).

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | Home, statistics calculated from JSON, featured laptops and theme switch |
| `laptops.html` | Live brand/name search, category/price/RAM/battery filters, six sort directions |
| `details.html?id=7` | One laptop selected by the URL id; full specifications and actions |
| `favorites.html` | Favorites from localStorage; remove, clear, total and average price |
| `compare.html` | Compare 2–4 saved laptops; automatically highlight best specification values |

## Run on your own computer

Requires **Node.js/npm** and **VS Code Live Server** (or another local HTTP server).

```bash
npm install
npm run build
```

Open **`index.html` using Live Server**. Do not double-click the HTML file (`file://`) because JSON is loaded by `fetch()`.

For live changes to Tailwind CSS while editing:

```bash
npm run watch
```

All five HTML pages link to `dist/output.css`. A prebuilt CSS file is included, so the application does not need a CDN. Always rerun `npm run build` after changing `src/input.css` or Tailwind classes.

## Folder organization

```text
laptop_finder_laila_mohamed/
├── index.html
├── laptops.html
├── details.html
├── favorites.html
├── compare.html
├── assets/                20 local laptop pictures / illustrations
├── data/laptops.json      20 records with all 13 required fields
├── src/
│   ├── input.css          Tailwind 4, @theme, @plugin, @layer and @apply
│   └── js/
│       ├── api.js         fetch + async/await + try/catch
│       ├── storage.js     favorites and theme via JSON + localStorage
│       ├── ui.js          shared header, card and skeleton functions
│       ├── home.js
│       ├── laptops.js
│       ├── details.js
│       ├── favorites.js
│       ├── compare.js
│       └── compare-utils.js
├── dist/output.css
├── package.json
├── package-lock.json
└── README.md
```

`node_modules` is deliberately **not** included in the submission. It is installed with `npm install`.

## Three required user journeys to test

1. Open **Laptops**. Search for `Acer`, set a maximum price, reset, sort by battery (high/low), then open **Details**.
2. Favorite three laptops from different pages. Reload. Open **Favorites**, then **Compare**, check 2–4 laptops and look for the pink **★ Best Value** cells. Try checking a fifth laptop to see the limit message.
3. Switch from **Battery Saver** to **Performance** in the header. Visit another page and reload to confirm the chosen theme remains active.

Test each page at browser widths approximately **375px, 768px and 1280px**.

## Where these concepts are taught

- Lectures 2–4: HTML structure, semantic elements, forms, CSS and page layout.
- Lectures 5–6: Tailwind CLI, utilities, responsive layout, components and plugins.
- Lecture 7: JavaScript, DOM elements, loops, arrays and events.
- Lecture 8: event handling, ES modules, try/catch and localStorage.
- Lecture 9: `fetch()`, `async/await` and JSON.

**Assignment-specific syntax:** the assignment asks for Tailwind **4** with `@import`, `@theme`, and `@plugin`, even though some lecture examples use the older Tailwind configuration style. The source follows the assignment's required version. React is not used, because Assignment 2 prohibits JavaScript UI libraries.

## GitHub — required before submission

**Add the real link to your GitHub repository here after pushing your project.**

Repository URL: `PASTE_YOUR_GITHUB_REPOSITORY_LINK_HERE`

The GitHub repository is part of the professor's evaluation; it cannot be created or truthfully linked from an offline ZIP alone.
