# TokoSehat — versi database Supabase

Versi ini mempertahankan tampilan `index.html`, tetapi akun, produk, pesanan, stok, dan status pembayaran sekarang memakai Supabase. Keranjang tetap disimpan lokal pada browser agar ringan.

## Sengaja belum dimasukkan
- Jarak wilayah
- Biaya pengiriman
- Pilihan wilayah tujuan

Checkout tetap meminta **alamat lengkap**, tetapi total = subtotal produk dan tidak ada ongkir.

## Isi paket
- `index.html` — website pelanggan.
- `admin.html` — panel admin produk, stok, pesanan, dan verifikasi pembayaran.
- `supabase_schema.sql` — database, RLS, trigger auth, seed 16 produk, dan fungsi transaksi aman.

## Cara memasang
1. Buat project Supabase.
2. Buka **SQL Editor** dan jalankan seluruh `supabase_schema.sql`.
3. Buka **Authentication → Providers → Email**. Untuk tes cepat boleh mematikan Confirm email; untuk produksi lebih baik email verification tetap aktif.
4. Buka **Project Settings → API**, salin **Project URL** dan **anon public key**.
5. Isi `SUPABASE_URL` dan `SUPABASE_ANON_KEY` pada `index.html` dan `admin.html`.
6. Daftar akun pelanggan dari `index.html`.
7. Jadikan akun tersebut admin dengan SQL:
   ```sql
   update public.profiles
   set role = 'admin'
   where email = 'EMAIL_ADMIN_KAMU';
   ```
8. Buka `admin.html` untuk mengelola produk/stok dan pesanan.
9. Upload `index.html` dan `admin.html` ke repository GitHub Pages. `supabase_schema.sql` boleh disimpan di repository untuk dokumentasi; jangan menaruh service-role key di sana.

## Alur toko
Pelanggan → login → katalog → keranjang → checkout → order dibuat di database → stok dikurangi secara atomik → transfer bank → `Saya Sudah Transfer` → admin verifikasi → status `Diproses` → `Dikirim` → `Selesai`.

## Keamanan
- Password dikelola Supabase Auth, bukan `localStorage`.
- Harga dan stok tidak dipercaya dari browser; fungsi `create_order` mengambil harga/stok langsung dari database dan memakai row locking.
- RLS membatasi pelanggan hanya melihat order miliknya.
- Admin ditentukan oleh `profiles.role`.
- `anon public key` boleh ada di frontend. **Jangan pernah memasukkan `service_role key` ke HTML.**

## Pembayaran
Versi ini menggunakan transfer bank dengan verifikasi admin. Belum ada QRIS/payment gateway otomatis dan belum ada upload bukti transfer. Struktur `payments` sudah disiapkan agar fitur itu bisa ditambahkan kemudian.
