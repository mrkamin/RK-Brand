// =========================================================
// لینک مخفی ورود به پورتل
// =========================================================
const SECRET_PORTAL_HASH = '#rk-admin-7721';

// =========================================================
// داده‌های پیش‌فرض (همه از داخل پورتل قابل ویرایش هستند)
// =========================================================
const DEFAULT_PRODUCTS = [
    {
        id: 101,
        name: "پیراهن محفلی مخمل یاقوتی",
        category: "مجلسی و شب",
        aiCode: "AI-GOWN #01",
        priceUSD: 145,
        sizes: ["S", "M", "L", "دوخت سفارشی"],
        img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 102,
        name: "لباس شب لوکس ابریشم مشکی RK",
        category: "مجلسی و شب",
        aiCode: "AI-GOWN #02",
        priceUSD: 165,
        sizes: ["S", "M", "L", "XL"],
        img: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 103,
        name: "لباس نامزدی سلطنتی مروارید",
        category: "نامزدی و عروسی",
        aiCode: "AI-BRIDAL #03",
        priceUSD: 240,
        sizes: ["S", "M", "L", "دوخت سفارشی"],
        img: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 104,
        name: "پیراهن بلند افغان-مدرن طلایی",
        category: "افغان-مدرن AI",
        aiCode: "AI-FUSION #04",
        priceUSD: 185,
        sizes: ["S", "M", "L", "دوخت سفارشی"],
        img: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=600&q=80"
    }
];

const DEFAULT_CMS = {
    // لوگو و برند
    logo: "rk-logo.svg",
    brandName: "RK",
    brandSub: "AI COUTURE",
    topBanner: "✨ لباس‌های محفلی زنانه RK | طراحی با هوش مصنوعی • تولید افغانستان • ارسال به سراسر جهان 🌍",
    
    // بنر اصلی (Hero)
    heroBg: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1600&q=80",
    heroBadge: "✦ طراحی با هوش مصنوعی • دوخت افغانستان • ارسال به سراسر جهان",
    heroTitleMain: "لباس‌های محفلی ",
    heroTitleGold: "لوکس و تک‌نسخه RK",
    heroDesc: "لباس دلخواه خود را از کلکسیون ما انتخاب کنید و تنها با یک کلیک از طریق واتساپ یا تماس خطی با ما ارتباط بگیرید تا سایز، روش انتقال پول و ارسال به کشور شما را هماهنگ کنیم.",
    heroBtnPrimary: "مشاهده لباس‌های محفلی",
    heroBtnSecondary: "💬 ارتباط مستقیم در واتساپ",

    // ۳ کارت مراحل سفارش
    step1Title: "لباس خود را بپسندید",
    step1Desc: "از میان لباس‌های محفلی طراحی‌شده با هوش مصنوعی RK مدل مورد نظرتان را انتخاب کنید.",
    step2Title: "تماس در واتساپ یا شماره خطی",
    step2Desc: "با یک کلیک مشخصات لباس به واتساپ ما فرستاده می‌شود یا مستقیماً با شماره خطی تماس می‌گیرید.",
    step3Title: "هماهنگی پرداخت و ارسال جهانی",
    step3Desc: "سایز دقیق، روش انتقال پول و نحوه تسلیمی در افغانستان یا هر کشور جهان را با شما نهایی می‌کنیم.",

    // بخش محصولات
    productsEyebrow: "RK AI EVENING COLLECTION",
    productsTitle: "لباس‌های محفلی زنانه",
    productsSub: "روی هر لباس کلیک کنید تا مستقیم از طریق واتساپ یا تماس سفارش دهید",

    // بخش تماس و فوتر
    contactTitle: "سوالی دارید یا می‌خواهید سفارش دهید؟",
    contactDesc: "تیم پشتیبانی RK آماده پاسخگویی به شما درباره سایز، دوخت سفارشی در افغانستان، روش انتقال پول و ارسال به کشور محل اقامت شماست.",
    footerBrand: "RK COUTURE",
    footerCopyright: "© 2026 RK Brand — AI Designed • Crafted in Afghanistan • Worldwide Shipping",

    // شماره‌ها، نرخ ارز و رمز پورتل
    whatsapp: "+93 700 123 456",
    phone: "+93 799 123 456",
    afnRate: 70,
    eurRate: 0.92,
    adminPassword: "rk2026"
};

