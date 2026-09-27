/* =====================================================
   KRIAA - MAIN JAVASCRIPT
   ===================================================== */


/* =====================================================
   EXISTING PRODUCTS
   لا نحذف المنتجات الحالية
   ===================================================== */

const defaultProducts = [

    {
        id: 1,
        name: "متابعين انستا",
        price: "10DT",
        oldPrice: "",
        discount: false,
        image: "https://cdn-icons-png.flaticon.com/512/2111/2111463.png",
        thumbnail: "",
        description: "متابعين بجودة ممتازة",
        quantity: "1000 متابع",
        orderName: "1000 Insta Followers",
        category: "instagram",
        visible: true,
        badgeEnabled: false,
        badgeText: "PROMO",
        position: 1,
        quantities: [
            { value: "1000", price: "10DT" }
        ],
        thumbnailWidth: 300,
        thumbnailHeight: 300,
        thumbnailFit: "cover",
        thumbnailPosition: "center"
    },

    {
        id: 2,
        name: "مشاهدات ريلز",
        price: "1DT",
        oldPrice: "",
        discount: false,
        image: "https://cdn-icons-png.flaticon.com/512/2111/2111463.png",
        thumbnail: "",
        description: "سرعة فائقة في التنفيذ",
        quantity: "1000 مشاهدة",
        orderName: "1000 Insta Reels Views",
        category: "instagram",
        visible: true,
        badgeEnabled: false,
        badgeText: "PROMO",
        position: 2,
        quantities: [
            { value: "1000", price: "1DT" }
        ],
        thumbnailWidth: 300,
        thumbnailHeight: 300,
        thumbnailFit: "cover",
        thumbnailPosition: "center"
    },

    {
        id: 3,
        name: "لايكات انستا",
        price: "3DT",
        oldPrice: "",
        discount: false,
        image: "https://cdn-icons-png.flaticon.com/512/1077/1077035.png",
        thumbnail: "",
        description: "لايكات حقيقية وآمنة",
        quantity: "1000 لايك",
        orderName: "1000 Insta Likes",
        category: "instagram",
        visible: true,
        badgeEnabled: false,
        badgeText: "PROMO",
        position: 3,
        quantities: [
            { value: "1000", price: "3DT" }
        ],
        thumbnailWidth: 300,
        thumbnailHeight: 300,
        thumbnailFit: "cover",
        thumbnailPosition: "center"
    },

    {
        id: 4,
        name: "متابعين تيك توك",
        price: "15DT",
        oldPrice: "",
        discount: false,
        image: "https://cdn-icons-png.flaticon.com/512/3046/3046121.png",
        thumbnail: "",
        description: "دعم الحساب للانتشار",
        quantity: "1000 متابع",
        orderName: "1000 TikTok Followers",
        category: "tiktok",
        visible: true,
        badgeEnabled: false,
        badgeText: "PROMO",
        position: 4,
        quantities: [
            { value: "1000", price: "15DT" }
        ],
        thumbnailWidth: 300,
        thumbnailHeight: 300,
        thumbnailFit: "cover",
        thumbnailPosition: "center"
    },

    {
        id: 5,
        name: "مشاهدات تيك توك",
        price: "1DT",
        oldPrice: "",
        discount: false,
        image: "https://cdn-icons-png.flaticon.com/512/3046/3046121.png",
        thumbnail: "",
        description: "توصيل فوري للمشاهدات",
        quantity: "1000 مشاهدة",
        orderName: "1000 TikTok Views",
        category: "tiktok",
        visible: true,
        badgeEnabled: false,
        badgeText: "PROMO",
        position: 5,
        quantities: [
            { value: "1000", price: "1DT" }
        ],
        thumbnailWidth: 300,
        thumbnailHeight: 300,
        thumbnailFit: "cover",
        thumbnailPosition: "center"
    },

    {
        id: 6,
        name: "لايكات تيك توك",
        price: "4DT",
        oldPrice: "",
        discount: false,
        image: "https://cdn-icons-png.flaticon.com/512/3046/3046121.png",
        thumbnail: "",
        description: "تفاعل عالي للفيديو",
        quantity: "1000 لايك",
        orderName: "1000 TikTok Likes",
        category: "tiktok",
        visible: true,
        badgeEnabled: false,
        badgeText: "PROMO",
        position: 6,
        quantities: [
            { value: "1000", price: "4DT" }
        ],
        thumbnailWidth: 300,
        thumbnailHeight: 300,
        thumbnailFit: "cover",
        thumbnailPosition: "center"
    },

    {
        id: 7,
        name: "مشتركين يوتيوب",
        price: "20DT",
        oldPrice: "",
        discount: false,
        image: "https://cdn-icons-png.flaticon.com/512/1384/1384060.png",
        thumbnail: "",
        description: "مشتركين دائمين للقناة",
        quantity: "1000 مشترك",
        orderName: "1000 YouTube Subs",
        category: "youtube",
        visible: true,
        badgeEnabled: false,
        badgeText: "PROMO",
        position: 7,
        quantities: [
            { value: "1000", price: "20DT" }
        ],
        thumbnailWidth: 300,
        thumbnailHeight: 300,
        thumbnailFit: "cover",
        thumbnailPosition: "center"
    }

];


