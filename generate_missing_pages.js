const fs = require('fs');
const path = require('path');

const tailwindConfigScript = `
<script id="tailwind-config">
tailwind.config={darkMode:"class",theme:{extend:{"colors":{"outline-variant":"#c4c6d0","on-surface":"#0b1c30","tertiary-fixed":"#ffdf98","on-secondary-container":"#00217a","on-secondary-fixed":"#001453","on-tertiary-container":"#b78f19","error-container":"#ffdad6","primary-fixed":"#d8e2ff","surface-container-highest":"#d3e4fe","surface-container-high":"#dce9ff","on-tertiary":"#ffffff","secondary-container":"#708cfd","primary":"#00173b","inverse-surface":"#213145","on-secondary":"#ffffff","inverse-primary":"#aec7fd","on-secondary-fixed-variant":"#173bab","on-primary":"#ffffff","surface":"#f8f9ff","secondary-fixed":"#dde1ff","outline":"#747780","on-surface-variant":"#44474f","on-error":"#ffffff","tertiary":"#211700","surface-container-low":"#eff4ff","surface-container":"#e5eeff","on-tertiary-fixed":"#251a00","surface-variant":"#d3e4fe","secondary":"#3755c3","inverse-on-surface":"#eaf1ff","primary-container":"#0f2c59","background":"#f8f9ff","on-primary-fixed":"#001a41","on-primary-container":"#7c94c8","surface-dim":"#cbdbf5","surface-container-lowest":"#ffffff","on-tertiary-fixed-variant":"#5a4300","secondary-fixed-dim":"#b8c4ff","on-error-container":"#93000a","surface-bright":"#f8f9ff","tertiary-container":"#3a2b00","error":"#ba1a1a","on-primary-fixed-variant":"#2d4674","tertiary-fixed-dim":"#eec14b","on-background":"#0b1c30","primary-fixed-dim":"#aec7fd","surface-tint":"#465e8e"},"borderRadius":{"DEFAULT":"0.25rem","lg":"0.5rem","xl":"0.75rem","full":"9999px"},"spacing":{"margin":"1rem","space-sm":"0.5rem","gutter-desktop":"1.5rem","margin-desktop":"2.5rem","gutter":"1rem","space-xl":"2rem","space-lg":"1.5rem","space-xs":"0.25rem","space-md":"1rem"},"fontFamily":{"body-lg":["IBM Plex Sans Arabic"],"display":["IBM Plex Sans Arabic"],"label-sm":["IBM Plex Sans Arabic"],"body-sm":["IBM Plex Sans Arabic"],"headline-md":["IBM Plex Sans Arabic"],"headline-lg-mobile":["IBM Plex Sans Arabic"],"body-md":["IBM Plex Sans Arabic"],"label-lg":["IBM Plex Sans Arabic"],"label-md":["IBM Plex Sans Arabic"],"headline-sm":["IBM Plex Sans Arabic"],"display-mobile":["IBM Plex Sans Arabic"],"headline-lg":["IBM Plex Sans Arabic"]},"fontSize":{"body-lg":["1.0625rem",{"lineHeight":"1.75rem","fontWeight":"400"}],"display":["3rem",{"lineHeight":"3.75rem","letterSpacing":"-0.02em","fontWeight":"700"}],"label-sm":["0.6875rem",{"lineHeight":"1rem","fontWeight":"500"}],"body-sm":["0.8125rem",{"lineHeight":"1.25rem","fontWeight":"400"}],"headline-md":["1.375rem",{"lineHeight":"1.875rem","fontWeight":"600"}],"headline-lg-mobile":["1.5rem",{"lineHeight":"2rem","fontWeight":"700"}],"body-md":["0.9375rem",{"lineHeight":"1.5rem","fontWeight":"400"}],"label-lg":["0.9375rem",{"lineHeight":"1.25rem","fontWeight":"600"}],"label-md":["0.8125rem",{"lineHeight":"1.125rem","fontWeight":"500"}],"headline-sm":["1.125rem",{"lineHeight":"1.625rem","fontWeight":"600"}],"display-mobile":["2.25rem",{"lineHeight":"2.75rem","letterSpacing":"-0.01em","fontWeight":"700"}],"headline-lg":["2rem",{"lineHeight":"2.5rem","fontWeight":"700"}]}}}}
</script>
`;

const commonHead = (title) => `
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" name="viewport"/>
<meta content="mobile_tab" name="shell-type"/>
<title>${title} - منصة مِراس حضرموت</title>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet"/>
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&display=swap" rel="stylesheet"/>
<style>
@layer base {
  html, body { width: 100vw; margin: 0; padding: 0; font-family: 'IBM Plex Sans Arabic', sans-serif; }
  body { overscroll-behavior: none; }
  .pb-safe { padding-bottom: env(safe-area-inset-bottom, 0px); }
  .pt-safe { padding-top: env(safe-area-inset-top, 0px); }
  main > :first-child { margin-top: 0 !important; }
  main > :last-child { margin-bottom: 0 !important; }
}
::-webkit-scrollbar { display: none; }
</style>
<script src="https://cdn.tailwindcss.com"></script>
${tailwindConfigScript}
`;

