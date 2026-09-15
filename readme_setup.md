# TokoSehat — GitHub Pages + Supabase

Paket ini memakai GitHub Pages untuk website dan Supabase untuk login/database.

## Tidak ada ongkir
Checkout hanya meminta:
- Nama lengkap
- WhatsApp
- Alamat lengkap
- Catatan pesanan (opsional)

Tidak ada jarak wilayah, biaya pengiriman, pilihan wilayah tujuan, atau perhitungan ongkir.

## File
- `index.html` — website pelanggan
- `admin.html` — panel admin
- `config.js` — satu tempat untuk URL dan anon/publishable key Supabase
- `supabase_schema.sql` — database + RLS + fungsi transaksi

## 1. Supabase
1. Buat project Supabase.
2. SQL Editor → New query.
3. Paste seluruh `supabase_schema.sql` → Run.
4. Authentication → Providers → Email → aktif. Untuk tes cepat, boleh mematikan Confirm email.
5. Project Settings → API → salin Project URL dan Publishable/anon key.

## 2. Isi config.js
Buka `config.js` dan ganti:

```js
const TOKOSEHAT_SUPABASE_URL = "YOUR_SUPABASE_URL";
const TOKOSEHAT_SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_KEY";
```

Contoh:

```js
const TOKOSEHAT_SUPABASE_URL = "https://xxxx.supabase.co";
const TOKOSEHAT_SUPABASE_ANON_KEY = "eyJ...";
```

Gunakan **Publishable/anon key**, bukan `service_role`.

## 3. GitHub Pages
Upload minimal 3 file ini ke root repository yang sama:

```text
index.html
admin.html
config.js
```

Settings → Pages → Deploy from a branch → `main` → `/ (root)` → Save.

Penting: nama file harus `index.html`, bukan `index[1].html`.

## 4. Buat akun admin
Daftar akun lewat `index.html`. Setelah akun dibuat, jalankan di SQL Editor:

```sql
update public.profiles
set role = 'admin'
where email = 'EMAIL_ADMIN_KAMU';
```

Lalu buka `/samastria/admin.html`.

## 5. Kenapa login beda device bisa bekerja?
Karena login menggunakan Supabase Auth, bukan localStorage. Setelah `config.js` benar dan schema sudah dijalankan, akun yang sama dapat dipakai dari HP, laptop, atau browser lain.

Keranjang memang tetap lokal per perangkat. Pesanan, akun, stok, dan pembayaran tersimpan di Supabase.

## 6. Pembayaran
Versi ini menggunakan transfer bank + verifikasi admin. Belum ada QRIS/payment gateway otomatis dan belum ada upload bukti transfer.

## Keamanan
Jangan pernah menaruh `service_role` key di frontend/GitHub. Publishable/anon key memang boleh ada di frontend karena aksesnya dibatasi RLS.
