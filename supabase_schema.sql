-- TokoSehat - Supabase schema
-- Jarak wilayah, biaya pengiriman, dan pilihan wilayah tujuan sengaja BELUM dibuat.
create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  nama text not null default '', email text not null, username text not null unique,
  role text not null default 'customer' check (role in ('customer','admin')),
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);

create or replace function public.is_admin() returns boolean
language sql security definer set search_path=public stable as $$
  select exists(select 1 from public.profiles where id=auth.uid() and role='admin');
$$;

create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path=public as $$
begin
  insert into public.profiles(id,nama,email,username)
  values(new.id,coalesce(new.raw_user_meta_data->>'nama',''),lower(coalesce(new.email,'')),lower(coalesce(new.raw_user_meta_data->>'username',split_part(coalesce(new.email,''),'@',1))))
  on conflict(id) do update set nama=excluded.nama,email=excluded.email,username=excluded.username,updated_at=now();
  return new;
end; $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();

create table if not exists public.categories(id text primary key,nama text not null,icon text not null default '📦',created_at timestamptz not null default now());
insert into public.categories(id,nama,icon) values
('kosmetik','KOSMETIK','💄'),('kesehatan','KESEHATAN','💊'),('pertanian','PERTANIAN','🌾'),('homecare','HOME CARE','🏠'),('perikanan','PERIKANAN','🐟'),('teknologi','INOVASI TEKNOLOGI','💡'),('peternakan','PETERNAKAN','🐄'),('lainlain','LAIN-LAIN','📦')
on conflict(id) do update set nama=excluded.nama,icon=excluded.icon;

create table if not exists public.products(
 id bigint primary key,nama text not null,kategori text not null references public.categories(id),harga numeric(14,2) not null check(harga>=0),
 deskripsi text not null default '',deskripsi_lengkap text not null default '',manfaat text not null default '',cara_pakai text not null default '',gambar text not null default '',
 stok integer not null default 0 check(stok>=0),jumlah_terjual integer not null default 0 check(jumlah_terjual>=0),
 status text not null default 'tersedia' check(status in('tersedia','nonaktif')),active boolean not null default true,
 created_at timestamptz not null default now(),updated_at timestamptz not null default now()
);

insert into public.products(id,nama,kategori,harga,deskripsi,deskripsi_lengkap,manfaat,cara_pakai,gambar,stok,jumlah_terjual,status,active) values

