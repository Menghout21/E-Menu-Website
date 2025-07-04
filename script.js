
document.addEventListener("DOMContentLoaded", function () {
    // Nav link smooth scroll & highlight
    const navLinks = document.querySelectorAll(".category a");
    const sections = document.querySelectorAll("section");

    navLinks.forEach(link => {
        link.addEventListener("click", function () {
            navLinks.forEach(l => l.classList.remove("active"));
            this.classList.add("active");
            this.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
        });
    });

    window.addEventListener("scroll", function () {
        let scrollPosition = window.scrollY + 230;

        sections.forEach(section => {
            const id = section.getAttribute("id");
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    if (link.getAttribute("href") === "#" + id) {
                        if (!link.classList.contains("active")) {
                            navLinks.forEach(l => l.classList.remove("active"));
                            link.classList.add("active");
                            link.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
                        }
                    }
                });
            }
        });
    });

    // Shrink nav on scroll
    let lastScrollTop = 0;
    let isShrunk = false;

    function handleScroll() {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const logo = document.getElementById("siteLogo");
        const nav = document.querySelector(".main-nav");
        const category = document.getElementById("categoryBar");

        if (scrollTop > 80 && !isShrunk) {
            logo.classList.add("shrink");
            nav.classList.add("shrink");
            category.classList.add("shrink");
            isShrunk = true;
        } else if (scrollTop <= 40 && isShrunk) {
            logo.classList.remove("shrink");
            nav.classList.remove("shrink");
            category.classList.remove("shrink");
            isShrunk = false;
        }
    }

    let ticking = false;

    window.addEventListener("scroll", function () {
        if (!ticking) {
            window.requestAnimationFrame(function () {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Add to cart function
  
    const addItemBar = document.getElementById('add-item-bar');
    const itemCountDisplay = document.getElementById('item-count');
    const totalMoneyDisplay = document.querySelector('.total-money');

    let totalQuantity = 0;
    let totalPrice = 0;
    let activeCard = null;

    addItemBar.style.display = 'none';

    document.querySelectorAll('.card').forEach(function(card) {
        const addBtn = card.querySelector('.btn-add');
        const qtySelector = card.querySelector('.quantity-selector');
        const increaseBtn = card.querySelector('.increase');
        const decreaseBtn = card.querySelector('.decrease');
        const qtyValue = card.querySelector('.qty-value');
        const unitPriceEl = card.querySelector('.unit-price');
        const addToCartBar = card.querySelector('.add-to-cart-bar');
        const showDetail = card.querySelector('.show-detail');

        const unitPrice = parseFloat(unitPriceEl.textContent);
        let qty = 0;

        function showQtyUI() {
            addBtn.style.display = 'none';
            qtySelector.style.display = 'flex';
        }

        function hideQtyUI() {
            addBtn.style.display = 'flex';
            qtySelector.style.display = 'none';
        }

        function updateUI() {
            itemCountDisplay.textContent = totalQuantity;
            totalMoneyDisplay.textContent = '$' + totalPrice.toFixed(2);
            if (totalQuantity > 0) {
            addItemBar.style.display = 'block';
            } else {
            addItemBar.style.display = 'none';
            }
        }

        function addToCart() {
            if (qty === 0) {
            qty = 1;
            totalQuantity += 1;
            totalPrice += unitPrice;
            qtyValue.textContent = qty;
            showQtyUI();
            } else {
            qty += 1;
            totalQuantity += 1;
            totalPrice += unitPrice;
            qtyValue.textContent = qty;
            }
            updateUI();
        }

        function decreaseFromCart() {
            if (qty > 0) {
            qty -= 1;
            totalQuantity -= 1;
            totalPrice -= unitPrice;
            qtyValue.textContent = qty;
            if (qty === 0) {
                hideQtyUI();
            }
            updateUI();
            }
        }

        addBtn.addEventListener('click', addToCart);
        if (addToCartBar) {
            addToCartBar.addEventListener('click', addToCart);
        }
        increaseBtn.addEventListener('click', addToCart);
        decreaseBtn.addEventListener('click', decreaseFromCart);

        showDetail.addEventListener('click', function () {
            const title = card.querySelector(".card-title").innerText;
            const description = card.querySelector(".card-text").innerText;
            const price = card.querySelector(".unit-price").innerText;
            const imgSrc = card.querySelector("img").getAttribute("src");

            document.getElementById("productModalLabel").innerText = title;
            document.getElementById("modalDescription").innerText = description;
            document.getElementById("modalPrice").innerText = price;
            document.getElementById("modalImage").setAttribute("src", imgSrc);

            activeCard = card;

            const modal = new bootstrap.Modal(document.getElementById("productModal"));
            modal.show();
        });

        // Save reference for later (per card)
        card._cartState = {
            get qty() { return qty; },
            set qty(v) { qty = v; }
        };
    });

    // Handle modal Add to Cart
    const modalAddToCartBar = document.querySelector('#productModal .add-to-cart-bar');
    modalAddToCartBar.addEventListener('click', function () {
    if (activeCard) {
        const addBtn = activeCard.querySelector('.btn-add');
        const qtyValue = activeCard.querySelector('.qty-value');
        const qtySelector = activeCard.querySelector('.quantity-selector');
        const unitPrice = parseFloat(activeCard.querySelector('.unit-price').textContent);

        // Get current quantity from the card's custom property
        let currentQty = activeCard._cartState.qty;

        if (currentQty === 0) {
        currentQty = 1;
        activeCard._cartState.qty = 1;
        totalQuantity += 1;
        totalPrice += unitPrice;
        qtyValue.textContent = 1;
        addBtn.style.display = 'none';
        qtySelector.style.display = 'flex';
        } else {
        currentQty += 1;
        activeCard._cartState.qty = currentQty;
        totalQuantity += 1;
        totalPrice += unitPrice;
        qtyValue.textContent = currentQty;
        }

        updateUI();
    }

    const modal = bootstrap.Modal.getInstance(document.getElementById("productModal"));
        if (modal) modal.hide();
    });

    function updateUI() {
        itemCountDisplay.textContent = totalQuantity;
        totalMoneyDisplay.textContent = '$' + totalPrice.toFixed(2);
        if (totalQuantity > 0) {
            addItemBar.style.display = 'block';
        } else {
            addItemBar.style.display = 'none';
        }
    }


    // Language switcher
    // const flags = [
    //     { src: "img/cambodia_flag.png", alt: "Khmer", code: "km" },
    //     { src: "img/english_flag.png", alt: "English", code: "en" },
    //     { src: "img/china_flag.png", alt: "Chinese", code: "zh" }
    // ];

    // let currentIndex = 0;

    // function cycleLanguage() {
    //     currentIndex = (currentIndex + 1) % flags.length;
    //     const flag = document.getElementById("language-flag");
    //     flag.src = flags[currentIndex].src;
    //     flag.alt = flags[currentIndex].alt;
    //     localStorage.setItem("lang", flags[currentIndex].code);
    //     console.log("Language set to:", flags[currentIndex].code);
    // }

    // Checkout link on add-item-bar click


    // document.getElementById("add-item-bar").addEventListener("click", function () {
    //     window.location.href = "checkout.html";
    // });

    // Expose language function globally if needed
    window.cycleLanguage = cycleLanguage;
});

