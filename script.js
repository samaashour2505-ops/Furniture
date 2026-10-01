/* =========================================
   FURNICASA - SCRIPT.JS
========================================= */


/* =========================================
   PRODUCTS DATA
========================================= */

const products = [
    {
        id: 1,
        name: "Luna Sofa",
        category: "Sofas",
        price: 850,
        oldPrice: 1000,
        rating: 5,
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80",
        description:
            "A comfortable modern sofa designed with premium fabric and a clean elegant shape. Perfect for contemporary living rooms."
    },

    {
        id: 2,
        name: "Milo Chair",
        category: "Chairs",
        price: 320,
        oldPrice: 390,
        rating: 5,
        image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80",
        description:
            "A stylish accent chair with a soft seat and elegant wooden details. Perfect for reading corners and living spaces."
    },

    {
        id: 3,
        name: "Oak Dining Table",
        category: "Tables",
        price: 720,
        oldPrice: 850,
        rating: 4,
        image: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&w=800&q=80",
        description:
            "A beautiful oak dining table combining natural materials with modern minimal design."
    },

    {
        id: 4,
        name: "Cloud Bed",
        category: "Beds",
        price: 1200,
        oldPrice: 1450,
        rating: 5,
        image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80",
        description:
            "A luxurious upholstered bed designed to bring comfort and a calm modern feeling to your bedroom."
    },

    {
        id: 5,
        name: "Nora Sofa",
        category: "Sofas",
        price: 950,
        oldPrice: 1100,
        rating: 4,
        image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=800&q=80",
        description:
            "A sophisticated sofa with soft cushions and a timeless neutral design."
    },

    {
        id: 6,
        name: "Aria Lounge Chair",
        category: "Chairs",
        price: 450,
        oldPrice: 520,
        rating: 5,
        image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=800&q=80",
        description:
            "A comfortable lounge chair with a premium finish, ideal for relaxing spaces."
    },

    {
        id: 7,
        name: "Marble Coffee Table",
        category: "Tables",
        price: 580,
        oldPrice: 680,
        rating: 5,
        image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=800&q=80",
        description:
            "A modern coffee table featuring a refined marble-inspired surface and elegant structure."
    },

    {
        id: 8,
        name: "Nova King Bed",
        category: "Beds",
        price: 1400,
        oldPrice: 1650,
        rating: 5,
        image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80",
        description:
            "A premium king-size bed with a modern upholstered headboard and luxurious details."
    }
];


/* =========================================
   GLOBAL STATE
========================================= */

let cart = JSON.parse(localStorage.getItem("furnicasaCart")) || [];

let favorites =
    JSON.parse(localStorage.getItem("furnicasaFavorites")) || [];

let currentFilter = "all";

let currentProduct = null;


/* =========================================
   DOM ELEMENTS
========================================= */

const productsGrid =
    document.getElementById("productsGrid");

const cartSidebar =
    document.getElementById("cartSidebar");

const cartOverlay =
    document.getElementById("cartOverlay");

const cartItems =
    document.getElementById("cartItems");

const cartCount =
    document.getElementById("cartCount");

const cartTotal =
    document.getElementById("cartTotal");

const favoriteCount =
    document.getElementById("favoriteCount");

const toast =
    document.getElementById("toast");

const toastMessage =
    document.getElementById("toastMessage");

const productModal =
    document.getElementById("productModal");


/* =========================================
   DISPLAY PRODUCTS
========================================= */

function displayProducts(list = products) {

    if (list.length === 0) {

        productsGrid.innerHTML = `
            <div class="no-products">
                <i class="fa-solid fa-couch"></i>
                <h3>No products found</h3>
                <p>Try another search or category.</p>
            </div>
        `;

        return;
    }


    productsGrid.innerHTML = list.map(product => {

        const isFavorite =
            favorites.includes(product.id);

        return `

            <div class="product-card">

                <div class="product-image">

                    <img
                        src="${product.image}"
                        alt="${product.name}"
                    >

                    <div class="product-actions">

                        <button
                            class="product-action favorite ${isFavorite ? "active" : ""}"
                            onclick="toggleFavorite(${product.id})"
                            title="Add to favorites"
                        >

                            <i class="${
                                isFavorite
                                    ? "fa-solid"
                                    : "fa-regular"
                            } fa-heart"></i>

                        </button>


                        <button
                            class="product-action"
                            onclick="openProductModal(${product.id})"
                            title="View product"
                        >

                            <i class="fa-solid fa-eye"></i>

                        </button>

                    </div>

                </div>


                <div class="product-info">

                    <span class="product-category">
                        ${product.category}
                    </span>

                    <h3 class="product-name">
                        ${product.name}
                    </h3>


                    <div class="product-rating">

                        ${generateStars(product.rating)}

                    </div>


                    <div class="product-price">

                        $${product.price}

                        ${
                            product.oldPrice
                                ? `<span>$${product.oldPrice}</span>`
                                : ""
                        }

                    </div>


                    <button
                        class="btn primary-btn add-product-btn"
                        onclick="addToCart(${product.id})"
                        style="margin-top:15px;width:100%;"
                    >

                        Add To Cart

                        <i class="fa-solid fa-bag-shopping"></i>

                    </button>

                </div>

            </div>

        `;

    }).join("");
}


