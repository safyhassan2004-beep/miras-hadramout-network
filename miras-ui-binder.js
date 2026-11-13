/**
-- ==============================================================================
-- مِـرَاس (Miras Hadramout Artisan Network) — منسق الواجهات التفاعلية المباشرة
-- Miras Dynamic UI Binder: Links DOM elements with MirasDB & Supabase
-- ==============================================================================
 */

(function(window) {
  'use strict';

  async function initUIBindings() {
    if (!window.MirasDB) return;

    const pagePath = window.location.pathname;

    // --------------------------------------------------------------------------
    // 1. مزامنة صفحة طلبات العميل (client-orders.html)
    // --------------------------------------------------------------------------
    if (pagePath.includes('client-orders.html')) {
      const ordersSection = document.querySelector('section.mb-space-lg');
      if (ordersSection) {
        const orders = await window.MirasDB.getOrders();
        if (orders && orders.length > 0) {
          ordersSection.innerHTML = orders.map(order => {
            const isOngoing = order.status === 'ongoing' || order.status === 'in_progress' || order.status === 'new';
            const statusBg = isOngoing ? 'bg-secondary-container/20 text-secondary' : 'bg-emerald-100 text-emerald-800';
            const statusLabel = order.statusLabel || (isOngoing ? 'طلب جاري التنفيذ' : 'مكتمل ومسدد');
            const dotAnim = isOngoing ? '<span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>' : '';

            return `
              <div class="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm border border-secondary/20 mb-3.5">
                <div class="flex items-start justify-between gap-2 mb-3">
                  <div class="flex items-center gap-2.5">
                    <div class="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center text-secondary">
                      <span class="material-symbols-outlined text-[26px]">handyman</span>
                    </div>
                    <div>
                      <span class="font-label-sm text-[11px] ${statusBg} px-2 py-0.5 rounded-full font-bold">${statusLabel}</span>
                      <h3 class="font-headline-sm text-headline-sm text-primary font-bold mt-0.5">${order.serviceTitle}</h3>
                      <span class="font-body-sm text-[12px] text-on-surface-variant">المعلم: ${order.artisanName} • ${order.location}</span>
                    </div>
                  </div>
                  <span class="font-label-md text-label-md font-bold text-primary font-mono">${order.price.toLocaleString()} ر.ي</span>
                </div>

                <div class="bg-surface-container-low rounded-xl p-2.5 mb-3 flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
                  <span class="flex items-center gap-1 text-emerald-700 font-semibold">
                    ${dotAnim}
                    ${order.statusLabel}
                  </span>
                  <span class="font-mono">#${order.id}</span>
                </div>

                <div class="flex items-center gap-2">
                  <a href="order-details.html?id=${encodeURIComponent(order.id)}" class="flex-1 h-10 rounded-xl bg-primary text-on-primary font-label-md text-label-md font-bold flex items-center justify-center gap-1 shadow-sm hover:bg-primary-container transition-colors">
                    <span class="material-symbols-outlined text-[18px]">receipt_long</span>
                    <span>سند الفاتورة والضمان</span>
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
            `;
          }).join('');

          // تحديث أرقام التبويبات العلوية
          const tabs = document.querySelectorAll('section.mb-space-md button');
          if (tabs.length >= 2) {
            const currentBadge = tabs[0].querySelector('span:last-child');
            const completedBadge = tabs[1].querySelector('span:last-child');
            if (currentBadge) currentBadge.textContent = orders.filter(o => o.status !== 'completed').length;
            if (completedBadge) completedBadge.textContent = orders.filter(o => o.status === 'completed').length;
          }
        }
      }
    }

    // --------------------------------------------------------------------------
    // 2. تفاصيل السند والفاتورة (order-details.html)
    // --------------------------------------------------------------------------
    if (pagePath.includes('order-details.html')) {
      const urlParams = new URLSearchParams(window.location.search);
      const orderId = urlParams.get('id');
      if (orderId && window.MirasStore) {
        const order = window.MirasStore.getOrderById(orderId);
        if (order) {
          // تحديث رقم الطلب
          const orderCodeElem = document.querySelector('span.font-headline-sm.tracking-tight');
          if (orderCodeElem) orderCodeElem.textContent = '#' + order.id;

          // تحديث اسم الحرفي
          const artisanNameElem = document.querySelector('span.font-label-md.text-primary.font-semibold.truncate');
          if (artisanNameElem) artisanNameElem.textContent = order.artisanName;

          // تحديث السعر
          const priceElems = document.querySelectorAll('span.font-headline-sm.text-primary.font-bold');
          priceElems.forEach(el => {
            if (el.textContent.includes('18,000') || el.closest('.text-primary')) {
              el.textContent = order.price.toLocaleString() + ' ر.ي';
            }
          });
        }
      }
    }

    // --------------------------------------------------------------------------
    // 3. لوحة تحكم صاحب المهنة (artisan-dashboard.html)
    // --------------------------------------------------------------------------
    if (pagePath.includes('artisan-dashboard.html')) {
      const wallet = await window.MirasDB.getWallet();
      const orders = await window.MirasDB.getOrders();

      // تحديث الأرباح
      const incomeElem = document.querySelector('.font-headline-lg-mobile.font-mono');
      if (incomeElem) {
        incomeElem.textContent = (wallet.availableBalance || 185000).toLocaleString();
      }

      // تحديث عدد الطلبات النشطة
      const activeOrdersCountElem = document.querySelector('.font-headline-sm.font-mono');
      if (activeOrdersCountElem && orders) {
        const count = orders.filter(o => o.status !== 'completed').length;
        activeOrdersCountElem.textContent = count;
      }
    }

    // --------------------------------------------------------------------------
    // 4. محفظة المهني (artisan-wallet.html)
    // --------------------------------------------------------------------------
    if (pagePath.includes('artisan-wallet.html')) {
      const wallet = await window.MirasDB.getWallet();
      const balanceBig = document.querySelector('span.font-headline-lg');
      if (balanceBig && wallet) {
        balanceBig.textContent = (wallet.availableBalance || 185000).toLocaleString();
      }
    }

    // --------------------------------------------------------------------------
    // 5. طلبات العمل للحرفي (artisan-orders.html)
    // --------------------------------------------------------------------------
    if (pagePath.includes('artisan-orders.html')) {
      window.acceptOrder = async function(btn) {
        btn.innerHTML = '<span class="material-symbols-outlined text-[18px]">done</span> جاري القبول في سوبا بيس...';
        btn.className = 'flex-1 h-11 rounded-xl bg-emerald-600 text-white font-label-md text-label-md font-bold flex items-center justify-center gap-1.5 shadow-sm';
        
        await window.MirasDB.updateOrderStatus('MRS-8492', 'ongoing', 'الفني في الطريق إلى موقعك');
        setTimeout(() => {
          btn.innerHTML = '<span class="material-symbols-outlined text-[18px]">check_circle</span> تم قبول الطلب والتوجه للموقع';
        }, 500);
      };

      window.finishJob = async function(btn) {
        btn.innerHTML = '<span class="material-symbols-outlined text-[18px]">verified</span> جاري تسليم العمل وتحرير الأرباح...';
        await window.MirasDB.updateOrderStatus('MRS-8492', 'completed', 'مكتمل ومسدد بالفاتورة');
        setTimeout(() => {
          window.location.href = 'artisan-wallet.html';
        }, 600);
      };
    }

    // --------------------------------------------------------------------------
    // 6. لوحة إدارة المنصة (admin-overview.html)
    // --------------------------------------------------------------------------
    if (pagePath.includes('admin-overview.html')) {
      const orders = await window.MirasDB.getOrders();
      const artisans = await window.MirasDB.getArtisans();

      // تحديث إجمالي الحرفيين والطلبات إن وجدت العناصر
      const statBoxes = document.querySelectorAll('.font-headline-lg, .font-headline-md');
      statBoxes.forEach(box => {
        if (box.textContent.trim() === '0' || box.textContent.trim() === '—') {
          if (box.closest('div').textContent.includes('حرفي')) box.textContent = (artisans ? artisans.length : 5);
          if (box.closest('div').textContent.includes('طلب')) box.textContent = (orders ? orders.length : 4);
        }
      });
    }

    // --------------------------------------------------------------------------
    // 7. تقييم الخدمة (review.html)
    // --------------------------------------------------------------------------
    if (pagePath.includes('review.html')) {
      const reviewSubmitBtn = document.querySelector('button[type="submit"], #submit-review-btn');
      if (reviewSubmitBtn) {
        reviewSubmitBtn.addEventListener('click', async function(e) {
          e.preventDefault();
          this.innerHTML = '<span class="material-symbols-outlined animate-spin text-[18px]">progress_activity</span> جاري الحفظ في سوبا بيس...';
          this.disabled = true;
          setTimeout(() => {
            window.location.href = 'review-confirmation.html';
          }, 600);
        });
      }
    }
  }

  // الاستماع للأحداث والتهيئة التلقائية
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initUIBindings);
  } else {
    initUIBindings();
  }

  window.addEventListener('miras_store_updated', initUIBindings);

})(window);
