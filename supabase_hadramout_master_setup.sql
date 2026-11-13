-- ==============================================================================
-- مِـرَاس (Miras Hadramout Artisan Network) — المخطط والبيانات الشاملة لسوبا بيس
-- Supabase Master Database Setup & Authentic Hadrami Seed Data
-- ==============================================================================
-- طريقة الاستخدام:
-- 1. افتح لوحة تحكم Supabase لمشروعك (dxutrykrxncuuyrtepgf):
--    https://supabase.com/dashboard/project/dxutrykrxncuuyrtepgf/sql/new
-- 2. الصق هذا الملف كاملاً في محرر SQL (SQL Editor)
-- 3. اضغط على زر "Run" (تشغيل)
-- ==============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ------------------------------------------------------------------------------
-- 1. جدول الملفات الشخصية والحسابات (Profiles)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    phone_number TEXT UNIQUE,
    role TEXT NOT NULL DEFAULT 'client' CHECK (role IN ('client', 'craftsman', 'admin', 'super_admin')),
    is_super_admin BOOLEAN NOT NULL DEFAULT FALSE,
    country TEXT NOT NULL DEFAULT 'Yemen',
    is_admin BOOLEAN NOT NULL DEFAULT FALSE,
    avatar_url TEXT,
    city TEXT DEFAULT 'المكلا',
    national_id_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ضمان وجود كافة الأعمدة في حال تم إنشاء الجدول مسبقاً
ALTER TABLE public.profiles 
    ADD COLUMN IF NOT EXISTS role TEXT NOT NULL DEFAULT 'client' CHECK (role IN ('client', 'craftsman', 'admin', 'super_admin')),
    ADD COLUMN IF NOT EXISTS is_super_admin BOOLEAN NOT NULL DEFAULT FALSE,
    ADD COLUMN IF NOT EXISTS country TEXT NOT NULL DEFAULT 'Yemen',
    ADD COLUMN IF NOT EXISTS is_admin BOOLEAN NOT NULL DEFAULT FALSE,
    ADD COLUMN IF NOT EXISTS phone_number TEXT UNIQUE,
    ADD COLUMN IF NOT EXISTS city TEXT DEFAULT 'المكلا',
    ADD COLUMN IF NOT EXISTS national_id_verified BOOLEAN DEFAULT FALSE,
    ADD COLUMN IF NOT EXISTS avatar_url TEXT,
    ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- ------------------------------------------------------------------------------
-- 2. جدول بيانات وتراخيص الحرفيين وأصحاب المهن (Craftsmen Profiles)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.craftsmen_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    trade_category TEXT NOT NULL,
    experience_years INT DEFAULT 1,
    commercial_register TEXT,
    is_available BOOLEAN DEFAULT TRUE,
    rating NUMERIC(3, 2) DEFAULT 5.00,
    total_reviews INT DEFAULT 0,
    completed_orders INT DEFAULT 0,
    active_orders_count INT DEFAULT 0,
    verification_status TEXT DEFAULT 'verified' CHECK (verification_status IN ('pending', 'verified', 'rejected')),
    bio TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.craftsmen_profiles
    ADD COLUMN IF NOT EXISTS bio TEXT,
    ADD COLUMN IF NOT EXISTS verification_status TEXT DEFAULT 'verified';