/* =========================================
   GENERATE STARS
========================================= */

function generateStars(rating) {

    let stars = "";

    for (let i = 1; i <= 5; i++) {

        stars +=
            i <= rating
                ? "★"
                : "☆";

    }

    return stars;
}


/* =========================================
   FILTER PRODUCTS
========================================= */

function filterProducts(category) {

    currentFilter = category;

    let filteredProducts;

    if (category === "all") {

        filteredProducts = products;

    } else {

        filteredProducts =
            products.filter(
                product =>
                    product.category === category
            );

    }

    displayProducts(filteredProducts);
}


/* =========================================
   FILTER BUTTONS
========================================= */

const filterButtons =
    document.querySelectorAll(".filter-btn");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        const category =
            button.dataset.filter;

        filterProducts(category);

    });

});


/* =========================================
   CATEGORY CARDS
========================================= */

const categoryCards =
    document.querySelectorAll(".category-card");

categoryCards.forEach(card => {

    card.addEventListener("click", () => {

        const category =
            card.dataset.category;

        document
            .getElementById("products")
            .scrollIntoView({
                behavior: "smooth"
            });


        filterButtons.forEach(button => {

            button.classList.remove("active");

            if (
                button.dataset.filter === category
            ) {

                button.classList.add("active");

            }

        });

        filterProducts(category);

    });

});


/* =========================================
   SORT PRODUCTS
========================================= */

const sortProducts =
    document.getElementById("sortProducts");

sortProducts.addEventListener("change", () => {

    let list = [...products];


    if (currentFilter !== "all") {

        list =
            list.filter(
                product =>
                    product.category === currentFilter
            );

    }


    if (sortProducts.value === "low") {

        list.sort(
            (a, b) =>
                a.price - b.price
        );

    }


    if (sortProducts.value === "high") {

        list.sort(
            (a, b) =>
                b.price - a.price
        );

    }


    displayProducts(list);

});


/* =========================================
   SEARCH
========================================= */

const searchBtn =
    document.getElementById("searchBtn");

const searchOverlay =
    document.getElementById("searchOverlay");

const closeSearch =
    document.getElementById("closeSearch");

const searchInput =
    document.getElementById("searchInput");


searchBtn.addEventListener("click", () => {

    searchOverlay.classList.add("active");

    setTimeout(() => {

        searchInput.focus();

    }, 100);

});


closeSearch.addEventListener("click", () => {

    searchOverlay.classList.remove("active");

    searchInput.value = "";

    filterProducts(currentFilter);

});


searchOverlay.addEventListener("click", e => {

    if (e.target === searchOverlay) {

        searchOverlay.classList.remove("active");

    }

});


searchInput.addEventListener("input", () => {

    const searchValue =
        searchInput.value
            .toLowerCase()
            .trim();


    let results =
        products.filter(product =>

            product.name
                .toLowerCase()
                .includes(searchValue)

            ||

            product.category
                .toLowerCase()
                .includes(searchValue)

        );


    if (currentFilter !== "all") {

        results =
            results.filter(
                product =>
                    product.category === currentFilter
            );

    }


    displayProducts(results);

});


/* =========================================
   FAVORITES
========================================= */

function toggleFavorite(productId) {

    if (favorites.includes(productId)) {

        favorites =
            favorites.filter(
                id => id !== productId
            );

        showToast("Removed from favorites");

    } else {

        favorites.push(productId);

        showToast("Added to favorites ❤️");

    }


    localStorage.setItem(
        "furnicasaFavorites",
        JSON.stringify(favorites)
    );


    updateCounters();

    filterProducts(currentFilter);

}


/* =========================================
   FAVORITES BUTTON
========================================= */

const favoriteBtn =
    document.getElementById("favoriteBtn");

