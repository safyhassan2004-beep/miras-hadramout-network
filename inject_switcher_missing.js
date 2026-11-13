const fs = require('fs');

function getPortalSwitcher(currentRole) {
  return `
<!-- Floating Universal Portal Switcher Widget -->
<div id="portal-quick-switcher" class="fixed top-3 left-3 z-[9999] bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-300 dark:border-slate-700 shadow-xl rounded-full px-2.5 py-1 flex items-center gap-1.5 text-[12px]">
  <span class="material-symbols-outlined text-[16px] text-amber-600">swap_horiz</span>
  <a href="index.html" class="px-2 py-0.5 rounded-full transition-colors ${currentRole === 'client' ? 'bg-[#0f2c59] text-white font-bold shadow-xs' : 'text-slate-700 hover:bg-slate-100'}">العميل</a>
  <a href="artisan-dashboard.html" class="px-2 py-0.5 rounded-full transition-colors ${currentRole === 'artisan' ? 'bg-[#1e40af] text-white font-bold shadow-xs' : 'text-slate-700 hover:bg-slate-100'}">صاحب المهنة</a>
  <a href="admin-overview.html" class="px-2 py-0.5 rounded-full transition-colors ${currentRole === 'admin' ? 'bg-[#211700] text-amber-300 font-bold shadow-xs' : 'text-slate-700 hover:bg-slate-100'}">الإدارة</a>
</div>
`;
}

const files = [
  { file: 'login.html', role: 'client' },
  { file: 'admin-login.html', role: 'admin' },
  { file: 'artisan-orders.html', role: 'artisan' },
  { file: 'artisan-wallet.html', role: 'artisan' },
  { file: 'artisan-portfolio.html', role: 'artisan' }
];

for (const item of files) {
  let content = fs.readFileSync(item.file, 'utf8');
  if (!content.includes('id="portal-quick-switcher"')) {
    content = content.replace('</body>', `${getPortalSwitcher(item.role)}</body>`);
    fs.writeFileSync(item.file, content, 'utf8');
    console.log(`Injected switcher into ${item.file}`);
  }
}

