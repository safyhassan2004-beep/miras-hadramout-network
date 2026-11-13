# منصة مِراس - شبكة المهن والخدمات الحضرمية
> **Miras Hadramout Services Marketplace Platform**  
> المشروع المستخرج والمطور من Stitch MCP مع تصحيح كافة الأخطاء والربط الكامل وإكمال الصفحات الناقصة وفصل البوابات.

---

## 🏛️ معمارية المنصة وفصل البوابات الثلاث

تمت إعادة هيكلة المنصة بالكامل لتصبح **3 بوابات مستقلة ومنفصلة** مع شريط تنقل وتبديل سريع عائم في الزاوية العلوية (`Portal Switcher Widget`):

### 1. بوابة العميل (Client Portal)
البوابة المخصصة للمستخدمين للبحث عن الحرفيين، حجز الخدمات، متابعة الطلبات، والمحادثة:
- [index.html](file:///c:/Users/TYC/اخر%20شي/index.html) - الصفحة الرئيسية واستعراض التصنيفات وأصحاب المهن الموثقين.
- [explore.html](file:///c:/Users/TYC/اخر%20شي/explore.html) - استكشاف المهن والبحث المتقدم حسب المدن (المكلا، سيئون، تريم، الشحر، دوعن).
- [service-details.html](file:///c:/Users/TYC/اخر%20شي/service-details.html) - تفاصيل الباقة والخدمة (مثل صيانة التكييف) وضمان مِراس.
- [artisan-profile.html](file:///c:/Users/TYC/اخر%20شي/artisan-profile.html) - الملف التعريفي للمهني وسجل الخبرة والتقييمات وأسعار المعاينة.
- [book-service.html](file:///c:/Users/TYC/اخر%20شي/book-service.html) - نموذج طلب وحجز الخدمة وتحديد الموقع والوقت.
- [client-orders.html](file:///c:/Users/TYC/اخر%20شي/client-orders.html) - إدارة ومتابعة الطلبات الجارية والمكتملة.
- [order-details.html](file:///c:/Users/TYC/اخر%20شي/order-details.html) - تفاصيل السند المالي، الفاتورة الرقمية، وحالة الفني الميداني.
- [chat.html](file:///c:/Users/TYC/اخر%20شي/chat.html) - المحادثة الفورية التفاعلية مع الفني مع إرسال الرسائل والردود التلقائية.
- [review.html](file:///c:/Users/TYC/اخر%20شي/review.html) - تقييم الخدمة والمهني بالنجوم والوسوم والإكرامية.
- [review-confirmation.html](file:///c:/Users/TYC/اخر%20شي/review-confirmation.html) - شكر وتأكيد نشر التقييم.
- [favorites.html](file:///c:/Users/TYC/اخر%20شي/favorites.html) - قائمة الحرفيين والخدمات المفضلة.
- [client-profile.html](file:///c:/Users/TYC/اخر%20شي/client-profile.html) - الملف الشخصي وإعدادات العميل وروابط التحويل للبوابات.
- [support.html](file:///c:/Users/TYC/اخر%20شي/support.html) - غرفة عمليات ودعم مِراس الميداني في حضرموت.

---

### 2. بوابة أصحاب المهن والحرف (Artisan Portal)
لوحة تحكم وتطبيق عمل خاص ومستقل بالكامل للمهنيين:
- [artisan-dashboard.html](file:///c:/Users/TYC/اخر%20شي/artisan-dashboard.html) - لوحة تحكم المهني، حالة التوفر (متاح / مشغول)، ونظرة عامة على الأداء.
- [artisan-orders.html](file:///c:/Users/TYC/اخر%20شي/artisan-orders.html) - إدارة طلبات العمل الواردة (قبول / اعتذار) والطلبات الجارية والتسليم.
- [artisan-wallet.html](file:///c:/Users/TYC/اخر%20شي/artisan-wallet.html) - محفظة الأرباح بالريال اليمني وطلبات السحب عبر الكريمي والعمقي.
- [artisan-portfolio.html](file:///c:/Users/TYC/اخر%20شي/artisan-portfolio.html) - معرض الأعمال، إضافة صور المشاريع، وتعديل تسعيرة الخدمات.

---

### 3. بوابة الإدارة المركزية (Admin Portal)
منطقة تحكم ومراقبة ميدانية معزولة ومحمية:
- [admin-login.html](file:///c:/Users/TYC/اخر%20شي/admin-login.html) - بوابة الدخول الأمنية للمشرفين والتحقق الثنائي.
- [admin-overview.html](file:///c:/Users/TYC/اخر%20شي/admin-overview.html) - النظرة العامة للعمليات والمؤشرات التشغيلية والمالية بحضرموت.
- [admin-artisans.html](file:///c:/Users/TYC/اخر%20شي/admin-artisans.html) - توثيق ومطابقة هويات ورخص الحرفيين واعتماد شارة (موثّق).
- [admin-orders.html](file:///c:/Users/TYC/اخر%20شي/admin-orders.html) - متابعة النزاعات، ضمان الجودة، والتدخل الميداني.
- [admin-settings.html](file:///c:/Users/TYC/اخر%20شي/admin-settings.html) - إعدادات النظام، التصنيفات، وسجل التدقيق والرقابة.

---

### 4. بوابات التسجيل والمصادقة (Authentication Flow)
- [login.html](file:///c:/Users/TYC/اخر%20شي/login.html) - صفحة تسجيل الدخول الموحدة مع محدد الدور (عميل / صاحب مهنة / إدارة).
- [auth-choose-role.html](file:///c:/Users/TYC/اخر%20شي/auth-choose-role.html) - اختيار نوع الحساب عند التسجيل الجديد.
- [register-client.html](file:///c:/Users/TYC/اخر%20شي/register-client.html) - نموذج تسجيل حساب عميل جديد.
- [register-artisan.html](file:///c:/Users/TYC/اخر%20شي/register-artisan.html) - نموذج تسجيل صاحب مهنة وتحديد التخصص والمنطقة.
- [verify-otp.html](file:///c:/Users/TYC/اخر%20شي/verify-otp.html) - التحقق عبر رمز SMS من 4 أرقام والتوجيه التلقائي للبوابة المخصصة.

---

## 🛠️ أبرز الإصلاحات التي تم تنفيذها:
1. **تصحيح العناوين والترجمات الإنجليزية الخاطئة**:
   - تم استبدال جميع العناوين الإنجليزية الثابتة مثل `Order Details`، `Pro Profile`، `Order Request`، `Craftsman Chat`، `Account Type Selection`، `Artisan Identity Verification` إلى نصوص عربية حضرمية أصيلة ومنسجمة.
2. **إصلاح الأزرار غير الفعالة وروابط `#` الميتة**:
   - أزرار الحجز في الشاشات أصبحت توجه فعلياً إلى `book-service.html`.
   - زر تأكيد الطلب أصبح يرسل وينقل المستخدم إلى `order-details.html`.
   - زر نشر التقييم ينقل مباشرة إلى صفحة الشكر `review-confirmation.html`.
   - أزرار شريط التنقل السفلي تم ربطها بملفات الصفحات الفعلية.
3. **فصل لوحة صاحب المهنة عن حساب العميل**:
   - تم إلغاء الربط الخاطئ الذي كان يضع لوحة صاحب المهنة داخل التبويب الخامس لحساب العميل، وأصبح لكل بوابة شريط تنقل علوي وسفلي خاص بها.
4. **تفعيل المحادثة التفاعلية**:
   - صفحة المحادثة أصبحت تستقبل الرسائل النصية المكتوبة وتضيفها للمحادثة مع رد آلي محاكي للفني.
5. **التحقق من سلامة كافة الروابط**:
   - تم فحص جميع الملفات والتأكد بنسبة 100% من عدم وجود أي رابط داخلي مكسور.

