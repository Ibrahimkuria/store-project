// modal.js
export function initModal(container, activeContainer) {
    container.addEventListener('click', e => {
        const productDiv = e.target.closest('.product');
        if (!productDiv) return;

        const imgSrc = productDiv.querySelector('img').src;
        const desc = productDiv.querySelector('.description p').innerText;

        activeContainer.innerHTML = '';
        const image = document.createElement('img');
        image.src = imgSrc;
        activeContainer.appendChild(image);

        const text = document.createTextNode(desc);
        activeContainer.appendChild(text);

        const btn = document.createElement('button');
        btn.classList.add('add');
        btn.innerText = 'Add to cart';
        activeContainer.appendChild(btn);

        const span = document.createElement('span');
        span.classList.add('close');
        span.innerText = '×';
        activeContainer.appendChild(span);

        span.addEventListener('click', () => activeContainer.classList.remove('active'));
        activeContainer.classList.add('active');

        btn.addEventListener('click', () => {
            import('./cart.js').then(module => {
                module.addToCart(Number(productDiv.dataset.id));
            });
        });
    });
}