// 1. login.html
const loginHtml = `<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
${commonHead('تسجيل الدخول')}
</head>
<body class="bg-surface text-on-surface antialiased flex flex-col min-h-screen">
<header class="fixed top-0 inset-x-0 z-50 bg-surface-container-lowest/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(15,44,89,0.05)] pt-safe">
  <div class="h-16 px-margin flex items-center justify-between gap-space-sm">
    <div class="flex items-center gap-space-sm">
      <button onclick="history.back()" class="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors">
        <span class="material-symbols-outlined text-[24px]">arrow_forward</span>
      </button>
      <div class="flex items-center gap-space-xs">
        <div class="w-9 h-9 rounded-xl bg-primary-container flex items-center justify-center text-tertiary-fixed shadow-sm">
          <span class="material-symbols-outlined text-[22px]">handyman</span>
        </div>
        <div class="flex flex-col">
          <span class="font-headline-sm text-headline-sm text-primary font-bold">مِراس</span>
          <span class="font-label-sm text-label-sm text-on-surface-variant">حضرموت</span>
        </div>
      </div>
    </div>
    <a href="index.html" class="text-secondary font-label-md text-label-md font-semibold hover:underline">تخطي كالزائر</a>
  </div>
</header>

<main class="flex flex-col relative w-full pt-20 pb-16 px-margin max-w-md mx-auto flex-1 justify-center">
  <div class="text-center mb-6">
    <div class="w-16 h-16 rounded-2xl bg-primary-container text-tertiary-fixed flex items-center justify-center mx-auto mb-3 shadow-md">
      <span class="material-symbols-outlined text-[32px]">login</span>
    </div>
    <h1 class="font-headline-lg-mobile text-headline-lg-mobile text-primary font-bold mb-1">تسجيل الدخول إلى مِراس</h1>
    <p class="font-body-sm text-body-sm text-on-surface-variant">أهلاً بك مجدداً في منصة المهن والخدمات الأولى في حضرموت</p>
  </div>

  <!-- Role Selector Tabs -->
  <div class="bg-surface-container-low p-1 rounded-xl flex items-center gap-1 mb-5 shadow-inner">
    <button type="button" onclick="selectLoginRole('client')" id="roleBtn-client" class="flex-1 py-2 rounded-lg font-label-md text-label-md font-bold bg-primary text-on-primary shadow-sm transition-all text-center">
      عميل
    </button>
    <button type="button" onclick="selectLoginRole('artisan')" id="roleBtn-artisan" class="flex-1 py-2 rounded-lg font-label-md text-label-md font-medium text-on-surface-variant hover:text-primary transition-all text-center">
      صاحب مهنة
    </button>
    <button type="button" onclick="selectLoginRole('admin')" id="roleBtn-admin" class="flex-1 py-2 rounded-lg font-label-md text-label-md font-medium text-on-surface-variant hover:text-primary transition-all text-center">
      إدارة
    </button>
  </div>

  <form id="loginForm" onsubmit="handleLoginSubmit(event)" class="bg-surface-container-lowest p-space-md rounded-2xl shadow-sm flex flex-col gap-4">
    <!-- Phone / Username -->
    <div>
      <label class="font-label-sm text-label-sm text-on-surface-variant block mb-1 font-semibold" id="accountLabel">رقم الهاتف اليمني</label>
      <div class="relative flex items-center">
        <span class="material-symbols-outlined absolute right-3 text-on-surface-variant text-[20px] pointer-events-none">phone_iphone</span>
        <input type="text" id="phoneInput" required dir="ltr" placeholder="77X XXX XXX" class="w-full h-12 pr-10 pl-4 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md border border-transparent focus:border-secondary focus:bg-surface-container-lowest outline-none transition-all shadow-inner"/>
      </div>
    </div>

    <!-- Password / OTP -->
    <div>
      <div class="flex items-center justify-between mb-1">
        <label class="font-label-sm text-label-sm text-on-surface-variant font-semibold">كلمة المرور أو رمز الدخول</label>
        <a href="verify-otp.html" class="text-secondary font-label-sm text-label-sm hover:underline">دخول عبر رمز SMS</a>
      </div>
      <div class="relative flex items-center">
        <span class="material-symbols-outlined absolute right-3 text-on-surface-variant text-[20px] pointer-events-none">lock</span>
        <input type="password" id="passInput" required placeholder="••••••••" class="w-full h-12 pr-10 pl-4 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md border border-transparent focus:border-secondary focus:bg-surface-container-lowest outline-none transition-all shadow-inner"/>
      </div>
    </div>

    <button type="submit" id="submitBtn" class="h-12 mt-2 rounded-xl bg-primary text-on-primary font-label-lg text-label-lg font-bold flex items-center justify-center gap-2 shadow-md hover:bg-primary-container active:scale-[0.98] transition-all">
      <span>تسجيل الدخول</span>
      <span class="material-symbols-outlined text-[20px]">arrow_back</span>
    </button>
  </form>

  <div class="text-center mt-5">
    <span class="font-body-sm text-body-sm text-on-surface-variant">ليس لديك حساب بعد؟ </span>
    <a href="auth-choose-role.html" class="text-secondary font-label-md text-label-md font-bold hover:underline">إنشاء حساب جديد</a>
  </div>

  <div class="mt-8 pt-4 border-t border-surface-container text-center">
    <a href="admin-login.html" class="inline-flex items-center gap-1.5 text-on-surface-variant hover:text-primary font-label-sm text-label-sm transition-colors">
      <span class="material-symbols-outlined text-[16px]">admin_panel_settings</span>
      <span>دخول المشرفين والمراقبين (لوحة الإدارة)</span>
    </a>
  </div>
</main>

<script>
let currentRole = 'client';

function selectLoginRole(role) {
  currentRole = role;
  ['client', 'artisan', 'admin'].forEach(r => {
    const btn = document.getElementById('roleBtn-' + r);
    if (r === role) {
      btn.className = 'flex-1 py-2 rounded-lg font-label-md text-label-md font-bold bg-primary text-on-primary shadow-sm transition-all text-center';
    } else {
      btn.className = 'flex-1 py-2 rounded-lg font-label-md text-label-md font-medium text-on-surface-variant hover:text-primary transition-all text-center';
    }
  });

  const accountLabel = document.getElementById('accountLabel');
  const phoneInput = document.getElementById('phoneInput');
  if (role === 'admin') {
    accountLabel.textContent = 'اسم المستخدم الإداري أو البريد الإلكتروني';
    phoneInput.placeholder = 'admin@miras.ye';
    phoneInput.dir = 'ltr';
  } else if (role === 'artisan') {
    accountLabel.textContent = 'رقم هاتف صاحب المهنة المسجل';
    phoneInput.placeholder = '77X XXX XXX';
    phoneInput.dir = 'ltr';
  } else {
    accountLabel.textContent = 'رقم الهاتف اليمني';
    phoneInput.placeholder = '77X XXX XXX';
    phoneInput.dir = 'ltr';
  }
}

function handleLoginSubmit(e) {
  e.preventDefault();
  const submitBtn = document.getElementById('submitBtn');
  submitBtn.innerHTML = '<span class="material-symbols-outlined text-[20px] animate-spin">refresh</span> جاري التحقق...';
  submitBtn.disabled = true;

  setTimeout(() => {
    if (currentRole === 'admin') {
      window.location.href = 'admin-overview.html';
    } else if (currentRole === 'artisan') {
      window.location.href = 'artisan-dashboard.html';
    } else {
      window.location.href = 'index.html';
    }
  }, 600);
}
</script>
</body>
</html>`;

