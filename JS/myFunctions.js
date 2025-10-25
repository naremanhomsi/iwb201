Nano Homsi, [02 /05 / 47 08: 27 ص]
// ===========================================
// 1. وظائف التحقق (Validation Functions)
// ===========================================

/**
 * التحقق من أن النص يحتوي أحرف إنجليزية فقط وبدون فراغات (لـ اسم التطبيق)
 * @param {string} str النص المراد فحصه
 * @returns {boolean} نتيجة التحقق
 */
function isEnglishNoSpaces(str) {
    if (!str || str.length === 0) return false;
    // يتطابق مع (a-z) و (A-Z) فقط.
    return /^[a-zA-Z]+$/.test(str);
}

/**
 * التحقق من أن النص يحتوي أحرف إنجليزية فقط (مع إمكانية وجود فراغات لـ اسم الشركة)
 * @param {string} str النص المراد فحصه
 * @returns {boolean} نتيجة التحقق
 */
function isEnglish(str) {
    if (!str || str.length === 0) return false;
    // يتطابق مع (a-z) و (A-Z) والفراغات.
    return /^[a-zA-Z\s]+$/.test(str);
}

/**
 * التحقق من صحة رابط URL
 * @param {string} str الرابط المراد فحصه
 * @returns {boolean} نتيجة التحقق
 */
function isValidUrl(str) {
    if (!str) return false;
    // تحقق بسيط يتطلب وجود http أو https
    return str.startsWith('http://') || str.startsWith('https://');
}


// ===========================================
// 2. وظائف إدارة بيانات التطبيقات (استخدام localStorage)
// ===========================================

const STORAGE_KEY = 'ai_apps_data';

/**
 * جلب جميع التطبيقات المحفوظة
 * @returns {Array<Object>} مصفوفة التطبيقات
 */
function getApps() {
    const appsJson = localStorage.getItem(STORAGE_KEY);
    return appsJson ? JSON.parse(appsJson) : [];
}

/**
 * حفظ تطبيق جديد
 * @param {Object} appObj كائن التطبيق
 */
function saveApp(appObj) {
    const apps = getApps();
    apps.push(appObj);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(apps));
}


// ===========================================
// 3. وظيفة عرض أخطاء التحقق في Modal
// ===========================================

/**
 * عرض أخطاء التحقق في Modal
 * @param {Array<string>} errors مصفوفة رسائل الأخطاء
 */
function displayValidationErrors(errors) {
    const $modal = $('#validationModal');
    const $list = $('#validationErrors');
    $list.empty();

    // إضافة رسائل الأخطاء إلى القائمة
    errors.forEach(msg => {
        $list.append(`<li>${msg}</li>`);
    });

    // إظهار الـ Modal
    $modal.css('display', 'flex');
}

// ===========================================
// 4. معالجة نموذج (add_app.html)
// ===========================================
function handleSubmit(e) {
    // استخدام jQuery
    e.preventDefault();

    // قراءة القيم
    const appName = $('#appName').val().trim();
    const company = $('#company').val().trim();
    const website = $('#website').val().trim();
    const isFree = $('input[name="isFree"]:checked').val() === 'true';
    const category = $('#category').val();
    const description = $('#description').val().trim();

    let ok = true;
    let messages = [];

    // التحقق من صحة المدخلات
    if (!isEnglishNoSpaces(appName)) {
        ok = false;
        messages.push('❌ اسم التطبيق يجب أن يحتوي أحرف إنجليزية فقط وبدون فراغات.');
    }
    if (!isEnglish(company)) {
        ok = false;
        messages.push('❌ اسم الشركة يجب أن يحتوي أحرف إنجليزية فقط.');
    }
    if (!isValidUrl(website)) {
        ok = false;
        messages.push('❌ الرجاء إدخال رابط صالح يبدأ بـ http:// أو https://');
    }
    if (!category) {
        ok = false;
        messages.push('❌ الرجاء اختيار مجال الاستخدام من القائمة.');
    }
    if (!description || description.length < 10) {
        ok = false;
        messages.push('❌ الوصف لا يمكن أن يكون فارغاً ويجب أن يكون 10 أحرف على الأقل.');
    }

    if (!ok) {
        displayValidationErrors(messages);
        return; // إيقاف العملية
    }

    // إذا كانت البيانات صحيحة
    const appObj = {
        name: appName,
        company: company,
        website: website,
        free: isFree,
        category: category,
        description: description,
        createdAt: new Date().toISOString()
    };

    saveApp(appObj);

    // الانتقال إلى apps.html بعد النجاح
    window.location.href = 'apps.html';
}


