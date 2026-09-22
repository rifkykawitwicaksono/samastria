/* =========================================================
   SAMASTRIA - PRODUCT IMAGE AUTO FINDER
   Struktur GitHub:
   foto produk berada langsung di ROOT repository
   ========================================================= */

(function () {
  "use strict";

  function normalize(text) {
    return String(text || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, " ")
      .trim();
  }

  function cleanProductName(text) {
    return normalize(text)
      .replace(/\b\d+(?:[.,]\d+)?\s*(?:cc|ml|gram|gr|kg|liter|l|g)\b/g, " ")
      .replace(/\b\d+(?:[.,]\d+)?\b/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  /*
   * Semua foto produk berada langsung di ROOT GitHub.
   *
   * Karena GitHub Pages tidak menyediakan daftar isi folder
   * kepada JavaScript, kita menggunakan nama produk untuk
   * membentuk nama file gambar.
   */

  function makeCandidates(productName) {
    var original = String(productName || "").trim();
    var normalized = cleanProductName(original);

    if (!original) return [];

    var candidates = [];

    function add(value) {
      if (!value) return;

      value = value
        .replace(/[\/\\:*?"<>|]/g, " ")
        .replace(/\s+/g, " ")
        .trim();

      if (!value) return;

      var filename =
        value
          .replace(/\s+/g, "-")
          .replace(/-+/g, "-");

      candidates.push(filename + ".webp");
    }

    /*
     * Pola nama file yang Anda upload:
     *
     * produk-agrokompleks__NAMA-PRODUK.webp
     * produk-kesehatan__NAMA-PRODUK.webp
     * produk-kosmetik__NAMA-PRODUK.webp
     * produk-perawatan-rumah__NAMA-PRODUK.webp
     * produk-inovasi-teknologi__NAMA-PRODUK.webp
     */

    var categories = [
      "produk-agrokompleks__",
      "produk-perawatan-rumah__",
      "produk-kesehatan__",
      "produk-kosmetik__",
      "produk-inovasi-teknologi__"
    ];

    /*
     * Kandidat berdasarkan nama asli.
     */
    var raw = original
      .replace(/[\/\\:*?"<>|]/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    var rawDash = raw.replace(/\s+/g, "-");

    categories.forEach(function (prefix) {
      candidates.push(prefix + rawDash + ".webp");
    });

    /*
     * Kandidat berdasarkan nama yang sudah dinormalisasi.
     */
    if (normalized) {
      var normDash = normalized.replace(/\s+/g, "-");

      categories.forEach(function (prefix) {
        candidates.push(prefix + normDash + ".webp");
      });
    }

    /*
     * Kandidat tanpa ukuran.
     *
     * Contoh:
     * POCNASA 500 cc
     *
     * dicoba juga:
     * POCNASA
     */
    if (normalized) {
      var withoutSize = normalized
        .replace(
          /\b\d+(?:[.,]\d+)?\s*(cc|ml|gram|gr|kg|liter|l|g)\b/g,
          " "
        )
        .replace(/\s+/g, " ")
        .trim();

      if (withoutSize) {
        var noSizeDash = withoutSize.replace(/\s+/g, "-");

        categories.forEach(function (prefix) {
          candidates.push(prefix + noSizeDash + ".webp");
        });
      }
    }

    /*
     * Hilangkan duplikat.
     */
    return Array.from(new Set(candidates));
  }

  function imageExists(url) {
    return new Promise(function (resolve) {
      var img = new Image();

      img.onload = function () {
        resolve(true);
      };

      img.onerror = function () {
        resolve(false);
      };

      img.src = url;
    });
  }

  /*
   * Fungsi utama yang dipanggil index.html/admin.html
   */
  window.SAMASTRIA_FIND_PRODUCT_IMAGE = function (productName) {
    var candidates = makeCandidates(productName);

    if (!candidates.length) {
      return "";
    }

    /*
     * Karena fungsi dipanggil saat kartu produk dibuat,
     * kita kembalikan kandidat pertama yang paling sesuai.
     *
     * Nama file yang Anda upload mengikuti nama produk,
     * sehingga kandidat pertama biasanya sudah tepat.
     */
    return candidates[0];
  };

  /*
   * Versi asynchronous untuk pemeriksaan gambar.
   * Bisa digunakan jika nanti diperlukan pencarian yang lebih
   * fleksibel tanpa mengubah fungsi utama.
   */
  window.SAMASTRIA_FIND_PRODUCT_IMAGE_ASYNC = async function (
    productName
  ) {
    var candidates = makeCandidates(productName);

    for (var i = 0; i < candidates.length; i++) {
      var filename = candidates[i];

      var exists = await imageExists(
        filename
      );

      if (exists) {
        return filename;
      }
    }

    return "";
  };

})();
