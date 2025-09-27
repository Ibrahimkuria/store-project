// cart.js
import { products } from './products.js';

const cartEl = document.querySelector('.cartEl');
let cart = JSON.parse(localStorage.getItem('CART')) || [];

export function initCart(cartBtn, container) {
    const closeBtn = document.createElement('div');
    closeBtn.classList.add('hide');
    closeBtn.innerText = 'X';
    cartEl.appendChild(closeBtn);

    cartBtn.addEventListener('click', () => {
        cartEl.classList.toggle('show');
        container.classList.add('shrink');
    });

    closeBtn.addEventListener('click', () => {
        cartEl.classList.remove('show');
        container.classList.remove('shrink');
    });

    renderCartItems();
}

export function addToCart(id) {
    if (cart.some(item => item.id === id)) {
        alert('Product already in the cart');
        return;
    }
    const product = products.find(p => p.id === id);
    if (product) {
        cart.push({ ...product, numberOfItems: 1 });
        updateCart();
    }
}

export function changeNumberOfItems(action, id) {
    cart = cart.map(item => {
        if (item.id === id) {
            if (action === 'plus' && item.numberOfItems < item.instock) item.numberOfItems++;
            if (action === 'minus' && item.numberOfItems > 1) item.numberOfItems--;
        }
        return item;
    });
    updateCart();
}

export function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

function updateCart() {
    localStorage.setItem('CART', JSON.stringify(cart));
    renderCartItems();
}

function renderCartItems() {
    // Clear items except close button
    cartEl.innerHTML = '';
    const closeBtn = document.createElement('div');
    closeBtn.classList.add('hide');
    closeBtn.innerText = 'X';
    cartEl.appendChild(closeBtn);

    closeBtn.addEventListener('click', () => {
        cartEl.classList.remove('show');
        document.querySelector('.container').classList.remove('shrink');
    });

    let totalPrice = 0;
    let totalItems = 0;

    cart.forEach(product => {
        totalPrice += product.price * product.numberOfItems;
        totalItems += product.numberOfItems;

        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cartItem');
        itemDiv.innerHTML = `
            <span class='remove'>X</span>
            <div class="title">${product.name}</div>
            <div class="cartBody">
                <div class="cartImage"><img src="${product.imgSrc}" alt="${product.name}"></div>
                <div class="alterNum">
                    <button class="plus">+</button>
                    <p>${product.numberOfItems}</p>
                    <button class="minus">-</button>
                </div>
            </div>
        `;
        cartEl.appendChild(itemDiv);

        // Event listeners
        itemDiv.querySelector('.remove').addEventListener('click', () => removeFromCart(product.id));
        itemDiv.querySelector('.plus').addEventListener('click', () => changeNumberOfItems('plus', product.id));
        itemDiv.querySelector('.minus').addEventListener('click', () => changeNumberOfItems('minus', product.id));
    });

    const totalEl = document.createElement('div');
    totalEl.className = 'totalEl';
    totalEl.innerHTML = `<h2>Total: $${totalPrice.toFixed(2)}</h2><p>Items: ${totalItems}</p>`;
    cartEl.appendChild(totalEl);
}