/* =====================================================
   STORAGE
   ===================================================== */

function getProducts() {

    const saved =
        localStorage.getItem("kriaa_products");

    if (saved) {

        try {

            const products = JSON.parse(saved);

            if (Array.isArray(products)) {

                return products.map(normalizeProduct);

            }

        } catch (error) {

            console.error(error);

        }

    }

    const initial =
        JSON.parse(JSON.stringify(defaultProducts));

    localStorage.setItem(
        "kriaa_products",
        JSON.stringify(initial)
    );

    return initial;
}


function normalizeProduct(product) {

    return {

        ...product,

        oldPrice: product.oldPrice || "",

        discount:
            product.discount === true,

        visible:
            product.visible !== false,

        badgeEnabled:
            product.badgeEnabled === true,

        badgeText:
            product.badgeText || "PROMO",

        category:
            product.category || detectCategory(product.name),

        position:
            product.position || product.id,

        quantities:
            Array.isArray(product.quantities)
                ? product.quantities
                : [],

        thumbnailWidth:
            product.thumbnailWidth || 300,

        thumbnailHeight:
            product.thumbnailHeight || 300,

        thumbnailFit:
            product.thumbnailFit || "cover",

        thumbnailPosition:
            product.thumbnailPosition || "center"

    };

}


function saveProducts(products) {

    localStorage.setItem(
        "kriaa_products",
        JSON.stringify(products)
    );

}


/* =====================================================
   CATEGORY
   ===================================================== */

let currentCategory = "all";


function detectCategory(name) {

    const text =
        String(name).toLowerCase();

    if (
        text.includes("انستا") ||
        text.includes("insta")
    ) {
        return "instagram";
    }

    if (
        text.includes("تيك") ||
        text.includes("tiktok")
    ) {
        return "tiktok";
    }

    if (
        text.includes("يوت") ||
        text.includes("youtube")
    ) {
        return "youtube";
    }

    return "autres";
}


function setCategory(category) {

    currentCategory = category;

    document
        .querySelectorAll(".category-btn")
        .forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.category === category
            );

        });

    renderProducts();

}


/* =====================================================
   PAGE SYSTEM
   ===================================================== */

