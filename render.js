        import { products } from './products.js';
        import { initModal } from './modal.js';
        //import { addToCart } from './cart.js';

        import { initCart, addToCart } from './cart.js';

        const cartBtn = document.querySelector('.cartBtn');   // grab the button
        const container = document.querySelector('.container');
        const activeContainer = document.querySelector('.active-container') // grab the container
        initModal(container, activeContainer);
        initCart(cartBtn, container);  // pass them into cart.js


        
        const shopProducts = document.querySelector('.products')
       
        

        products.forEach((product) => {
  const div = document.createElement('div');
  div.className = 'product';
  div.dataset.id = product.id;
  div.innerHTML = `
    <div class='title'><h1>${product.name}</h1></div>
    <div class='image'><img src='${product.imgSrc}'></div>
    <div class='description'><p>${product.description}</p></div>
    <h3>${product.instock}</h3>
    <button class='btn'>Add to Cart</button>
  `;

  // attach event listener
  div.querySelector('.btn').addEventListener('click', () => addToCart(product.id));

  shopProducts.appendChild(div);
});

        
    const myshop = [
        { id: 1, name: 'Nike Air', brand: 'Nike', category: 'shoes', price: 120 },
        { id: 2, name: 'Adidas T-Shirt', brand: 'Adidas', category: 'clothes', price: 45 },
        { id: 3, name: 'Puma Socks', brand: 'Puma', category: 'accessories', price: 10 },
    ]
    //const choices = document.createElement('div');
    //choices.classList.add('choices')
    //document.querySelector('.products-container').appendChild(choices);
    const brandList = document.getElementById('brandList');
   const brands = [...new Set(myshop.map(p =>p.brand))];
   brandList.innerHTML = ''
   brands.forEach(brand=>{
    brandList.innerHTML += `
    <li><input type='checkbox' value='${brand}'>${brand}</li>
    `
   })
   