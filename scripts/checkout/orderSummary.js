import { cart, removeFromCart } from "../../data/cart.js";
import { products } from "../../data/products.js";
import formatCurrency from "../utils/money.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";
import { updateDeliveryOption } from "../../data/cart.js";


export function renderOrderSummary() {

    let cartSummaryHTML = '';
    cart.forEach(cartItem => {

        let matchingProduct;
        products.forEach(product => {
            if (product.id === cartItem.productId) {
                matchingProduct = product;
            }
        })

        const deliveryOptionId = cartItem.deliveryOptionId;

        let deliveryOption;

        deliveryOptions.forEach(option => {
            if (option.id === deliveryOptionId) {
                deliveryOption = option;
            }
        })
        const today = dayjs();
        const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
        const dateString = deliveryDate.format('dddd, MMMM, D');


        cartSummaryHTML += `<div class="product js-product-${matchingProduct.id}">
        <h2>Delivery date: ${dateString}</h2>
        <div class="product-wrapper">
            <div class="product-details">
                <img src="${matchingProduct.image}"
                    alt="Product Image">
                <div class="product-info">
                    <p>${matchingProduct.name}</p>
                    <p>$${formatCurrency(matchingProduct.priceCents)}</p>
                    <div>Quantity: <span>${cartItem.quantity}</span> <span>Update</span><span class="delete-quantity-link js-delete-quantity-link" data-product-id="${matchingProduct.id}">Delete</span></div>
                </div>
            </div>
            <div class="product-delivery">
                <h4>Choose a delivery option:</h4>
                ${deliveryOptionsHTML(matchingProduct, cartItem)}
            </div>
        </div>
    </div>`

    });

    function deliveryOptionsHTML(matchingProduct, cartItem) {
        let html = '';
        deliveryOptions.forEach((deliveryOption, ind) => {

            const today = dayjs();
            const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
            const dateString = deliveryDate.format('dddd, MMMM, D');

            const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)}`;

            const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
            html += `<div class="delivery-option js-delivery-option" data-product-id="${matchingProduct.id}" data-delivery-option-id="${deliveryOption.id}">
                    <input type="radio" ${isChecked ? "checked" : ''} name="delivery-option-${matchingProduct.id}" id="option-${ind + 1}-${matchingProduct.id}">
                    <label for="option-${ind + 1}-${matchingProduct.id}">
                        <span>${dateString}</span>
                        <span>${priceString} - Shipping</span>
                    </label>
                </div>`
        })

        return html;
    }

    document.querySelector('.js-order-products').innerHTML = cartSummaryHTML;

    document.querySelectorAll('.js-delete-quantity-link')
        .forEach((link) => {
            link.addEventListener('click', () => {
                const productId = link.dataset.productId;
                removeFromCart(productId);
                const container = document.querySelector(`.js-product-${productId}`);
                container.remove();
            })
        });

    document.querySelectorAll('.js-delivery-option')
        .forEach(element => {
            element.addEventListener('click', (event) => {

                const { productId, deliveryOptionId } = element.dataset;

                updateDeliveryOption(productId, deliveryOptionId);
                renderOrderSummary();
            })
        })
}

renderOrderSummary();
