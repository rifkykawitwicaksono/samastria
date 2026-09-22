window.SAMASTRIA_PACKAGES = [
  {"id":"paket-booster-buah","name":"Paket Booster Buah","contents":"POCNASA 500 cc + PPTHORMONIK 100 cc + PWR NUTRITION 250 gram + SPRNASA 250 gram (Berat: ±1.2 kg → Input 1 kg)","prices":{"JAWA":240000,"WIL 1":260000,"WIL 2":272000,"WIL 3":286000,"WIL 4":316000}},
  {"id":"paket-ternak-perikan","name":"Paket Ternak & Perikanan","contents":"VITERNA 500 cc + POCNASA 500 cc (Berat: ±1.1 kg → Input 1 kg)","prices":{"JAWA":112000,"WIL 1":126000,"WIL 2":134000,"WIL 3":141000,"WIL 4":161000}},
  {"id":"paket-skincare-glow","name":"Paket Skincare Glow","contents":"ERHSALI Brightening Soap + MORESKIN Body Wash Glow + MORESKIN Clean & Glow Cream (Berat: ±0.4 kg → Input 1 kg)","prices":{"JAWA":255000,"WIL 1":274000,"WIL 2":293000,"WIL 3":313000,"WIL 4":350000}},
  {"id":"paket-asam-urat-kolesterol","name":"Paket Asam Urat & Kolesterol","contents":"HERBAGYN 50 Kapsul + HERBATHUS 50 Kapsul (Berat: <0.5 kg → Input 1 kg)","prices":{"JAWA":310000,"WIL 1":324000,"WIL 2":338000,"WIL 3":354000,"WIL 4":380000}},
  {"id":"paket-anti-uban-rambut","name":"Paket Anti Uban & Rambut","contents":"SHANAS Shampoo 3 in 1 170 ml + SHANAS Anti Uban 120 ml (Berat: <0.5 kg → Input 1 kg)","prices":{"JAWA":100000,"WIL 1":115000,"WIL 2":128000,"WIL 3":140000,"WIL 4":170000}},
  {"id":"paket-senyum-sehat","name":"Paket Senyum Sehat","contents":"2 pcs Pasta Gigi NASA 120g + 1 pcs GRECE Anti Perspirant 50g (Berat: <0.5 kg → Input 1 kg)","prices":{"JAWA":95000,"WIL 1":108000,"WIL 2":120000,"WIL 3":132000,"WIL 4":153000}}
];

(function(){
  const rupiah=n=>'Rp '+Number(n||0).toLocaleString('id-ID');
  window.SAMASTRIA_RENDER_PACKAGES=function(){
    const g=document.getElementById('productGrid');
    if(!g) return;
    const rows=window.SAMASTRIA_PACKAGES||[];
    g.innerHTML=rows.map(p=>`<article class="product-card" style="padding:20px;">
      <div class="product-category">PAKET PRODUK</div>
      <div class="product-name">${String(p.name).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}</div>
      <div class="product-desc" style="-webkit-line-clamp:unset;">${String(p.contents).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}</div>
      <div style="font-weight:800;margin:8px 0 10px;">Harga Jual Paket Promo</div>
      <div style="overflow:auto;">
        <table style="width:100%;border-collapse:collapse;font-size:.9rem;">
          <thead><tr><th style="text-align:left;padding:7px;border-bottom:1px solid var(--border);">JAWA</th><th style="text-align:left;padding:7px;border-bottom:1px solid var(--border);">WIL I</th><th style="text-align:left;padding:7px;border-bottom:1px solid var(--border);">WIL II</th><th style="text-align:left;padding:7px;border-bottom:1px solid var(--border);">WIL III</th><th style="text-align:left;padding:7px;border-bottom:1px solid var(--border);">WIL IV</th></tr></thead>
          <tbody><tr>${['JAWA','WIL 1','WIL 2','WIL 3','WIL 4'].map(r=>`<td style="padding:8px 7px;white-space:nowrap;color:var(--primary);font-weight:750;">${rupiah(p.prices[r])}</td>`).join('')}</tr></tbody>
        </table>
      </div>
    </article>`).join('');
    const n=document.getElementById('noProductMsg'); if(n)n.classList.add('hidden');
  };
})();