// 2. admin-login.html
const adminLoginHtml = `<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
${commonHead('بوابة الإدارة المركزية')}
</head>
<body class="bg-primary text-on-primary antialiased flex flex-col min-h-screen">
<header class="fixed top-0 inset-x-0 z-50 bg-primary/90 backdrop-blur-xl pt-safe">
  <div class="h-16 px-margin flex items-center justify-between gap-space-sm">
    <a href="index.html" class="flex items-center gap-1.5 text-primary-fixed hover:text-white transition-colors">
      <span class="material-symbols-outlined text-[20px]">arrow_forward</span>
      <span class="font-label-sm text-label-sm">العودة للمنصة العامة</span>
    </a>
    <span class="font-label-sm text-label-sm bg-surface-container-lowest/15 px-2.5 py-1 rounded-full text-tertiary-fixed font-semibold">منطقة آمنة ومراقبة</span>
  </div>
</header>

<main class="flex flex-col relative w-full pt-20 pb-16 px-margin max-w-md mx-auto flex-1 justify-center">
  <div class="text-center mb-6">
    <div class="w-16 h-16 rounded-2xl bg-tertiary-fixed text-primary flex items-center justify-center mx-auto mb-3 shadow-lg ring-4 ring-white/10">
      <span class="material-symbols-outlined text-[36px]" style="font-variation-settings: 'FILL' 1;">shield_person</span>
    </div>
    <div class="inline-flex items-center gap-1 text-tertiary-fixed font-label-sm text-label-sm font-semibold mb-1">
      <span class="material-symbols-outlined text-[16px]">policy</span>
      <span>الإشراف العام لمحافظة حضرموت</span>
    </div>
    <h1 class="font-headline-lg-mobile text-headline-lg-mobile text-white font-bold mb-1">لوحة الإدارة المركزية</h1>
    <p class="font-body-sm text-body-sm text-primary-fixed">تسجيل دخول المشرفين الميدانيين وفرق ضبط الجودة والرقابة</p>
  </div>

  <form id="adminLoginForm" onsubmit="handleAdminLogin(event)" class="bg-surface-container-lowest text-on-surface p-space-lg rounded-2xl shadow-xl flex flex-col gap-4">
    <div>
      <label class="font-label-sm text-label-sm text-on-surface-variant block mb-1 font-semibold">اسم المستخدم أو المعرّف الإداري</label>
      <div class="relative flex items-center">
        <span class="material-symbols-outlined absolute right-3 text-on-surface-variant text-[20px] pointer-events-none">admin_panel_settings</span>
        <input type="text" id="adminUser" required value="admin_hadramout" class="w-full h-12 pr-10 pl-4 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md border border-transparent focus:border-secondary focus:bg-surface-container-lowest outline-none transition-all shadow-inner"/>
      </div>
    </div>

    <div>
      <label class="font-label-sm text-label-sm text-on-surface-variant block mb-1 font-semibold">كلمة المرور الأمنية</label>
      <div class="relative flex items-center">
        <span class="material-symbols-outlined absolute right-3 text-on-surface-variant text-[20px] pointer-events-none">key</span>
        <input type="password" id="adminPass" required value="••••••••••••" class="w-full h-12 pr-10 pl-4 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md border border-transparent focus:border-secondary focus:bg-surface-container-lowest outline-none transition-all shadow-inner"/>
      </div>
    </div>

    <div class="bg-surface-container-low p-3 rounded-xl border border-outline-variant/30 text-right">
      <div class="flex items-center gap-1.5 text-secondary font-label-sm text-label-sm font-bold mb-0.5">
        <span class="material-symbols-outlined text-[16px]">verified_user</span>
        <span>التحقق الثنائي الميداني (2FA)</span>
      </div>
      <span class="font-body-sm text-[12px] text-on-surface-variant leading-relaxed">جلسة العمل مؤمنة ومسجلة في سجل تدقيق العمليات الرسمي لمِراس حضرموت.</span>
    </div>

    <button type="submit" id="adminSubmitBtn" class="h-12 mt-2 rounded-xl bg-primary text-on-primary font-label-lg text-label-lg font-bold flex items-center justify-center gap-2 shadow-md hover:bg-primary-container active:scale-[0.98] transition-all">
      <span>دخول لوحة التحكم والعمليات</span>
      <span class="material-symbols-outlined text-[20px]">login</span>
    </button>
  </form>

  <div class="text-center mt-6">
    <a href="index.html" class="text-primary-fixed hover:text-white font-label-sm text-label-sm transition-colors">
      ← العودة إلى الصفحة الرئيسية لتطبيق العميل
    </a>
  </div>
</main>

<script>
function handleAdminLogin(e) {
  e.preventDefault();
  const btn = document.getElementById('adminSubmitBtn');
  btn.innerHTML = '<span class="material-symbols-outlined text-[20px] animate-spin">refresh</span> جاري التحقق من الصلاحيات...';
  btn.disabled = true;

  setTimeout(() => {
    window.location.href = 'admin-overview.html';
  }, 500);
}
</script>
</body>
</html>`;

