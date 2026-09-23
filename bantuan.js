(function(){
  const form=document.getElementById('chatForm'),input=document.getElementById('chatInput'),messages=document.getElementById('chatMessages'),status=document.getElementById('chatStatus');
  const buttons=document.querySelectorAll('[data-question]');
  const SUPABASE_URL='https://appxgwliqdmnqorsdywh.supabase.co';
  const SUPABASE_KEY='sb_publishable_ykh45BuWu3hgnzANq5cgiQ_AJkOGIUa';
  const db=window.supabase?.createClient(SUPABASE_URL,SUPABASE_KEY);
  const history=[];
  function addMessage(text,type){const el=document.createElement('div');el.className='msg '+type;el.textContent=text;messages.appendChild(el);messages.scrollTop=messages.scrollHeight;return el;}
  async function ask(question){const clean=question.trim();if(!clean)return;addMessage(clean,'user');input.value='';status.textContent='AI sedang menjawab…';
    if(!db){status.textContent='Layanan AI belum tersambung. Silakan gunakan WhatsApp.';addMessage('Maaf, layanan AI sedang tidak tersedia. Silakan lanjutkan ke Live Chat WhatsApp di samping.','bot');return;}
    try{
      const {data,error}=await db.functions.invoke('samastria-ai',{body:{message:clean,history:history.slice(-8)}});
      if(error)throw error;
      const answer=(data?.answer||'Maaf, saya belum dapat menjawab pertanyaan tersebut. Silakan gunakan Live Chat WhatsApp.').trim();
      addMessage(answer,'bot');history.push({role:'user',parts:[{text:clean}]},{role:'model',parts:[{text:answer}]});
      status.textContent='';
    }catch(err){console.error(err);status.textContent='AI sedang tidak tersedia.';addMessage('Maaf, Asisten AI sedang mengalami kendala. Anda dapat langsung melanjutkan ke Live Chat WhatsApp Samastria.','bot');}
  }
  form.addEventListener('submit',e=>{e.preventDefault();ask(input.value)});
  buttons.forEach(b=>b.addEventListener('click',()=>ask(b.dataset.question)));
})();
