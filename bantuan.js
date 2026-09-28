(function () {
  const form = document.getElementById('chatForm');
  const input = document.getElementById('chatInput');
  const messages = document.getElementById('chatMessages');
  const status = document.getElementById('chatStatus');
  const buttons = document.querySelectorAll('[data-question]');

  const SUPABASE_URL = 'https://appxgwliqdmnqorsdywh.supabase.co';
  const SUPABASE_KEY = 'sb_publishable_ykh45BuWu3hgnzANq5cgiQ_AJkOGIUa';
  const AI_FUNCTION = 'samastria-ai';

  const db = window.supabase?.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
  );

  const history = [];
  let catalogCache = null;

  function addMessage(text, type) {
    const el = document.createElement('div');
    el.className = 'msg ' + type;
    el.textContent = text;
    messages.appendChild(el);
    messages.scrollTop = messages.scrollHeight;
    return el;
  }

  async function loadCatalog() {
    if (catalogCache) return catalogCache;

    if (!db) {
      throw new Error('Supabase belum tersambung.');
    }

    const { data, error } = await db
      .from('products')
      .select(
        'id,nama,kategori,harga,harga_jawa,harga_wil1,harga_wil2,harga_wil3,harga_wil4,deskripsi,deskripsi_lengkap,manfaat,cara_pakai,stok,status'
      )
      .order('id');

    if (error) throw error;

    catalogCache = (data || [])
      .filter(function (p) {
        const status = String(p.status || '').toLowerCase();

        return (
          status !== 'nonaktif' &&
          status !== 'inactive' &&
          status !== 'hapus' &&
          status !== 'deleted'
        );
      })
      .map(function (p) {
        return {
          id: Number(p.id),
          nama: p.nama || '',
          kategori: p.kategori || '',
          harga: Number(p.harga || 0),
          harga_jawa: Number(p.harga_jawa || 0),
          harga_wil1: Number(p.harga_wil1 || 0),
          harga_wil2: Number(p.harga_wil2 || 0),
          harga_wil3: Number(p.harga_wil3 || 0),
          harga_wil4: Number(p.harga_wil4 || 0),
          stok: Number(p.stok || 0),
          deskripsi: p.deskripsi || '',
          deskripsi_lengkap: p.deskripsi_lengkap || '',
          manfaat: p.manfaat || '',
          cara_pakai: p.cara_pakai || ''
        };
      });

    return catalogCache;
  }

  async function ask(question) {
    const clean = String(question || '').trim();

    if (!clean) return;

    addMessage(clean, 'user');
    input.value = '';
    status.textContent = 'AI sedang menjawab...';

    if (!db) {
      status.textContent = 'Layanan AI belum tersambung.';
      addMessage(
        'Maaf, layanan AI sedang tidak tersedia. Silakan lanjutkan ke Live Chat WhatsApp Samastria.',
        'bot'
      );
      return;
    }

    try {
      const catalog = await loadCatalog();

      const { data, error } = await db.functions.invoke(AI_FUNCTION, {
        body: {
          message: clean,
          history: history.slice(-10),
          catalog: catalog
        }
      });

      if (error) throw error;

      const answer = String(
        data?.answer ||
        'Maaf, saya belum dapat menjawab pertanyaan tersebut. Silakan gunakan Live Chat WhatsApp Samastria.'
      ).trim();

      addMessage(answer, 'bot');

      history.push(
        {
          role: 'user',
          parts: [{ text: clean }]
        },
        {
          role: 'model',
          parts: [{ text: answer }]
        }
      );

      status.textContent = '';
    } catch (err) {
      console.error('Samastria AI:', err);

      status.textContent = 'AI sedang tidak tersedia.';

      addMessage(
        'Maaf, Asisten AI sedang mengalami kendala. Anda dapat langsung melanjutkan ke Live Chat WhatsApp Samastria.',
        'bot'
      );
    }
  }

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      ask(input.value);
    });
  }

  buttons.forEach(function (button) {
    button.addEventListener('click', function () {
      ask(button.dataset.question || '');
    });
  });
})();