// بارگذاری داده‌ها از حافظه مرورگر
let products = JSON.parse(localStorage.getItem('rk_cms_products')) || [...DEFAULT_PRODUCTS];
let inquiries = JSON.parse(localStorage.getItem('rk_cms_inquiries')) || [];
let cms = { ...DEFAULT_CMS, ...(JSON.parse(localStorage.getItem('rk_cms_settings')) || {}) };

let bag = [];
let activeCurrency = 'USD';
let activeCategory = 'همه';
let selectedProduct = null;
let selectedSize = '';

// متغیرهای موقت آپلود و ویرایش در پورتل
let editingProductId = null;
let tempProductImg = '';
let tempLogoImg = '';
let tempHeroBgImg = '';

// =========================================================
// ذخیره امن در مرورگر
// =========================================================
function saveData() {
    try {
        localStorage.setItem('rk_cms_products', JSON.stringify(products));
        localStorage.setItem('rk_cms_inquiries', JSON.stringify(inquiries));
        localStorage.setItem('rk_cms_settings', JSON.stringify(cms));
        return true;
    } catch (e) {
        alert("حجم عکس‌های آپلودشده بیش از حد مجاز مرورگر شده است. لطفاً عکس‌های کم‌حجم‌تر انتخاب کنید.");
        return false;
    }
}

