document.addEventListener("DOMContentLoaded", function () {
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

                            // Scroll to show the active tab if overflowed
                            link.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
                        }
                    }
                });
            }
        });
    });

    let lastScrollTop = 0;
    let isShrunk = false;

    function handleScroll() {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const logo = document.getElementById("siteLogo");
        const nav = document.querySelector(".main-nav");
        const category = document.getElementById("categoryBar");

        if (scrollTop > 50 && !isShrunk) {
            logo.classList.add("shrink");
            nav.classList.add("shrink");
            category.classList.add("shrink");
            isShrunk = true;
        } else if (scrollTop <= 50 && isShrunk) {
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
});

// start function add to cart
const addItemBar = document.getElementById('add-item-bar');
const itemCountDisplay = document.getElementById('item-count');
addItemBar.style.display = 'none'; 
let activeCards = 0;

document.querySelectorAll('.card').forEach(function(card) {
    const addBtn = card.querySelector('.btn-add');
    const qtySelector = card.querySelector('.quantity-selector');
    const increaseBtn = card.querySelector('.increase');
    const decreaseBtn = card.querySelector('.decrease');
    const qtyValue = card.querySelector('.qty-value');

    let qty = 0;
    let isActive = false; // Track if this card is currently added

    addBtn.addEventListener('click', function () {
        qty = 1;
        isActive = true;
        qtyValue.textContent = qty;
        activeCards++;
        updateItemCount();

        addBtn.style.display = 'none';
        qtySelector.style.display = 'flex';

        if (addItemBar) {
        addItemBar.style.display = 'block';
        }
    });

    increaseBtn.addEventListener('click', function () {
        qty++;
        qtyValue.textContent = qty;
    });

    decreaseBtn.addEventListener('click', function () {
        if (qty > 1) {
        qty--;
        qtyValue.textContent = qty;
        } else {
        qty = 0;
        qtyValue.textContent = qty;
        qtySelector.style.display = 'none';
        addBtn.style.display = 'flex';

        if (isActive) {
            activeCards--;
            isActive = false;
            updateItemCount();

            if (activeCards === 0 && addItemBar) {
            addItemBar.style.display = 'none';
            }
        }
        }
    });
});

function updateItemCount() {
    itemCountDisplay.textContent = activeCards;
}

// end add to cart function


// Language switcher functionality
const flags = [
    { src: "img/cambodia_flag.png", alt: "Khmer", code: "km" },
    { src: "img/english_flag.png", alt: "English", code: "en" },
    { src: "img/china_flag.png", alt: "Chinese", code: "zh" }
];

let currentIndex = 0;

function cycleLanguage() {
    currentIndex = (currentIndex + 1) % flags.length;
    const flag = document.getElementById("language-flag");
    flag.src = flags[currentIndex].src;
    flag.alt = flags[currentIndex].alt;

    // Optional: store selected language in localStorage
    localStorage.setItem("lang", flags[currentIndex].code);

    // Optional: trigger language change logic here
    console.log("Language set to:", flags[currentIndex].code);
}

