/* Samastria footer + encoding fix. Tambahkan <script src="footer-fix.js"></script> sebelum </body> pada index.html. */
(function(){
  const fixes={'â†’':'→','â†‘':'↑','ðŸŒ¾':'🌾','â™¥':'♥','âœ¦':'✦','âŒ‚':'⌂','ðŸ„':'🐄','ðŸŸ':'🐟','â—ˆ':'◈','ï¼‹':'＋','â–£':'▣','âœ…':'✓','âš ï¸':'⚠️','ðŸ’¬':'💬'};
  function fixText(node){if(node.nodeType===Node.TEXT_NODE){let s=node.nodeValue;for(const [a,b] of Object.entries(fixes))s=s.split(a).join(b);node.nodeValue=s;}}
  function run(){const w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let n;while(n=w.nextNode())fixText(n);document.querySelectorAll('.footer-bottom span:last-child').forEach(el=>{el.style.display='flex';el.style.flexWrap='wrap';el.style.justifyContent='center';el.style.alignItems='center';el.style.gap='0 8px';});document.querySelectorAll('.footer-bottom span:last-child a').forEach(a=>{a.style.display='inline';a.style.margin='0';a.style.whiteSpace='nowrap';});}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);else run();
})();