// 3. artisan-orders.html
const artisanOrdersHtml = `<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
${commonHead('طلبات العمل الواردة - لوحة المهني')}
</head>
<body class="bg-surface text-on-surface antialiased flex flex-col min-h-screen">
<header class="fixed top-0 inset-x-0 z-50 bg-surface-container-lowest/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(15,44,89,0.05)] pt-safe">
  <div class="h-16 px-margin flex items-center justify-between gap-space-sm">
    <div class="flex items-center gap-space-sm">
      <div class="w-10 h-10 rounded-xl bg-primary-container text-tertiary-fixed flex items-center justify-center shadow-sm">
        <span class="material-symbols-outlined text-[22px]">engineering</span>
      </div>
      <div class="flex flex-col">
        <div class="flex items-center gap-1">
          <span class="font-headline-sm text-headline-sm text-primary font-bold">طلبات العمل</span>
          <span class="font-label-sm text-label-sm text-tertiary-fixed-dim bg-primary px-1.5 py-0.2 rounded-full">المهني</span>
        </div>
        <span class="font-label-sm text-label-sm text-on-surface-variant">المعلم عوض بن حريز • المكلا</span>
      </div>
    </div>
    <div class="flex items-center gap-1.5">
      <a href="index.html" class="px-2.5 py-1 rounded-lg bg-surface-container text-primary font-label-sm text-label-sm font-semibold hover:bg-surface-container-high transition-colors flex items-center gap-1">
        <span class="material-symbols-outlined text-[16px]">visibility</span>
        <span>عرض كعميل</span>
      </a>
    </div>
  </div>
</header>

<main class="flex flex-col relative w-full pt-16 pb-24 bg-surface min-h-screen">
  <div class="flex flex-col w-full px-margin pb-8">
    <!-- Filter Tabs -->
    <div class="my-space-md bg-surface-container-low p-1 rounded-xl flex items-center gap-1 shadow-inner">
      <button onclick="filterArtisanOrders('new')" id="tab-new" class="flex-1 py-2 rounded-lg font-label-md text-label-md font-bold bg-primary text-on-primary shadow-sm transition-all flex items-center justify-center gap-1">
        <span>واردة جديدة</span>
        <span class="w-5 h-5 rounded-full bg-secondary text-white text-[11px] font-bold flex items-center justify-center">2</span>
      </button>
      <button onclick="filterArtisanOrders('ongoing')" id="tab-ongoing" class="flex-1 py-2 rounded-lg font-label-md text-label-md font-medium text-on-surface-variant hover:text-primary transition-all flex items-center justify-center gap-1">
        <span>قيد التنفيذ</span>
        <span class="w-5 h-5 rounded-full bg-surface-container text-on-surface text-[11px] font-bold flex items-center justify-center">1</span>
      </button>
      <button onclick="filterArtisanOrders('completed')" id="tab-completed" class="flex-1 py-2 rounded-lg font-label-md text-label-md font-medium text-on-surface-variant hover:text-primary transition-all flex items-center justify-center gap-1">
        <span>المكتملة</span>
      </button>
    </div>

    <!-- Orders Stack -->
    <div class="flex flex-col gap-3.5" id="ordersList">
      <!-- Order 1: New Request -->
      <div class="order-card order-new bg-surface-container-lowest rounded-2xl p-space-md shadow-sm border border-secondary/20">
        <div class="flex items-start justify-between gap-2 mb-2.5">
          <div class="flex items-center gap-2">
            <span class="w-9 h-9 rounded-xl bg-secondary-container/20 text-secondary flex items-center justify-center shrink-0">
              <span class="material-symbols-outlined text-[20px]">notification_important</span>
            </span>
            <div>
              <div class="flex items-center gap-1.5">
                <h3 class="font-headline-sm text-headline-sm text-primary font-bold">طلب صيانة وتركيب جديد</h3>
                <span class="px-2 py-0.5 rounded-full bg-secondary text-white font-label-sm text-[11px] font-bold">عاجل</span>
              </div>
              <span class="font-body-sm text-[12px] text-on-surface-variant">العميل: سالم صالح باوزير • المكلا (حي فُوّة)</span>
            </div>
          </div>
          <span class="font-label-sm text-label-sm text-on-surface-variant font-mono">منذ 15 دقيقة</span>
        </div>

        <div class="bg-surface-container-low rounded-xl p-3 mb-3 text-on-surface text-right">
          <p class="font-body-sm text-body-sm text-on-surface leading-relaxed">
            "نحتاج فحص وصيانة مكيفين سبلت تنقط ماء في الصالة وغرفة النوم الرئيسية، وتعبئة فريون أصلي قبل قدوم الضيوف غداً."
          </p>
          <div class="mt-2 pt-2 border-t border-outline-variant/30 flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
            <span>التسعيرة المقترحة للكشف: <strong class="text-primary font-bold font-mono">18,000 ر.ي</strong></span>
            <span class="text-secondary font-medium flex items-center gap-0.5">
              <span class="material-symbols-outlined text-[14px]">location_on</span>
              <span>يبعد عنك 2.4 كم</span>
            </span>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <a href="chat.html" class="w-11 h-11 rounded-xl bg-surface-container flex items-center justify-center text-primary hover:bg-surface-container-high transition-colors shrink-0" title="محادثة العميل">
            <span class="material-symbols-outlined text-[20px]">chat</span>
          </a>
          <button onclick="acceptOrder(this)" class="flex-1 h-11 rounded-xl bg-primary text-on-primary font-label-md text-label-md font-bold flex items-center justify-center gap-1.5 shadow-sm hover:bg-primary-container active:scale-95 transition-all">
            <span class="material-symbols-outlined text-[18px]">check</span>
            <span>قبول الطلب والتوجه للموقع</span>
          </button>
          <button onclick="rejectOrder(this)" class="px-3 h-11 rounded-xl bg-surface-container-low text-error font-label-md text-label-md font-semibold hover:bg-error-container/40 transition-colors">
            اعتذار
          </button>
        </div>
      </div>

      <!-- Order 2: Ongoing Job -->
      <div class="order-card order-ongoing bg-surface-container-lowest rounded-2xl p-space-md shadow-sm">
        <div class="flex items-start justify-between gap-2 mb-2.5">
          <div class="flex items-center gap-2">
            <span class="w-9 h-9 rounded-xl bg-tertiary-fixed text-primary flex items-center justify-center shrink-0">
              <span class="material-symbols-outlined text-[20px]">construction</span>
            </span>
            <div>
              <div class="flex items-center gap-1.5">
                <h3 class="font-headline-sm text-headline-sm text-primary font-bold">بناء وتجهيز ديكور حضرمي</h3>
                <span class="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-label-sm text-[11px] font-bold">جاري التنفيذ</span>
              </div>
              <span class="font-body-sm text-[12px] text-on-surface-variant">العميل: المهندس خالد بكران • المكلا (الديس)</span>
            </div>
          </div>
          <span class="font-label-sm text-label-sm text-primary font-bold font-mono">45,000 ر.ي</span>
        </div>

        <div class="flex items-center justify-between bg-surface-container-low rounded-xl p-2.5 mb-3 text-on-surface-variant font-label-sm text-label-sm">
          <span>المرحلة الحالية: توريد المواد والبدء في التشطيب</span>
          <span class="text-secondary font-bold">نسبة الإنجاز: 65%</span>
        </div>

        <div class="flex items-center gap-2">
          <a href="chat.html" class="flex-1 h-10 rounded-xl bg-surface-container text-primary font-label-md text-label-md font-semibold flex items-center justify-center gap-1 hover:bg-surface-container-high transition-colors">
            <span class="material-symbols-outlined text-[18px]">chat</span>
            <span>محادثة العميل</span>
          </a>
          <button onclick="finishJob(this)" class="flex-1 h-10 rounded-xl bg-emerald-600 text-white font-label-md text-label-md font-bold flex items-center justify-center gap-1 shadow-sm hover:bg-emerald-700 active:scale-95 transition-all">
            <span class="material-symbols-outlined text-[18px]">verified</span>
            <span>إنهاء وتسليم العمل</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</main>

<!-- Artisan Bottom Nav -->
<nav class="fixed bottom-0 inset-x-0 z-50 pb-safe bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_-2px_12px_rgba(15,44,89,0.06)]">
  <div class="flex justify-around items-center h-16 px-space-xs">
    <a href="artisan-dashboard.html" class="flex flex-col items-center justify-center gap-1 w-16 h-14 text-on-surface-variant hover:text-primary transition-colors">
      <span class="material-symbols-outlined text-[24px]">dashboard</span>
      <span class="font-label-sm text-label-sm">الرئيسية</span>
    </a>
    <a href="artisan-orders.html" class="flex flex-col items-center justify-center gap-1 w-16 h-14 text-primary font-bold transition-colors">
      <span class="material-symbols-outlined text-[24px]">assignment</span>
      <span class="font-label-sm text-label-sm">طلبات العمل</span>
    </a>
    <a href="artisan-wallet.html" class="flex flex-col items-center justify-center gap-1 w-16 h-14 text-on-surface-variant hover:text-primary transition-colors">
      <span class="material-symbols-outlined text-[24px]">account_balance_wallet</span>
      <span class="font-label-sm text-label-sm">المحفظة</span>
    </a>
    <a href="artisan-portfolio.html" class="flex flex-col items-center justify-center gap-1 w-16 h-14 text-on-surface-variant hover:text-primary transition-colors">
      <span class="material-symbols-outlined text-[24px]">photo_library</span>
      <span class="font-label-sm text-label-sm">أعمالي</span>
    </a>
  </div>
</nav>

<script>
function filterArtisanOrders(tab) {
  ['new', 'ongoing', 'completed'].forEach(t => {
    const btn = document.getElementById('tab-' + t);
    if (t === tab) {
      btn.className = 'flex-1 py-2 rounded-lg font-label-md text-label-md font-bold bg-primary text-on-primary shadow-sm transition-all flex items-center justify-center gap-1';
    } else {
      btn.className = 'flex-1 py-2 rounded-lg font-label-md text-label-md font-medium text-on-surface-variant hover:text-primary transition-all flex items-center justify-center gap-1';
    }
  });

  const cards = document.querySelectorAll('.order-card');
  cards.forEach(card => {
    if (tab === 'completed') {
      card.style.display = 'none';
    } else if (tab === 'new') {
      card.style.display = card.classList.contains('order-new') ? 'block' : 'none';
    } else if (tab === 'ongoing') {
      card.style.display = card.classList.contains('order-ongoing') ? 'block' : 'none';
    }
  });
}

function acceptOrder(btn) {
  btn.innerHTML = '<span class="material-symbols-outlined text-[18px]">done</span> تم قبول الطلب!';
  btn.className = 'flex-1 h-11 rounded-xl bg-emerald-600 text-white font-label-md text-label-md font-bold flex items-center justify-center gap-1.5 shadow-sm';
  setTimeout(() => {
    alert('تم تأكيد قبول الطلب! يمكنك الآن التواصل مع العميل وتحديد مسار الوصول.');
  }, 300);
}

function rejectOrder(btn) {
  if (confirm('هل أنت متأكد من الاعتذار عن هذا الطلب؟')) {
    btn.closest('.order-card').remove();
  }
}

function finishJob(btn) {
  btn.innerHTML = '<span class="material-symbols-outlined text-[18px]">verified</span> تم التسليم بنجاح ✓';
  setTimeout(() => {
    window.location.href = 'artisan-wallet.html';
  }, 500);
}
</script>
</body>
</html>`;