(1,'Sabun Herbal Aloe Vera','kosmetik',25000,'Sabun alami berbahan aloe vera untuk kulit lembut dan sehat.','Sabun herbal dengan ekstrak aloe vera murni. Membersihkan tanpa membuat kulit kering. Cocok untuk semua jenis kulit.','Melembabkan kulit, mengurangi iritasi, menjaga kelembapan alami.','Basahi wajah/tubuh, oleskan sabun, busakan, lalu bilas.','https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=300&fit=crop',50,120,'tersedia',true),
(2,'Serum Vitamin C','kosmetik',89000,'Serum pencerah wajah dengan vitamin C stabil.','Serum wajah konsentrasi tinggi yang membantu mencerahkan dan meratakan warna kulit.','Mencerahkan, antioksidan, mengurangi noda hitam.','Teteskan 3-4 tetes ke wajah setelah cleanser, pagi dan malam.','https://images.unsplash.com/photo-1620916560066-54f7680294bb?w=400&h=300&fit=crop',30,95,'tersedia',true),
(3,'Madu Hutan Murni 500g','kesehatan',75000,'Madu hutan alami tanpa campuran gula.','Madu hasil panen dari hutan tropis, murni 100% tanpa pengawet.','Meningkatkan daya tahan tubuh, sumber energi alami, baik untuk tenggorokan.','1-2 sendok makan per hari, bisa dicampur air hangat.','https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=300&fit=crop',40,200,'tersedia',true),
(4,'Kapsul Kunyit Putih','kesehatan',55000,'Suplemen herbal kunyit putih untuk kesehatan tubuh.','Kapsul ekstrak kunyit putih yang membantu menjaga kesehatan pencernaan dan imunitas.','Antioksidan, mendukung pencernaan, menjaga stamina.','2 kapsul sehari setelah makan.','https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop',60,150,'tersedia',true),
(5,'Pupuk Organik Cair 1L','pertanian',45000,'Pupuk organik cair ramah lingkungan untuk tanaman.','Pupuk cair berbasis bahan organik yang menyuburkan tanah dan meningkatkan hasil panen.','Menyuburkan tanah, meningkatkan pertumbuhan tanaman, ramah lingkungan.','Campurkan 10ml per liter air, semprotkan ke daun atau siram ke tanah.','https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop',80,180,'tersedia',true),
(6,'Benih Cabai Hibrida','pertanian',15000,'Benih cabai unggul tahan hama, hasil tinggi.','Benih cabai hibrida F1 dengan daya tumbuh tinggi dan tahan terhadap penyakit umum.','Hasil panen melimpah, tahan hama, cocok dataran rendah-sedang.','Semai di media tanam, pindah tanam setelah 3-4 minggu.','https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&h=300&fit=crop',100,90,'tersedia',true),
(7,'Pembersih Lantai Herbal','homecare',32000,'Pembersih lantai alami aroma segar.','Cairan pembersih lantai berbahan herbal, efektif membersihkan tanpa bahan kimia berbahaya.','Membersihkan noda, memberi aroma segar, aman untuk anak & hewan.','Campur 1 tutup botol ke 5 liter air, lap lantai.','https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400&h=300&fit=crop',45,70,'tersedia',true),
(8,'Sabun Cuci Piring Natural','homecare',18000,'Sabun cuci piring ramah lingkungan.','Formula alami yang membersihkan lemak dan kotoran dengan mudah.','Efektif menghilangkan lemak, lembut di tangan, biodegradable.','Tuang sedikit ke spons basah, cuci piring seperti biasa.','https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=400&h=300&fit=crop',70,110,'tersedia',true),
(9,'Pakan Ikan Lele Premium 5kg','perikanan',95000,'Pakan pelet berkualitas tinggi untuk lele.','Pakan ikan lele dengan kandungan protein optimal untuk pertumbuhan cepat.','Pertumbuhan cepat, daya cerna tinggi, mengurangi limbah air.','Berikan 2-3% dari bobot ikan per hari, bagi 2-3 kali pemberian.','https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=300&fit=crop',35,85,'tersedia',true),
(10,'Probiotik Kolam Ikan','perikanan',40000,'Probiotik untuk menjaga kualitas air kolam.','Campuran probiotik yang menyeimbangkan mikroorganisme di kolam ikan.','Menjaga kualitas air, mengurangi amonia, meningkatkan kesehatan ikan.','Larutkan sesuai dosis, tebar merata ke kolam seminggu sekali.','https://images.unsplash.com/photo-1535591273668-554a5d10dd39?w=400&h=300&fit=crop',50,60,'tersedia',true),
(11,'Sensor Kelembaban Tanah IoT','teknologi',175000,'Sensor pintar untuk monitoring kelembaban tanah.','Perangkat IoT yang mengukur kelembaban dan suhu tanah, terhubung ke smartphone.','Hemat air, pantau tanaman real-time, cocok pertanian modern.','Tancapkan sensor ke tanah, hubungkan via aplikasi Bluetooth.','https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop',20,45,'tersedia',true),
(12,'Lampu UV Sterilisasi','teknologi',220000,'Lampu UV untuk sterilisasi ruang & peralatan.','Lampu ultraviolet yang membunuh bakteri dan virus secara efektif.','Sterilisasi cepat, tanpa bahan kimia, hemat energi.','Nyalakan di ruangan tertutup 15-30 menit, hindari paparan langsung.','https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',15,30,'tersedia',true),
(13,'Pakan Ayam Petelur 10kg','peternakan',120000,'Pakan lengkap untuk ayam petelur produktif.','Formula pakan seimbang dengan protein, kalsium, dan vitamin untuk produksi telur optimal.','Meningkatkan produksi telur, kualitas cangkang lebih baik, ayam lebih sehat.','Berikan sesuai umur ayam, sediakan air minum selalu.','https://images.unsplash.com/photo-1548550023-2bdb3ffd6930?w=400&h=300&fit=crop',40,75,'tersedia',true),
(14,'Vitamin Ternak Multivitamin','peternakan',35000,'Suplemen vitamin untuk ternak ruminansia & unggas.','Multivitamin larut air yang mendukung pertumbuhan dan daya tahan ternak.','Meningkatkan nafsu makan, mencegah defisiensi vitamin, mendukung pertumbuhan.','Campurkan ke air minum sesuai dosis pada kemasan.','https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=400&h=300&fit=crop',55,55,'tersedia',true),
(15,'Tas Belanja Ramah Lingkungan','lainlain',28000,'Tas belanja kain reusable tahan lama.','Tas belanja berbahan kain tebal yang dapat dicuci dan digunakan berulang kali.','Mengurangi sampah plastik, kuat menahan beban, praktis dilipat.','Gunakan untuk belanja, cuci bila kotor.','https://images.unsplash.com/photo-1597484661973-ee6cd0b88594?w=400&h=300&fit=crop',90,40,'tersedia',true),
(16,'Botol Minum Stainless 500ml','lainlain',65000,'Botol minum stainless steel tahan panas & dingin.','Botol minum vacuum insulated yang menjaga suhu minuman hingga 12 jam.','Tahan karat, menjaga suhu, bebas BPA, mudah dibersihkan.','Isi minuman, tutup rapat. Cuci dengan air sabun setelah digunakan.','https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=300&fit=crop',25,50,'tersedia',true)
on conflict(id) do update set nama=excluded.nama,kategori=excluded.kategori,harga=excluded.harga,deskripsi=excluded.deskripsi,deskripsi_lengkap=excluded.deskripsi_lengkap,manfaat=excluded.manfaat,cara_pakai=excluded.cara_pakai,gambar=excluded.gambar,stok=excluded.stok,jumlah_terjual=excluded.jumlah_terjual,status=excluded.status,active=excluded.active,updated_at=now();

