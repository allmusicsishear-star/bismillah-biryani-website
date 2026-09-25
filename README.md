# Bismillah Biryani — website

Static site. No build step, no frameworks. Upload the whole folder to any web host.

## Files
- `index.html` — page structure and headline copy
- `assets/css/styles.css` — all styling
- `assets/js/content.js` — **all business content** (edit this one)
- `assets/js/main.js` — behaviour and animation (no libraries)

## Updating content — `assets/js/content.js`
Phone, WhatsApp, address, hours, menu items, prices, dishes, gallery and photos all live here.
Change a value once and it updates everywhere on the page.

- **Prices:** add `price: "₹___"` to any menu item. Nothing shows until you do.
- **Photos:** the `PHOTO` list at the top. One link changes that photo everywhere.
- **ORDER NOW buttons:** currently open WhatsApp with a ready message.
  Paste an online-ordering link into `orderUrl` and every ORDER NOW button will use it.
- **Social links:** fill the `social` list and they appear in the footer.

## Before launch
1. **Photos** — the current photos are hot-linked from Google Stitch and can stop working.
   Download them into `assets/img/` and point `PHOTO` at e.g. `"assets/img/chicken.jpg"`.
   Re-check the `alt` text when you swap photos.
2. **Web address** — in `index.html` replace `https://www.example.com/` (canonical + `og:url`),
   set `og:image` to a full `https://` photo link, and set `siteUrl` in `content.js`.
3. **Menu** — confirm the item names. No descriptions or prices were invented.
4. Optional: add Instagram / other social links.

## Accessibility & performance notes
Skip link, keyboard-accessible menu (Esc closes, focus stays inside), visible focus rings,
`prefers-reduced-motion` respected, lazy-loaded photos, one small script, no animation library.