favoriteBtn.addEventListener("click", () => {

    if (favorites.length === 0) {

        showToast("Your favorites list is empty");

        return;

    }


    const favoriteProducts =
        products.filter(
            product =>
                favorites.includes(product.id)
        );


    productsGrid.innerHTML =
        favoriteProducts.map(product => {

            const isFavorite = true;

            return `

                <div class="product-card">

                    <div class="product-image">

                        <img
                            src="${product.image}"
                            alt="${product.name}"
                        >

                        <div class="product-actions">

                            <button
                                class="product-action favorite active"
                                onclick="toggleFavorite(${product.id})"
                            >
                                <i class="fa-solid fa-heart"></i>
                            </button>

                            <button
                                class="product-action"
                                onclick="openProductModal(${product.id})"
                            >
                                <i class="fa-solid fa-eye"></i>
                            </button>

                        </div>

                    </div>


                    <div class="product-info">

                        <span class="product-category">
                            ${product.category}
                        </span>

                        <h3 class="product-name">
                            ${product.name}
                        </h3>

                        <div class="product-rating">
                            ${generateStars(product.rating)}
                        </div>

                        <div class="product-price">
                            $${product.price}
                        </div>

                        <button
                            class="btn primary-btn"
                            onclick="addToCart(${product.id})"
                            style="margin-top:15px;width:100%;"
                        >
                            Add To Cart
                            <i class="fa-solid fa-bag-shopping"></i>
                        </button>

                    </div>

                </div>

            `;

        }).join("");


    document
        .getElementById("products")
        .scrollIntoView({
            behavior: "smooth"
        });

});


/* =========================================
   ADD TO CART
========================================= */

function addToCart(productId) {

    const product =
        products.find(
            item =>
                item.id === productId
        );


    if (!product) return;


    const existingItem =
        cart.find(
            item =>
                item.id === productId
        );


    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({

            id: product.id,

            name: product.name,

            price: product.price,

            image: product.image,

            quantity: 1

        });

    }


    saveCart();

    updateCartUI();

    showToast(
        `${product.name} added to cart`
    );

}


/* =========================================
   REMOVE FROM CART
========================================= */

function removeFromCart(productId) {

    cart =
        cart.filter(
            item =>
                item.id !== productId
        );


    saveCart();

    updateCartUI();

}


/* =========================================
   CHANGE QUANTITY
========================================= */

function changeQuantity(productId, change) {

    const item =
        cart.find(
            item =>
                item.id === productId
        );


    if (!item) return;


    item.quantity += change;


    if (item.quantity <= 0) {

        removeFromCart(productId);

        return;

    }


    saveCart();

    updateCartUI();

}


/* =========================================
   SAVE CART
========================================= */

function saveCart() {

    localStorage.setItem(
        "furnicasaCart",
        JSON.stringify(cart)
    );

}


/* =========================================
   UPDATE CART UI
========================================= */

function updateCartUI() {

    if (cart.length === 0) {

        cartItems.innerHTML = `

            <div class="empty-cart">

                <i class="fa-solid fa-bag-shopping"></i>

                <h3>Your cart is empty</h3>

                <p>Add some beautiful furniture.</p>

            </div>

        `;

    } else {

        cartItems.innerHTML =
            cart.map(item => `

                <div class="cart-item">

                    <div class="cart-item-image">

                        <img
                            src="${item.image}"
                            alt="${item.name}"
                        >

                    </div>


                    <div class="cart-item-info">

                        <h3>
                            ${item.name}
                        </h3>

                        <p>
                            $${item.price}
                        </p>


                        <div class="quantity-controls">

                            <button
                                onclick="changeQuantity(${item.id}, -1)"
                            >
                                -
                            </button>

                            <span>
                                ${item.quantity}
                            </span>

                            <button
                                onclick="changeQuantity(${item.id}, 1)"
                            >
                                +
                            </button>

                        </div>

                    </div>


                    <button
                        class="remove-item"
                        onclick="removeFromCart(${item.id})"
                        title="Remove"
                    >

                        <i class="fa-solid fa-trash"></i>

                    </button>

                </div>

            `).join("");

    }


    updateCounters();

    calculateTotal();

}


/* =========================================
   UPDATE COUNTERS
========================================= */

function updateCounters() {

    const totalItems =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );


    cartCount.textContent =
        totalItems;


    favoriteCount.textContent =
        favorites.length;

}


/* =========================================
   CALCULATE TOTAL
========================================= */

function calculateTotal() {

    const total =
        cart.reduce(
            (sum, item) =>
                sum +
                item.price * item.quantity,
            0
        );


    cartTotal.textContent =
        `$${total.toFixed(2)}`;

}


/* =========================================
   OPEN CART
========================================= */

const cartBtn =
    document.getElementById("cartBtn");

cartBtn.addEventListener("click", () => {

    cartSidebar.classList.add("active");

    cartOverlay.classList.add("active");

    document.body.classList.add("no-scroll");

});


/* =========================================
   CLOSE CART
========================================= */

const closeCart =
    document.getElementById("closeCart");


function closeCartSidebar() {

    cartSidebar.classList.remove("active");

    cartOverlay.classList.remove("active");

    document.body.classList.remove("no-scroll");

}


closeCart.addEventListener(
    "click",
    closeCartSidebar
);


