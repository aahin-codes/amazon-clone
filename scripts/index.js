import { cart, addToCart, updateCartQuantity } from '../data/cart.js';
import { products } from '../data/products.js';
import formatCurrency from './utils/money.js';

let productsHTML = '';



products.forEach(product => {

    // Accumulator Pattern
    productsHTML += `
     <div class="product">
            <figure class="product-image-container">
                <img src="${product.image}" alt="${product.altName}">
            </figure>
            <div class="product-name">${product.name}</div>
            <div class="rating-container">
                <div class="star-container">
               <img src="${product.getStarsUrl()}" alt="Single Full Star">
                </div>
                <span>${product.rating.count}</span>
            </div>
            <div class="product-price">$${product.getPrice()}</div>
            <select name="count">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
            </select>
            <button class="js-add-to-cart" data-product-id="${product.id}">Add to Cart</button>
         </div>
    `
})

document.querySelector('.js-products-container').innerHTML = productsHTML;
document.querySelectorAll(".js-add-to-cart")
    .forEach((button) => {
        button.addEventListener('click', () => {
            const productId = button.dataset.productId;
            addToCart(productId);
            updateCartQuantity();
        })
    })


