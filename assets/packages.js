/* ============================================================
   SAMASTRIA - PAKET PRODUK
   ============================================================

   SUMBER DATA:
   Rekap_Kalkulasi_Paket_NASA(1).xlsx

   DATA DI DALAM FILE INI:
   - Nama paket
   - Isi paket
   - Total eceran resmi
   - Harga paket promo
   - Modal agen
   - Biaya pengaman / packing
   - Margin bersih
   - Wilayah JAWA
   - WIL 1
   - WIL 2
   - WIL 3
   - WIL 4

   Tidak mengubah:
   - Login
   - Supabase
   - Produk utama
   - iPaymu
   - Admin
   ============================================================ */

(function () {
  "use strict";


  /* ==========================================================
     DATA PAKET
     ========================================================== */

  const DATA = [

    {
      id: "paket-booster-buah",

      nama: "Paket Booster Buah",

      isi:
        "POCNASA 500 cc + PPTHORMONIK 100 cc + PWR NUTRITION 250 gram + SPRNASA 250 gram (Berat: ±1.2 kg -> Input 1 kg)",

      harga: [
        {
          wilayah: "JAWA",
          totalEceranResmi: 255000,
          hargaPaketPromo: 240000,
          modalAgen: 200000,
          biayaPengaman: 17000,
          marginBersih: 23000
        },
        {
          wilayah: "WIL 1",
          totalEceranResmi: 275500,
          hargaPaketPromo: 260000,
          modalAgen: 216000,
          biayaPengaman: 17000,
          marginBersih: 27000
        },
        {
          wilayah: "WIL 2",
          totalEceranResmi: 287500,
          hargaPaketPromo: 272000,
          modalAgen: 226000,
          biayaPengaman: 17000,
          marginBersih: 29000
        },
        {
          wilayah: "WIL 3",
          totalEceranResmi: 301500,
          hargaPaketPromo: 286000,
          modalAgen: 236000,
          biayaPengaman: 17000,
          marginBersih: 33000
        },
        {
          wilayah: "WIL 4",
          totalEceranResmi: 331000,
          hargaPaketPromo: 316000,
          modalAgen: 258000,
          biayaPengaman: 17000,
          marginBersih: 41000
        }
      ]
    },


    {
      id: "paket-ternak-perikan",

      nama: "Paket Ternak & Perikan",

      isi:
        "VITERNA 500 cc + POCNASA 500 cc (Berat: ±1.1 kg -> Input 1 kg)",

      harga: [
        {
          wilayah: "JAWA",
          totalEceranResmi: 120000,
          hargaPaketPromo: 112000,
          modalAgen: 90000,
          biayaPengaman: 17000,
          marginBersih: 5000
        },
        {
          wilayah: "WIL 1",
          totalEceranResmi: 135000,
          hargaPaketPromo: 126000,
          modalAgen: 101000,
          biayaPengaman: 17000,
          marginBersih: 8000
        },
        {
          wilayah: "WIL 2",
          totalEceranResmi: 143000,
          hargaPaketPromo: 134000,
          modalAgen: 107000,
          biayaPengaman: 17000,
          marginBersih: 10000
        },
        {
          wilayah: "WIL 3",
          totalEceranResmi: 150000,
          hargaPaketPromo: 141000,
          modalAgen: 113000,
          biayaPengaman: 17000,
          marginBersih: 11000
        },
        {
          wilayah: "WIL 4",
          totalEceranResmi: 170000,
          hargaPaketPromo: 161000,
          modalAgen: 128000,
          biayaPengaman: 17000,
          marginBersih: 16000
        }
      ]
    },


    {
      id: "paket-skincare-glow",

      nama: "Paket Skincare Glow",

      isi:
        "ERHSALI Brightening Soap + MORESKIN Body Wash Glow + MORESKIN Clean & Glow Cream (Berat: ±0.4 kg -> Input 1 kg)",

      harga: [
        {
          wilayah: "JAWA",
          totalEceranResmi: 270000,
          hargaPaketPromo: 255000,
          modalAgen: 213000,
          biayaPengaman: 17000,
          marginBersih: 25000
        },
        {
          wilayah: "WIL 1",
          totalEceranResmi: 289000,
          hargaPaketPromo: 274000,
          modalAgen: 228000,
          biayaPengaman: 17000,
          marginBersih: 29000
        },
        {
          wilayah: "WIL 2",
          totalEceranResmi: 308000,
          hargaPaketPromo: 293000,
          modalAgen: 244000,
          biayaPengaman: 17000,
          marginBersih: 32000
        },
        {
          wilayah: "WIL 3",
          totalEceranResmi: 328000,
          hargaPaketPromo: 313000,
          modalAgen: 261000,
          biayaPengaman: 17000,
          marginBersih: 35000
        },
        {
          wilayah: "WIL 4",
          totalEceranResmi: 365000,
          hargaPaketPromo: 350000,
          modalAgen: 293000,
          biayaPengaman: 17000,
          marginBersih: 40000
        }
      ]
    },


    {
      id: "paket-asam-urat-kole",

      nama: "Paket Asam Urat & Kole",

      isi:
        "HERBAGYN 50 Kapsul + HERBATHUS 50 Kapsul (Berat: <0.5 kg -> Input 1 kg)",

      harga: [
        {
          wilayah: "JAWA",
          totalEceranResmi: 330000,
          hargaPaketPromo: 310000,
          modalAgen: 230000,
          biayaPengaman: 17000,
          marginBersih: 63000
        },
        {
          wilayah: "WIL 1",
          totalEceranResmi: 344000,
          hargaPaketPromo: 324000,
          modalAgen: 240000,
          biayaPengaman: 17000,
          marginBersih: 67000
        },
        {
          wilayah: "WIL 2",
          totalEceranResmi: 358000,
          hargaPaketPromo: 338000,
          modalAgen: 252000,
          biayaPengaman: 17000,
          marginBersih: 69000
        },
        {
          wilayah: "WIL 3",
          totalEceranResmi: 374000,
          hargaPaketPromo: 354000,
          modalAgen: 264000,
          biayaPengaman: 17000,
          marginBersih: 73000
        },
        {
          wilayah: "WIL 4",
          totalEceranResmi: 400000,
          hargaPaketPromo: 380000,
          modalAgen: 288000,
          biayaPengaman: 17000,
          marginBersih: 75000
        }
      ]
    },


    {
      id: "paket-anti-uban-ramb",

      nama: "Paket Anti Uban & Ramb",

      isi:
        "SHANAS Shampoo 3 in 1 170 ml + SHANAS Anti Uban 120 ml (Berat: <0.5 kg -> Input 1 kg)",

      harga: [
        {
          wilayah: "JAWA",
          totalEceranResmi: 108000,
          hargaPaketPromo: 100000,
          modalAgen: 88000,
          biayaPacking: 2000,
          subsidiOngkir: 0,
          marginBersih: 10000
        },
        {
          wilayah: "WIL 1",
          totalEceranResmi: 124000,
          hargaPaketPromo: 115000,
          modalAgen: 101000,
          biayaPacking: 2000,
          subsidiOngkir: 0,
          marginBersih: 12000
        },
        {
          wilayah: "WIL 2",
          totalEceranResmi: 137000,
          hargaPaketPromo: 128000,
          modalAgen: 112000,
          biayaPacking: 2000,
          subsidiOngkir: 0,
          marginBersih: 14000
        },
        {
          wilayah: "WIL 3",
          totalEceranResmi: 150000,
          hargaPaketPromo: 140000,
          modalAgen: 123000,
          biayaPacking: 2000,
          subsidiOngkir: 0,
          marginBersih: 15000
        },
        {
          wilayah: "WIL 4",
          totalEceranResmi: 180000,
          hargaPaketPromo: 170000,
          modalAgen: 147000,
          biayaPacking: 2000,
          subsidiOngkir: 0,
          marginBersih: 21000
        }
      ]
    },


    {
      id: "paket-senyum-sehat",

      nama: "Paket Senyum Sehat",

      isi:
        "2 pcs Pasta Gigi NASA 120g + 1 pcs GRECE Anti Perspirant 50g (Berat: <0.5 kg -> Input 1 kg)",

      harga: [
        {
          wilayah: "JAWA",
          totalEceranResmi: 95000,
          hargaPaketPromo: 95000,
          modalAgen: 72000,
          biayaPengaman: 2000,
          marginBersih: 21000
        },
        {
          wilayah: "WIL 1",
          totalEceranResmi: 108000,
          hargaPaketPromo: 108000,
          modalAgen: 83000,
          biayaPengaman: 2000,
          marginBersih: 23000
        },
        {
          wilayah: "WIL 2",
          totalEceranResmi: 120000,
          hargaPaketPromo: 120000,
          modalAgen: 93000,
          biayaPengaman: 2000,
          marginBersih: 25000
        },
        {
          wilayah: "WIL 3",
          totalEceranResmi: 132000,
          hargaPaketPromo: 132000,
          modalAgen: 102000,
          biayaPengaman: 2000,
          marginBersih: 28000
        },
        {
          wilayah: "WIL 4",
          totalEceranResmi: 153000,
          hargaPaketPromo: 153000,
          modalAgen: 122000,
          biayaPengaman: 2000,
          marginBersih: 29000
        }
      ]
    }

  ];


  /* ==========================================================
     SIMPAN DATA KE WINDOW
     ========================================================== */

  window.SAMASTRIA_PACKAGE_DATA = DATA;


  /* ==========================================================
     FORMAT RUPIAH
     ========================================================== */

  function rupiah(value) {
    return "Rp " + Number(value || 0).toLocaleString("id-ID");
  }


  /* ==========================================================
     ESCAPE HTML
     ========================================================== */

  function esc(value) {
    return String(value ?? "").replace(/[&<>'"]/g, function (char) {
      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&#39;",
        '"': "&quot;"
      }[char];
    });
  }


  /* ==========================================================
     CARI GAMBAR
     
     Tidak menambahkan nama gambar baru.
     Sistem menggunakan nama produk pertama dari isi paket
     dan fungsi pencarian gambar yang sudah ada.
     ========================================================== */

  function packageImage(pkg) {

    try {

      if (
        window.SAMASTRIA_FIND_PRODUCT_IMAGE &&
        pkg &&
        pkg.isi
      ) {

        const firstProduct =
          pkg.isi
            .split("+")[0]
            .replace(/\(.*$/, "")
            .trim();

        return (
          window.SAMASTRIA_FIND_PRODUCT_IMAGE(
            firstProduct
          ) || ""
        );
      }

    } catch (error) {

      console.warn(
        "Gagal mencari gambar paket:",
        pkg?.nama,
        error
      );

    }

    return "";
  }


  /* ==========================================================
     HARGA SESUAI WILAYAH
     ========================================================== */

  function currentPrice(pkg) {

    const region = window.priceRegion;

    if (!region) {
      return null;
    }

    const row = pkg.harga.find(function (item) {
      return item.wilayah === region;
    });

    return row
      ? row.hargaPaketPromo
      : null;
  }


  /* ==========================================================
     DAFTAR HARGA SEMUA WILAYAH
     ========================================================== */

  function priceLines(pkg) {

    return pkg.harga.map(function (item) {

      return (
        '<div style="' +
        "display:flex;" +
        "justify-content:space-between;" +
        "gap:10px;" +
        "padding:4px 0;" +
        'border-bottom:1px solid #eee;">' +

        "<span>" +
        esc(item.wilayah) +
        "</span>" +

        "<strong>" +
        rupiah(item.hargaPaketPromo) +
        "</strong>" +

        "</div>"
      );

    }).join("");
  }


  /* ==========================================================
     RENDER PAKET PRODUK
     ========================================================== */

  window.SAMASTRIA_RENDER_PACKAGES = function () {

    const grid =
      document.getElementById("productGrid");

    if (!grid) {

      console.warn(
        "SAMASTRIA: productGrid tidak ditemukan."
      );

      return;
    }


    const noProductMsg =
      document.getElementById("noProductMsg");

    if (noProductMsg) {
      noProductMsg.classList.add("hidden");
    }


    grid.innerHTML = DATA.map(function (pkg) {

      const img = packageImage(pkg);

      const activePrice =
        currentPrice(pkg);


      /* --------------------------------------------------------
         GAMBAR
         -------------------------------------------------------- */

      let imageHtml;

      if (img) {

        imageHtml =
          '<img class="product-img" ' +
          'src="' + esc(img) + '" ' +
          'alt="' + esc(pkg.nama) + '" ' +
          'loading="lazy">';

      } else {

        imageHtml =
          '<div class="product-img" ' +
          'style="' +
          "display:flex;" +
          "align-items:center;" +
          "justify-content:center;" +
          "font-size:42px;" +
          "background:#f7f2e9;" +
          '">' +
          "▣" +
          "</div>";
      }


      /* --------------------------------------------------------
         HARGA
         -------------------------------------------------------- */

      let priceHtml;


      if (activePrice !== null) {

        priceHtml =
          '<div class="product-price">' +
          rupiah(activePrice) +
          "</div>" +

          '<div style="' +
          "font-size:.78rem;" +
          "color:var(--text-light);" +
          "margin-top:4px;" +
          '">' +

          "Harga wilayah " +
          esc(window.priceRegion) +

          "</div>";

      } else {

        priceHtml =
          '<div style="' +
          "margin-top:8px;" +
          "font-size:.88rem;" +
          "background:#fafafa;" +
          "padding:8px;" +
          "border-radius:8px;" +
          '">' +

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


  /* ==========================================================
     CARI PAKET BERDASARKAN ID
     ========================================================== */

  window.SAMASTRIA_GET_PACKAGE = function (id) {

    return (
      DATA.find(function (pkg) {
        return pkg.id === id;
      }) || null
    );

  };


  /* ==========================================================
     AMBIL HARGA PROMO PAKET
     ========================================================== */

  window.SAMASTRIA_GET_PACKAGE_PRICE = function (
    id,
    wilayah
  ) {

    const pkg =
      window.SAMASTRIA_GET_PACKAGE(id);

    if (!pkg) {
      return null;
    }


    const row =
      pkg.harga.find(function (item) {
        return item.wilayah === wilayah;
      });


    return row
      ? row.hargaPaketPromo
      : null;

  };


  /* ==========================================================
     LOG
     ========================================================== */

  console.log(
    "SAMASTRIA packages.js aktif:",
    DATA.length,
    "paket terverifikasi."
  );

})();
