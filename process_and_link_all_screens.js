const fs = require('fs');
const path = require('path');

const screensMapping = JSON.parse(fs.readFileSync('screens_mapping.json', 'utf8'));

// Common Portal Switcher Component
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

// Client Bottom Navigation Bar Generator
function getClientBottomNav(activePath) {
  const items = [
    { id: 'index.html', icon: 'home', label: 'الرئيسية' },
    { id: 'explore.html', icon: 'explore', label: 'استكشف' },
    { id: 'client-orders.html', icon: 'assignment', label: 'طلباتي' },
    { id: 'favorites.html', icon: 'favorite', label: 'المفضلة' },
    { id: 'client-profile.html', icon: 'person', label: 'حسابي' }
  ];

  const links = items.map(item => {
    const isActive = activePath === item.id;
    const activeClass = isActive ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-primary';
    const ariaCurrent = isActive ? ' aria-current="page"' : '';
    return `
      <a href="${item.id}"${ariaCurrent} class="flex flex-col items-center justify-center gap-1 w-14 h-14 transition-colors ${activeClass}">
        <span class="material-symbols-outlined text-[24px]">${item.icon}</span>
        <span class="font-label-sm text-label-sm">${item.label}</span>
      </a>
    `;
  }).join('');

  return `
  <nav class="fixed bottom-0 inset-x-0 z-50 pb-safe bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_-2px_12px_rgba(15,44,89,0.06)]">
    <div class="flex justify-around items-center h-16 px-space-xs">
      ${links}
    </div>
  </nav>
  `;
}

// Artisan Bottom Navigation Bar Generator
function getArtisanBottomNav(activePath) {
  const items = [
    { id: 'artisan-dashboard.html', icon: 'dashboard', label: 'الرئيسية' },
    { id: 'artisan-orders.html', icon: 'assignment', label: 'طلبات العمل' },
    { id: 'artisan-wallet.html', icon: 'account_balance_wallet', label: 'المحفظة' },
    { id: 'artisan-portfolio.html', icon: 'photo_library', label: 'أعمالي' }
  ];

  const links = items.map(item => {
    const isActive = activePath === item.id;
    const activeClass = isActive ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-primary';
    const ariaCurrent = isActive ? ' aria-current="page"' : '';
    return `
      <a href="${item.id}"${ariaCurrent} class="flex flex-col items-center justify-center gap-1 w-16 h-14 transition-colors ${activeClass}">
        <span class="material-symbols-outlined text-[24px]">${item.icon}</span>
        <span class="font-label-sm text-label-sm">${item.label}</span>
      </a>
    `;
  }).join('');

  return `
  <nav class="fixed bottom-0 inset-x-0 z-50 pb-safe bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_-2px_12px_rgba(15,44,89,0.06)]">
    <div class="flex justify-around items-center h-16 px-space-xs">
      ${links}
    </div>
  </nav>
  `;
}

// Admin Bottom Navigation Bar Generator
function getAdminBottomNav(activePath) {
  const items = [
    { id: 'admin-overview.html', icon: 'dashboard', label: 'الرئيسية' },
    { id: 'admin-artisans.html', icon: 'verified', label: 'المهنيين' },
    { id: 'admin-orders.html', icon: 'assignment_late', label: 'الطلبات' },
    { id: 'admin-settings.html', icon: 'policy', label: 'الرقابة' }
  ];

  const links = items.map(item => {
    const isActive = activePath === item.id;
    const activeClass = isActive ? 'text-primary font-bold bg-surface-container/60' : 'text-on-surface-variant hover:text-primary';
    const ariaCurrent = isActive ? ' aria-current="page"' : '';
    return `
      <a href="${item.id}"${ariaCurrent} class="flex flex-col items-center justify-center gap-space-xs min-w-[70px] h-14 rounded-xl transition-all duration-200 ${activeClass}">
        <span class="material-symbols-outlined text-[22px]">${item.icon}</span>
        <span class="font-label-sm text-label-sm">${item.label}</span>
      </a>
    `;
  }).join('');

  return `
  <nav class="fixed bottom-0 inset-x-0 z-50 pb-safe bg-surface/90 backdrop-blur-xl shadow-[0_-4px_16px_rgba(15,44,89,0.06)]">
    <div class="flex justify-around items-center h-20 px-space-xs">
      ${links}
    </div>
  </nav>
  `;
}