cartOverlay.addEventListener(
    "click",
    closeCartSidebar
);


/* =========================================
   PRODUCT MODAL
========================================= */

function openProductModal(productId) {

    const product =
        products.find(
            item =>
                item.id === productId
        );


    if (!product) return;


    currentProduct = product;


    document.getElementById("modalImage").src =
        product.image;


    document.getElementById("modalImage").alt =
        product.name;


    document.getElementById("modalCategory").textContent =
        product.category;


    document.getElementById("modalTitle").textContent =
        product.name;


    document.getElementById("modalDescription").textContent =
        product.description;


    document.getElementById("modalPrice").textContent =
        `$${product.price}`;


    productModal.classList.add("active");

    document.body.classList.add("no-scroll");

}


/* =========================================
   CLOSE PRODUCT MODAL
========================================= */

const modalClose =
    document.getElementById("modalClose");


modalClose.addEventListener("click", closeProductModal);


function closeProductModal() {

    productModal.classList.remove("active");

    document.body.classList.remove("no-scroll");

}


productModal.addEventListener("click", e => {

    if (e.target === productModal) {

        closeProductModal();

    }

});


/* =========================================
   ADD FROM MODAL
========================================= */

const modalAddToCart =
    document.getElementById("modalAddToCart");


modalAddToCart.addEventListener("click", () => {

    if (!currentProduct) return;


    addToCart(currentProduct.id);

    closeProductModal();

    setTimeout(() => {

        cartSidebar.classList.add("active");

        cartOverlay.classList.add("active");

        document.body.classList.add("no-scroll");

    }, 300);

});


/* =========================================
   MOBILE MENU
========================================= */

const menuBtn =
    document.getElementById("menuBtn");

const navbar =
    document.getElementById("navbar");


menuBtn.addEventListener("click", () => {

    navbar.classList.toggle("active");


    const icon =
        menuBtn.querySelector("i");


    if (navbar.classList.contains("active")) {

        icon.classList.remove("fa-bars");

        icon.classList.add("fa-xmark");

    } else {

        icon.classList.remove("fa-xmark");

        icon.classList.add("fa-bars");

    }

});


/* =========================================
   CLOSE MOBILE MENU
========================================= */

document
    .querySelectorAll(".navbar a")
    .forEach(link => {

        link.addEventListener("click", () => {

            navbar.classList.remove("active");

            const icon =
                menuBtn.querySelector("i");

            icon.classList.remove("fa-xmark");

            icon.classList.add("fa-bars");

        });

    });


/* =========================================
   TOAST
========================================= */

let toastTimer;


function showToast(message) {

    toastMessage.textContent =
        message;


    toast.classList.add("show");


    clearTimeout(toastTimer);


    toastTimer =
        setTimeout(() => {

            toast.classList.remove("show");

        }, 2500);

}


/* =========================================
   NEWSLETTER FORM
========================================= */

const newsletterForm =
    document.getElementById("newsletterForm");


newsletterForm.addEventListener("submit", e => {

    e.preventDefault();


    const email =
        document.getElementById("emailInput").value;


    if (email.trim() === "") return;


    showToast(
        "Thanks for subscribing!"
    );


    newsletterForm.reset();

});


/* =========================================
   CONTACT FORM
========================================= */

const contactForm =
    document.getElementById("contactForm");


contactForm.addEventListener("submit", e => {

    e.preventDefault();


    showToast(
        "Your message has been sent!"
    );


    contactForm.reset();

});


/* =========================================
   CHECKOUT
========================================= */

const checkoutBtn =
    document.getElementById("checkoutBtn");


checkoutBtn.addEventListener("click", () => {

    if (cart.length === 0) {

        showToast(
            "Your cart is empty"
        );

        return;

    }


    showToast(
        "Checkout feature coming soon!"
    );

});


/* =========================================
   ESC KEY
========================================= */

document.addEventListener("keydown", e => {

    if (e.key === "Escape") {

        searchOverlay.classList.remove("active");

        closeProductModal();

        closeCartSidebar();

        navbar.classList.remove("active");

    }

});


/* =========================================
   ACTIVE NAVIGATION ON SCROLL
========================================= */

const sections =
    document.querySelectorAll("section[id]");

const navLinks =
    document.querySelectorAll(".navbar a");


window.addEventListener("scroll", () => {

    let currentSection = "";


    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 150;

        const sectionHeight =
            section.offsetHeight;


        if (
            window.scrollY >= sectionTop &&
            window.scrollY <
            sectionTop + sectionHeight
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");


        if (
            link.getAttribute("href") ===
            `#${currentSection}`
        ) {

            link.classList.add("active");

        }

    });

});


/* =========================================
   INITIALIZE
========================================= */

displayProducts();

updateCartUI();

updateCounters();