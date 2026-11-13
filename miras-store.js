/**
 * Miras Hadramout Platform - Unified Reactive Data Store
 * Provides seamless synchronization between Client, Artisan, and Admin portals via localStorage.
 */

const MirasStore = (function() {
  const STORAGE_KEYS = {
    ORDERS: 'miras_orders',
    WALLET: 'miras_artisan_wallet',
    FAVORITES: 'miras_favorites',
    CHATS: 'miras_chat_messages',
    CURRENT_USER: 'miras_user_session',
    NOTIFICATIONS: 'miras_notifications'
  };

  // Initial Seed Data
  const defaultOrders = [
    {
      id: 'MRS-8492',
      serviceTitle: 'صيانة مكيف سبلت وتعبئة فريون أصلي',
      serviceCategory: 'cooling',
      clientName: 'سالم صالح باوزير',
      clientPhone: '+967 772 458 920',
      artisanName: 'المعلم سعيد بن مخاشن',
      artisanTitle: 'فني أول تكييف وتبريد',
      location: 'حضرموت، المكلا - حي فُوّة',
      price: 18000,
      currency: 'ر.ي',
      status: 'ongoing', // 'new', 'ongoing', 'completed', 'cancelled'
      statusLabel: 'الفني في الطريق إلى موقعك',
      createdAt: '2026-11-13 14:15',
      scheduledDate: 'اليوم، خلال ساعة واحدة',
      notes: 'المكيف ينقط ماء داخل الغرفة والتبريد ضعيف جداً مع صوت صفير.'
    },
    {
      id: 'MRS-8491',
      serviceTitle: 'كشف تسريب سباكة وإصلاح شبكة الضخ',
      serviceCategory: 'plumbing',
      clientName: 'سالم صالح باوزير',
      clientPhone: '+967 772 458 920',
      artisanName: 'المعلم سالم بارباع',
      artisanTitle: 'سباك معتمد وشبكات ضخ',
      location: 'المكلا - حي الشرج',
      price: 12000,
      currency: 'ر.ي',
      status: 'completed',
      statusLabel: 'مكتمل ومسدد بالفاتورة',
      createdAt: '2026-11-12 10:30',
      scheduledDate: 'أمس 11:00 ص',
      notes: 'تم فحص المضخة وتغيير المحبس الرئيسي بنجاح.'
    }
  ];

  const defaultWallet = {
    availableBalance: 185000,
    pendingBalance: 45000,
    totalWithdrawn: 320000,
    currency: 'ر.ي',
    transactions: [
      { id: 'TX-901', type: 'credit', title: 'إيداع أتعاب صيانة سبلت #MRS-8492', amount: 18000, date: 'أمس 04:30 م' },
      { id: 'TX-900', type: 'debit', title: 'سحب أرباح إلى حساب بنك الكريمي', amount: 70000, date: '10 مايو 2026' }
    ]
  };

  const defaultFavorites = [
    { id: 'artisan-1', name: 'المعلم عوض بن حريز', trade: 'معلم بناء وديكور حضرمي تقليدي', rating: 4.9, city: 'المكلا - الديس', price: '15,000 ر.ي' },
    { id: 'artisan-2', name: 'المعلم سعيد بن مخاشن', trade: 'فني أول تكييف وتبريد', rating: 4.9, city: 'المكلا - فُوّة', price: '18,000 ر.ي' },
    { id: 'artisan-3', name: 'المعلم سالم بارباع', trade: 'سباكة حديثة وشبكات ضخ مياه', rating: 5.0, city: 'الشحر - الخور', price: '12,000 ر.ي' }
  ];

  // Helper getters & setters
  function getJson(key, defaultVal) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : defaultVal;
    } catch (e) {
      return defaultVal;
    }
  }

  function setJson(key, val) {
    try {
      localStorage.setItem(key, JSON.stringify(val));
      window.dispatchEvent(new Event('miras_store_updated'));
    } catch (e) {
      console.error(e);
    }
  }

  // Initialize defaults if empty
  if (!localStorage.getItem(STORAGE_KEYS.ORDERS)) setJson(STORAGE_KEYS.ORDERS, defaultOrders);
  if (!localStorage.getItem(STORAGE_KEYS.WALLET)) setJson(STORAGE_KEYS.WALLET, defaultWallet);
  if (!localStorage.getItem(STORAGE_KEYS.FAVORITES)) setJson(STORAGE_KEYS.FAVORITES, defaultFavorites);

  return {
    // Orders
    getOrders: function() {
      return getJson(STORAGE_KEYS.ORDERS, defaultOrders);
    },
    getOrderById: function(id) {
      return this.getOrders().find(o => o.id === id) || this.getOrders()[0];
    },
    createOrder: function(orderData) {
      const orders = this.getOrders();
      const newId = 'MRS-' + Math.floor(1000 + Math.random() * 9000);
      const newOrder = {
        id: newId,
        serviceTitle: orderData.serviceTitle || 'طلب خدمة صيانة',
        serviceCategory: orderData.serviceCategory || 'general',
        clientName: orderData.clientName || 'سالم صالح باوزير',
        clientPhone: orderData.clientPhone || '+967 772 458 920',
        artisanName: orderData.artisanName || 'المعلم سعيد بن مخاشن',
        artisanTitle: orderData.artisanTitle || 'فني معتمد - مِراس',
        location: orderData.location || 'حضرموت، المكلا',
        price: orderData.price || 18000,
        currency: 'ر.ي',
        status: 'new',
        statusLabel: 'بانتظار قبول الفني',
        createdAt: new Date().toLocaleTimeString('ar-YE', { hour: '2-digit', minute: '2-digit' }),
        scheduledDate: orderData.scheduledDate || 'اليوم، أقرب وقت ممكن',
        notes: orderData.notes || 'طلب مباشر عبر منصة مِراس.'
      };
      orders.unshift(newOrder);
      setJson(STORAGE_KEYS.ORDERS, orders);
      return newOrder;
    },
    updateOrderStatus: function(id, newStatus, newLabel) {
      const orders = this.getOrders();
      const order = orders.find(o => o.id === id);
      if (order) {
        order.status = newStatus;
        if (newLabel) order.statusLabel = newLabel;
        if (newStatus === 'completed') {
          this.creditArtisanEarnings(order.price, `أرباح تنفيذ طلب #${order.id}`);
        }
        setJson(STORAGE_KEYS.ORDERS, orders);
      }
    },

    // Wallet
    getWallet: function() {
      return getJson(STORAGE_KEYS.WALLET, defaultWallet);
    },
    creditArtisanEarnings: function(amount, desc) {
      const wallet = this.getWallet();
      wallet.availableBalance += amount;
      wallet.transactions.unshift({
        id: 'TX-' + Math.floor(100 + Math.random() * 900),
        type: 'credit',
        title: desc || 'أتعاب خدمة منجزة',
        amount: amount,
        date: 'الآن'
      });
      setJson(STORAGE_KEYS.WALLET, wallet);
    },
    withdrawEarnings: function(amount) {
      const wallet = this.getWallet();
      if (wallet.availableBalance >= amount) {
        wallet.availableBalance -= amount;
        wallet.totalWithdrawn += amount;
        wallet.transactions.unshift({
          id: 'TX-' + Math.floor(100 + Math.random() * 900),
          type: 'debit',
          title: 'سحب أرباح إلى حساب الكريمي',
          amount: amount,
          date: 'الآن'
        });
        setJson(STORAGE_KEYS.WALLET, wallet);
        return true;
      }
      return false;
    },

    // Favorites
    getFavorites: function() {
      return getJson(STORAGE_KEYS.FAVORITES, defaultFavorites);
    },
    toggleFavorite: function(artisan) {
      let favs = this.getFavorites();
      const exists = favs.some(f => f.name === artisan.name);
      if (exists) {
        favs = favs.filter(f => f.name !== artisan.name);
      } else {
        favs.push(artisan);
      }
      setJson(STORAGE_KEYS.FAVORITES, favs);
      return !exists;
    },
    isFavorite: function(name) {
      return this.getFavorites().some(f => f.name === name);
    }
  };
})();

window.MirasStore = MirasStore;