// 4. artisan-wallet.html
const artisanWalletHtml = `<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
${commonHead('المحفظة والأرباح - لوحة المهني')}
</head>
<body class="bg-surface text-on-surface antialiased flex flex-col min-h-screen">
<header class="fixed top-0 inset-x-0 z-50 bg-surface-container-lowest/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(15,44,89,0.05)] pt-safe">
  <div class="h-16 px-margin flex items-center justify-between gap-space-sm">
    <div class="flex items-center gap-space-sm">
      <div class="w-10 h-10 rounded-xl bg-primary-container text-tertiary-fixed flex items-center justify-center shadow-sm">
        <span class="material-symbols-outlined text-[22px]">account_balance_wallet</span>
      </div>
      <div class="flex flex-col">
        <span class="font-headline-sm text-headline-sm text-primary font-bold">محفظة المهني</span>
        <span class="font-label-sm text-label-sm text-on-surface-variant">تسوية الأرباح بالريال اليمني</span>
      </div>
    </div>
    <div class="flex items-center gap-1.5">
      <a href="index.html" class="px-2.5 py-1 rounded-lg bg-surface-container text-primary font-label-sm text-label-sm font-semibold hover:bg-surface-container-high transition-colors flex items-center gap-1">
        <span class="material-symbols-outlined text-[16px]">visibility</span>
        <span>تطبيق العميل</span>
      </a>
    </div>
  </div>
</header>

<main class="flex flex-col relative w-full pt-16 pb-24 bg-surface min-h-screen">
  <div class="flex flex-col w-full px-margin pb-8">
    <!-- Big Balance Card -->
    <div class="relative overflow-hidden rounded-2xl bg-primary-container text-white p-space-lg shadow-lg my-space-md">
      <div class="absolute -top-10 -left-10 w-36 h-36 rounded-full bg-secondary/30 blur-2xl pointer-events-none"></div>
      <div class="absolute -bottom-10 -right-10 w-36 h-36 rounded-full bg-tertiary-fixed-dim/20 blur-2xl pointer-events-none"></div>

      <div class="relative z-10 flex flex-col">
        <div class="flex items-center justify-between mb-2">
          <span class="font-label-md text-label-md text-primary-fixed">الرصيد المتاح للسحب الفوري</span>
          <span class="px-2.5 py-0.5 rounded-full bg-surface-container-lowest/15 backdrop-blur-md text-tertiary-fixed font-label-sm text-label-sm font-semibold flex items-center gap-1">
            <span class="material-symbols-outlined text-[14px]">lock</span>
            <span>حماية مِراس</span>
          </span>
        </div>

        <div class="flex items-baseline gap-2 mb-4">
          <span class="font-headline-lg text-[2.5rem] font-bold text-white tracking-tight font-mono">185,000</span>
          <span class="font-headline-sm text-headline-sm text-tertiary-fixed font-semibold">ريال يمني</span>
        </div>

        <div class="grid grid-cols-2 gap-2 pt-3 border-t border-white/10 mb-4">
          <div class="flex flex-col">
            <span class="font-label-sm text-[12px] text-primary-fixed">أرباح معلقة (قيد الإنجاز)</span>
            <span class="font-label-lg text-label-lg font-bold text-white font-mono">45,000 ر.ي</span>
          </div>
          <div class="flex flex-col">
            <span class="font-label-sm text-[12px] text-primary-fixed">إجمالي المسحوبات السابقة</span>
            <span class="font-label-lg text-label-lg font-bold text-white font-mono">320,000 ر.ي</span>
          </div>
        </div>

        <button onclick="requestWithdrawal()" class="w-full h-12 rounded-xl bg-tertiary-fixed text-primary font-label-lg text-label-lg font-bold flex items-center justify-center gap-2 shadow-md hover:bg-tertiary-fixed-dim transition-all active:scale-[0.98]">
          <span class="material-symbols-outlined text-[20px]">payments</span>
          <span>طلب سحب الأرباح لحسابي</span>
        </button>
      </div>
    </div>

    <!-- Payout Channels in Hadramout -->
    <div class="mb-space-lg">
      <h2 class="font-headline-sm text-headline-sm text-primary font-bold mb-space-sm flex items-center gap-1.5">
        <span class="material-symbols-outlined text-secondary text-[22px]">account_balance</span>
        <span>قنوات التحويل المعتمدة في حضرموت</span>
      </h2>

      <div class="grid grid-cols-1 gap-2.5">
        <!-- Kuraimi -->
        <div class="bg-surface-container-lowest rounded-xl p-3.5 shadow-sm flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-11 h-11 rounded-xl bg-blue-50 text-blue-800 flex items-center justify-center font-bold text-[18px]">
              K
            </div>
            <div>
              <h4 class="font-label-lg text-label-lg text-primary font-bold">بنك الكريمي للتمويل الأصغر</h4>
              <span class="font-body-sm text-[12px] text-on-surface-variant font-mono">حساب مميز: 300482910</span>
            </div>
          </div>
          <span class="px-2 py-1 rounded-md bg-emerald-100 text-emerald-800 font-label-sm text-[11px] font-bold">الحساب الأساسي</span>
        </div>

        <!-- Al-Omgy -->
        <div class="bg-surface-container-lowest rounded-xl p-3.5 shadow-sm flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-11 h-11 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center font-bold text-[18px]">
              ع
            </div>
            <div>
              <h4 class="font-label-lg text-label-lg text-primary font-bold">شركة العمقي وإخوانه للصرافة</h4>
              <span class="font-body-sm text-[12px] text-on-surface-variant">حوالة فورية بالهوية الوطنية</span>
            </div>
          </div>
          <button class="text-secondary font-label-sm text-label-sm font-semibold hover:underline">تعديل</button>
        </div>
      </div>
    </div>

    <!-- Recent Transactions Ledger -->
    <div>
      <h2 class="font-headline-sm text-headline-sm text-primary font-bold mb-space-sm flex items-center gap-1.5">
        <span class="material-symbols-outlined text-secondary text-[22px]">history</span>
        <span>سجل الحركات المالية الأخيرة</span>
      </h2>

      <div class="flex flex-col gap-2.5">
        <div class="bg-surface-container-lowest rounded-xl p-3 shadow-sm flex items-center justify-between">
          <div class="flex items-center gap-2.5">
            <div class="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <span class="material-symbols-outlined text-[20px]">add</span>
            </div>
            <div>
              <span class="font-label-md text-label-md text-primary font-bold block">إيداع أتعاب صيانة سبلت #MRS-8492</span>
              <span class="font-body-sm text-[12px] text-on-surface-variant">المكلا - حي فُوّة • أمس 04:30 م</span>
            </div>
          </div>
          <span class="font-label-lg text-label-lg text-emerald-700 font-bold font-mono">+18,000 ر.ي</span>
        </div>

        <div class="bg-surface-container-lowest rounded-xl p-3 shadow-sm flex items-center justify-between">
          <div class="flex items-center gap-2.5">
            <div class="w-10 h-10 rounded-full bg-surface-container text-primary flex items-center justify-center shrink-0">
              <span class="material-symbols-outlined text-[20px]">arrow_outward</span>
            </div>
            <div>
              <span class="font-label-md text-label-md text-primary font-bold block">سحب إلى حساب الكريمي</span>
              <span class="font-body-sm text-[12px] text-on-surface-variant">حوالة مكتملة • 10 مايو 2025</span>
            </div>
          </div>
          <span class="font-label-lg text-label-lg text-primary font-bold font-mono">-70,000 ر.ي</span>
        </div>
      </div>
    </div>
  </div>
</main>

<!-- Artisan Bottom Nav -->
<nav class="fixed bottom-0 inset-x-0 z-50 pb-safe bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_-2px_12px_rgba(15,44,89,0.06)]">
  <div class="flex justify-around items-center h-16 px-space-xs">
    <a href="artisan-dashboard.html" class="flex flex-col items-center justify-center gap-1 w-16 h-14 text-on-surface-variant hover:text-primary transition-colors">
      <span class="material-symbols-outlined text-[24px]">dashboard</span>
      <span class="font-label-sm text-label-sm">الرئيسية</span>
    </a>
    <a href="artisan-orders.html" class="flex flex-col items-center justify-center gap-1 w-16 h-14 text-on-surface-variant hover:text-primary transition-colors">
      <span class="material-symbols-outlined text-[24px]">assignment</span>
      <span class="font-label-sm text-label-sm">طلبات العمل</span>
    </a>
    <a href="artisan-wallet.html" class="flex flex-col items-center justify-center gap-1 w-16 h-14 text-primary font-bold transition-colors">
      <span class="material-symbols-outlined text-[24px]">account_balance_wallet</span>
      <span class="font-label-sm text-label-sm">المحفظة</span>
    </a>
    <a href="artisan-portfolio.html" class="flex flex-col items-center justify-center gap-1 w-16 h-14 text-on-surface-variant hover:text-primary transition-colors">
      <span class="material-symbols-outlined text-[24px]">photo_library</span>
      <span class="font-label-sm text-label-sm">أعمالي</span>
    </a>
  </div>
</nav>

<script>
function requestWithdrawal() {
  const amount = prompt('أدخل المبلغ المطلوب سحبه بالريال اليمني (الحد الأدنى 10,000 ر.ي):', '50000');
  if (amount && parseInt(amount) >= 10000) {
    alert('تم رفع طلب السحب بقيمة ' + parseInt(amount).toLocaleString() + ' ر.ي بنجاح إلى حساب الكريمي، ستتم المعالجة خلال 24 ساعة.');
  }
}
</script>
</body>
</html>`;

