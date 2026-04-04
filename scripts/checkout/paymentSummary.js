import { cart } from "../../data/cart.js";
import { deliveryOptions, getDeliveryOption } from "../../data/deliveryOptions.js";
import { getProduct, products } from "../../data/products.js";
import formatCurrency from "../utils/money.js";

export function renderPaymentSummary() {

    let productPriceCents = 0;
    let shippingPriceCents = 0;

    cart.forEach(cartItem => {

        const product = getProduct(cartItem.productId);
        productPriceCents += product.priceCents * cartItem.quantity;

        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
        shippingPriceCents += deliveryOption.priceCents;

    });

    const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
    const taxCents = totalBeforeTaxCents * 0.1;

    const totalCents = totalBeforeTaxCents + taxCents;


    const paymentSummaryHTML = `<h3>Order Summary</h3>
    <div class="order-summary-details">
        <p><span>Items (3):</span> <span>$${formatCurrency(productPriceCents)}</span></p>
        <p><span>Shipping & handling:</span> <span>$${formatCurrency(shippingPriceCents)}</span></p>
        <p><span>Total before tax:</span> <span>$${formatCurrency(totalBeforeTaxCents)}</span></p>
        <p><span>Estimated tax (10%):</span> <span>$${formatCurrency(taxCents)}</span></p>
    </div>
    <div>
        <span>Order total:</span>
        <span>$${formatCurrency(totalCents)}</span>
    </div>
    <button class="checkout-button">Place your order</button>`

    document.querySelector('.js-order-summary').innerHTML = paymentSummaryHTML;

}