// Process each file
for (const [id, meta] of Object.entries(screensMapping)) {
  const rawPath = path.join('raw_screens', `${id}.html`);
  if (!fs.existsSync(rawPath)) {
    console.warn(`File ${rawPath} not found!`);
    continue;
  }

  let content = fs.readFileSync(rawPath, 'utf8');

  // Fix English Header placeholders
  content = content.replace(/Order Details/g, 'تفاصيل الطلب والفاتورة');
  content = content.replace(/Pro Profile/g, 'الملف المهني');
  content = content.replace(/Order Request/g, 'طلب حجز خدمة');
  content = content.replace(/Craftsman Chat/g, 'المحادثة مع المهني');
  content = content.replace(/Account Type Selection/g, 'اختيار نوع الحساب');
  content = content.replace(/Craft Specialization & Region/g, 'تسجيل صاحب مهنة');
  content = content.replace(/Artisan Identity Verification/g, 'التحقق من الهاتف');

  // Fix home root links
  content = content.replace(/href="\/"/g, 'href="index.html"');

  // Replace old bottom navbar with clean, linked navbar
  const navRegex = /<nav class="fixed bottom-0[\s\S]*?<\/nav>/;

  if (meta.role === 'admin') {
    content = content.replace(navRegex, getAdminBottomNav(meta.name));
  } else if (meta.role === 'artisan') {
    content = content.replace(navRegex, getArtisanBottomNav(meta.name));
  } else if (meta.role === 'client') {
    // Only screens that had bottom nav should have it
    if (navRegex.test(content)) {
      content = content.replace(navRegex, getClientBottomNav(meta.name));
    }
  }

  // Page Specific Fixes & Linking:
  if (meta.name === 'index.html') {
    // Categories linking to explore.html
    content = content.replace(/<a class="group flex flex-col items-center justify-center[^>]*href="#"/g, (match) => {
      return match.replace('href="#"', 'href="explore.html"');
    });

    // Artisan cards "طلب الحجز"
    content = content.replace(/<button class="px-4 py-2 rounded-lg bg-primary text-on-primary font-label-md text-label-md font-semibold hover:bg-primary-container transition-colors shadow-sm" type="button">\s*طلب الحجز\s*<\/button>/g, `
      <a href="book-service.html" class="px-4 py-2 rounded-lg bg-primary text-on-primary font-label-md text-label-md font-semibold hover:bg-primary-container transition-colors shadow-sm text-center">
        طلب الحجز
      </a>
    `);

    // Artisan card chat button
    content = content.replace(/<button aria-label="محادثة"[^>]*type="button">\s*<span class="material-symbols-outlined text-\[18px\]">chat<\/span>\s*<\/button>/g, `
      <a href="chat.html" aria-label="محادثة" class="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-primary hover:bg-surface-container-high transition-colors">
        <span class="material-symbols-outlined text-[18px]">chat</span>
      </a>
    `);

    // Master builder title link to profile
    content = content.replace(/<h3 class="font-headline-sm text-headline-sm text-primary font-bold truncate">المعلم عوض بن حريز<\/h3>/g, `
      <a href="artisan-profile.html" class="hover:text-secondary"><h3 class="font-headline-sm text-headline-sm text-primary font-bold truncate">المعلم عوض بن حريز</h3></a>
    `);
    content = content.replace(/<h3 class="font-headline-sm text-headline-sm text-primary font-bold truncate">م\. طارق باوزير<\/h3>/g, `
      <a href="artisan-profile.html" class="hover:text-secondary"><h3 class="font-headline-sm text-headline-sm text-primary font-bold truncate">م. طارق باوزير</h3></a>
    `);
    content = content.replace(/<h3 class="font-headline-sm text-headline-sm text-primary font-bold truncate">المعلم سالم بارباع<\/h3>/g, `
      <a href="artisan-profile.html" class="hover:text-secondary"><h3 class="font-headline-sm text-headline-sm text-primary font-bold truncate">المعلم سالم بارباع</h3></a>
    `);

    // Join as artisan CTA banner
    content = content.replace(/<a class="flex-1 py-3 px-4 rounded-lg bg-tertiary-fixed text-tertiary-container font-label-lg text-label-lg font-bold text-center hover:bg-tertiary-fixed-dim transition-colors shadow-sm" href="#">\s*انضم كمهني الآن\s*<\/a>/g, `
      <a href="register-artisan.html" class="flex-1 py-3 px-4 rounded-lg bg-tertiary-fixed text-tertiary-container font-label-lg text-label-lg font-bold text-center hover:bg-tertiary-fixed-dim transition-colors shadow-sm">
        انضم كمهني الآن
      </a>
    `);

    // Profile avatar click
    content = content.replace(/<img alt="Profile" class="w-8 h-8 rounded-full object-cover" src="https:\/\/lh3\.googleusercontent\.com\/aida\/ALJJyrDcAMOk10hKDOlKw6swAzGrPVPB4bQakrXmfCb7-q679dAP5L5qxW6n_KLCD-zf5_kYYgsou9N8KxEnJGgqeniiCNCNYj0-IiopsBNTK3wxhnSc3LOV5cclkrerpNwDjNvItVpVh3lPc0b4yKeop15cKoVHHg2Tr4YuQ1F1Id5xNSP5sWbVFLh3M_3BFTC-0cJOfyJM5x2YSQabJV2kpr8D9N-ni4S21LSKInpHdl65"\/>/g, `
      <a href="client-profile.html" title="حسابي"><img alt="Profile" class="w-8 h-8 rounded-full object-cover ring-2 ring-primary-container" src="https://lh3.googleusercontent.com/aida/ALJJyrDcAMOk10hKDOlKw6swAzGrPVPB4bQakrXmfCb7-q679dAP5L5qxW6n_KLCD-zf5_kYYgsou9N8KxEnJGgqeniiCNCNYj0-IiopsBNTK3wxhnSc3LOV5cclkrerpNwDjNvItVpVh3lPc0b4yKeop15cKoVHHg2Tr4YuQ1F1Id5xNSP5sWbVFLh3M_3BFTC-0cJOfyJM5x2YSQabJV2kpr8D9N-ni4S21LSKInpHdl65"/></a>
    `);

    // "عرض الكل" link
    content = content.replace(/<a class="font-label-sm text-label-sm text-secondary hover:text-primary font-medium flex items-center" href="#">/g, `
      <a class="font-label-sm text-label-sm text-secondary hover:text-primary font-medium flex items-center" href="explore.html">
    `);
  }

  if (meta.name === 'explore.html') {
    // Links to artisan profile on titles
    content = content.replace(/<h2 class="font-headline-sm text-headline-sm text-primary font-bold truncate">ورشة النبراس للتبريد<\/h2>/g, `
      <a href="artisan-profile.html" class="hover:text-secondary"><h2 class="font-headline-sm text-headline-sm text-primary font-bold truncate">ورشة النبراس للتبريد</h2></a>
    `);
    // Button "طلب خدمة" to book-service.html
    content = content.replace(/<button class="px-4 h-10 rounded-xl bg-primary text-on-primary font-label-md text-label-md font-semibold flex items-center gap-1.5 shadow-sm active:scale-95 transition-all" type="button">\s*<span>طلب خدمة<\/span>/g, `
      <a href="book-service.html" class="px-4 h-10 rounded-xl bg-primary text-on-primary font-label-md text-label-md font-semibold flex items-center gap-1.5 shadow-sm active:scale-95 transition-all">
        <span>طلب خدمة</span>
    `);
    content = content.replace(/<span>طلب خدمة<\/span>\s*<span class="material-symbols-outlined text-\[16px\]">arrow_back<\/span>\s*<\/button>/g, `
      <span>طلب خدمة</span>
      <span class="material-symbols-outlined text-[16px]">arrow_back</span>
      </a>
    `);
  }

  if (meta.name === 'artisan-profile.html') {
    // Fix handleBooking redirect
    content = content.replace(/function handleBooking\(\) \{[\s\S]*?alert\('جارٍ توجيهك لنموذج تحديد الوقت وموقع المنزل في المكلا\.\.\.'\);[\s\S]*?\}/g, `
      function handleBooking() {
        const btn = event.currentTarget;
        btn.classList.add('scale-95');
        setTimeout(() => {
          window.location.href = 'book-service.html';
        }, 150);
      }
    `);
    // Back button
    content = content.replace(/onclick="history\.back\(\)"/g, 'onclick="window.location.href=\'explore.html\'"');
  }

  if (meta.name === 'service-details.html') {
    // Fix bookNowBtn
    content = content.replace(/bookBtn\.addEventListener\('click', function\(\) \{[\s\S]*?\}\);/g, `
      bookBtn.addEventListener('click', function() {
        this.innerHTML = '<span class="material-symbols-outlined animate-spin text-[20px]">progress_activity</span> جاري تهيئة الحجز...';
        setTimeout(() => {
          window.location.href = 'book-service.html';
        }, 300);
      });
    `);
    content = content.replace(/onclick="history\.back\(\)"/g, 'onclick="window.location.href=\'explore.html\'"');
  }

  if (meta.name === 'book-service.html') {
    // Fix submit-order-btn redirect
    content = content.replace(/submitBtn\.addEventListener\('click', function\(\) \{[\s\S]*?\}\);/g, `
      submitBtn.addEventListener('click', function() {
        this.innerHTML = '<span class="material-symbols-outlined animate-spin text-[20px]">progress_activity</span> جاري إرسال الطلب...';
        this.classList.add('opacity-90');
        setTimeout(() => {
          window.location.href = 'order-details.html';
        }, 600);
      });
    `);
    content = content.replace(/onclick="history\.back\(\)"/g, 'onclick="window.location.href=\'service-details.html\'"');
  }

  if (meta.name === 'order-details.html') {
    // Fix back button
    content = content.replace(/onclick="history\.back\(\)"/g, 'onclick="window.location.href=\'client-orders.html\'"');
    // Add links to chat and review
    content = content.replace(/<\/main>/g, `
      <div class="fixed bottom-0 inset-x-0 z-40 bg-surface-container-lowest/95 backdrop-blur-lg shadow-lg p-space-md border-t border-surface-container flex items-center gap-2">
        <a href="chat.html" class="flex-1 h-12 bg-surface-container text-primary rounded-xl font-label-md text-label-md font-bold flex items-center justify-center gap-1.5 hover:bg-surface-container-high transition-colors">
          <span class="material-symbols-outlined text-[20px]">chat</span>
          <span>محادثة الفني</span>
        </a>
        <a href="review.html" class="flex-1 h-12 bg-primary text-on-primary rounded-xl font-label-md text-label-md font-bold flex items-center justify-center gap-1.5 shadow-sm hover:bg-primary-container transition-colors">
          <span class="material-symbols-outlined text-[20px]">rate_review</span>
          <span>تقييم الخدمة</span>
        </a>
      </div>
    </main>`);
  }

  if (meta.name === 'client-orders.html') {
    // Order card link to order-details
    content = content.replace(/href="#" data-path="explore"/g, 'href="explore.html"');
    // Add realistic active order preview
    content = content.replace(/<!-- Live Active Tracker \(Featured Order\) -->[\s\S]*?<!-- Local Hadrami Customer Support Banner -->/g, `
      <!-- Live Active Order -->
      <section class="mb-space-lg">
        <div class="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm border border-secondary/20">
          <div class="flex items-start justify-between gap-2 mb-3">
            <div class="flex items-center gap-2.5">
              <div class="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center text-secondary">
                <span class="material-symbols-outlined text-[26px]">ac_unit</span>
              </div>
              <div>
                <span class="font-label-sm text-[11px] bg-secondary-container/20 text-secondary px-2 py-0.5 rounded-full font-bold">طلب جاري التنفيذ</span>
                <h3 class="font-headline-sm text-headline-sm text-primary font-bold mt-0.5">صيانة مكيف سبلت وتعبئة فريون</h3>
                <span class="font-body-sm text-[12px] text-on-surface-variant">المعلم: سعيد بن مخاشن • المكلا</span>
              </div>
            </div>
            <span class="font-label-md text-label-md font-bold text-primary font-mono">18,000 ر.ي</span>
          </div>

          <div class="bg-surface-container-low rounded-xl p-2.5 mb-3 flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
            <span class="flex items-center gap-1 text-emerald-700 font-semibold">
              <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              الفني في الطريق إلى موقعك
            </span>
            <span class="font-mono">#MRS-8492</span>
          </div>

          <div class="flex items-center gap-2">
            <a href="order-details.html" class="flex-1 h-10 rounded-xl bg-primary text-on-primary font-label-md text-label-md font-bold flex items-center justify-center gap-1 shadow-sm">
              <span class="material-symbols-outlined text-[18px]">receipt_long</span>
              <span>سند الفاتورة</span>
            </a>
            <a href="chat.html" class="h-10 px-4 rounded-xl bg-surface-container text-primary font-label-md text-label-md font-semibold flex items-center justify-center gap-1 hover:bg-surface-container-high">
              <span class="material-symbols-outlined text-[18px]">chat</span>
              <span>محادثة</span>
            </a>
            <a href="review.html" class="h-10 px-3 rounded-xl bg-surface-container-low text-on-surface-variant font-label-md text-label-md flex items-center justify-center hover:text-primary">
              <span class="material-symbols-outlined text-[18px]">star</span>
            </a>
          </div>
        </div>
      </section>
      <!-- Local Hadrami Customer Support Banner -->
    `);
  }

  if (meta.name === 'review.html') {
    // Hook review submit button
    content = content.replace(/<\/main>/g, `
      <div class="fixed bottom-0 inset-x-0 z-40 bg-surface-container-lowest/95 backdrop-blur-lg shadow-lg p-space-md border-t border-surface-container">
        <button id="submitReviewBtn" type="button" class="w-full h-12 bg-primary text-on-primary rounded-xl font-label-lg text-label-lg font-bold flex items-center justify-center gap-2 shadow-md hover:bg-primary-container active:scale-[0.98] transition-all">
          <span>نشر التقييم وتأكيد اكتمال الخدمة</span>
          <span class="material-symbols-outlined text-[20px]">check</span>
        </button>
      </div>
      <script>
        document.getElementById('submitReviewBtn')?.addEventListener('click', function() {
          this.innerHTML = '<span class="material-symbols-outlined animate-spin text-[20px]">refresh</span> جاري النشر...';
          setTimeout(() => {
            window.location.href = 'review-confirmation.html';
          }, 400);
        });
      </script>
    </main>`);
    content = content.replace(/onclick="history\.back\(\)"/g, 'onclick="window.location.href=\'order-details.html\'"');
  }

  if (meta.name === 'review-confirmation.html') {
    content = content.replace(/href="\/"/g, 'href="index.html"');
    // Hook buttons
    content = content.replace(/<\/main>/g, `
      <div class="flex flex-col gap-2.5 px-margin mt-6">
        <a href="index.html" class="w-full h-12 bg-primary text-on-primary rounded-xl font-label-lg text-label-lg font-bold flex items-center justify-center gap-2 shadow-sm">
          <span>العودة للرئيسية</span>
          <span class="material-symbols-outlined text-[20px]">home</span>
        </a>
        <a href="client-orders.html" class="w-full h-12 bg-surface-container text-primary rounded-xl font-label-md text-label-md font-semibold flex items-center justify-center gap-2">
          <span>متابعة طلباتي</span>
          <span class="material-symbols-outlined text-[20px]">assignment</span>
        </a>
      </div>
    </main>`);
  }

  if (meta.name === 'client-profile.html') {
    // Add prominent portal switchers & links
    content = content.replace(/<!-- Section 1: Orders & Service Management -->/g, `
      <!-- Distinct Portals Hub (Separated Access) -->
      <div class="px-gutter pt-3 pb-1">
        <span class="font-label-lg text-label-lg text-primary-container block mb-2 font-bold">بوابات المنصة المستقلة</span>
        <div class="flex flex-col gap-2.5 mb-4">
          <!-- Artisan Portal Entry -->
          <a href="artisan-dashboard.html" class="bg-gradient-to-l from-primary-container to-secondary p-3.5 rounded-2xl text-white shadow-md flex items-center justify-between group active:scale-[0.98] transition-all">
            <div class="flex items-center gap-3">
              <div class="w-11 h-11 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center text-tertiary-fixed shadow-sm">
                <span class="material-symbols-outlined text-[24px]">handyman</span>
              </div>
              <div>
                <span class="font-label-lg text-label-lg font-bold block">بوابة أصحاب المهن والحرف</span>
                <span class="font-body-sm text-[12px] text-primary-fixed">لوحة تحكم منفصلة لاستقبال الطلبات وإدارة الأرباح</span>
              </div>
            </div>
            <span class="material-symbols-outlined text-[20px] group-hover:-translate-x-1 transition-transform">arrow_back</span>
          </a>

          <!-- Admin Portal Entry -->
          <a href="admin-login.html" class="bg-surface-container-lowest border border-outline-variant/40 p-3.5 rounded-2xl text-primary shadow-sm flex items-center justify-between group hover:bg-surface-container-low transition-colors">
            <div class="flex items-center gap-3">
              <div class="w-11 h-11 rounded-xl bg-surface-container flex items-center justify-center text-primary">
                <span class="material-symbols-outlined text-[24px]">admin_panel_settings</span>
              </div>
              <div>
                <span class="font-label-lg text-label-lg font-bold block">بوابة الإدارة والرقابة الميدانية</span>
                <span class="font-body-sm text-[12px] text-on-surface-variant">إشراف العمليات وتوثيق المعلمين بحضرموت</span>
              </div>
            </div>
            <span class="material-symbols-outlined text-[20px] text-outline group-hover:-translate-x-1 transition-transform">arrow_back</span>
          </a>
        </div>
      </div>
      <!-- Section 1: Orders & Service Management -->
    `);

    // Logout button link
    content = content.replace(/<span>تسجيل الخروج الآمن<\/span>/g, `
      <a href="login.html" class="w-full h-full flex items-center justify-center gap-space-xs text-error">
        <span class="material-symbols-outlined text-[20px]">logout</span>
        <span>تسجيل الخروج الآمن</span>
      </a>
    `);
  }

  if (meta.name === 'auth-choose-role.html') {
    // Form action
    content = content.replace(/document\.getElementById\('submitBtn'\)\?\.addEventListener\('click'[\s\S]*?\}\);/g, `
      document.getElementById('submitBtn')?.addEventListener('click', function(e) {
        var selectedRadio = document.querySelector('input[name="account_type"]:checked');
        var role = selectedRadio ? selectedRadio.value : 'client';
        if (role === 'artisan') {
          window.location.href = 'register-artisan.html';
        } else {
          window.location.href = 'register-client.html';
        }
      });
    `);
  }

  if (meta.name === 'register-client.html') {
    content = content.replace(/<\/form>/g, `
      <script>
        document.getElementById('clientRegisterForm')?.addEventListener('submit', function(e) {
          e.preventDefault();
          const phone = document.getElementById('phoneInput')?.value || '772458920';
          window.location.href = 'verify-otp.html?role=client&phone=' + encodeURIComponent(phone);
        });
      </script>
      </form>
    `);
  }

  if (meta.name === 'register-artisan.html') {
    content = content.replace(/<\/form>/g, `
      <script>
        document.getElementById('artisanRegistrationForm')?.addEventListener('submit', function(e) {
          e.preventDefault();
          const phone = document.getElementById('phone')?.value || '772458920';
          window.location.href = 'verify-otp.html?role=artisan&phone=' + encodeURIComponent(phone);
        });
      </script>
      </form>
    `);
  }

  if (meta.name === 'verify-otp.html') {
    content = content.replace(/confirmBtn\.addEventListener\('click', \(\) => \{[\s\S]*?\}\);/g, `
      confirmBtn.addEventListener('click', () => {
        confirmBtn.innerHTML = '<span class="material-symbols-outlined text-[20px] animate-spin">refresh</span><span>جاري التوثيق...</span>';
        setTimeout(() => {
          const role = new URLSearchParams(window.location.search).get('role');
          if (role === 'artisan') {
            window.location.href = 'artisan-dashboard.html';
          } else {
            window.location.href = 'index.html';
          }
        }, 600);
      });
    `);
  }

  if (meta.name === 'chat.html') {
    content = content.replace(/onclick="history\.back\(\)"/g, 'onclick="window.location.href=\'client-orders.html\'"');
    // Enable live chat message addition
    content = content.replace(/<\/main>/g, `
      <script>
        const input = document.getElementById('messageInput');
        const sendBtn = document.querySelector('button[aria-label="إرسال الرسالة"]');
        const chatSection = document.querySelector('section.flex.flex-col.px-margin');

        function sendMessage() {
          const text = input.value.trim();
          if (!text) return;
          
          const msgDiv = document.createElement('div');
          msgDiv.className = 'flex flex-col items-end my-1';
          msgDiv.innerHTML = \`
            <div class="bg-[#0f2c59] text-white p-3 rounded-2xl rounded-tl-sm shadow-sm max-w-[80%]">
              <p class="font-body-sm text-body-sm leading-relaxed">\${text}</p>
            </div>
            <div class="flex items-center gap-1 mt-0.5 text-secondary">
              <span class="material-symbols-outlined text-[13px]">done</span>
              <span class="font-label-sm text-[10px] text-on-surface-variant">الآن</span>
            </div>
          \`;
          chatSection.appendChild(msgDiv);
          input.value = '';
          window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });

          // Auto reply simulation after 1.5s
          setTimeout(() => {
            const replyDiv = document.createElement('div');
            replyDiv.className = 'flex items-start gap-2.5 my-2';
            replyDiv.innerHTML = \`
              <img class="w-8 h-8 rounded-full object-cover shrink-0 mt-1" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAo_sGOwgiy2SLIEuzYnLAVbAT1SqhbWskKmEJ1N5J_ZbU43QH2vyWghadkgbtXD5jUJU6MfkrPs0zQv83kpoUHFdwodNpzimFwwsYOLy6j3hpLCLdyD9d32Kafddv_qCe7CIqcOe3MBNAuzic6SlfYORAngjWmEorfuoCjzuqXrmN6tsdhMuWbhkiHP-ogNLYYraMYsUMv7P5PGBbb0-GqGW4C5bzkWxp6sWnvJSY"/>
              <div class="flex flex-col max-w-[85%]">
                <span class="font-label-sm text-[11px] text-on-surface-variant font-bold mb-0.5">المعلم سعيد</span>
                <div class="bg-surface-container-lowest text-on-surface p-3 rounded-2xl rounded-tr-sm shadow-sm border border-surface-container">
                  <p class="font-body-sm text-body-sm leading-relaxed">حيّاك الله يا طيب، تم استلام رسالتك وأنا قريب من موقعك وسأصلك في الوقت المحدد بإذن الله. 🛠️</p>
                </div>
              </div>
            \`;
            chatSection.appendChild(replyDiv);
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
          }, 1200);
        }

        if (sendBtn && input) {
          sendBtn.addEventListener('click', sendMessage);
          input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') sendMessage();
          });
        }
      </script>
    </main>`);
  }

  // Artisan Dashboard specific header additions
  if (meta.name === 'artisan-dashboard.html') {
    // Add "العودة لتطبيق العميل" button in header
    content = content.replace(/<div class="flex items-center gap-space-xs"><button aria-label="الإشعارات"/g, `
      <div class="flex items-center gap-space-xs">
        <a href="index.html" class="px-2.5 py-1 rounded-lg bg-surface-container text-primary font-label-sm text-label-sm font-semibold hover:bg-surface-container-high transition-colors flex items-center gap-1">
          <span class="material-symbols-outlined text-[16px]">visibility</span>
          <span>تطبيق العميل</span>
        </a>
        <button aria-label="الإشعارات"
    `);

    // Wire pro quick tools bento links
    content = content.replace(/<!-- Tool 1: Price List -->\s*<a[^>]*href="#"/g, '<!-- Tool 1: Price List -->\n<a href="artisan-portfolio.html"');
    content = content.replace(/<!-- Tool 2: Add Photos -->\s*<a[^>]*href="#"/g, '<!-- Tool 2: Add Photos -->\n<a href="artisan-portfolio.html"');
    content = content.replace(/<!-- Tool 3: Calendar & Days Off -->\s*<a[^>]*href="#"/g, '<!-- Tool 3: Calendar & Days Off -->\n<a href="artisan-orders.html"');
    content = content.replace(/<!-- Tool 4: Subscription Package -->\s*<a[^>]*href="#"/g, '<!-- Tool 4: Subscription Package -->\n<a href="artisan-wallet.html"');
  }

  // Admin pages header exit button
  if (meta.role === 'admin') {
    content = content.replace(/<div class="flex items-center gap-space-xs"><button aria-label="الإشعارات والإنذارات"/g, `
      <div class="flex items-center gap-space-xs">
        <a href="index.html" class="px-2.5 py-1 rounded-lg bg-surface-container text-primary font-label-sm text-label-sm font-semibold hover:bg-surface-container-high transition-colors flex items-center gap-1">
          <span class="material-symbols-outlined text-[16px]">logout</span>
          <span>خروج</span>
        </a>
        <button aria-label="الإشعارات والإنذارات"
    `);
  }

  // Inject Universal Portal Switcher Widget before </body>
  content = content.replace('</body>', `${getPortalSwitcher(meta.role)}</body>`);

  // Write out cleaned and linked file
  fs.writeFileSync(meta.name, content, 'utf8');
  console.log(`Successfully generated and linked: ${meta.name} (${meta.title})`);
}

console.log('All screens processed, corrected, and interconnected successfully!');