create table if not exists public.orders(
 id uuid primary key default gen_random_uuid(),user_id uuid not null references auth.users(id) on delete cascade,customer_name text not null,whatsapp text not null,address text not null,note text,
 subtotal numeric(14,2) not null default 0,total numeric(14,2) not null default 0,
 status text not null default 'pending_payment' check(status in('pending_payment','payment_submitted','processing','shipped','completed','cancelled')),
 created_at timestamptz not null default now(),updated_at timestamptz not null default now()
);
create table if not exists public.order_items(
 id bigint generated by default as identity primary key,order_id uuid not null references public.orders(id) on delete cascade,product_id bigint not null references public.products(id),product_name text not null,unit_price numeric(14,2) not null,quantity integer not null check(quantity>0),line_total numeric(14,2) not null,created_at timestamptz not null default now()
);
create table if not exists public.payments(
 id uuid primary key default gen_random_uuid(),order_id uuid not null references public.orders(id) on delete cascade,method text not null default 'bank_transfer',status text not null default 'submitted' check(status in('submitted','verified','rejected')),note text,verified_at timestamptz,verified_by uuid references auth.users(id),created_at timestamptz not null default now(),updated_at timestamptz not null default now()
);

create or replace function public.create_order(p_items jsonb,p_customer_name text,p_whatsapp text,p_address text,p_note text default null)
returns uuid language plpgsql security definer set search_path=public as $$
declare v_order_id uuid;v_item jsonb;v_product public.products%rowtype;v_product_id bigint;v_qty integer;v_subtotal numeric(14,2):=0;
begin
 if auth.uid() is null then raise exception 'Anda harus login.'; end if;
 if jsonb_typeof(p_items)<>'array' or jsonb_array_length(p_items)=0 then raise exception 'Keranjang kosong.'; end if;
 insert into public.orders(user_id,customer_name,whatsapp,address,note) values(auth.uid(),trim(p_customer_name),trim(p_whatsapp),trim(p_address),nullif(trim(p_note),'')) returning id into v_order_id;
 for v_item in select * from jsonb_array_elements(p_items) loop
  v_product_id:=(v_item->>'product_id')::bigint;v_qty:=(v_item->>'quantity')::integer;
  if v_qty is null or v_qty<=0 then raise exception 'Jumlah produk tidak valid.'; end if;
  select * into v_product from public.products where id=v_product_id and active=true for update;
  if not found then raise exception 'Produk % tidak ditemukan.',v_product_id; end if;
  if v_product.stok<v_qty then raise exception 'Stok % tidak mencukupi.',v_product.nama; end if;
  v_subtotal:=v_subtotal+(v_product.harga*v_qty);
  insert into public.order_items(order_id,product_id,product_name,unit_price,quantity,line_total) values(v_order_id,v_product.id,v_product.nama,v_product.harga,v_qty,v_product.harga*v_qty);
  update public.products set stok=stok-v_qty,jumlah_terjual=jumlah_terjual+v_qty,updated_at=now() where id=v_product.id;
 end loop;
 update public.orders set subtotal=v_subtotal,total=v_subtotal,updated_at=now() where id=v_order_id; return v_order_id;