// =========================================================
// فشرده‌سازی خودکار تصاویر آپلودی
// =========================================================
function compressImage(file, maxWidth, mimeType, quality, callback) {
    const reader = new FileReader();
    reader.onload = function(event) {
        const img = new Image();
        img.onload = function() {
            const canvas = document.createElement('canvas');
            const scale = Math.min(1, maxWidth / img.width);
            canvas.width = img.width * scale;
            canvas.height = img.height * scale;
            canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
            callback(canvas.toDataURL(mimeType, quality));
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(file);
}

// =========================================================
// لینک مخفی پورتل
// =========================================================
function checkSecretPortalRoute() {
    if (window.location.hash === SECRET_PORTAL_HASH) {
        openAdminLogin();
    }
}

function clearSecretHash() {
    try {
        history.replaceState(null, '', window.location.pathname + window.location.search);
    } catch (e) {
        window.location.hash = '';
    }
}
window.addEventListener('hashchange', checkSecretPortalRoute);

// =========================================================
// اعمال تمام محتوای CMS روی صفحه اصلی و پورتل
// =========================================================
function cleanWhatsAppNum(num) { return String(num).replace(/[^0-9]/g, ''); }
function cleanTelNum(num) { return String(num).replace(/[^0-9+]/g, ''); }

function formatPrice(usd) {
    if (activeCurrency === 'USD') return `$${Number(usd).toLocaleString('en-US')}`;
    if (activeCurrency === 'EUR') return `€${Math.round(usd * cms.eurRate).toLocaleString('en-US')}`;
    return `${Math.round(usd * cms.afnRate).toLocaleString('fa-IR')} افغانی`;
}

function changeCurrency() {
    activeCurrency = document.getElementById('currencySelect').value;
    renderStorefront();
    updateBagUI();
}

function applyCMS() {
    // عنوان صفحه و لوگو
    document.title = `${cms.brandName} | ${cms.productsTitle}`;
    document.getElementById('siteLogoImg').src = cms.logo;
    document.getElementById('adminHeaderLogo').src = cms.logo;
    document.getElementById('siteFavicon').href = cms.logo;
    document.getElementById('siteBrandName').textContent = cms.brandName;
    document.getElementById('siteBrandSub').textContent = cms.brandSub;
    document.getElementById('topBannerText').textContent = cms.topBanner;

    // بنر اصلی
    const heroImg = document.getElementById('heroBgImg');
    heroImg.style.display = 'block';
    heroImg.src = cms.heroBg;
    document.getElementById('heroBadge').textContent = cms.heroBadge;
    document.getElementById('heroTitleMain').textContent = cms.heroTitleMain;
    document.getElementById('heroTitleGold').textContent = cms.heroTitleGold;
    document.getElementById('heroDesc').textContent = cms.heroDesc;
    document.getElementById('heroBtnPrimary').textContent = cms.heroBtnPrimary;
    document.getElementById('heroBtnSecondary').textContent = cms.heroBtnSecondary;

    // ۳ کارت مراحل
    document.getElementById('step1Title').textContent = cms.step1Title;
    document.getElementById('step1Desc').textContent = cms.step1Desc;
    document.getElementById('step2Title').textContent = cms.step2Title;
    document.getElementById('step2Desc').textContent = cms.step2Desc;
    document.getElementById('step3Title').textContent = cms.step3Title;
    document.getElementById('step3Desc').textContent = cms.step3Desc;

    // بخش محصولات
    document.getElementById('productsEyebrow').textContent = cms.productsEyebrow;
    document.getElementById('productsTitle').textContent = cms.productsTitle;
    document.getElementById('productsSub').textContent = cms.productsSub;

    // بخش تماس و فوتر
    document.getElementById('contactTitle').textContent = cms.contactTitle;
    document.getElementById('contactDesc').textContent = cms.contactDesc;
    document.getElementById('footerBrand').textContent = cms.footerBrand;
    document.getElementById('footerCopyright').textContent = cms.footerCopyright;

    // شماره‌های تماس
    const waClean = cleanWhatsAppNum(cms.whatsapp);
    const telClean = cleanTelNum(cms.phone);
    const defaultMsg = encodeURIComponent(`سلام تیم ${cms.brandName}! درباره لباس‌ها سوال دارم.`);

    document.getElementById('displayWhatsappNum').textContent = cms.whatsapp;
    document.getElementById('displayPhoneNum').textContent = cms.phone;
    document.getElementById('directWhatsappCard').href = `https://wa.me/${waClean}?text=${defaultMsg}`;
    document.getElementById('floatingWhatsappBtn').href = `https://wa.me/${waClean}?text=${defaultMsg}`;
    document.getElementById('directPhoneLink').href = `tel:${telClean}`;
    document.getElementById('bagCallBtn').href = `tel:${telClean}`;
}

function populateAdminForms() {
    // تب برندینگ
    document.getElementById('logoPreview').src = cms.logo;
    document.getElementById('cmsBrandName').value = cms.brandName;
    document.getElementById('cmsBrandSub').value = cms.brandSub;
    document.getElementById('cmsTopBanner').value = cms.topBanner;
    document.getElementById('cmsHeroBgUrl').value = cms.heroBg.startsWith('data:') ? '' : cms.heroBg;
    document.getElementById('heroBgPreview').src = cms.heroBg;
    document.getElementById('cmsHeroBadge').value = cms.heroBadge;
    document.getElementById('cmsHeroTitleMain').value = cms.heroTitleMain;
    document.getElementById('cmsHeroTitleGold').value = cms.heroTitleGold;
    document.getElementById('cmsHeroDesc').value = cms.heroDesc;
    document.getElementById('cmsHeroBtn1').value = cms.heroBtnPrimary;
    document.getElementById('cmsHeroBtn2').value = cms.heroBtnSecondary;

    // تب متن‌ها
    document.getElementById('cmsStep1Title').value = cms.step1Title;
    document.getElementById('cmsStep1Desc').value = cms.step1Desc;
    document.getElementById('cmsStep2Title').value = cms.step2Title;
    document.getElementById('cmsStep2Desc').value = cms.step2Desc;
    document.getElementById('cmsStep3Title').value = cms.step3Title;
    document.getElementById('cmsStep3Desc').value = cms.step3Desc;
    document.getElementById('cmsProdEyebrow').value = cms.productsEyebrow;
    document.getElementById('cmsProdTitle').value = cms.productsTitle;
    document.getElementById('cmsProdSub').value = cms.productsSub;
    document.getElementById('cmsContactTitle').value = cms.contactTitle;
    document.getElementById('cmsContactDesc').value = cms.contactDesc;
    document.getElementById('cmsFooterBrand').value = cms.footerBrand;
    document.getElementById('cmsFooterCopy').value = cms.footerCopyright;

    // تب شماره‌ها و ارز
    document.getElementById('settingWhatsapp').value = cms.whatsapp;
    document.getElementById('settingPhone').value = cms.phone;
    document.getElementById('settingAfnRate').value = cms.afnRate;
    document.getElementById('settingEurRate').value = cms.eurRate;
    document.getElementById('settingNewPassword').value = '';
}

function copyDirectPhone() {
    navigator.clipboard?.writeText(cms.phone);
    showToast(`شماره خطی (${cms.phone}) کپی شد 📞`);
}

// =========================================================
// نمایش محصولات در فروشگاه
// =========================================================
function renderStorefront() {
    const categories = ['همه', ...new Set(products.map(p => p.category))];
    if (!categories.includes(activeCategory)) activeCategory = 'همه';

    document.getElementById('categoryFilters').innerHTML = categories.map(cat => `
        <button onclick="setCategory('${cat}')" class="px-4 py-2 rounded-xl text-sm font-bold transition ${
            activeCategory === cat ? 'bg-rk-black text-rk-gold' : 'bg-white border border-gray-200 text-gray-600 hover:border-rk-black'
        }">${cat}</button>
    `).join('');

    const filtered = activeCategory === 'همه' ? products : products.filter(p => p.category === activeCategory);
    document.getElementById('productGrid').innerHTML = filtered.map(p => `
        <div class="product-card bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition flex flex-col">
            <div onclick="openOrderModal(${p.id})" class="relative h-80 overflow-hidden bg-gray-100 cursor-pointer">
                <img src="${p.img}" alt="${p.name}" 
                     onerror="this.src='https://placehold.co/600x800/0D0D10/C8A253?text=RK'"
                     class="product-img w-full h-full object-cover transition duration-500">
                <span class="absolute top-3 right-3 bg-rk-black/90 text-rk-gold border border-rk-gold/30 text-[10px] font-bold px-2.5 py-1 rounded-full">
                    ✦ ${p.aiCode}
                </span>
                <span class="absolute bottom-3 right-3 bg-white/90 text-rk-black text-[10px] font-bold px-2.5 py-1 rounded-lg">
                    ${p.category}
                </span>
            </div>
            <div class="p-5 flex-1 flex flex-col justify-between">
                <div>
                    <h3 class="font-bold text-base mb-1 line-clamp-1">${p.name}</h3>
                    <p class="font-extrabold text-rk-black text-lg mb-3" dir="ltr">${formatPrice(p.priceUSD)}</p>
                </div>
                <div class="flex gap-2 pt-3 border-t border-gray-100">
                    <button onclick="openOrderModal(${p.id})" class="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold rounded-xl transition flex items-center justify-center gap-1">
                        <span>💬</span> سفارش / تماس
                    </button>
                    <button onclick="addToBag(${p.id})" class="px-3 py-2.5 bg-gray-100 hover:bg-rk-black hover:text-rk-gold text-gray-700 text-xs font-bold rounded-xl transition" title="افزودن به لیست انتخابی">
                        ❤️
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function setCategory(cat) {
    activeCategory = cat;
    renderStorefront();
}

// =========================================================
// سفارش مستقیم (واتساپ + شماره خطی) و لیست پسندیده‌ها
// =========================================================
function openOrderModal(productId) {
    selectedProduct = products.find(p => p.id === productId);
    if (!selectedProduct) return;
    selectedSize = selectedProduct.sizes[0] || 'دوخت سفارشی';

    document.getElementById('modalProdImg').src = selectedProduct.img;
    document.getElementById('modalProdCode').textContent = `✦ ${selectedProduct.aiCode}`;
    document.getElementById('modalProdName').textContent = selectedProduct.name;
    document.getElementById('modalProdPrice').textContent = formatPrice(selectedProduct.priceUSD);
    document.getElementById('modalPhoneText').textContent = cms.phone;
    document.getElementById('modalCallBtn').href = `tel:${cleanTelNum(cms.phone)}`;

    renderModalSizes();
    document.getElementById('orderModal').classList.remove('hidden');
}

function renderModalSizes() {
    document.getElementById('modalSizes').innerHTML = selectedProduct.sizes.map(s => `
        <button onclick="selectSize('${s}')" class="px-3 py-1.5 rounded-lg text-xs font-bold border transition ${
            selectedSize === s ? 'bg-rk-black text-rk-gold border-rk-black' : 'bg-white text-gray-600 border-gray-200 hover:border-rk-black'
        }">${s}</button>
    `).join('');
}

function selectSize(size) { selectedSize = size; renderModalSizes(); }
function closeOrderModal() { document.getElementById('orderModal').classList.add('hidden'); }

function contactViaWhatsApp() {
    if (!selectedProduct) return;
    const waNum = cleanWhatsAppNum(cms.whatsapp);
    const message = `سلام تیم ${cms.brandName}! 👋\nمن این لباس را در ویب‌سایت شما پسندیده‌ام:\n\n👗 نام لباس: ${selectedProduct.name}\n✦ کد دیزاین: ${selectedProduct.aiCode}\n📏 سایز مورد نظر: ${selectedSize}\n💰 قیمت: ${formatPrice(selectedProduct.priceUSD)}\n\nلطفاً درباره مراحل انتقال پول و تسلیمی راهنمایی کنید.`;
    logInquiry('واتساپ', `${selectedProduct.name} (سایز: ${selectedSize})`, selectedProduct.priceUSD);
    window.open(`https://wa.me/${waNum}?text=${encodeURIComponent(message)}`, '_blank');
}

function logPhoneInquiry() {
    if (!selectedProduct) return;
    logInquiry('تماس خطی', `${selectedProduct.name} (سایز: ${selectedSize})`, selectedProduct.priceUSD);
}

function logInquiry(channel, details, priceUSD) {
    inquiries.unshift({ id: Date.now(), date: new Date().toLocaleString('fa-IR'), channel, details, priceUSD });
    saveData();
}

function addToBag(id) {
    const prod = products.find(p => p.id === id);
    if (!bag.find(b => b.id === id)) {
        bag.push(prod);
        updateBagUI();
        showToast(`«${prod.name}» به لیست پسندیده‌ها اضافه شد ❤️`);
    } else {
        showToast("این لباس قبلاً در لیست شما هست.");
    }
}

function removeFromBag(id) { bag = bag.filter(b => b.id !== id); updateBagUI(); }

function updateBagUI() {
    document.getElementById('bagCount').textContent = bag.length;
    const totalUSD = bag.reduce((s, i) => s + Number(i.priceUSD), 0);
    document.getElementById('bagTotal').textContent = formatPrice(totalUSD);

    const container = document.getElementById('bagItems');
    if (bag.length === 0) {
        container.innerHTML = `<div class="text-center py-16 text-gray-400 text-sm">هنوز لباسی اضافه نکرده‌اید ❤️</div>`;
        return;
    }
    container.innerHTML = bag.map(item => `
        <div class="flex gap-3 items-center bg-gray-50 p-3 rounded-xl border">
            <img src="${item.img}" class="w-14 h-18 object-cover rounded-lg">
            <div class="flex-1">
                <h4 class="text-sm font-bold line-clamp-1">${item.name}</h4>
                <p class="text-[11px] text-gray-400">${item.aiCode}</p>
                <p class="text-xs text-rk-gold font-bold mt-1" dir="ltr">${formatPrice(item.priceUSD)}</p>
            </div>
            <button onclick="removeFromBag(${item.id})" class="text-red-500 text-xs font-bold px-2">حذف</button>
        </div>
    `).join('');
}

function toggleBag() {
    const drawer = document.getElementById('bagDrawer');
    const overlay = document.getElementById('bagOverlay');
    const isOpen = !drawer.classList.contains('-translate-x-full');
    drawer.classList.toggle('-translate-x-full', isOpen);
    overlay.classList.toggle('hidden', isOpen);
}

function sendBagToWhatsApp() {
    if (bag.length === 0) return showToast("لیست انتخابی شما خالی است!");
    const waNum = cleanWhatsAppNum(cms.whatsapp);
    const listText = bag.map((item, idx) => `${idx + 1}. ${item.name} (${item.aiCode}) — ${formatPrice(item.priceUSD)}`).join('\n');
    const message = `سلام تیم ${cms.brandName}! 👋\nمن این لباس‌ها را پسندیده‌ام:\n\n${listText}\n\nلطفاً درباره سایز، انتقال پول و ارسال راهنمایی کنید.`;
    logInquiry('واتساپ (چند لباس)', bag.map(b => b.name).join(' + '), bag.reduce((s, i) => s + Number(i.priceUSD), 0));
    window.open(`https://wa.me/${waNum}?text=${encodeURIComponent(message)}`, '_blank');
}

// =========================================================
// مدیریت پورتل (ورود، تب‌ها، محصولات، لوگو، متن‌ها، تنظیمات)
// =========================================================
function openAdminLogin() {
    document.getElementById('adminLoginModal').classList.remove('hidden');
    document.getElementById('adminPassInput').value = '';
    document.getElementById('adminPassInput').focus();
}

function closeAdminLogin() {
    document.getElementById('adminLoginModal').classList.add('hidden');
    clearSecretHash();
}

function verifyAdminLogin(e) {
    e.preventDefault();
    if (document.getElementById('adminPassInput').value === cms.adminPassword) {
        document.getElementById('adminLoginModal').classList.add('hidden');
        document.getElementById('storefrontView').classList.add('hidden');
        document.getElementById('adminPortalView').classList.remove('hidden');
        populateAdminForms();
        renderAdminDashboard();
    } else {
        showToast("رمز عبور اشتباه است!");
    }
}

function exitAdminPortal() {
    document.getElementById('adminPortalView').classList.add('hidden');
    document.getElementById('storefrontView').classList.remove('hidden');
    clearSecretHash();
    applyCMS();
    renderStorefront();
}

function switchAdminTab(tab) {
    ['products', 'branding', 'texts', 'contact', 'inquiries'].forEach(t => {
        document.getElementById(`adminTab-${t}`).classList.toggle('hidden', t !== tab);
        const btn = document.getElementById(`tabBtn-${t}`);
        btn.className = t === tab 
            ? "admin-tab px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-rk-black text-rk-gold"
            : "admin-tab px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-white text-gray-600 border";
    });
}

// آپلود عکس محصول
function handleProductImgUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    compressImage(file, 550, 'image/jpeg', 0.78, (dataUrl) => {
        tempProductImg = dataUrl;
        const preview = document.getElementById('uploadPreview');
        preview.src = dataUrl;
        preview.classList.remove('hidden');
    });
}

// شروع ویرایش یک لباس موجود
function startEditProduct(id) {
    const p = products.find(item => item.id === id);
    if (!p) return;
    editingProductId = id;
    tempProductImg = p.img;

    document.getElementById('productFormTitle').textContent = `✏️ ویرایش: ${p.name}`;
    document.getElementById('productSubmitBtn').textContent = 'ذخیره تغییرات این لباس ✓';
    document.getElementById('cancelEditBtn').classList.remove('hidden');

    document.getElementById('prodName').value = p.name;
    document.getElementById('prodCategory').value = p.category;
    document.getElementById('prodPrice').value = p.priceUSD;
    document.getElementById('prodCode').value = p.aiCode;
    document.getElementById('prodSizes').value = p.sizes.join(', ');
    document.getElementById('prodImgUrl').value = p.img.startsWith('data:') ? '' : p.img;
    document.getElementById('prodFile').value = '';

    const preview = document.getElementById('uploadPreview');
    preview.src = p.img;
    preview.classList.remove('hidden');

    document.getElementById('productFormCard').scrollIntoView({ behavior: 'smooth' });
}

function cancelEditProduct() {
    editingProductId = null;
    tempProductImg = '';
    document.getElementById('productFormTitle').textContent = '➕ افزودن لباس جدید';
    document.getElementById('productSubmitBtn').textContent = 'انتشار در ویب‌سایت ✨';
    document.getElementById('cancelEditBtn').classList.add('hidden');
    document.getElementById('prodName').value = '';
    document.getElementById('prodCategory').value = '';
    document.getElementById('prodPrice').value = '';
    document.getElementById('prodCode').value = '';
    document.getElementById('prodSizes').value = 'S, M, L, XL, دوخت سفارشی';
    document.getElementById('prodImgUrl').value = '';
    document.getElementById('prodFile').value = '';
    document.getElementById('uploadPreview').classList.add('hidden');
}

// ذخیره لباس (هم برای افزودن جدید، هم برای ویرایش موجود)
function saveProductForm(e) {
    e.preventDefault();
    const urlInput = document.getElementById('prodImgUrl').value.trim();
    const finalImg = tempProductImg || urlInput || "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?auto=format&fit=crop&w=600&q=80";

    const productData = {
        id: editingProductId || Date.now(),
        name: document.getElementById('prodName').value.trim(),
        category: document.getElementById('prodCategory').value.trim(),
        priceUSD: Number(document.getElementById('prodPrice').value),
        aiCode: document.getElementById('prodCode').value.trim(),
        sizes: document.getElementById('prodSizes').value.split(',').map(s => s.trim()).filter(Boolean),
        img: urlInput && !document.getElementById('prodFile').files.length ? urlInput : finalImg
    };

    if (editingProductId) {
        const idx = products.findIndex(p => p.id === editingProductId);
        if (idx !== -1) products[idx] = productData;
        showToast("تغییرات لباس با موفقیت ذخیره شد ✓");
    } else {
        products.unshift(productData);
        showToast("لباس جدید در سایت منتشر شد ✨");
    }

    saveData();
    cancelEditProduct();
    renderAdminDashboard();
}

function deleteProduct(id) {
    if (!confirm("این لباس حذف شود؟")) return;
    products = products.filter(p => p.id !== id);
    if (editingProductId === id) cancelEditProduct();
    saveData();
    renderAdminDashboard();
    showToast("لباس حذف شد.");
}

// آپلود و ذخیره لوگو و بنر
function handleLogoUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    compressImage(file, 260, 'image/png', 0.9, (dataUrl) => {
        tempLogoImg = dataUrl;
        document.getElementById('logoPreview').src = dataUrl;
    });
}