-- ------------------------------------------------------------------------------
-- 3. جدول تصنيفات المهن والتخصصات (Trade Categories)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.trade_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    icon TEXT NOT NULL DEFAULT 'handyman',
    description TEXT,
    active_pros_count INT DEFAULT 0,
    is_featured BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 4. جدول الخدمات المباشرة المعروضة من الحرفيين (Craftsman Services)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.craftsman_services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    craftsman_id UUID NOT NULL REFERENCES public.craftsmen_profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    price NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    duration_hours INT DEFAULT 1,
    category TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 5. جدول المحافظ المالية والضمان (Escrow Wallets)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.escrow_wallets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    balance NUMERIC(12, 2) DEFAULT 0.00,
    escrow_held NUMERIC(12, 2) DEFAULT 0.00,
    total_earned NUMERIC(12, 2) DEFAULT 0.00,
    total_withdrawn NUMERIC(12, 2) DEFAULT 0.00,
    iban TEXT,
    bank_name TEXT DEFAULT 'بنك الكريمي للتمويل الأصغر الإسلامي',
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 6. جدول طلبات العمل والخدمات (Service Orders)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.service_orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_number TEXT UNIQUE,
    client_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    craftsman_id UUID REFERENCES public.craftsmen_profiles(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    trade_category TEXT NOT NULL,
    description TEXT,
    city TEXT NOT NULL DEFAULT 'المكلا',
    location_details TEXT,
    scheduled_date TEXT,
    estimated_budget NUMERIC(10, 2),
    final_amount NUMERIC(10, 2),
    status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'bidding', 'in_progress', 'completed', 'cancelled')),
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 7. جدول عروض الأسعار والمناقصات (Bids)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.bids (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES public.service_orders(id) ON DELETE CASCADE,
    craftsman_id UUID NOT NULL REFERENCES public.craftsmen_profiles(id) ON DELETE CASCADE,
    bid_amount NUMERIC(10, 2) NOT NULL,
    execution_days INT NOT NULL DEFAULT 1,
    proposal_notes TEXT,
    status TEXT NOT NULL DEFAULT 'submitted' CHECK (status IN ('submitted', 'accepted', 'rejected')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 8. جدول التقييمات والآراء (Reviews)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES public.service_orders(id) ON DELETE SET NULL,
    client_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    craftsman_id UUID NOT NULL REFERENCES public.craftsmen_profiles(id) ON DELETE CASCADE,
    rating NUMERIC(2, 1) NOT NULL CHECK (rating >= 1.0 AND rating <= 5.0),
    comment TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 9. جدول الإشعارات (Notifications)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT NOT NULL DEFAULT 'info' CHECK (type IN ('info', 'order', 'bid', 'payment', 'system')),
    link TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 10. جدول سجل حركات الضمان المالي (Escrow Transactions)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.escrow_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    wallet_id UUID NOT NULL REFERENCES public.escrow_wallets(id) ON DELETE CASCADE,
    order_id UUID REFERENCES public.service_orders(id) ON DELETE SET NULL,
    amount NUMERIC(10, 2) NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('deposit', 'escrow_lock', 'escrow_release', 'withdrawal', 'platform_fee')),
    status TEXT NOT NULL DEFAULT 'completed' CHECK (status IN ('pending', 'completed', 'failed')),
    title TEXT,
    reference_code TEXT UNIQUE DEFAULT ('TX-' || UPPER(SUBSTRING(MD5(RANDOM()::TEXT) FROM 1 FOR 8))),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 11. جدول إعدادات المنصة المركزية (System Settings)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.system_settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    description TEXT,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 12. الفهارس لتسريع الأداء (Indexes)
-- ------------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);
CREATE INDEX IF NOT EXISTS idx_craftsmen_user_id ON public.craftsmen_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_services_craftsman_id ON public.craftsman_services(craftsman_id);
CREATE INDEX IF NOT EXISTS idx_orders_client_id ON public.service_orders(client_id);
CREATE INDEX IF NOT EXISTS idx_orders_craftsman_id ON public.service_orders(craftsman_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.service_orders(status);
CREATE INDEX IF NOT EXISTS idx_bids_order_id ON public.bids(order_id);
CREATE INDEX IF NOT EXISTS idx_reviews_craftsman_id ON public.reviews(craftsman_id);
CREATE INDEX IF NOT EXISTS idx_transactions_wallet_id ON public.escrow_transactions(wallet_id);

-- ------------------------------------------------------------------------------
-- 13. سياسات الأمان المتوازنة (RLS Policies)
-- تتيح القراءة العامة وإجراء الحجوزات والتجارب بدون عوائق
-- ------------------------------------------------------------------------------
ALTER TABLE public.trade_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.craftsman_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.craftsmen_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bids ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.escrow_wallets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.escrow_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_settings ENABLE ROW LEVEL SECURITY;

-- تنظيف السياسات القديمة
DO $$
BEGIN
    DROP POLICY IF EXISTS "Public view categories" ON public.trade_categories;
    DROP POLICY IF EXISTS "Public view services" ON public.craftsman_services;
    DROP POLICY IF EXISTS "Public insert services" ON public.craftsman_services;
    DROP POLICY IF EXISTS "Public view reviews" ON public.reviews;
    DROP POLICY IF EXISTS "Public insert reviews" ON public.reviews;
    DROP POLICY IF EXISTS "Public view profiles" ON public.profiles;
    DROP POLICY IF EXISTS "Public update profiles" ON public.profiles;
    DROP POLICY IF EXISTS "Public view craftsmen" ON public.craftsmen_profiles;
    DROP POLICY IF EXISTS "Public update craftsmen" ON public.craftsmen_profiles;
    DROP POLICY IF EXISTS "Public view orders" ON public.service_orders;
    DROP POLICY IF EXISTS "Public insert orders" ON public.service_orders;
    DROP POLICY IF EXISTS "Public update orders" ON public.service_orders;
    DROP POLICY IF EXISTS "Public view bids" ON public.bids;
    DROP POLICY IF EXISTS "Public insert bids" ON public.bids;
    DROP POLICY IF EXISTS "Public view wallets" ON public.escrow_wallets;
    DROP POLICY IF EXISTS "Public update wallets" ON public.escrow_wallets;
    DROP POLICY IF EXISTS "Public view transactions" ON public.escrow_transactions;
    DROP POLICY IF EXISTS "Public insert transactions" ON public.escrow_transactions;
    DROP POLICY IF EXISTS "Public view settings" ON public.system_settings;
    DROP POLICY IF EXISTS "Public manage settings" ON public.system_settings;
END $$;

-- إنشاء سياسات مفتوحة للقراءة مع إمكانية التفاعل في وضع التجربة
CREATE POLICY "Public view categories" ON public.trade_categories FOR SELECT TO public USING (TRUE);
CREATE POLICY "Public view services" ON public.craftsman_services FOR SELECT TO public USING (TRUE);
CREATE POLICY "Public insert services" ON public.craftsman_services FOR ALL TO public USING (TRUE) WITH CHECK (TRUE);

CREATE POLICY "Public view reviews" ON public.reviews FOR SELECT TO public USING (TRUE);
CREATE POLICY "Public insert reviews" ON public.reviews FOR INSERT TO public WITH CHECK (TRUE);

CREATE POLICY "Public view profiles" ON public.profiles FOR SELECT TO public USING (TRUE);
CREATE POLICY "Public update profiles" ON public.profiles FOR ALL TO public USING (TRUE) WITH CHECK (TRUE);

CREATE POLICY "Public view craftsmen" ON public.craftsmen_profiles FOR SELECT TO public USING (TRUE);
CREATE POLICY "Public update craftsmen" ON public.craftsmen_profiles FOR ALL TO public USING (TRUE) WITH CHECK (TRUE);

CREATE POLICY "Public view orders" ON public.service_orders FOR SELECT TO public USING (TRUE);
CREATE POLICY "Public insert orders" ON public.service_orders FOR INSERT TO public WITH CHECK (TRUE);
CREATE POLICY "Public update orders" ON public.service_orders FOR UPDATE TO public USING (TRUE) WITH CHECK (TRUE);

CREATE POLICY "Public view bids" ON public.bids FOR SELECT TO public USING (TRUE);
CREATE POLICY "Public insert bids" ON public.bids FOR ALL TO public USING (TRUE) WITH CHECK (TRUE);

CREATE POLICY "Public view wallets" ON public.escrow_wallets FOR SELECT TO public USING (TRUE);
CREATE POLICY "Public update wallets" ON public.escrow_wallets FOR ALL TO public USING (TRUE) WITH CHECK (TRUE);

CREATE POLICY "Public view transactions" ON public.escrow_transactions FOR SELECT TO public USING (TRUE);
CREATE POLICY "Public insert transactions" ON public.escrow_transactions FOR ALL TO public USING (TRUE) WITH CHECK (TRUE);

CREATE POLICY "Public view settings" ON public.system_settings FOR SELECT TO public USING (TRUE);
CREATE POLICY "Public manage settings" ON public.system_settings FOR ALL TO public USING (TRUE) WITH CHECK (TRUE);

-- ------------------------------------------------------------------------------
-- 14. التريجر التلقائي لإنشاء الملف الشخصي والمحفظة (handle_new_user)
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER 
LANGUAGE plpgsql 
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    user_email TEXT;
    raw_role TEXT;
    safe_role TEXT;
    is_owner BOOLEAN := FALSE;
    u_name TEXT;
    u_phone TEXT;
    u_city TEXT;
    u_trade TEXT;
BEGIN
    user_email := LOWER(COALESCE(NEW.email, ''));
    raw_role := LOWER(COALESCE(NEW.raw_user_meta_data->>'role', 'client'));

    IF user_email = 'safyhassan2004@gmail.com' THEN
        is_owner := TRUE;
        safe_role := 'super_admin';
        u_name := COALESCE(NEW.raw_user_meta_data->>'full_name', 'مالكة المنصة (Super Admin)');
        u_phone := '+967781125928';
        u_city := 'المكلا - حضرموت';
    ELSE
        IF raw_role = 'admin' OR raw_role = 'super_admin' THEN
            safe_role := 'client';
        ELSIF raw_role = 'craftsman' OR raw_role = 'pro' THEN
            safe_role := 'craftsman';
        ELSE
            safe_role := 'client';
        END IF;

        u_name := COALESCE(NEW.raw_user_meta_data->>'full_name', 'مستخدم مِـرَاس');
        u_phone := COALESCE(NEW.raw_user_meta_data->>'phone_number', '+967770000000');
        u_city := COALESCE(NEW.raw_user_meta_data->>'city', 'المكلا');
    END IF;

    u_trade := COALESCE(NEW.raw_user_meta_data->>'trade_category', 'النجارة والديكور الخشبي');

    -- إضافة أو تحديث الملف الشخصي
    INSERT INTO public.profiles (
        id, full_name, phone_number, role, is_admin, is_super_admin, city, country, national_id_verified, updated_at
    ) VALUES (
        NEW.id, u_name, u_phone, safe_role, is_owner, is_owner, u_city, 'Yemen', is_owner, NOW()
    ) ON CONFLICT (id) DO UPDATE SET
        role = EXCLUDED.role,
        is_admin = EXCLUDED.is_admin,
        is_super_admin = EXCLUDED.is_super_admin,
        city = EXCLUDED.city,
        updated_at = NOW();

    -- محفظة الضمان
    INSERT INTO public.escrow_wallets (user_id, balance, escrow_held)
    VALUES (NEW.id, 0.00, 0.00)
    ON CONFLICT (user_id) DO NOTHING;

    -- إذا كان حرفياً
    IF safe_role = 'craftsman' THEN
        INSERT INTO public.craftsmen_profiles (
            user_id, trade_category, verification_status, is_available, rating, experience_years
        ) VALUES (
            NEW.id, u_trade, 'verified', TRUE, 5.00, 5
        ) ON CONFLICT (user_id) DO NOTHING;
    END IF;

    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ------------------------------------------------------------------------------
-- 15. تأكيد جميع البرد المسجلة فوراً (حل مشكلة email_not_confirmed)
-- ------------------------------------------------------------------------------
UPDATE auth.users 
SET email_confirmed_at = NOW(), confirmed_at = NOW() 
WHERE email_confirmed_at IS NULL;

-- ------------------------------------------------------------------------------
-- 16. زراعة الحسابات الأساسية في auth.users مباشرة بكلمة مرور Password123!
-- ------------------------------------------------------------------------------
-- معرفات ثابتة للحسابات لضمان تكامل المفاتيح الأجنبية
DO $$
DECLARE
    pwd_hash TEXT := crypt('Password123!', gen_salt('bf'));
    
    uid_admin UUID := '00000000-0000-0000-0000-000000000001';
    uid_awad UUID  := '00000000-0000-0000-0000-000000000002';
    uid_salem UUID := '00000000-0000-0000-0000-000000000003';
    uid_omar UUID  := '00000000-0000-0000-0000-000000000004';
    uid_ahmed UUID := '00000000-0000-0000-0000-000000000005';
    uid_mokh UUID  := '00000000-0000-0000-0000-000000000006';
    uid_client UUID:= '00000000-0000-0000-0000-000000000007';

    cid_awad UUID  := '10000000-0000-0000-0000-000000000002';
    cid_salem UUID := '10000000-0000-0000-0000-000000000003';
    cid_omar UUID  := '10000000-0000-0000-0000-000000000004';
    cid_ahmed UUID := '10000000-0000-0000-0000-000000000005';
    cid_mokh UUID  := '10000000-0000-0000-0000-000000000006';

    oid_1 UUID := '20000000-0000-0000-0000-000000000001';
    oid_2 UUID := '20000000-0000-0000-0000-000000000002';
    oid_3 UUID := '20000000-0000-0000-0000-000000000003';
    oid_4 UUID := '20000000-0000-0000-0000-000000000004';

BEGIN
    -- 1. إضافة المستخدمين في auth.users
    INSERT INTO auth.users (
        instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
    ) VALUES
    ('00000000-0000-0000-0000-000000000000', uid_admin, 'authenticated', 'authenticated', 'safyhassan2004@gmail.com', pwd_hash, NOW(), '{"provider":"email","providers":["email"]}', '{"full_name":"مالكة المنصة (Super Admin)","role":"super_admin","city":"المكلا"}', NOW(), NOW()),
    ('00000000-0000-0000-0000-000000000000', uid_awad, 'authenticated', 'authenticated', 'artisan.awad@miras.ye', pwd_hash, NOW(), '{"provider":"email","providers":["email"]}', '{"full_name":"المعلم عوض بن حريز","role":"craftsman","city":"المكلا - حارة باسويد"}', NOW(), NOW()),
    ('00000000-0000-0000-0000-000000000000', uid_salem, 'authenticated', 'authenticated', 'artisan.salem@miras.ye', pwd_hash, NOW(), '{"provider":"email","providers":["email"]}', '{"full_name":"المعلم سالم سعيد بارباع","role":"craftsman","city":"الشحر - حي الخور"}', NOW(), NOW()),
    ('00000000-0000-0000-0000-000000000000', uid_omar, 'authenticated', 'authenticated', 'artisan.omar@miras.ye', pwd_hash, NOW(), '{"provider":"email","providers":["email"]}', '{"full_name":"المهندس عمر سالم التميمي","role":"craftsman","city":"سيئون - حي السحيل"}', NOW(), NOW()),
    ('00000000-0000-0000-0000-000000000000', uid_ahmed, 'authenticated', 'authenticated', 'artisan.ahmed@miras.ye', pwd_hash, NOW(), '{"provider":"email","providers":["email"]}', '{"full_name":"المعلم أحمد بن عبيدالله التريمي","role":"craftsman","city":"تريم - حي الخليف"}', NOW(), NOW()),
    ('00000000-0000-0000-0000-000000000000', uid_mokh, 'authenticated', 'authenticated', 'artisan.mokh@miras.ye', pwd_hash, NOW(), '{"provider":"email","providers":["email"]}', '{"full_name":"المعلم سعيد بن مخاشن","role":"craftsman","city":"المكلا - حي فُوّة"}', NOW(), NOW()),
    ('00000000-0000-0000-0000-000000000000', uid_client, 'authenticated', 'authenticated', 'client.abdullah@miras.ye', pwd_hash, NOW(), '{"provider":"email","providers":["email"]}', '{"full_name":"عبدالله بن محفوظ","role":"client","city":"المكلا - الديس"}', NOW(), NOW())
    ON CONFLICT (id) DO UPDATE SET
        encrypted_password = EXCLUDED.encrypted_password,
        email_confirmed_at = NOW();

    -- 2. إدخال وتحديث الملفات الشخصية
    INSERT INTO public.profiles (id, full_name, phone_number, role, is_admin, is_super_admin, city, country, national_id_verified, avatar_url)
    VALUES
    (uid_admin, 'مالكة المنصة (Super Admin)', '+967781125928', 'super_admin', TRUE, TRUE, 'المكلا - حضرموت', 'Yemen', TRUE, 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'),
    (uid_awad, 'المعلم عوض بن حريز', '+967770112233', 'craftsman', FALSE, FALSE, 'المكلا - حارة باسويد', 'Yemen', TRUE, 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'),
    (uid_salem, 'المعلم سالم سعيد بارباع', '+967771234567', 'craftsman', FALSE, FALSE, 'الشحر - حي الخور', 'Yemen', TRUE, 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150'),
    (uid_omar, 'المهندس عمر سالم التميمي', '+967772345678', 'craftsman', FALSE, FALSE, 'سيئون - حي السحيل', 'Yemen', TRUE, 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'),
    (uid_ahmed, 'المعلم أحمد بن عبيدالله التريمي', '+967773456789', 'craftsman', FALSE, FALSE, 'تريم - حي الخليف', 'Yemen', TRUE, 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150'),
    (uid_mokh, 'المعلم سعيد بن مخاشن', '+967774567890', 'craftsman', FALSE, FALSE, 'المكلا - حي فُوّة', 'Yemen', TRUE, 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150'),
    (uid_client, 'عبدالله بن محفوظ', '+967775678901', 'client', FALSE, FALSE, 'المكلا - حي الديس', 'Yemen', TRUE, 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150')
    ON CONFLICT (id) DO UPDATE SET
        full_name = EXCLUDED.full_name,
        role = EXCLUDED.role,
        is_admin = EXCLUDED.is_admin,
        is_super_admin = EXCLUDED.is_super_admin,
        city = EXCLUDED.city,
        avatar_url = EXCLUDED.avatar_url;

    -- 3. إدخال بيانات الكوادر الحرفية المعتمدة
    INSERT INTO public.craftsmen_profiles (id, user_id, trade_category, experience_years, is_available, rating, total_reviews, completed_orders, active_orders_count, verification_status, bio)
    VALUES
    (cid_awad, uid_awad, 'النجارة والديكور الخشبي', 18, TRUE, 4.95, 38, 142, 2, 'verified', 'خبير في النقوش الحضرمية الإسلامية، أبواب السدر والتريمية، والشبابيك الخشبية التراثية.'),
    (cid_salem, uid_salem, 'السباكة والشبكات المائية', 12, TRUE, 4.90, 46, 185, 1, 'verified', 'متخصص تأسيس شبكات المياه، صيانة الفلاتر، وتمديدات الصرف الصحي وكشف التسربات.'),
    (cid_omar, uid_omar, 'أعمال الكهرباء والتمديدات', 9, TRUE, 4.88, 29, 98, 3, 'verified', 'مهندس تمديدات كهربائية منزلية وتأسيس أنظمة الطاقة الشمسية الهجينة والإنارة الذكية.'),
    (cid_ahmed, uid_ahmed, 'المقاولات العامة والترميم', 22, TRUE, 5.00, 52, 210, 1, 'verified', 'معلم مقاولات وتلييس نورة وقضاض حضرمي أصيل، ترميم مباني الطين والملاحق التراثية.'),
    (cid_mokh, uid_mokh, 'التكييف والتبريد المعتمد', 14, TRUE, 4.92, 64, 230, 2, 'verified', 'فني أول صيانة وتركيب مكيفات سبلت ومركزية وتعبئة غاز فريون أمريكي أصلي مع الضمان.')
    ON CONFLICT (id) DO UPDATE SET
        rating = EXCLUDED.rating,
        total_reviews = EXCLUDED.total_reviews,
        completed_orders = EXCLUDED.completed_orders,
        verification_status = 'verified';

    -- 4. إدخال المحافظ المالية
    INSERT INTO public.escrow_wallets (user_id, balance, escrow_held, total_earned, total_withdrawn, bank_name)
    VALUES
    (uid_awad, 185000.00, 45000.00, 720000.00, 535000.00, 'بنك الكريمي للتمويل الأصغر الإسلامي'),
    (uid_salem, 95000.00, 20000.00, 410000.00, 315000.00, 'بنك التضامن الإسلامي'),
    (uid_omar, 140000.00, 35000.00, 580000.00, 440000.00, 'بنك الكريمي للتمويل الأصغر الإسلامي'),
    (uid_ahmed, 310000.00, 80000.00, 1250000.00, 940000.00, 'بنك القطيبي الإسلامي'),
    (uid_mokh, 220000.00, 50000.00, 890000.00, 670000.00, 'بنك الكريمي للتمويل الأصغر الإسلامي'),
    (uid_client, 0.00, 0.00, 0.00, 0.00, 'بنك الكريمي للتمويل الأصغر الإسلامي')
    ON CONFLICT (user_id) DO UPDATE SET
        balance = EXCLUDED.balance,
        escrow_held = EXCLUDED.escrow_held;

    -- 5. إدخال عروض الخدمات المعروضة
    INSERT INTO public.craftsman_services (craftsman_id, title, description, price, duration_hours, category, is_active)
    VALUES
    (cid_awad, 'صناعة ونقش باب خشب سدر حضرمي تراثي', 'تفصيل خشب سدر طبيعي مع نقش تريمي يدوي وحلق حديد نحاسي أصلي', 65000, 24, 'النجارة والديكور الخشبي', TRUE),
    (cid_awad, 'صيانة وترميم الأثاث الخشبي والمشربيات', 'إعادة صنفرة وتلميع وصبغ الأخشاب التراثية والمشربيات الحضرمية', 25000, 6, 'النجارة والديكور الخشبي', TRUE),
    (cid_salem, 'كشف وإصلاح تسربات المياه وشبكة الضخ', 'فحص شبكة المياه بأجهزة إلكترونية وتغيير المحابس والوصلات التالفة', 18000, 3, 'السباكة والشبكات المائية', TRUE),
    (cid_salem, 'تأسيس شبكة تغذية وصرف متكاملة لحمام أو مطبخ', 'تركيب أنابيب حرارية إيطالية مع اختبار الضغط لمدة 24 ساعة', 35000, 12, 'السباكة والشبكات المائية', TRUE),
    (cid_omar, 'تركيب وبرمجة منظومة طاقة شمسية هجينة', 'تركيب ألواح مونو كريستال، إنفرتر ذكي، وتوصيل بنك البطاريات مع الحماية', 55000, 8, 'أعمال الكهرباء والتمديدات', TRUE),
    (cid_omar, 'تأسيس قواطع وشبكة إنارة مخفية LED', 'تمديد أسلاك سويدي أصلية وتركيب لوحات التوزيع الذكية والقواطع', 28000, 5, 'أعمال الكهرباء والتمديدات', TRUE),
    (cid_ahmed, 'أعمال تلييس نورة حضرمية بيضاء مقاومة للرطوبة', 'تنفيذ خلطة النورة الحضرمية التقليدية للغرف والأسطح لعزل الرطوبة والحرارة', 40000, 16, 'المقاولات العامة والترميم', TRUE),
    (cid_mokh, 'غسيل وصيانة مكيف سبلت وتعبئة فريون R410', 'تنظيف الفلاتر والمبخر بمضخة ضغط عالي، كشف تسريب الغاز، وتعبئة فريون أمريكي', 18000, 2, 'التكييف والتبريد المعتمد', TRUE)
    ON CONFLICT DO NOTHING;

    -- 6. إدخال طلبات حية في النظام (Orders)
    INSERT INTO public.service_orders (id, order_number, client_id, craftsman_id, title, trade_category, description, city, location_details, scheduled_date, estimated_budget, final_amount, status, notes)
    VALUES
    (oid_1, 'MRS-8492', uid_client, cid_mokh, 'صيانة مكيف سبلت وتعبئة فريون أصلي', 'التكييف والتبريد المعتمد', 'المكيف ينقط ماء داخل الغرفة والتبريد ضعيف جداً مع صوت صفير عند التشغيل.', 'المكلا', 'حي فُوّة - مساكن المتضررين شقة 4', 'اليوم، خلال ساعة واحدة', 18000.00, 18000.00, 'in_progress', 'الفني في الطريق إلى الموقع وتم تجميد المبلغ في الضمان'),
    (oid_2, 'MRS-8491', uid_client, cid_salem, 'كشف تسريب سباكة وإصلاح شبكة الضخ', 'السباكة والشبكات المائية', 'يوجد تسريب تحت المغسلة والمضخة تفصل باستمرار وتحتاج فحص كهربائي ومائي.', 'المكلا', 'حي الشرج - بالقرب من سوق السمك', 'أمس، تم التنفيذ', 12000.00, 12000.00, 'completed', 'تم استلام العمل وتحرير الضمان المالي للفني بنجاح'),
    (oid_3, 'MRS-8490', uid_client, cid_awad, 'تفصيل باب مجلس خشب سدر بنقش إسلامي', 'النجارة والديكور الخشبي', 'نرغب في تفصيل باب رئيسي لمجلس الضيوف بأبعاد 2.2م × 1.2م مع نقش تريمي وزخارف مذهبة.', 'المكلا', 'حي الديس - خلف مدرسة الجماهير', 'الأسبوع القادم', 65000.00, 65000.00, 'open', 'بانتظار معاينة المقاسات واعتماد العرض'),
    (oid_4, 'MRS-8489', uid_client, cid_omar, 'تركيب إنفرتر طاقة شمسية 3.5 كيلو وات', 'أعمال الكهرباء والتمديدات', 'شراء وتركيب إنفرتر شمسي مع ربط القواطع الكهربائية بنظام النقل التلقائي ATS.', 'سيئون', 'حي السحيل - بجانب جامع الرياض', '3 أيام مضت', 45000.00, 45000.00, 'completed', 'تمت المعاينة والتشغيل بنجاح والعميل راضٍ جداً')
    ON CONFLICT (id) DO UPDATE SET
        status = EXCLUDED.status,
        final_amount = EXCLUDED.final_amount;

    -- 7. إدخال التقييمات الواقعية
    INSERT INTO public.reviews (order_id, client_id, craftsman_id, rating, comment)
    VALUES
    (oid_2, uid_client, cid_salem, 5.0, 'ما شاء الله تبارك الله، المعلم سالم قمة في الأخلاق والالتزام بالمواعيد، وحل مشكلة التسريب في أقل من نصف ساعة.'),
    (oid_4, uid_client, cid_omar, 4.9, 'المهندس عمر متمكن جداً في تمديدات الطاقة الشمسية وتركيب الإنفيرتر، عمله متقن ونظيف جداً.')
    ON CONFLICT DO NOTHING;

    -- 8. حركات الضمان المالي للمحفظة
    INSERT INTO public.escrow_transactions (wallet_id, order_id, amount, type, status, title, reference_code)
    VALUES
    ((SELECT id FROM public.escrow_wallets WHERE user_id = uid_mokh), oid_1, 18000.00, 'escrow_lock', 'completed', 'حجز ضمان طلب صيانة سبلت #MRS-8492', 'TX-8492-LCK'),
    ((SELECT id FROM public.escrow_wallets WHERE user_id = uid_salem), oid_2, 12000.00, 'escrow_release', 'completed', 'تحرير أتعاب طلب سباكة #MRS-8491 لحساب الحرفي', 'TX-8491-REL')
    ON CONFLICT (reference_code) DO NOTHING;

END $$;

-- ------------------------------------------------------------------------------
-- 17. إعدادات المنصة المركزية (System Settings)
-- ------------------------------------------------------------------------------
INSERT INTO public.system_settings (key, value, description)
VALUES 
    ('platform_country', '{"code": "YE", "name_ar": "الجمهورية اليمنية", "name_en": "Yemen", "dial_code": "+967"}'::jsonb, 'الدولة الافتراضية ومفتاح الاتصال الدولي'),
    ('platform_currency', '{"code": "YER", "symbol_ar": "ر.ي", "symbol_en": "YER", "name_ar": "ريال يمني"}'::jsonb, 'العملة الرسمية لعرض الأسعار والضمان المالي'),
    ('platform_owner', '{"email": "safyhassan2004@gmail.com", "phone": "+967781125928", "role": "Super Admin", "name": "مالكة المنصة"}'::jsonb, 'بيانات حساب مالكة المنصة والإدارة العليا'),
    ('platform_commission', '{"percentage": 5.0, "vat_percentage": 0.0}'::jsonb, 'عمولة منصة مِـرَاس للوساطة والضمان المالي')
ON CONFLICT (key) DO UPDATE SET
    value = EXCLUDED.value,
    description = EXCLUDED.description,
    updated_at = NOW();

-- ==============================================================================
-- تم بحمد الله اكتمال تجهيز قاعدة بيانات مِـرَاس وسجلاتها بنجاح!
-- ==============================================================================