// ===========================================
// 5. وظيفة معالجة صفحة (apps.

Nano Homsi, [02 /05 / 47 08: 51 ص]
// ===========================================
// 1. وظائف التحقق (Validation Functions)
// ===========================================

/**
 * التحقق من أن النص يحتوي أحرف إنجليزية فقط وبدون فراغات (لـ اسم التطبيق)
 * @param {string} str النص المراد فحصه
 * @returns {boolean} نتيجة التحقق
 */
function isEnglishNoSpaces(str) {
    if (!str || str.length === 0) return false;
    // يتطابق مع (a-z) و (A-Z) فقط.
    return /^[a-zA-Z]+$/.test(str);
}

/**
 * التحقق من أن النص يحتوي أحرف إنجليزية فقط (مع إمكانية وجود فراغات لـ اسم الشركة)
 * @param {string} str النص المراد فحصه
 * @returns {boolean} نتيجة التحقق
 */
function isEnglish(str) {
    if (!str || str.length === 0) return false;
    // يتطابق مع (a-z) و (A-Z) والفراغات.
    return /^[a-zA-Z\s]+$/.test(str);
}

/**
 * التحقق من صحة رابط URL
 * @param {string} str الرابط المراد فحصه
 * @returns {boolean} نتيجة التحقق
 */
function isValidUrl(str) {
    if (!str) return false;
    // تحقق بسيط يتطلب وجود http أو https
    return str.startsWith('http://') || str.startsWith('https://');
}


// ===========================================
// 2. وظائف إدارة بيانات التطبيقات (استخدام localStorage)
// ===========================================

const STORAGE_KEY = 'ai_apps_data';

/**
 * جلب جميع التطبيقات المحفوظة
 * @returns {Array<Object>} مصفوفة التطبيقات
 */
function getApps() {
    const appsJson = localStorage.getItem(STORAGE_KEY);
    return appsJson ? JSON.parse(appsJson) : [];
}

/**
 * حفظ تطبيق جديد
 * @param {Object} appObj كائن التطبيق
 */
function saveApp(appObj) {
    const apps = getApps();
    apps.push(appObj);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(apps));
}


// ===========================================
// 3. وظيفة عرض أخطاء التحقق في Modal
// ===========================================

/**
 * عرض أخطاء التحقق في Modal
 * @param {Array<string>} errors مصفوفة رسائل الأخطاء
 */
function displayValidationErrors(errors) {
    const $modal = $('#validationModal');
    const $list = $('#validationErrors');
    $list.empty();

    // إضافة رسائل الأخطاء إلى القائمة
    errors.forEach(msg => {
        $list.append(`<li>${msg}</li>`);
    });

    // إظهار الـ Modal
    $modal.css('display', 'flex');
}

// ===========================================
// 4. معالجة نموذج (add_app.html)
// ===========================================
function handleSubmit(e) {
    // استخدام jQuery
    e.preventDefault();

    // قراءة القيم
    const appName = $('#appName').val().trim();
    const company = $('#company').val().trim();
    const website = $('#website').val().trim();
    const isFree = $('input[name="isFree"]:checked').val() === 'true';
    const category = $('#category').val();
    const description = $('#description').val().trim();

    let ok = true;
    let messages = [];

    // التحقق من صحة المدخلات
    if (!isEnglishNoSpaces(appName)) {
        ok = false;
        messages.push('❌ اسم التطبيق يجب أن يحتوي أحرف إنجليزية فقط وبدون فراغات.');
    }
    if (!isEnglish(company)) {
        ok = false;
        messages.push('❌ اسم الشركة يجب أن يحتوي أحرف إنجليزية فقط.');
    }
    if (!isValidUrl(website)) {
        ok = false;
        messages.push('❌ الرجاء إدخال رابط صالح يبدأ بـ http:// أو https://');
    }
    if (!category) {
        ok = false;
        messages.push('❌ الرجاء اختيار مجال الاستخدام من القائمة.');
    }
    if (!description || description.length < 10) {
        ok = false;
        messages.push('❌ الوصف لا يمكن أن يكون فارغاً ويجب أن يكون 10 أحرف على الأقل.');
    }

    if (!ok) {
        displayValidationErrors(messages);
        return; // إيقاف العملية
    }

    // إذا كانت البيانات صحيحة
    const appObj = {
        name: appName,
        company: company,
        website: website,
        free: isFree,
        category: category,
        description: description,
        createdAt: new Date().toISOString()
    };

    saveApp(appObj);

    // الانتقال إلى apps.html بعد النجاح
    window.location.href = 'apps.html';
}