function resetLogoToDefault() {
    tempLogoImg = 'rk-logo.svg';
    cms.logo = 'rk-logo.svg';
    document.getElementById('logoPreview').src = 'rk-logo.svg';
    document.getElementById('logoFileInput').value = '';
    saveData();
    applyCMS();
    showToast("لوگو به حالت پیش‌فرض RK برگشت ✓");
}

function handleHeroBgUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    compressImage(file, 1100, 'image/jpeg', 0.72, (dataUrl) => {
        tempHeroBgImg = dataUrl;
        document.getElementById('heroBgPreview').src = dataUrl;
    });
}

function saveBrandingSettings(e) {
    e.preventDefault();
    if (tempLogoImg) cms.logo = tempLogoImg;
    if (tempHeroBgImg) {
        cms.heroBg = tempHeroBgImg;
    } else if (document.getElementById('cmsHeroBgUrl').value.trim()) {
        cms.heroBg = document.getElementById('cmsHeroBgUrl').value.trim();
    }

    cms.brandName = document.getElementById('cmsBrandName').value.trim() || 'RK';
    cms.brandSub = document.getElementById('cmsBrandSub').value.trim();
    cms.topBanner = document.getElementById('cmsTopBanner').value.trim();
    cms.heroBadge = document.getElementById('cmsHeroBadge').value.trim();
    cms.heroTitleMain = document.getElementById('cmsHeroTitleMain').value;
    cms.heroTitleGold = document.getElementById('cmsHeroTitleGold').value;
    cms.heroDesc = document.getElementById('cmsHeroDesc').value.trim();
    cms.heroBtnPrimary = document.getElementById('cmsHeroBtn1').value.trim();
    cms.heroBtnSecondary = document.getElementById('cmsHeroBtn2').value.trim();

    tempLogoImg = '';
    tempHeroBgImg = '';
    if (saveData()) {
        applyCMS();
        showToast("لوگو، بنر و ظاهر برند ذخیره شد ✓");
    }
}

