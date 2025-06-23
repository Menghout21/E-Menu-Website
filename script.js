document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll(".category a");
    const sections = document.querySelectorAll("section");
    navLinks.forEach(link => {
        link.addEventListener("click", function () {
            navLinks.forEach(l => l.classList.remove("active"));
            this.classList.add("active");
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
                    link.classList.remove("active");
                    if (link.getAttribute("href") === "#" + id) {
                        link.classList.add("active");
                    }
                });
            }
        });
    });
    window.addEventListener("scroll", function () {
        const logo = document.getElementById("siteLogo");
        const nav = document.querySelector(".main-nav");
        const category = document.getElementById("categoryBar");

        if (window.scrollY > 50) {
            logo.classList.add("shrink");
            nav.classList.add("shrink");
            category.classList.add("shrink");
        } else {
            logo.classList.remove("shrink");
            nav.classList.remove("shrink");
            category.classList.remove("shrink");
        }
    });
});

// start function add to cart
document.querySelectorAll('.card').forEach(function(card) {
    const addBtn = card.querySelector('.btn-add');
    const qtySelector = card.querySelector('.quantity-selector');
    const increaseBtn = card.querySelector('.increase');
    const decreaseBtn = card.querySelector('.decrease');
    const qtyValue = card.querySelector('.qty-value');

    let qty = 1;

    addBtn.addEventListener('click', function () {
      addBtn.style.display = 'none';
      qtySelector.style.display = 'flex';
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
        qty = 1;
        qtySelector.style.display = 'none';
        addBtn.style.display = 'flex';
        qtyValue.textContent = qty;
      }
    });
});

// end add to cart function

