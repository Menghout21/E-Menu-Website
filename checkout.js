document.addEventListener('DOMContentLoaded', function () {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemsDetail = document.querySelector('.items-detail');
    const placeOrderBtn = document.getElementById('place-order');
    const totalPriceEl = document.getElementById('total-price');

    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    function updateCartUI() {
        itemsDetail.innerHTML = ''; // Clear old items

        if (cart.length === 0) {
            // Show "No item in cart" message
            const emptyBox = document.createElement('div');
            emptyBox.className = 'box-item d-flex justify-content-center align-items-center';
            emptyBox.innerHTML = `
                <div class="d-block text-center">
                    <span><i class="fa-solid fa-cart-plus fa-2x mb-2"></i></span><br>
                    <span>No item in cart</span>
                </div>
            `;
            itemsDetail.appendChild(emptyBox);
            placeOrderBtn.innerText = 'Back to Menu';
            placeOrderBtn.style.backgroundColor = '#fff'; 
            placeOrderBtn.style.color = '#059941';
            placeOrderBtn.style.border = '1px solid #059941';
        } else {
            cart.forEach((item, index) => {
                const box = document.createElement('div');
                box.classList.add('box-item');
                box.innerHTML = `
                    <div class="name-price">
                        <h5 class="name">${item.title}</h5>
                        <h5 class="price">$${(item.price).toFixed(2)}</h5>
                    </div>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="quantity-selector float-right me-2">
                            <button class="qty-btn decrease"><i class="fa-solid fa-minus"></i></button>
                            <span class="qty-value">${item.qty}</span>
                            <button class="qty-btn increase"><i class="fa-solid fa-plus"></i></button>
                        </div>
                        <button class="remove-cart"><i class="fa-solid fa-trash fs-5 text-danger cursor-pointer remove-cart" ></i></button>
                    </div>
                `;

                // Increase qty
                box.querySelector('.increase').addEventListener('click', () => {
                    cart[index].qty += 1;
                    saveCart();
                    updateCartUI();
                });

                // Decrease qty
                box.querySelector('.decrease').addEventListener('click', () => {
                    if (cart[index].qty > 1) {
                        cart[index].qty -= 1;
                    } else {
                        cart.splice(index, 1);
                    }
                    saveCart();
                    updateCartUI();
                });

                // Delete item
                box.querySelector('.remove-cart').addEventListener('click', () => {
                    cart.splice(index, 1);
                    saveCart();
                    updateCartUI();
                    // alert('Hello world')
                });

                itemsDetail.appendChild(box);

                placeOrderBtn.style.color = '#fff';
            });
        }

        // Update total price
        const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
        totalPriceEl.textContent = `$${totalPrice.toFixed(2)}`;

        // Show total price also in element with id="sub-total"
        const subTotalEl = document.getElementById('sub-total');
        if (subTotalEl) {
            subTotalEl.textContent = `$${totalPrice.toFixed(2)}`;
        }

        // Update total distinct items (number of different products)
        document.getElementById('total-items').textContent = cart.length;

        // Disable button if cart is empty
        placeOrderBtn.disabled = cart.length === 0;
        placeOrderBtn.addEventListener('click', () => {
            if (cart.length === 0) {
                window.location.href = 'index.html'; 
            }
        })
    }


    placeOrderBtn.addEventListener('click', () => {
        if (cart.length === 0) return;

        alert('✅ Your order has been placed!');
        cart = []; 
        saveCart();
        updateCartUI();
    });

    updateCartUI();
});