end; $$;

create or replace function public.submit_payment(p_order_id uuid,p_method text default 'bank_transfer',p_note text default null)
returns uuid language plpgsql security definer set search_path=public as $$
declare v_payment_id uuid;
begin
 if not exists(select 1 from public.orders where id=p_order_id and user_id=auth.uid()) then raise exception 'Pesanan tidak ditemukan.'; end if;
 insert into public.payments(order_id,method,note,status) values(p_order_id,p_method,p_note,'submitted') returning id into v_payment_id;
 update public.orders set status='payment_submitted',updated_at=now() where id=p_order_id and user_id=auth.uid(); return v_payment_id;
end; $$;

alter table public.profiles enable row level security;alter table public.categories enable row level security;alter table public.products enable row level security;alter table public.orders enable row level security;alter table public.order_items enable row level security;alter table public.payments enable row level security;

drop policy if exists profiles_select on public.profiles;create policy profiles_select on public.profiles for select to authenticated using(id=auth.uid() or public.is_admin());
drop policy if exists categories_read on public.categories;create policy categories_read on public.categories for select to anon,authenticated using(true);
drop policy if exists products_read on public.products;create policy products_read on public.products for select to anon,authenticated using(active=true or public.is_admin());
drop policy if exists products_admin_insert on public.products;create policy products_admin_insert on public.products for insert to authenticated with check(public.is_admin());
drop policy if exists products_admin_update on public.products;create policy products_admin_update on public.products for update to authenticated using(public.is_admin()) with check(public.is_admin());
drop policy if exists products_admin_delete on public.products;create policy products_admin_delete on public.products for delete to authenticated using(public.is_admin());
drop policy if exists orders_read on public.orders;create policy orders_read on public.orders for select to authenticated using(user_id=auth.uid() or public.is_admin());
drop policy if exists orders_admin_update on public.orders;create policy orders_admin_update on public.orders for update to authenticated using(public.is_admin()) with check(public.is_admin());
drop policy if exists order_items_read on public.order_items;create policy order_items_read on public.order_items for select to authenticated using(exists(select 1 from public.orders o where o.id=order_id and(o.user_id=auth.uid() or public.is_admin())));
drop policy if exists payments_read on public.payments;create policy payments_read on public.payments for select to authenticated using(exists(select 1 from public.orders o where o.id=order_id and(o.user_id=auth.uid() or public.is_admin())));
drop policy if exists payments_admin_update on public.payments;create policy payments_admin_update on public.payments for update to authenticated using(public.is_admin()) with check(public.is_admin());

create or replace function public.admin_set_order_status(p_order_id uuid,p_status text) returns void language plpgsql security definer set search_path=public as $$ begin if not public.is_admin() then raise exception 'Akses admin diperlukan.';end if;update public.orders set status=p_status,updated_at=now() where id=p_order_id;end;$$;
create or replace function public.admin_verify_payment(p_payment_id uuid,p_status text) returns void language plpgsql security definer set search_path=public as $$ declare v_order_id uuid;begin if not public.is_admin() then raise exception 'Akses admin diperlukan.';end if;if p_status not in ('verified','rejected') then raise exception 'Status pembayaran tidak valid.';end if;update public.payments set status=p_status,verified_at=now(),verified_by=auth.uid(),updated_at=now() where id=p_payment_id returning order_id into v_order_id;if v_order_id is null then raise exception 'Pembayaran tidak ditemukan.';end if;if p_status='verified' then update public.orders set status='processing',updated_at=now() where id=v_order_id;elsif p_status='rejected' then update public.orders set status='pending_payment',updated_at=now() where id=v_order_id;end if;end;$$;

grant execute on function public.create_order(jsonb,text,text,text,text) to authenticated;grant execute on function public.submit_payment(uuid,text,text) to authenticated;grant execute on function public.admin_set_order_status(uuid,text) to authenticated;grant execute on function public.admin_verify_payment(uuid,text) to authenticated;

-- Setelah mendaftarkan akun admin:
-- update public.profiles set role='admin' where email='EMAIL_ADMIN_KAMU';