function show(id) {

    if (
        id === "adminDashboard" &&
        !isAdmin()
    ) {

        alert("غير مسموح بالدخول إلى لوحة الإدارة.");

        return;

    }

    document
        .querySelectorAll(".page")
        .forEach(page => {

            page.classList.remove("active");

        });

    const target =
        document.getElementById(id);

    if (!target) return;

    target.classList.add("active");

    if (id === "social") {
        renderProducts();
    }

    if (id === "portfolio") {
        renderPortfolio();
    }

    if (id === "adminDashboard") {
        renderAdminProducts();
        renderAdminPortfolio();
        renderAdminServices();
        renderAdminImageTools();
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


function toggleMobileMenu() {

    const nav =
        document.getElementById("mainNav");

    if (nav) {
        nav.classList.toggle("mobile-open");
    }

}


/* =====================================================
   PRODUCTS
   ===================================================== */

function renderProducts() {

    const container =
        document.getElementById("productsContainer");

    if (!container) return;

    const search =
        (
            document.getElementById("searchInput")?.value ||
            ""
        ).trim().toLowerCase();

    let products =
        getProducts()
        .filter(product => product.visible !== false)
        .filter(product => {

            if (currentCategory === "all") {
                return true;
            }

            return product.category === currentCategory;

        })
        .filter(product => {

            if (!search) return true;

            const text = [

                product.name,
                product.category,
                product.description

            ].join(" ").toLowerCase();

            return text.includes(search);

        })
        .sort(
            (a, b) =>
                (a.position || 0) -
                (b.position || 0)
        );


    container.innerHTML = "";


    if (!products.length) {

        container.innerHTML = `
            <p class="admin-note">
                لا توجد نتائج.
            </p>
        `;

        return;

    }


    products.forEach(product => {

        const card =
            document.createElement("article");

        card.className = "card";


        const imageWrapper =
            document.createElement("div");

        imageWrapper.className =
            "product-image-wrapper";


        const image =
            document.createElement("img");

        image.src =
            product.image || product.thumbnail || "";

        image.alt =
            product.name;

        image.loading = "lazy";


        imageWrapper.appendChild(image);


        if (
            product.badgeEnabled &&
            product.badgeText
        ) {

            const badge =
                document.createElement("span");

            badge.className =
                "product-badge";

            badge.textContent =
                product.badgeText;

            imageWrapper.appendChild(badge);

        }


        const title =
            document.createElement("h3");

        title.textContent =
            product.name;


        const description =
            document.createElement("p");

        description.className =
            "card-description";

        description.textContent =
            product.description || "";


        const priceArea =
            document.createElement("div");

        priceArea.className =
            "price-area";


        const price =
            document.createElement("span");

        price.className =
            "price";

        price.textContent =
            product.price;


        priceArea.appendChild(price);


        if (
            product.discount &&
            product.oldPrice
        ) {

            const oldPrice =
                document.createElement("span");

            oldPrice.className =
                "old-price";

            oldPrice.textContent =
                product.oldPrice;

            priceArea.appendChild(oldPrice);

        }


        if (product.quantity) {

            const quantity =
                document.createElement("div");

            quantity.className =
                "quantity-label";

            quantity.textContent =
                product.quantity;

            priceArea.appendChild(quantity);

        }


        const actions =
            document.createElement("div");

        actions.className =
            "card-actions";


        const buy =
            document.createElement("button");

        buy.className =
            "buy-btn";

        buy.textContent =
            "شراء";

        buy.onclick =
            () => orderProduct(product);


        const descButton =
            document.createElement("button");

        descButton.className =
            "desc-btn";

        descButton.textContent =
            "وصف";

        descButton.onclick =
            () => desc(
                product.description || "لا يوجد وصف"
            );


        actions.appendChild(buy);
        actions.appendChild(descButton);


        card.appendChild(imageWrapper);
        card.appendChild(title);
        card.appendChild(description);
        card.appendChild(priceArea);
        card.appendChild(actions);


        container.appendChild(card);

    });

}


/* =====================================================
   ORDER
   ===================================================== */

function orderProduct(product) {

    let message =
        "مرحباً، أريد طلب خدمة: " +
        product.orderName ||
        product.name;

    message +=
        "\nالمنتج: " +
        product.name;

    if (product.quantity) {

        message +=
            "\nالكمية: " +
            product.quantity;

    }

    order(message);

}


function order(service) {

    const phone =
        "21627049943";

    const msg =
        encodeURIComponent(
            String(service)
        );

    window.open(
        "https://wa.me/" +
        phone +
        "?text=" +
        msg,
        "_blank"
    );

}


function whatsapp() {

    window.open(
        "https://wa.me/21627049943",
        "_blank"
    );

}


function desc(text) {

    alert("ℹ️ " + text);

}


/* =====================================================
   LOGIN
   ===================================================== */

function openLogin() {

    const modal =
        document.getElementById("loginModal");

    modal?.classList.add("show");

    const message =
        document.getElementById("loginMessage");

    if (message) {
        message.textContent = "";
    }

}


function closeLogin() {

    document
        .getElementById("loginModal")
        ?.classList.remove("show");

}


function login() {

    const username =
        document
        .getElementById("usernameInput")
        ?.value
        .trim();

    const password =
        document
        .getElementById("passwordInput")
        ?.value;

    const message =
        document.getElementById("loginMessage");


    if (!username || !password) {

        message.textContent =
            "يرجى إدخال اسم المستخدم وكلمة المرور.";

        return;

    }


    /*
       نفس بيانات Admin الموجودة في مشروعك الحالي
    */

    if (
        username === "admin" &&
        password === "26738291"
    ) {

        localStorage.setItem(
            "kriaa_logged_in",
            "true"
        );

        localStorage.setItem(
            "kriaa_role",
            "admin"
        );

        closeLogin();

        updateLoginUI();

        alert("تم تسجيل الدخول كـ Admin.");

        return;

    }


    localStorage.setItem(
        "kriaa_logged_in",
        "true"
    );

    localStorage.setItem(
        "kriaa_role",
        "user"
    );

    closeLogin();

    updateLoginUI();

    alert("تم تسجيل الدخول بنجاح.");

}


function isLoggedIn() {

    return (
        localStorage.getItem(
            "kriaa_logged_in"
        ) === "true"
    );

}


function isAdmin() {

    return (
        isLoggedIn() &&
        localStorage.getItem(
            "kriaa_role"
        ) === "admin"
    );

}


function updateLoginUI() {

    const login =
        document.getElementById("loginButton");

    const admin =
        document.getElementById("adminButton");

    const logout =
        document.getElementById("logoutButton");


    if (login) {

        login.style.display =
            isLoggedIn()
                ? "none"
                : "inline-block";

    }


    if (admin) {

        admin.style.display =
            isAdmin()
                ? "inline-block"
                : "none";

    }


    if (logout) {

        logout.style.display =
            isLoggedIn()
                ? "inline-block"
                : "none";

    }

}


function logout() {

    localStorage.removeItem(
        "kriaa_logged_in"
    );

    localStorage.removeItem(
        "kriaa_role"
    );

    updateLoginUI();

    show("home");

}


/* =====================================================
   ADMIN
   ===================================================== */

function openAdminDashboard() {

    if (!isAdmin()) {

        alert("غير مسموح.");

        return;

    }

    show("adminDashboard");

}


function openAdminTab(id, button) {

    document
        .querySelectorAll(".admin-content")
        .forEach(element => {

            element.classList.remove("active");

        });

    document
        .querySelectorAll(".admin-tab")
        .forEach(element => {

            element.classList.remove("active");

        });


    document
        .getElementById(id)
        ?.classList.add("active");


    button?.classList.add("active");

}


/* =====================================================
   ADD PRODUCT
   ===================================================== */

async function addProduct() {

    if (!isAdmin()) return;


    const name =
        document.getElementById("newProductName").value.trim();

    const price =
        document.getElementById("newProductPrice").value.trim();

    const oldPrice =
        document.getElementById("newProductOldPrice").value.trim();

    const imageUrl =
        document.getElementById("newProductImage").value.trim();

    const description =
        document.getElementById("newProductDescription").value.trim();

    const category =
        document.getElementById("newProductCategory").value;

    const quantity =
        document.getElementById("newProductQuantity").value.trim();

    const quantityPrice =
        document.getElementById("newProductQuantityPrice").value.trim();

    const file =
        document.getElementById("newProductImageFile").files[0];


    if (!name || !price) {

        alert("أدخل اسم المنتج والسعر.");

        return;

    }


    let image =
        imageUrl;


    if (file) {

        image =
            await fileToDataURL(file);

    }


    const products =
        getProducts();


    products.push({

        id: Date.now(),

        name,

        price,

        oldPrice,

        discount:
            Boolean(oldPrice),

        image,

        thumbnail: "",

        description,

        quantity,

        orderName: name,

        category,

        visible: true,

        badgeEnabled: false,

        badgeText: "PROMO",

        position:
            products.length + 1,

        quantities:
            quantity
                ? [
                    {
                        value: quantity,
                        price:
                            quantityPrice || price
                    }
                ]
                : [],

        thumbnailWidth: 300,

        thumbnailHeight: 300,

        thumbnailFit: "cover",

        thumbnailPosition: "center"

    });


    saveProducts(products);


    clearAddProductForm();

    renderProducts();

    renderAdminProducts();

    renderAdminServices();

    alert("تمت إضافة المنتج بنجاح.");

}


function clearAddProductForm() {

    [
        "newProductName",
        "newProductPrice",
        "newProductOldPrice",
        "newProductImage",
        "newProductDescription",
        "newProductQuantity",
        "newProductQuantityPrice"
    ].forEach(id => {

        const input =
            document.getElementById(id);

        if (input) input.value = "";

    });

}


/* =====================================================
   IMAGE UPLOAD
   ===================================================== */

function fileToDataURL(file) {

    return new Promise((resolve, reject) => {

        const reader =
            new FileReader();

        reader.onload =
            () => resolve(reader.result);

        reader.onerror =
            reject;

        reader.readAsDataURL(file);

    });

}


/* =====================================================
   ADMIN PRODUCTS
   ===================================================== */

function renderAdminProducts() {

    const container =
        document.getElementById("adminProducts");

    if (!container || !isAdmin()) return;


    const products =
        getProducts()
        .sort(
            (a,b) =>
                (a.position || 0) -
                (b.position || 0)
        );


    container.innerHTML = "";


    products.forEach(product => {

        const item =
            document.createElement("div");

        item.className =
            "admin-product";


        const img =
            document.createElement("img");

        img.src =
            product.image || "";

        img.alt =
            product.name;


        const info =
            document.createElement("div");

        info.className =
            "admin-product-info";


        info.innerHTML = `
            <h4>${escapeHTML(product.name)}</h4>
            <span>${escapeHTML(product.price)}</span>
            <br>
            <small>
                ${product.visible ? "Visible" : "Hidden"}
                · ${escapeHTML(product.category)}
                · Position ${product.position}
            </small>
        `;


        const actions =
            document.createElement("div");

        actions.className =
            "admin-actions";


        const edit =
            createAdminButton(
                "تعديل",
                "edit-btn",
                () => editProduct(product.id)
            );


        const badge =
            createAdminButton(
                "Badge",
                "toggle-btn",
                () => editBadge(product.id)
            );


        const visibility =
            createAdminButton(
                product.visible
                    ? "Hide"
                    : "Show",
                "toggle-btn",
                () => toggleProductVisibility(product.id)
            );


        const image =
            createAdminButton(
                "Image",
                "edit-btn",
                () => changeProductImage(product.id)
            );


        const deleteBtn =
            createAdminButton(
                "حذف",
                "delete-btn",
                () => deleteProduct(product.id)
            );


        actions.append(
            edit,
            badge,
            visibility,
            image,
            deleteBtn
        );


        item.append(
            img,
            info,
            actions
        );


        container.appendChild(item);

    });

}


function createAdminButton(text, className, action) {

    const button =
        document.createElement("button");

    button.textContent =
        text;

    button.className =
        className;

    button.onclick =
        action;

    return button;

}


/* =====================================================
   EDIT PRODUCT
   ===================================================== */

function editProduct(id) {

    if (!isAdmin()) return;


    const products =
        getProducts();

    const product =
        products.find(p => p.id === id);

    if (!product) return;


    const name =
        prompt(
            "اسم المنتج:",
            product.name
        );

    if (name === null) return;


    const price =
        prompt(
            "السعر:",
            product.price
        );

    if (price === null) return;


    const oldPrice =
        prompt(
            "السعر القديم، اتركه فارغًا إذا لا يوجد:",
            product.oldPrice || ""
        );

    if (oldPrice === null) return;


    const description =
        prompt(
            "الوصف:",
            product.description || ""
        );

    if (description === null) return;


    const category =
        prompt(
            "Category: instagram / tiktok / youtube / autres",
            product.category
        );

    if (category === null) return;


    const position =
        prompt(
            "Position:",
            product.position
        );

    if (position === null) return;


    product.name =
        name.trim() || product.name;

    product.price =
        price.trim() || product.price;

    product.oldPrice =
        oldPrice.trim();

    product.discount =
        Boolean(product.oldPrice);

    product.description =
        description.trim();

    product.category =
        category.trim().toLowerCase() ||
        product.category;

    product.position =
        Number(position) ||
        product.position;


    saveProducts(products);

    renderProducts();

    renderAdminProducts();

}


/* =====================================================
   BADGE
   ===================================================== */

function editBadge(id) {

    if (!isAdmin()) return;


    const products =
        getProducts();

    const product =
        products.find(p => p.id === id);

    if (!product) return;


    const enabled =
        confirm(
            "هل تريد تفعيل الـBadge لهذا المنتج؟"
        );


    product.badgeEnabled =
        enabled;


    if (enabled) {

        const text =
            prompt(
                "اكتب كلمة الـBadge:",
                product.badgeText || "PROMO"
            );

        if (text !== null && text.trim()) {

            product.badgeText =
                text.trim();

        }

    }


    saveProducts(products);

    renderProducts();

    renderAdminProducts();

}


/* =====================================================
   VISIBILITY
   ===================================================== */

function toggleProductVisibility(id) {

    if (!isAdmin()) return;


    const products =
        getProducts();

    const product =
        products.find(p => p.id === id);

    if (!product) return;


    product.visible =
        product.visible === false;


    saveProducts(products);

    renderProducts();

    renderAdminProducts();

}


/* =====================================================
   PRODUCT IMAGE
   ===================================================== */

async function changeProductImage(id) {

    if (!isAdmin()) return;


    const products =
        getProducts();

    const product =
        products.find(p => p.id === id);

    if (!product) return;


    const url =
        prompt(
            "رابط الصورة الجديد أو اتركه فارغًا لاختيار ملف:",
            product.image || ""
        );


    if (url === null) return;


    if (url.trim()) {

        product.image =
            url.trim();

    } else {

        const input =
            document.createElement("input");

        input.type =
            "file";

        input.accept =
            "image/*";


        input.onchange =
            async () => {

                if (!input.files[0]) return;

                product.image =
                    await fileToDataURL(
                        input.files[0]
                    );

                saveProducts(products);

                renderProducts();

                renderAdminProducts();

            };


        input.click();

        return;

    }


    saveProducts(products);

    renderProducts();

    renderAdminProducts();

}


/* =====================================================
   DELETE
   ===================================================== */

function deleteProduct(id) {

    if (!isAdmin()) return;


    const products =
        getProducts();

    const product =
        products.find(p => p.id === id);

    if (!product) return;


    if (
        !confirm(
            `هل تريد حذف "${product.name}"؟`
        )
    ) return;


    const updated =
        products.filter(
            p => p.id !== id
        );


    saveProducts(updated);

    renderProducts();

    renderAdminProducts();

}


/* =====================================================
   SERVICES
   ===================================================== */

function renderAdminServices() {

    const container =
        document.getElementById("adminServices");

    if (!container || !isAdmin()) return;


    const products =
        getProducts();


    container.innerHTML = "";


    products.forEach(product => {

        const div =
            document.createElement("div");

        div.className =
            "admin-product";


        div.innerHTML = `
            <div></div>
            <div class="admin-product-info">
                <h4>${escapeHTML(product.name)}</h4>
                <small>
                    Quantities:
                    ${
                        product.quantities?.length
                        ? product.quantities
                            .map(q =>
                                `${q.value} → ${q.price}`
                            )
                            .join(" | ")
                        : "غير محددة"
                    }
                </small>
            </div>
        `;


        const button =
            createAdminButton(
                "Quantities",
                "edit-btn",
                () => editQuantities(product.id)
            );


        div.appendChild(button);

        container.appendChild(div);

    });

}


function editQuantities(id) {

    const products =
        getProducts();

    const product =
        products.find(p => p.id === id);

    if (!product) return;


    const raw =
        prompt(
            "أدخل الكميات بهذا الشكل:\n1000=10DT\n2000=18DT\n3000=25DT",
            product.quantities
                .map(q => `${q.value}=${q.price}`)
                .join("\n")
        );


    if (raw === null) return;


    product.quantities =
        raw
        .split("\n")
        .map(line => {

            const parts =
                line.split("=");

            return {

                value:
                    (parts[0] || "").trim(),

                price:
                    (parts[1] || "").trim()

            };

        })
        .filter(q =>
            q.value &&
            q.price
        );


    if (product.quantities.length) {

        product.quantity =
            product.quantities[0].value;

        product.price =
            product.quantities[0].price;

    }


    saveProducts(products);

    renderProducts();

    renderAdminServices();

    renderAdminProducts();

}


/* =====================================================
   PORTFOLIO STORAGE
   ===================================================== */

function getPortfolio() {

    const saved =
        localStorage.getItem(
            "kriaa_portfolio"
        );


    if (saved) {

        try {

            const data =
                JSON.parse(saved);

            if (Array.isArray(data)) {

                return data;

            }

        } catch {}

    }


    return [];

}


function savePortfolio(projects) {

    localStorage.setItem(
        "kriaa_portfolio",
        JSON.stringify(projects)
    );

}


/* =====================================================
   ADD PORTFOLIO
   ===================================================== */

async function addPortfolioProject() {

    if (!isAdmin()) return;


    const name =
        document
        .getElementById("portfolioName")
        .value
        .trim();

    const description =
        document
        .getElementById("portfolioDescription")
        .value
        .trim();

    const url =
        document
        .getElementById("portfolioUrl")
        .value
        .trim();

    const year =
        document
        .getElementById("portfolioYear")
        .value
        .trim();

    const imageUrl =
        document
        .getElementById("portfolioImageUrl")
        .value
        .trim();

    const file =
        document
        .getElementById("portfolioImageFile")
        .files[0];

    const fit =
        document
        .getElementById("portfolioFit")
        .value;

    const width =
        Number(
            document
            .getElementById("portfolioWidth")
            .value
        ) || 0;

    const height =
        Number(
            document
            .getElementById("portfolioHeight")
            .value
        ) || 0;


    if (!name) {

        alert("أدخل اسم المشروع.");

        return;

    }


    let image =
        imageUrl;


    if (file) {

        image =
            await fileToDataURL(file);

    }


    const projects =
        getPortfolio();


    projects.push({

        id: Date.now(),

        name,

        description,

        url,

        year,

        image,

        fit,

        width,

        height,

        visible: true,

        position:
            projects.length + 1

    });


    savePortfolio(projects);

    clearPortfolioForm();

    renderPortfolio();

    renderAdminPortfolio();

    alert("تمت إضافة المشروع.");

}


function clearPortfolioForm() {

    [
        "portfolioName",
        "portfolioDescription",
        "portfolioUrl",
        "portfolioYear",
        "portfolioImageUrl",
        "portfolioWidth",
        "portfolioHeight"
    ].forEach(id => {

        const el =
            document.getElementById(id);

        if (el) el.value = "";

    });

}


/* =====================================================
   RENDER PORTFOLIO
   ===================================================== */

function renderPortfolio() {

    const container =
        document.getElementById(
            "portfolioContainer"
        );

    if (!container) return;


    const projects =
        getPortfolio()
        .filter(project =>
            project.visible !== false
        )
        .sort(
            (a,b) =>
                (a.position || 0) -
                (b.position || 0)
        );


    container.innerHTML = "";


    projects.forEach(project => {

        const card =
            document.createElement("article");

        card.className =
            "portfolio-card";


        const img =
            document.createElement("img");

        img.src =
            project.image || "";

        img.alt =
            project.name;

        img.loading =
            "lazy";

        img.style.objectFit =
            project.fit || "cover";


        if (project.width) {
            img.style.width =
                project.width + "px";
        }

        if (project.height) {
            img.style.height =
                project.height + "px";
        }


        const content =
            document.createElement("div");

        content.className =
            "portfolio-content";


        content.innerHTML = `
            <h3>${escapeHTML(project.name)}</h3>
            <p>${escapeHTML(project.description || "")}</p>
            ${
                project.year
                ? `<small>${escapeHTML(project.year)}</small>`
                : ""
            }
        `;


        if (project.url) {

            const link =
                document.createElement("a");

            link.className =
                "visit-btn";

            link.href =
                project.url;

            link.target =
                "_blank";

            link.rel =
                "noopener noreferrer";

            link.textContent =
                "VISITER LE SITE →";

            content.appendChild(link);

        }


        card.append(
            img,
            content
        );


        container.appendChild(card);

    });

}


/* =====================================================
   ADMIN PORTFOLIO
   ===================================================== */

function renderAdminPortfolio() {

    const container =
        document.getElementById(
            "adminPortfolio"
        );

    if (!container || !isAdmin()) return;


    const projects =
        getPortfolio();


    container.innerHTML = "";


    projects.forEach(project => {

        const item =
            document.createElement("div");

        item.className =
            "admin-portfolio-item";


        const img =
            document.createElement("img");

        img.src =
            project.image || "";


        const info =
            document.createElement("div");


        info.innerHTML = `
            <strong>
                ${escapeHTML(project.name)}
            </strong>

            <br>

            <small>
                ${escapeHTML(project.description || "")}
            </small>

            <br>

            <small>
                Position: ${project.position}
                · ${project.visible ? "Visible" : "Hidden"}
            </small>
        `;


        const actions =
            document.createElement("div");

        actions.className =
            "admin-actions";


        actions.append(

            createAdminButton(
                "Edit",
                "edit-btn",
                () => editPortfolio(project.id)
            ),

            createAdminButton(
                project.visible
                    ? "Hide"
                    : "Show",
                "toggle-btn",
                () => togglePortfolio(project.id)
            ),

            createAdminButton(
                "Delete",
                "delete-btn",
                () => deletePortfolio(project.id)
            )

        );


        item.append(
            img,
            info,
            actions
        );


        container.appendChild(item);

    });

}


function editPortfolio(id) {

    const projects =
        getPortfolio();

    const project =
        projects.find(p => p.id === id);

    if (!project) return;


    const name =
        prompt(
            "اسم المشروع:",
            project.name
        );

    if (name === null) return;


    const description =
        prompt(
            "الوصف:",
            project.description || ""
        );

    if (description === null) return;


    const url =
        prompt(
            "رابط الموقع:",
            project.url || ""
        );

    if (url === null) return;


    const position =
        prompt(
            "Position:",
            project.position
        );

    if (position === null) return;


    project.name =
        name.trim();

    project.description =
        description.trim();

    project.url =
        url.trim();

    project.position =
        Number(position) ||
        project.position;


    savePortfolio(projects);

    renderPortfolio();

    renderAdminPortfolio();

}


function togglePortfolio(id) {

    const projects =
        getPortfolio();

    const project =
        projects.find(p => p.id === id);

    if (!project) return;


    project.visible =
        project.visible === false;


    savePortfolio(projects);

    renderPortfolio();

    renderAdminPortfolio();

}


function deletePortfolio(id) {

    const projects =
        getPortfolio();

    const project =
        projects.find(p => p.id === id);

    if (!project) return;


    if (
        !confirm(
            `حذف مشروع "${project.name}"؟`
        )
    ) return;


    savePortfolio(
        projects.filter(
            p => p.id !== id
        )
    );


    renderPortfolio();

    renderAdminPortfolio();

}


/* =====================================================
   IMAGE TOOLS
   ===================================================== */

function renderAdminImageTools() {

    const container =
        document.getElementById(
            "adminImageTools"
        );

    if (!container || !isAdmin()) return;


    const products =
        getProducts();


    container.innerHTML = "";


    products.forEach(product => {

        const wrapper =
            document.createElement("div");

        wrapper.className =
            "admin-panel";


        wrapper.innerHTML = `
            <strong>
                ${escapeHTML(product.name)}
            </strong>

            <br><br>

            <label>
                Width
                <input
                    type="number"
                    value="${product.thumbnailWidth || 300}"
                    onchange="updateThumbnailSize(${product.id}, 'width', this.value)"
                >
            </label>

            <label>
                Height
                <input
                    type="number"
                    value="${product.thumbnailHeight || 300}"
                    onchange="updateThumbnailSize(${product.id}, 'height', this.value)"
                >
            </label>

            <select
                onchange="updateThumbnailSize(${product.id}, 'fit', this.value)"
            >

                <option value="cover"
                    ${product.thumbnailFit === "cover" ? "selected" : ""}>
                    Cover
                </option>

                <option value="contain"
                    ${product.thumbnailFit === "contain" ? "selected" : ""}>
                    Contain
                </option>

                <option value="fill"
                    ${product.thumbnailFit === "fill" ? "selected" : ""}>
                    Fill
                </option>

            </select>

            <select
                onchange="updateThumbnailSize(${product.id}, 'position', this.value)"
            >

                <option value="center">Center</option>
                <option value="top">Top</option>
                <option value="bottom">Bottom</option>
                <option value="left">Left</option>
                <option value="right">Right</option>

            </select>
        `;


        container.appendChild(wrapper);

    });

}


function updateThumbnailSize(id, property, value) {

    const products =
        getProducts();

    const product =
        products.find(p => p.id === id);

    if (!product) return;


    if (property === "width") {

        product.thumbnailWidth =
            Number(value) || 300;

    }

    if (property === "height") {

        product.thumbnailHeight =
            Number(value) || 300;

    }

    if (property === "fit") {

        product.thumbnailFit =
            value;

    }

    if (property === "position") {

        product.thumbnailPosition =
            value;

    }


    saveProducts(products);

}


/* =====================================================
   GLOBAL SETTINGS
   ===================================================== */

function saveGlobalSettings() {

    const mode =
        document
        .getElementById("thumbnailQuantityMode")
        ?.value;

    if (!mode) return;

    localStorage.setItem(
        "kriaa_thumbnail_quantity_mode",
        mode
    );

}


function loadGlobalSettings() {

    const saved =
        localStorage.getItem(
            "kriaa_thumbnail_quantity_mode"
        );

    const select =
        document.getElementById(
            "thumbnailQuantityMode"
        );

    if (select && saved) {

        select.value =
            saved;

    }

}


/* =====================================================
   LANGUAGE
   ===================================================== */

const translations = {

    ar: {

        home: "الرئيسية",

        services: "الخدمات",

        portfolio: "PORTE FELY0",

        login: "تسجيل الدخول",

        logout: "تسجيل الخروج",

        heroTitle:
            "تجربة رقمية بتفاصيل مختلفة",

        heroText:
            "خدمات رقمية وتصاميم وتجارب مخصصة.",

        discover:
            "اكتشف الخدمات →",

        servicesTitle:
            "خدماتنا",

        loginTitle:
            "تسجيل الدخول"

    },


    fr: {

        home: "Accueil",

        services: "Services",

        portfolio: "PORTE FELY0",

        login: "Connexion",

        logout: "Déconnexion",

        heroTitle:
            "Une expérience digitale différente",

        heroText:
            "Services digitaux, designs et expériences personnalisées.",

        discover:
            "Découvrir les services →",

        servicesTitle:
            "Nos services",

        loginTitle:
            "Connexion"

    },


    en: {

        home: "Home",

        services: "Services",

        portfolio: "PORTE FELY0",

        login: "Login",

        logout: "Logout",

        heroTitle:
            "A different digital experience",

        heroText:
            "Digital services, designs and custom experiences.",

        discover:
            "Discover services →",

        servicesTitle:
            "Our Services",

        loginTitle:
            "Login"

    }

};


function changeLanguage(language) {

    if (!translations[language]) {
        language = "ar";
    }


    const data =
        translations[language];


    document
        .querySelectorAll("[data-i18n]")
        .forEach(element => {

            const key =
                element.dataset.i18n;

            if (data[key]) {

                element.textContent =
                    data[key];

            }

        });


    document.documentElement.lang =
        language;

    document.documentElement.dir =
        language === "ar"
            ? "rtl"
            : "ltr";


    localStorage.setItem(
        "kriaa_language",
        language
    );

}


function loadLanguage() {

    const language =
        localStorage.getItem(
            "kriaa_language"
        ) || "ar";


    const select =
        document.getElementById(
            "languageSelect"
        );


    if (select) {

        select.value =
            language;

    }


    changeLanguage(language);

}


/* =====================================================
   SECURITY / ESCAPE
   ===================================================== */

function escapeHTML(value) {

    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}


/* =====================================================
   MODAL
   ===================================================== */

document.addEventListener(
    "click",
    event => {

        const modal =
            document.getElementById("loginModal");

        if (
            modal &&
            event.target === modal
        ) {

            closeLogin();

        }

    }
);


document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Enter" &&
            document
                .getElementById("loginModal")
                ?.classList
                .contains("show")
        ) {

            login();

        }

    }
);


/* =====================================================
   INITIALIZATION
   ===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        getProducts();

        renderProducts();

        renderPortfolio();

        updateLoginUI();

        loadLanguage();

        loadGlobalSettings();

    }
);
