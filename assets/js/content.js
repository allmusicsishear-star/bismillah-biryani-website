/* ==========================================================================
   BISMILLAH BIRYANI — SITE CONTENT
   --------------------------------------------------------------------------
   This is the only file you need to edit to update:
   contact details · opening hours · menu · dishes · gallery · photos · links

   Everything on the page that repeats (phone, address, WhatsApp, directions,
   photos) is read from here, so change it once and it updates everywhere.
   ========================================================================== */
(function () {
  "use strict";

  /* ------------------------------------------------------------------------
     1. PHOTOS
     Change a link here and that photo changes everywhere it is used.
     These are the photos from the original design. Links from Google Stitch
     can stop working after a while, so before launch: download the photos,
     put them in assets/img/ and use paths like "assets/img/chicken.jpg".
     `pos` = which part of the photo stays visible when it is cropped.
     ------------------------------------------------------------------------ */
  var PHOTO = {
    chicken: {
      src: "https://lh3.googleusercontent.com/aida/AEtjO1Vylgb__OhxgBpNBpgbuSfDZYrYrfCPczkXjx14mHBBo6hppRqzib8V2FvQFOkh7sfudhU7YXQXQz032_vltRB2W5ckgFubNryP86DnTXcI5tkJzPcnNbzvWsvlxhUnQ3c4kWMARUgzSsQLNngba6NG3bkat0vFPG3JFIbm1FbzQ0AfyMwhHCtOyEvWn9S9-fgjCVtbgxJ9HJkxUXmTPqep_2pDwSjdCLP1ePBhN_HT51cnJqUPHd6ISKU",
      pos: "50% 50%",
      alt: "Biryani served in a brass handi, topped with fried onions"
    },
    tikka: {
      src: "https://lh3.googleusercontent.com/aida/AEtjO1WxEcYAhn2y0V67vlph4x2DrDuliufXD4tZvNJrPN0xtttWnbd9HkuN-lXkUP4HFS0Adp-kfBAopmG61_rCO8qP9frL-ZBx3kCW-0A6LfBmgMsHWdyllYUEU0CmSefvzWxNaSW32FUP7lPreQE_mi28UzcL2hN8E8JvGaH4PZhg67Fn4HPh-X1EMGcJT8AoP4lknVAg0t5PSEkIYunCcSwr9HLgFLTUNcnA-qqrq9f1JLpDthIdUENDMA7K",
      pos: "50% 50%",
      alt: "Biryani topped with browned chicken pieces, with raita served alongside"
    },
    mutton: {
      src: "https://lh3.googleusercontent.com/aida/AEtjO1WnYYfTtzpCAh5qgQjrfesARsbw3iLru3Je6_D5pk6QJMekH3Tczlo1KVkU38Pr_r-pkrWeACRZRYalMFCGPqTVijJQfvl03QD8kxc_YWrTczdnc-IaZV4E6fnbkJ-Y863Dhz19nt4bU6CPzgKVKFOm_Mv_QzYgh6CMsTUnEvcmky4LuKTsAxxoHCaOXjxYqD2jf1yrg2-FVpvJKfVwQu8CdwMkZ_CN9tPg7T_eVT3GwRwDEQXRdSWnlp2w",
      pos: "50% 50%",
      alt: "Mutton biryani served with raita and side bowls"
    },
    spoon: {
      src: "https://lh3.googleusercontent.com/aida/AEtjO1V5gYbTO-oatLKizPfKz2RR2UldIeB2jzykqnI2L64VpbTiwm8mBX_rWuRaFUKHdawYhxfawYcQH4UTeYTMu5nj-sUMaNGC3dJFeMa00N6gs8Qb_VNGLxAy9zDXeghXg6IN1d-oI-i_c47HkO8Y7psKUy8tmsoz1ovglbEikd2mVE2F-qbYe46trGTpoFk9VFoMLW_Ie6Uwm71u-k3nZ7vLmXsyKZAWYyYCc6hZY8js73Z7CjcvjioEDyEJ",
      pos: "50% 45%",
      alt: "A serving spoon lifting biryani from a brass handi, with side bowls and a lime on the table"
    }
  };

  /* ------------------------------------------------------------------------
     2. BUSINESS DETAILS
     ------------------------------------------------------------------------ */
  window.SITE = {
    name: "Bismillah Biryani",

    // Live website address, e.g. "https://www.bismillahbiryani.in/". Leave empty until known.
    siteUrl: "",

    phone: {
      display: "+91 99300 81904",
      tel: "+919930081904"
    },

    // WhatsApp number in international format, digits only (no + or spaces).
    whatsapp: {
      number: "919930081904",
      orderMessage: "Hello Bismillah Biryani, I'd like to place an order.",
      // {dish} is replaced with the dish name on each "Order now" button in the biryani section.
      dishMessage: "Hello Bismillah Biryani, I'd like to order {dish}.",
      menuMessage: "Hello Bismillah Biryani, please send me the current menu."
    },

    // Where the ORDER NOW buttons go.
    // Leave "" to open WhatsApp with a ready-to-send order message.
    // Later you can paste an online-ordering link here and every ORDER NOW button will use it.
    orderUrl: "",

    address: {
      // Shown on the page, one entry per line.
      lines: [
        "438-B, Santoshi Mata Mandir Marg,",
        "Sector 1, Savoli, Sector 2,",
        "Ghansoli, Navi Mumbai,",
        "Maharashtra 400701"
      ],
      // Used for search-engine data only (not shown on the page).
      street: "438-B, Santoshi Mata Mandir Marg, Sector 1, Savoli, Sector 2",
      locality: "Ghansoli, Navi Mumbai",
      region: "Maharashtra",
      postalCode: "400701",
      country: "IN"
    },

    hours: "11:00 AM – 11:00 PM",

    // Text Google Maps uses to find the place for GET DIRECTIONS and the map.
    mapsQuery:
      "Bismillah Biryani, 438-B, Santoshi Mata Mandir Marg, Sector 1, Savoli, Sector 2, Ghansoli, Navi Mumbai, Maharashtra 400701",

    // Social links appear in the footer. Add them like this, or leave the list empty:
    // { label: "Instagram", url: "https://www.instagram.com/…" }
    social: [],

    /* ----------------------------------------------------------------------
       3. NAVIGATION
       ---------------------------------------------------------------------- */
    nav: [
      { label: "Menu", href: "#menu" },
      { label: "About", href: "#about" },
      { label: "Gallery", href: "#gallery" },
      { label: "Contact", href: "#contact" }
    ],

    /* ----------------------------------------------------------------------
       4. PHOTO PLACEMENT
       Which photo sits in each big slot on the page.
       ---------------------------------------------------------------------- */
    images: {
      hero: PHOTO.chicken,
      statement: PHOTO.tikka,
      signature: PHOTO.mutton,
      cinematic: PHOTO.spoon
    },

    /* ----------------------------------------------------------------------
       5. THE THREE SIGNATURE BIRYANIS (the "Pick your biryani" section)
       ---------------------------------------------------------------------- */
    dishes: [
      { name: "Chicken Biryani", image: PHOTO.chicken },
      { name: "Chicken Tikka Biryani", image: PHOTO.tikka },
      { name: "Mutton Biryani", image: PHOTO.mutton }
    ],

    /* ----------------------------------------------------------------------
       6. MENU
       Add a price to any item with  price: "₹___"  — it appears automatically.
       No price is shown until you add one.
       ---------------------------------------------------------------------- */
    menu: {
      note: "Message us on WhatsApp for prices and the full menu.",
      categories: [
        {
          title: "Biryani",
          items: [
            { name: "Chicken Biryani" },
            { name: "Chicken Tikka Biryani" },
            { name: "Mutton Biryani" },
            { name: "Chicken Tandoori Biryani" },
            { name: "Chicken Fry Piece Biryani" }
          ]
        },
        {
          title: "Additional selections",
          items: [
            { name: "Chicken Masala Curry" },
            { name: "Chicken Noodles" },
            { name: "Starters & Tandoor" }
          ]
        }
      ]
    },

    /* ----------------------------------------------------------------------
       7. GALLERY ("From the kitchen")
       Photos fill the collage in a repeating pattern of four:
       large · small · small · wide. Add more photos and the pattern repeats.
       ---------------------------------------------------------------------- */
    gallery: [
      PHOTO.chicken,
      PHOTO.spoon,
      PHOTO.tikka,
      PHOTO.mutton
    ]
  };
})();
