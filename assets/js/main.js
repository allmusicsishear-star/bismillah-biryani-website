/* ==========================================================================
   BISMILLAH BIRYANI — behaviour
   Reads everything from window.SITE (assets/js/content.js). No libraries.
   ========================================================================== */
(function () {
  "use strict";

  var S = window.SITE;
  if (!S) return;

  var root = document.documentElement;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  var enc = encodeURIComponent;

  /* ---------- tiny helpers ---------- */
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

  // h("div", {class: "x"}, child, child…) — builds elements without innerHTML.
  function h(tag, attrs) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        if (attrs[k] !== null && attrs[k] !== undefined && attrs[k] !== false) node.setAttribute(k, attrs[k]);
      });
    }
    for (var i = 2; i < arguments.length; i++) {
      var c = arguments[i];
      if (c === null || c === undefined) continue;
      node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    }
    return node;
  }

  function get(path) {
    return path.split(".").reduce(function (o, k) { return o == null ? o : o[k]; }, S);
  }

  function isExternal(url) { return /^https?:\/\//i.test(url); }

  function markExternal(a) {
    a.setAttribute("target", "_blank");
    a.setAttribute("rel", "noopener noreferrer");
    a.appendChild(h("span", { "class": "sr-only" }, " (opens in a new tab)"));
  }

  /* ---------- links built from the content file ---------- */
  var wa = "https://wa.me/" + S.whatsapp.number;
  var URLS = {
    tel: "tel:" + S.phone.tel,
    whatsapp: wa,
    "whatsapp-menu": wa + "?text=" + enc(S.whatsapp.menuMessage),
    directions: "https://www.google.com/maps/dir/?api=1&destination=" + enc(S.mapsQuery),
    order: S.orderUrl || wa + "?text=" + enc(S.whatsapp.orderMessage)
  };

  function dishOrderUrl(name) {
    if (S.orderUrl) return S.orderUrl;
    var msg = (S.whatsapp.dishMessage || "Hello, I'd like to order {dish}.").replace("{dish}", name);
    return wa + "?text=" + enc(msg);
  }

  /* ---------- 1. fill in text, links and photos ---------- */
  function bindContent() {
    $$("[data-bind]").forEach(function (n) {
      var v = get(n.getAttribute("data-bind"));
      if (v === null || v === undefined) return;
      n.textContent = "";
      if (Array.isArray(v)) {
        v.forEach(function (line, i) {
          if (i) n.appendChild(document.createElement("br"));
          n.appendChild(document.createTextNode(line));
        });
      } else {
        n.textContent = v;
      }
    });

    $$("[data-href]").forEach(function (a) {
      var url = URLS[a.getAttribute("data-href")];
      if (!url) return;
      a.setAttribute("href", url);
      if (isExternal(url)) markExternal(a);
    });

    $$("[data-img]").forEach(function (img) {
      var d = S.images && S.images[img.getAttribute("data-img")];
      if (!d) return;
      img.alt = d.alt || "";
      if (d.pos) img.style.setProperty("--pos", d.pos);
      img.src = d.src;
    });

    var map = $("[data-map]");
    if (map) map.src = "https://www.google.com/maps?q=" + enc(S.mapsQuery) + "&output=embed";

    $$("[data-year]").forEach(function (n) { n.textContent = new Date().getFullYear(); });
  }

  function renderNav() {
    $$("[data-nav]").forEach(function (ul) {
      (S.nav || []).forEach(function (item) {
        ul.appendChild(h("li", null, h("a", { href: item.href }, item.label)));
      });
    });
  }

  function renderSocial() {
    var ul = $("[data-social]");
    if (!ul || !S.social || !S.social.length) return;
    S.social.forEach(function (s) {
      var a = h("a", { href: s.url }, s.label);
      markExternal(a);
      ul.appendChild(h("li", null, a));
    });
    ul.hidden = false;
  }

  function mediaBlock(image, opts) {
    opts = opts || {};
    var img = h("img", {
      src: image.src, alt: image.alt || "", loading: "lazy", decoding: "async",
      width: opts.w || 1200, height: opts.h || 900
    });
    if (image.pos) img.style.setProperty("--pos", image.pos);
    return h("div", { "class": "media", "data-reveal": "media" },
      h("div", { "class": "media__inner", "data-parallax": opts.parallax || null }, img));
  }

  function renderDishes() {
    var host = $('[data-list="dishes"]');
    if (!host || !S.dishes) return;
    var variants = ["a", "b", "c"];
    S.dishes.forEach(function (d, i) {
      var order = h("a", { "class": "btn btn--ghost", href: dishOrderUrl(d.name) },
        "Order now", h("span", { "class": "sr-only" }, ": " + d.name));
      if (isExternal(dishOrderUrl(d.name))) markExternal(order);
      host.appendChild(
        h("article", { "class": "dish dish--" + variants[i % 3] },
          mediaBlock(d.image, { parallax: "0.04", w: 1200, h: 1000 }),
          h("div", { "class": "dish__body", "data-reveal": "fade" },
            h("span", { "class": "dish__num", "aria-hidden": "true" }, String(i + 1).padStart(2, "0")),
            h("h3", { "class": "dish__name" }, d.name),
            order)));
    });
  }

  function renderMenu() {
    var host = $('[data-list="menu"]');
    if (!host || !S.menu) return;
    S.menu.categories.forEach(function (cat) {
      var list = h("ul", { "class": "menu__list" });
      cat.items.forEach(function (item, i) {
        var li = h("li", { "class": "menu__item", "data-reveal": "fade", style: "--d:" + i * 60 + "ms" },
          h("span", { "class": "menu__name" }, item.name),
          item.price ? h("span", { "class": "menu__price" }, item.price) : null);
        list.appendChild(li);
      });
      host.appendChild(h("div", { "class": "menu__col" },
        h("h3", { "class": "menu__cat" }, cat.title), list));
    });
  }

  function renderGallery() {
    var host = $('[data-list="gallery"]');
    if (!host || !S.gallery) return;
    S.gallery.forEach(function (image) {
      host.appendChild(h("figure", { "class": "gallery__item" }, mediaBlock(image, { w: 1200, h: 900 })));
    });
  }

  // Structured data so search engines understand the restaurant. Only uses details from content.js.
  function addStructuredData() {
    try {
      var a = S.address || {};
      var ld = {
        "@context": "https://schema.org",
        "@type": "Restaurant",
        name: S.name,
        telephone: S.phone.tel,
        servesCuisine: "Indian",
        address: {
          "@type": "PostalAddress",
          streetAddress: a.street,
          addressLocality: a.locality,
          addressRegion: a.region,
          postalCode: a.postalCode,
          addressCountry: a.country
        }
      };
      if (S.siteUrl) ld.url = S.siteUrl;
      if (S.images && S.images.hero) ld.image = new URL(S.images.hero.src, location.href).href;
      var s = document.createElement("script");
      s.type = "application/ld+json";
      s.textContent = JSON.stringify(ld);
      document.head.appendChild(s);
    } catch (e) { /* not critical */ }
  }

  /* ---------- 2. header, mobile menu, active link ---------- */
  function initHeader() {
    var header = $("[data-header]");
    if (!header) return;
    function onScroll() { header.classList.toggle("is-scrolled", window.scrollY > 8); }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  function initMobileMenu() {
    var toggle = $("[data-menu-toggle]");
    var menu = $("[data-mobile-menu]");
    var label = $("[data-menu-label]");
    if (!toggle || !menu) return;

    function isOpen() { return menu.classList.contains("is-open"); }

    function setOpen(open) {
      menu.classList.toggle("is-open", open);
      root.classList.toggle("menu-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      if (label) label.textContent = open ? "Close menu" : "Open menu";
    }

    toggle.addEventListener("click", function () { setOpen(!isOpen()); });
    $$("a", menu).forEach(function (a) { a.addEventListener("click", function () { setOpen(false); }); });

    // Keyboard: Esc closes, Tab stays inside the header + open menu.
    document.addEventListener("keydown", function (e) {
      if (!isOpen()) return;
      if (e.key === "Escape") { setOpen(false); toggle.focus(); return; }
      if (e.key !== "Tab") return;
      var focusables = $$("a[href], button", $("[data-header]")).concat($$("a[href], button", menu))
        .filter(function (n) { return n.offsetParent !== null || n === toggle; });
      if (!focusables.length) return;
      var first = focusables[0], last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });

    var desktop = window.matchMedia("(min-width: 1024px)");
    var onChange = function () { if (desktop.matches) setOpen(false); };
    if (desktop.addEventListener) desktop.addEventListener("change", onChange);
    else if (desktop.addListener) desktop.addListener(onChange);
  }

  function initScrollSpy() {
    if (!("IntersectionObserver" in window)) return;
    var links = $$(".site-nav a[href^='#']");
    var pairs = links.map(function (a) { return { a: a, target: $(a.getAttribute("href")) }; })
      .filter(function (p) { return p.target; });
    if (!pairs.length) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        pairs.forEach(function (p) {
          if (p.target !== e.target) return;
          if (e.isIntersecting) {
            pairs.forEach(function (q) { q.a.removeAttribute("aria-current"); });
            p.a.setAttribute("aria-current", "true");
          } else if (p.a.getAttribute("aria-current")) {
            p.a.removeAttribute("aria-current");
          }
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
    pairs.forEach(function (p) { io.observe(p.target); });
  }

  // Hide the mobile Call / Order bar where the page already shows those buttons.
  function initDock() {
    var dock = $("[data-dock]");
    if (!dock || !("IntersectionObserver" in window)) return;
    var visible = {};
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { visible[e.target.id] = e.isIntersecting; });
      var any = Object.keys(visible).some(function (k) { return visible[k]; });
      dock.classList.toggle("is-hidden", any);
    }, { threshold: 0.15 });
    ["contact", "order"].forEach(function (id) { var n = document.getElementById(id); if (n) io.observe(n); });
  }

  /* ---------- 3. reveal on scroll ---------- */
  function whenLoaded(img, timeout) {
    return new Promise(function (resolve) {
      if (!img || (img.complete && img.naturalWidth > 0)) return resolve();
      var done = function () { resolve(); };
      img.addEventListener("load", done, { once: true });
      img.addEventListener("error", done, { once: true });
      setTimeout(done, timeout);
    });
  }

  function reveal(node) {
    if (node.getAttribute("data-reveal") === "media") {
      whenLoaded($("img", node), 1500).then(function () { node.classList.add("is-in"); });
    } else {
      node.classList.add("is-in");
    }
  }

  function initReveal() {
    var items = $$("[data-reveal]");
    $$('[data-reveal="lines"]').forEach(function (t) {
      $$(".line", t).forEach(function (l, i) { l.style.setProperty("--i", i); });
    });

    if (reduceMotion.matches || !("IntersectionObserver" in window)) {
      items.forEach(function (n) { n.classList.add("is-in"); });
      return;
    }

    var hero = $(".hero");
    var heroItems = hero ? $$("[data-reveal]", hero) : [];

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        reveal(e.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.1 });

    items.forEach(function (n) { if (heroItems.indexOf(n) === -1) io.observe(n); });

    // Hero plays once the fonts and the hero photo are ready (or after a short wait).
    var fonts = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
    var ready = Promise.all([fonts, whenLoaded($(".hero img"), 1200)]);
    var cap = new Promise(function (r) { setTimeout(r, 1300); });
    Promise.race([ready, cap]).then(function () {
      requestAnimationFrame(function () { heroItems.forEach(reveal); });
    });
  }

  /* ---------- 4. gentle photo parallax ---------- */
  function initParallax() {
    if (reduceMotion.matches || !("IntersectionObserver" in window)) return;
    var items = $$("[data-parallax]").map(function (inner) {
      var amp = parseFloat(inner.getAttribute("data-parallax")) || 0.05;
      inner.style.setProperty("--pl", (amp + 0.01).toFixed(3));
      return { inner: inner, box: inner.parentNode, amp: amp, visible: false };
    });
    if (!items.length) return;

    var ticking = false;
    function schedule() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }

    function update() {
      ticking = false;
      var vh = window.innerHeight;
      items.forEach(function (it) {
        if (!it.visible) return;
        var r = it.box.getBoundingClientRect();
        var p = ((r.top + r.height / 2) - vh / 2) / ((vh + r.height) / 2);
        p = Math.max(-1, Math.min(1, p));
        it.inner.style.translate = "0 " + (p * it.amp * r.height).toFixed(1) + "px";
      });
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        items.forEach(function (it) { if (it.box === e.target) it.visible = e.isIntersecting; });
      });
      schedule();
    }, { rootMargin: "15% 0px" });
    items.forEach(function (it) { io.observe(it.box); });

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    schedule();
  }

  /* ---------- go ---------- */
  function init() {
    bindContent();
    renderNav();
    renderSocial();
    renderDishes();
    renderMenu();
    renderGallery();
    addStructuredData();
    initHeader();
    initMobileMenu();
    initScrollSpy();
    initDock();
    initReveal();
    initParallax();
    root.classList.add("ready");
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