// ذخیره متن‌های صفحه
function savePageTexts(e) {
    e.preventDefault();
    cms.step1Title = document.getElementById('cmsStep1Title').value;
    cms.step1Desc = document.getElementById('cmsStep1Desc').value;
    cms.step2Title = document.getElementById('cmsStep2Title').value;
    cms.step2Desc = document.getElementById('cmsStep2Desc').value;
    cms.step3Title = document.getElementById('cmsStep3Title').value;
    cms.step3Desc = document.getElementById('cmsStep3Desc').value;

    cms.productsEyebrow = document.getElementById('cmsProdEyebrow').value;
    cms.productsTitle = document.getElementById('cmsProdTitle').value;
    cms.productsSub = document.getElementById('cmsProdSub').value;

    cms.contactTitle = document.getElementById('cmsContactTitle').value;
    cms.contactDesc = document.getElementById('cmsContactDesc').value;
    cms.footerBrand = document.getElementById('cmsFooterBrand').value;
    cms.footerCopyright = document.getElementById('cmsFooterCopy').value;

    saveData();
    applyCMS();
    showToast("تمام متن‌های صفحه آپدیت شد ✓");
}

// ذخیره شماره‌ها، ارز و رمز پورتل
function saveContactAndSecurity(e) {
    e.preventDefault();
    cms.whatsapp = document.getElementById('settingWhatsapp').value.trim();
    cms.phone = document.getElementById('settingPhone').value.trim();
    cms.afnRate = Number(document.getElementById('settingAfnRate').value) || 70;
    cms.eurRate = Number(document.getElementById('settingEurRate').value) || 0.92;

    const newPass = document.getElementById('settingNewPassword').value.trim();
    if (newPass.length > 0) {
        cms.adminPassword = newPass;
        document.getElementById('settingNewPassword').value = '';
    }

    saveData();
    applyCMS();
    renderAdminDashboard();
    showToast("شماره‌ها، ارز و تنظیمات امنیتی ذخیره شد ✓");
}

