SAMASTRIA - HARGA OTOMATIS BERDASARKAN WILAYAH

Yang berubah:
1. Checkout sekarang meminta Provinsi dan Kabupaten/Kota.
2. Sistem menentukan kelompok harga dari pedoman NASA halaman 7:
   - JAWA
   - WIL I
   - WIL II
   - WIL III
   - WIL IV
3. Ringkasan checkout langsung menampilkan harga sesuai wilayah.
4. Saat pesanan dibuat, harga dihitung ulang di Supabase melalui RPC create_order_region, sehingga total pesanan tidak hanya bergantung pada harga yang tampil di browser.
5. Admin sekarang dapat mengisi 5 harga wilayah untuk setiap produk.

PENTING:
- Jalankan file harga-wilayah-supabase.sql di Supabase SQL Editor terlebih dahulu.
- Harga regional produk lama awalnya disalin dari kolom harga lama. Ini hanya nilai awal agar sistem tetap berjalan.
- Daftar produk di database Samastria saat ini tidak sama dengan nama produk pada PDF NASA yang diberikan, sehingga angka harga PDF tidak diisikan otomatis ke produk yang berbeda nama.
- Setelah SQL dijalankan, buka admin.html dan isi harga Jawa/Wil I/Wil II/Wil III/Wil IV sesuai daftar harga produk Anda.

Urutan pemasangan:
1. Buka Supabase > SQL Editor.
2. Jalankan seluruh isi harga-wilayah-supabase.sql.
3. Upload index.html, admin.html, dan config.js ke repository GitHub Samastria.
4. Tunggu GitHub Pages selesai deploy.
5. Login admin > Produk, lalu isi 5 harga wilayah setiap produk.
6. Di checkout pelanggan, pilih Provinsi + Kabupaten/Kota. Harga dan total akan berubah otomatis.
