// TokoSehat - konfigurasi Supabase
// GANTI 2 nilai di bawah ini dengan Project URL dan Publishable/anon key dari Supabase.
// Aman menaruh anon/publishable key di GitHub Pages. JANGAN masukkan service_role key.
const TOKOSEHAT_SUPABASE_URL = "https://appxgwliqdmnqrsdywh.supabase.co";
const TOKOSEHAT_SUPABASE_ANON_KEY = "sb_publishable_ykh45BuWu3hgnzANq5cgiQ_AJkOGIUa";
// Tambahan jika library Supabase membutuhkan inisialisasi langsung di file ini:
const supabase = supabase.createClient(TOKOSEHAT_SUPABASE_URL, TOKOSEHAT_SUPABASE_ANON_KEY);