// بکاپ و بازیابی کل سایت
function exportBackup() {
    const data = JSON.stringify({ products, cms, inquiries }, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `rk-website-backup-${new Date().toISOString().slice(0,10)}.json`;
    a.click();
}

function importBackup(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(ev) {
        try {
            const parsed = JSON.parse(ev.target.result);
            if (parsed.products) products = parsed.products;
            if (parsed.cms) cms = { ...DEFAULT_CMS, ...parsed.cms };
            if (parsed.inquiries) inquiries = parsed.inquiries;
            saveData();
            applyCMS();
            populateAdminForms();
            renderAdminDashboard();
            showToast("فایل بکاپ با موفقیت بازیابی شد ✓");
        } catch (err) {
            alert("فایل بکاپ معتبر نیست!");
        }
    };
    reader.readAsText(file);
}

function clearInquiries() {
    if (!confirm("لیست گزارش تماس‌ها پاک شود؟")) return;
    inquiries = [];
    saveData();
    renderAdminDashboard();
}

function resetAllData() {
    if (!confirm("کل سایت (محصولات، لوگو و متن‌ها) به حالت اولیه برگردد؟")) return;
    localStorage.removeItem('rk_cms_products');
    localStorage.removeItem('rk_cms_inquiries');
    localStorage.removeItem('rk_cms_settings');
    products = [...DEFAULT_PRODUCTS];
    inquiries = [];
    cms = { ...DEFAULT_CMS };
    applyCMS();
    populateAdminForms();
    renderAdminDashboard();
    showToast("کل سایت به حالت پیش‌فرض برگشت.");
}

// رندر کردن داشبورد مدیریت
function renderAdminDashboard() {
    document.getElementById('statProducts').textContent = products.length;
    document.getElementById('statInquiries').textContent = inquiries.length;
    document.getElementById('statWhatsapp').textContent = cms.whatsapp;

    document.getElementById('adminProductList').innerHTML = products.map(p => `
        <div class="flex items-center justify-between gap-4 p-3 border rounded-xl hover:bg-gray-50">
            <div class="flex items-center gap-3">
                <img src="${p.img}" class="w-12 h-16 object-cover rounded-lg bg-gray-100">
                <div>
                    <h4 class="font-bold text-sm">${p.name}</h4>
                    <p class="text-xs text-gray-500">${p.category} • <span class="text-rk-gold font-bold">$${p.priceUSD}</span> • ${p.aiCode}</p>
                </div>
            </div>
            <div class="flex items-center gap-2">
                <button onclick="startEditProduct(${p.id})" class="px-3 py-1.5 text-xs bg-amber-50 text-amber-700 font-bold rounded-lg hover:bg-rk-gold hover:text-rk-black transition">✏️ ویرایش</button>
                <button onclick="deleteProduct(${p.id})" class="px-3 py-1.5 text-xs bg-red-50 text-red-600 font-bold rounded-lg hover:bg-red-600 hover:text-white transition">حذف</button>
            </div>
        </div>
    `).join('');

    const inqList = document.getElementById('adminInquiriesList');
    if (inquiries.length === 0) {
        inqList.innerHTML = `<div class="text-center py-10 text-gray-400 text-sm">هنوز مشتری روی دکمه واتساپ یا تماس کلیک نکرده است.</div>`;
    } else {
        inqList.innerHTML = inquiries.map(i => `
            <div class="p-4 border rounded-xl bg-gray-50 flex flex-col sm:flex-row justify-between gap-2">
                <div>
                    <span class="text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">${i.channel}</span>
                    <span class="text-xs text-gray-400 mr-2">${i.date}</span>
                    <p class="font-bold text-sm mt-1.5">${i.details}</p>
                </div>
                <span class="font-extrabold text-rk-gold" dir="ltr">$${i.priceUSD}</span>
            </div>
        `).join('');
    }
}

function showToast(msg) {
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.classList.remove('translate-y-24', 'opacity-0');
    setTimeout(() => toast.classList.add('translate-y-24', 'opacity-0'), 2800);
}

// اجرای اولیه
applyCMS();
renderStorefront();
updateBagUI();
checkSecretPortalRoute();