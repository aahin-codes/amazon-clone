import { cart } from "../data/cart.js";
import { products } from "../data/products.js";


let cartSummaryHTML = '';
cart.forEach(cartItem => {

    let matchingProduct;
    products.forEach(product => {
        if (product.id === cartItem.productId) {
            matchingProduct = product;
        }
    })

    cartSummaryHTML += `<div class="product">
    <h2>Delivery date: Tuesday, March 17</h2>
    <div class="product-wrapper">
        <div class="product-details">
            <img src="${matchingProduct.image}"
                alt="Product Image">
            <div class="product-info">
                <p>${matchingProduct.name}</p>
                <p>$${matchingProduct.priceCents}</p>
                <div>Quantity: <span>${cartItem.quantity}</span> <span>Update</span><span>Delete</span></div>
            </div>
        </div>
        <div class="product-delivery">
            <h4>Choose a delivery option:</h4>
            <div class="option-1">
                <input type="radio" name="delivery-option" id="option-1">
                <label for="option-1">
                    <span>Tuesday, March 17</span>
                    <span>FREE Shipping</span>
                </label>
            </div>
            <div class="option-2">
                <input type="radio" name="delivery-option" id="option-2">
                <label for="option-2">
                    <span>Wednesday, March 18</span>
                    <span>$3.99 Shipping</span>
                </label>
            </div>
            <div class="option-3">
                <input type="radio" name="delivery-option" id="option-3">
                <label for="option-3">
                    <span>Thursday, March 19</span>
                    <span>$5.99 Shipping</span>
                </label>
            </div>
        </div>
    </div>
</div>`

})

document.querySelector('.js-order-products').innerHTML = cartSummaryHTML;