// 5. artisan-portfolio.html
const artisanPortfolioHtml = `<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
${commonHead('معرض أعمالي والملف الشخصي - لوحة المهني')}
</head>
<body class="bg-surface text-on-surface antialiased flex flex-col min-h-screen">
<header class="fixed top-0 inset-x-0 z-50 bg-surface-container-lowest/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(15,44,89,0.05)] pt-safe">
  <div class="h-16 px-margin flex items-center justify-between gap-space-sm">
    <div class="flex items-center gap-space-sm">
      <div class="w-10 h-10 rounded-xl bg-primary-container text-tertiary-fixed flex items-center justify-center shadow-sm">
        <span class="material-symbols-outlined text-[22px]">photo_library</span>
      </div>
      <div class="flex flex-col">
        <span class="font-headline-sm text-headline-sm text-primary font-bold">معرض الأعمال</span>
        <span class="font-label-sm text-label-sm text-on-surface-variant">الملف المهني • المعلم عوض</span>
      </div>
    </div>
    <div class="flex items-center gap-1.5">
      <a href="artisan-profile.html" class="px-2.5 py-1 rounded-lg bg-surface-container text-primary font-label-sm text-label-sm font-semibold hover:bg-surface-container-high transition-colors flex items-center gap-1">
        <span class="material-symbols-outlined text-[16px]">visibility</span>
        <span>معاينة للعملاء</span>
      </a>
    </div>
  </div>
</header>

<main class="flex flex-col relative w-full pt-16 pb-24 bg-surface min-h-screen">
  <div class="flex flex-col w-full px-margin pb-8">
    <!-- Header Profile Summary -->
    <div class="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm my-space-md flex items-center justify-between gap-3">
      <div class="flex items-center gap-3">
        <div class="relative w-16 h-16 rounded-2xl overflow-hidden shadow-sm bg-surface-container-high">
          <img class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBeBJRumuvpNF3WuFQi2nEyx3EijDYwM3sLvqH13Qbn28muLmP-S5K8UKhO46ydp8AY2oqbgiq0q0DhaX5f2Xow1IktUHg0nqGJeYF9-IL-xRVLBtNFgbUN-8Y4-hT9wB7pB2YwLOySI5OC8qdnbGTEeA5MqV86QLIi5PCu5-YoOJ7AiaJ1rMIHVqoo47NUtMUwvTqCppmffep6tXP9bHwE5HREILUPflbo-MHr_QY" alt="عوض بن حريز"/>
        </div>
        <div>
          <div class="flex items-center gap-1.5">
            <h2 class="font-headline-sm text-headline-sm text-primary font-bold">المعلم عوض بن حريز</h2>
            <span class="material-symbols-outlined text-tertiary-fixed-dim text-[16px]" style="font-variation-settings: 'FILL' 1;">verified</span>
          </div>
          <span class="font-body-sm text-[12px] text-on-surface-variant block mt-0.5">معلم بناء وديكور حضرمي تقليدي</span>
          <span class="font-label-sm text-[11px] text-secondary font-semibold">المكلا • تريم • سيئون</span>
        </div>
      </div>
      <button onclick="editBio()" class="w-9 h-9 rounded-xl bg-surface-container flex items-center justify-center text-primary hover:bg-surface-container-high transition-colors">
        <span class="material-symbols-outlined text-[18px]">edit</span>
      </button>
    </div>

    <!-- Add Work Button -->
    <div class="flex items-center justify-between mb-space-sm">
      <h3 class="font-headline-sm text-headline-sm text-primary font-bold">المشاريع والأعمال المنفذة (8)</h3>
      <button onclick="addProjectPhoto()" class="px-3 py-1.5 rounded-xl bg-primary text-on-primary font-label-md text-label-md font-bold flex items-center gap-1 shadow-sm hover:bg-primary-container active:scale-95 transition-all">
        <span class="material-symbols-outlined text-[18px]">add_a_photo</span>
        <span>إضافة عمل جديد</span>
      </button>
    </div>

    <!-- Gallery Grid -->
    <div class="grid grid-cols-2 gap-3" id="galleryGrid">
      <div class="group relative rounded-2xl overflow-hidden bg-surface-container-lowest shadow-sm flex flex-col">
        <div class="h-36 w-full overflow-hidden bg-surface-container-high">
          <img class="w-full h-full object-cover group-hover:scale-105 transition-transform" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCr3NGYlvJ3DvgU_uELG6LxZRj2loP0MjxbJ3FzERk7Fvn2khWOmLSUH7znkCF7Aa2Cz4Py_HqamW0mKYFcfiP2I9UQRJu-fA31WEg2uNP24Frwhj-nH97n3MAZi3l1evyZKq11ekEKDmuaQb6NmarIUz47KuFiIrGNAfQPTpiPo6IDGeUkgAByPbQ3UUnYP-ND_rdHh9xxnQdAC84HTydXO0fJ48SgTQeCOl4xEJQ" alt="مشروع"/>
        </div>
        <div class="p-2.5">
          <h4 class="font-label-md text-label-md text-primary font-bold truncate">عمارة ونقوش تقليدية</h4>
          <span class="font-label-sm text-[11px] text-on-surface-variant">المكلا - الديس • 2025</span>
        </div>
      </div>

      <div class="group relative rounded-2xl overflow-hidden bg-surface-container-lowest shadow-sm flex flex-col">
        <div class="h-36 w-full overflow-hidden bg-surface-container-high">
          <img class="w-full h-full object-cover group-hover:scale-105 transition-transform" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvfb0MrhbqjlwJ1S3vCO07WX3vLtU7dpmAYjE7PlDNMYgS5VV8waOxaMF6u4J5v36pmcEFPtKXeuftJ6fCJr2Xi_OctOgSuaN3GJISXVHvD4G96GbhwzE3G1ih6lBHwCNCPqaIpJ9EFulohjZAvpXyBWONy9bIdpdkD889_VHp8jKWtywOrvj5cs1r52jpgioTAlOquLZ9zasjRsnxWP8ImugSPv8qRxRa4lr9Eqg" alt="مشروع"/>
        </div>
        <div class="p-2.5">
          <h4 class="font-label-md text-label-md text-primary font-bold truncate">تشطيب مجلس حضرمي</h4>
          <span class="font-label-sm text-[11px] text-on-surface-variant">سيئون - السحيل • 2025</span>
        </div>
      </div>
    </div>
  </div>
</main>

<!-- Artisan Bottom Nav -->
<nav class="fixed bottom-0 inset-x-0 z-50 pb-safe bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_-2px_12px_rgba(15,44,89,0.06)]">
  <div class="flex justify-around items-center h-16 px-space-xs">
    <a href="artisan-dashboard.html" class="flex flex-col items-center justify-center gap-1 w-16 h-14 text-on-surface-variant hover:text-primary transition-colors">
      <span class="material-symbols-outlined text-[24px]">dashboard</span>
      <span class="font-label-sm text-label-sm">الرئيسية</span>
    </a>
    <a href="artisan-orders.html" class="flex flex-col items-center justify-center gap-1 w-16 h-14 text-on-surface-variant hover:text-primary transition-colors">
      <span class="material-symbols-outlined text-[24px]">assignment</span>
      <span class="font-label-sm text-label-sm">طلبات العمل</span>
    </a>
    <a href="artisan-wallet.html" class="flex flex-col items-center justify-center gap-1 w-16 h-14 text-on-surface-variant hover:text-primary transition-colors">
      <span class="material-symbols-outlined text-[24px]">account_balance_wallet</span>
      <span class="font-label-sm text-label-sm">المحفظة</span>
    </a>
    <a href="artisan-portfolio.html" class="flex flex-col items-center justify-center gap-1 w-16 h-14 text-primary font-bold transition-colors">
      <span class="material-symbols-outlined text-[24px]">photo_library</span>
      <span class="font-label-sm text-label-sm">أعمالي</span>
    </a>
  </div>
</nav>

<script>
function editBio() {
  const newBio = prompt('تعديل الوصف التعريفي بالمهنة:', 'معلم عمارة وبناء تقليدي وتشطيب وديكورات حضرمية معتمدة.');
  if (newBio) alert('تم تحديث البيانات بنجاح.');
}

function addProjectPhoto() {
  const title = prompt('أدخل عنوان المشروع المنجز:');
  if (title) {
    alert('تم رفع صورة العمل وإضافتها إلى معرضك وسيتمكن العملاء من مشاهدتها.');
  }
}
</script>
</body>
</html>`;

fs.writeFileSync('login.html', loginHtml, 'utf8');
fs.writeFileSync('admin-login.html', adminLoginHtml, 'utf8');
fs.writeFileSync('artisan-orders.html', artisanOrdersHtml, 'utf8');
fs.writeFileSync('artisan-wallet.html', artisanWalletHtml, 'utf8');
fs.writeFileSync('artisan-portfolio.html', artisanPortfolioHtml, 'utf8');

console.log('Successfully generated 5 missing pages: login.html, admin-login.html, artisan-orders.html, artisan-wallet.html, artisan-portfolio.html');