// ===========================================
// 5. وظيفة معالجة صفحة (apps.

Nano Homsi, [02 /05 / 47 08: 51 ص]
html) - ملء الجدول
// ===========================================

function populateAppsTable() {
    const apps = getApps();
    const $tbody = $('#appsTableBody');

    // إزالة التطبيق التجريبي المبدئي في apps.html
    $tbody.find('tr').not('.details-row').slice(0, 1).remove();

    if (apps.length === 0) {
        $tbody.append('<tr><td colspan="6" style="text-align: center; color: #dc3545; font-weight: bold;">لا توجد تطبيقات مُضافة حاليًا.</td></tr>');
        return;
    }

    // إزالة البيانات المضافة مسبقاً قبل إضافة الجديدة لضمان عدم التكرار
    $tbody.find('tr[data-app-name]').remove();
    $tbody.find('tr.details-row').remove();

    apps.forEach(app => {
        const row = `
            <tr data-app-name="${app.name}">
                <td>${app.name}</td>
                <td>${app.company}</td>
                <td>${app.category}</td>
                <td>
                    <input type="radio" name="status-${app.name}" value="مجاني" ${app.free ? 'checked' : ''} disabled> مجاني
                    <input type="radio" name="status-${app.name}" value="غير مجاني" ${!app.free ? 'checked' : ''} disabled> غير مجاني
                </td>
                <td><input type="checkbox" class="show-details-checkbox"></td>
                <td><a href='${app.website}' target="_blank">زيارة الموقع</a></td>
            </tr>
            <tr class="details-row" style="display:none;">
                <td colspan="6">
                    <strong>شرح مختصر:</strong> ${app.description}
                </td>
            </tr>
        `;
        $tbody.append(row);
    });
}

// ===========================================
// 6. تهيئة المستند (Document Ready) باستخدام JQuery
// ===========================================

$(document).ready(function () {

    // معالجات خاصة بصفحة add_app.html
    if (window.location.pathname.includes('add_app.html')) {
        $('#appForm').on('submit', handleSubmit);
        $('#resetBtn').on('click', function () {
            $('#appForm')[0].reset();
        });

        // بناء Modal التحقق عند تحميل الصفحة
        if (!$('#validationModal').length) {
            $('body').append(`
                <div id="validationModal" class="modal">
                    <div class="confirmation-modal">
                        <h2>خطأ في إدخال البيانات</h2>
                        <ul id="validationErrors"></ul>
                        <button id="close-modal" class="btn primary">إغلاق</button>
                    </div>
                </div>
            `);
        }

        // إغلاق Modal التحقق
        $('#close-modal').on('click', function () {
            $('#validationModal').css('display', 'none');
        });
    }

    // معالجات خاصة بصفحة apps.html
    if (window.location.pathname.includes('apps.html')) {
        populateAppsTable();

        // وظيفة إظهار/إخفاء التفاصيل
        $(document).on('change', '.show-details-checkbox', function () {
            // الصف الحالي هو صف البيانات (TR)
            const $row = $(this).closest('tr');
            // الصف التالي هو صف التفاصيل المخفي
            const $detailsRow = $row.next('.details-row');

            if (this.checked) {
                $detailsRow.slideDown(200);
            } else {
                $detailsRow.slideUp(200);
            }
        });
    }
});
// إظهار صف التفاصيل عند الضغط على أي راديو "مجاني / غير مجاني"
$(document).on('change', 'input[type="radio"]', function () {
    const $row = $(this).closest('tr');       // صف التطبيق الحالي
    const $detailsRow = $row.next('.details-row'); // صف التفاصيل

    if ($detailsRow.length) {
        $detailsRow.slideDown(200); // عرض التفاصيل بسلاسة
    }
});
// التأكد من أن DOM جاهز قبل تشغيل الكود
$(document).ready(function () {

    // ربط مستمع الحدث بجميع الأزرار التي تحمل الفئة 'info-button'
    $('.info-button').on('click', function () {

        // 1. الحصول على ID الصف المستهدف من خاصية 'data-target' للزر
        var targetID = $(this).data('target');

        // 2. إيجاد الصف المستهدف وتبديل حالة العرض (إظهار/إخفاء)
        $('#' + targetID).toggle();

        // 3. تغيير نص الزر ليتناسب مع حالته الجديدة
        if ($(this).text() === 'إظهار التفاصيل') {
            $(this).text('إخفاء التفاصيل');
        } else {
            $(this).text('إظهار التفاصيل');
        }
    });
});