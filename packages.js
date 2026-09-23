/* ============================================================
   SAMASTRIA - PAKET PRODUK
   Sumber data: Rekap_Kalkulasi_Paket_NASA
   6 Paket Produk + Harga JAWA / WIL 1 / WIL 2 / WIL 3 / WIL 4

   File:
   assets/packages.js

   File ini tidak mengubah:
   - Login
   - Supabase
   - Produk utama
   - iPaymu
   - Keranjang produk utama
   ============================================================ */

(function () {
  "use strict";

  const DATA = [

    /* ========================================================
       1. PAKET BOOSTER BUAH
       ======================================================== */
    {
      id: "paket-booster-buah",
      nama: "Paket Booster Buah",

      isi:
        "POCNASA 500 cc + PPTHORMONIK 100 cc + PWR NUTRITION 250 gram + SPRNASA 250 gram (Berat: ±1.2 kg → Input 1 kg)",

      imageSearch: "POCNASA 500 cc",

      harga: [
        {
          wilayah: "JAWA",
          eceran: 255000,
          harga: 240000,
          modal: 200000,
          pengaman: 17000,
          margin: 23000
        },
        {
          wilayah: "WIL 1",
          eceran: 275500,
          harga: 260000,
          modal: 216000,
          pengaman: 17000,
          margin: 27000
        },
        {
          wilayah: "WIL 2",
          eceran: 287500,
          harga: 272000,
          modal: 226000,
          pengaman: 17000,
          margin: 29000
        },
        {
          wilayah: "WIL 3",
          eceran: 301500,
          harga: 286000,
          modal: 236000,
          pengaman: 17000,
          margin: 33000
        },
        {
          wilayah: "WIL 4",
          eceran: 331000,
          harga: 316000,
          modal: 258000,
          pengaman: 17000,
          margin: 41000
        }
      ]
    },

    /* ========================================================
       2. PAKET TERNAK & PERIKAN
       ======================================================== */
    {
      id: "paket-ternak-perikan",
      nama: "Paket Ternak & Perikan",

      isi:
        "VITERNA 500 cc + POCNASA 500 cc (Berat: ±1.1 kg → Input 1 kg)",

      imageSearch: "VITERNA 500 cc",

      harga: [
        {
          wilayah: "JAWA",
          eceran: 120000,
          harga: 112000,
          modal: 90000,
          pengaman: 17000,
          margin: 5000
        },
        {
          wilayah: "WIL 1",
          eceran: 135000,
          harga: 126000,
          modal: 101000,
          pengaman: 17000,
          margin: 8000
        },
        {
          wilayah: "WIL 2",
          eceran: 143000,
          harga: 134000,
          modal: 107000,
          pengaman: 17000,
          margin: 10000
        },
        {
          wilayah: "WIL 3",
          eceran: 150000,
          harga: 141000,
          modal: 113000,
          pengaman: 17000,
          margin: 11000
        },
        {
          wilayah: "WIL 4",
          eceran: 170000,
          harga: 161000,
          modal: 128000,
          pengaman: 17000,
          margin: 16000
        }
      ]
    },

    /* ========================================================
       3. PAKET SKINCARE GLOW
       ======================================================== */
    {
      id: "paket-skincare-glow",
      nama: "Paket Skincare Glow",

      isi:
        "ERHSALI Brightening Soap + MORESKIN Body Wash Glow + MORESKIN Clean & Glow Cream (Berat: ±0.4 kg → Input 1 kg)",

      imageSearch: "ERHSALI Brightening Soap",

      harga: [
        {
          wilayah: "JAWA",
          eceran: 270000,
          harga: 255000,
          modal: 213000,
          pengaman: 17000,
          margin: 25000
        },
        {
          wilayah: "WIL 1",
          eceran: 289000,
          harga: 274000,
          modal: 228000,
          pengaman: 17000,
          margin: 29000
        },
        {
          wilayah: "WIL 2",
          eceran: 308000,
          harga: 293000,
          modal: 244000,
          pengaman: 17000,
          margin: 32000
        },
        {
          wilayah: "WIL 3",
          eceran: 328000,
          harga: 313000,
          modal: 261000,
          pengaman: 17000,
          margin: 35000
        },
        {
          wilayah: "WIL 4",
          eceran: 365000,
          harga: 350000,
          modal: 293000,
          pengaman: 17000,
          margin: 40000
        }
      ]
    },

    /* ========================================================
       4. PAKET ASAM URAT & KOLE
       ======================================================== */
    {
      id: "paket-asam-urat-kole",
      nama: "Paket Asam Urat & Kole",

      isi:
        "HERBAGYN 50 Kapsul + HERBATHUS 50 Kapsul (Berat: <0.5 kg → Input 1 kg)",

      imageSearch: "HERBAGYN 50 Kapsul",

      harga: [
        {
          wilayah: "JAWA",
          eceran: 330000,
          harga: 310000,
          modal: 230000,
          pengaman: 17000,
          margin: 63000
        },
        {
          wilayah: "WIL 1",
          eceran: 344000,
          harga: 324000,
          modal: 240000,
          pengaman: 17000,
          margin: 67000
        },
        {
          wilayah: "WIL 2",
          eceran: 358000,
          harga: 338000,
          modal: 252000,
          pengaman: 17000,
          margin: 69000
        },
        {
          wilayah: "WIL 3",
          eceran: 374000,
          harga: 354000,
          modal: 264000,
          pengaman: 17000,
          margin: 73000
        },
        {
          wilayah: "WIL 4",
          eceran: 400000,
          harga: 380000,
          modal: 288000,
          pengaman: 17000,
          margin: 75000
        }
      ]
    },

    /* ========================================================
       5. PAKET ANTI UBAN & RAMB
       ======================================================== */
    {
      id: "paket-anti-uban-ramb",
      nama: "Paket Anti Uban & Ramb",

      isi:
        "SHANAS Shampoo 3 in 1 170 ml + SHANAS Anti Uban 120 ml (Berat: <0.5 kg → Input 1 kg)",

      imageSearch: "SHANAS Shampoo 3 in 1 170 ml",

      harga: [
        {
          wilayah: "JAWA",
          eceran: 108000,
          harga: 100000,
          modal: 88000,
          pengaman: 2000,
          margin: 10000
        },
        {
          wilayah: "WIL 1",
          eceran: 124000,
          harga: 115000,
          modal: 101000,
          pengaman: 2000,
          margin: 12000
        },
        {
          wilayah: "WIL 2",
          eceran: 137000,
          harga: 128000,
          modal: 112000,
          pengaman: 2000,
          margin: 14000
        },
        {
          wilayah: "WIL 3",
          eceran: 150000,
          harga: 140000,
          modal: 123000,
          pengaman: 2000,
          margin: 15000
        },
        {
          wilayah: "WIL 4",
          eceran: 180000,
          harga: 170000,
          modal: 147000,
          pengaman: 2000,
          margin: 21000
        }
      ]
    },

    /* ========================================================
       6. PAKET SENYUM SEHAT
       ======================================================== */
    {
      id: "paket-senyum-sehat",
      nama: "Paket Senyum Sehat",

      isi:
        "2 pcs Pasta Gigi NASA 120g + 1 pcs GRECE Anti Perspirant 50g (Berat: <0.5 kg → Input 1 kg)",

      imageSearch: "Pasta Gigi NASA 120g",

      harga: [
        {
          wilayah: "JAWA",
          eceran: 95000,
          harga: 95000,
          modal: 72000,
          pengaman: 2000,
          margin: 21000
        },
        {
          wilayah: "WIL 1",
          eceran: 108000,
          harga: 108000,
          modal: 83000,
          pengaman: 2000,
          margin: 23000
        },
        {
          wilayah: "WIL 2",
          eceran: 120000,
          harga: 120000,
          modal: 93000,
          pengaman: 2000,
          margin: 25000
        },
        {
          wilayah: "WIL 3",
          eceran: 132000,
          harga: 132000,
          modal: 102000,
          pengaman: 2000,
          margin: 28000
        },
        {
          wilayah: "WIL 4",
          eceran: 153000,
          harga: 153000,
          modal: 122000,
          pengaman: 2000,
          margin: 29000
        }
      ]
    }

  ];


  /* ============================================================
     SIMPAN DATA PAKET KE WINDOW
     ============================================================ */

  window.SAMASTRIA_PACKAGE_DATA = DATA;


  /* ============================================================
     FORMAT RUPIAH
     ============================================================ */

  function rupiah(n) {
    return "Rp " + Number(n || 0).toLocaleString("id-ID");
  }


  /* ============================================================
     ESCAPE HTML
     ============================================================ */

  function esc(v) {
    return String(v ?? "").replace(/[&<>'"]/g, function (c) {
      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&#39;",
        '"': "&quot;"
      }[c];
    });
  }


  /* ============================================================
     CARI GAMBAR PAKET
     Menggunakan sistem gambar produk yang sudah ada.
     ============================================================ */

  function packageImage(pkg) {
    try {
      if (window.SAMASTRIA_FIND_PRODUCT_IMAGE) {
        return (
          window.SAMASTRIA_FIND_PRODUCT_IMAGE(pkg.imageSearch) || ""
        );
      }
    } catch (e) {
      console.warn("Gagal mencari gambar paket:", pkg.nama, e);
    }

    return "";
  }


  /* ============================================================
     CEK WILAYAH PELANGGAN
     ============================================================ */

  function currentPrice(pkg) {
    const region = window.priceRegion;

    if (!region) {
      return null;
    }

    const row = pkg.harga.find(function (x) {
      return x.wilayah === region;
    });

    return row ? row.harga : null;
  }


  /* ============================================================
     TAMPILKAN SEMUA HARGA WILAYAH
     ============================================================ */

  function priceLines(pkg) {
    return pkg.harga
      .map(function (x) {
        return (
          '<div style="' +
          "display:flex;" +
          "justify-content:space-between;" +
          "gap:10px;" +
          "padding:4px 0;" +
          'border-bottom:1px solid #eee;">' +

          "<span>" +
          esc(x.wilayah) +
          "</span>" +

          "<strong>" +
          rupiah(x.harga) +
          "</strong>" +

          "</div>"
        );
      })
      .join("");
  }


  /* ============================================================
     RENDER PAKET PRODUK
     ============================================================ */

  window.SAMASTRIA_RENDER_PACKAGES = function () {

    const grid = document.getElementById("productGrid");

    if (!grid) {
      console.warn(
        "SAMASTRIA: #productGrid tidak ditemukan."
      );
      return;
    }

    const noMsg =
      document.getElementById("noProductMsg");

    if (noMsg) {
      noMsg.classList.add("hidden");
    }


    grid.innerHTML = DATA.map(function (pkg) {

      const img = packageImage(pkg);

      const activePrice = currentPrice(pkg);


      /* --------------------------------------------------------
         GAMBAR
         -------------------------------------------------------- */

      const imageHtml = img

        ? (
          '<img class="product-img" ' +
          'src="' + esc(img) + '" ' +
          'alt="' + esc(pkg.nama) + '" ' +
          'loading="lazy" ' +
          'onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\';">' +

          '<div class="product-img" ' +
          'style="' +
          "display:none;" +
          "align-items:center;" +
          "justify-content:center;" +
          "font-size:42px;" +
          "background:#f7f2e9;" +
          '">' +
          "▣" +
          "</div>"
        )

        : (
          '<div class="product-img" ' +
          'style="' +
          "display:flex;" +
          "align-items:center;" +
          "justify-content:center;" +
          "font-size:42px;" +
          "background:#f7f2e9;" +
          '">' +
          "▣" +
          "</div>"
        );


      /* --------------------------------------------------------
         HARGA
         -------------------------------------------------------- */

      let priceHtml = "";

      if (activePrice !== null) {

        priceHtml =
          '<div class="product-price">' +
          rupiah(activePrice) +
          "</div>" +

          '<div style="' +
          "font-size:.78rem;" +
          "color:var(--text-light);" +
          'margin-top:4px;">' +

          "Harga wilayah " +
          esc(window.priceRegion) +

          "</div>";

      } else {

        priceHtml =
          '<div style="' +
          "margin-top:8px;" +
          "font-size:.88rem;" +
          'background:#fafafa;padding:8px;border-radius:8px;">' +

          '<div style="' +
          "font-weight:700;" +
          "margin-bottom:4px;" +
          '">' +

          "Harga Paket Promo" +

          "</div>" +

          priceLines(pkg) +

          "</div>";
      }


      /* --------------------------------------------------------
         CARD
         -------------------------------------------------------- */

      return (

        '<div class="product-card">' +

          imageHtml +

          '<div class="product-body">' +

            '<div class="product-category">' +
            "Paket Produk" +
            "</div>" +

            '<div class="product-name">' +
            esc(pkg.nama) +
            "</div>" +

            '<div class="product-desc">' +
            esc(pkg.isi) +
            "</div>" +

            '<div style="' +
            "margin:10px 0 6px;" +
            "font-weight:700;" +
            '">' +

            "Harga Jual Paket Promo" +

            "</div>" +

            priceHtml +

            '<div style="' +
            "margin-top:10px;" +
            "font-size:.82rem;" +
            "color:var(--text-light);" +
            '">' +

            "Harga mengikuti wilayah pelanggan." +

            "</div>" +

          "</div>" +

        "</div>"
      );

    }).join("");


    console.log(
      "SAMASTRIA: " +
      DATA.length +
      " paket produk ditampilkan."
    );
  };


  /* ============================================================
     FUNGSI UNTUK MENCARI PAKET
     ============================================================ */

  window.SAMASTRIA_GET_PACKAGE = function (id) {
    return DATA.find(function (pkg) {
      return pkg.id === id;
    }) || null;
  };


  /* ============================================================
     FUNGSI UNTUK MENDAPATKAN HARGA PAKET
     ============================================================ */

  window.SAMASTRIA_GET_PACKAGE_PRICE = function (
    id,
    wilayah
  ) {

    const pkg = window.SAMASTRIA_GET_PACKAGE(id);

    if (!pkg) {
      return null;
    }

    const row = pkg.harga.find(function (x) {
      return x.wilayah === wilayah;
    });

    return row ? row.harga : null;
  };


  /* ============================================================
     JANGAN LANGSUNG RENDER DI SINI
     
     Render akan dipanggil oleh index.html ketika user memilih
     kategori "Paket Produk".
     ============================================================ */

  console.log(
    "SAMASTRIA packages.js aktif:",
    DATA.length,
    "paket tersedia."
  );

})();
