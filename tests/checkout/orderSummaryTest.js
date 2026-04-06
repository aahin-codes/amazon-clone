import { cart, loadFromStorage } from "../../data/cart.js";
import { loadProducts } from "../../data/products.js";
import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";


describe('test suite: renderOrderSummary', () => {
    const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
    beforeAll((done)=>{
        // first load the products then go to next step by done function
        loadProducts(()=>{
            done();
        });
    });
    beforeEach(() => {
        spyOn(localStorage, 'setItem');
        document.querySelector('.js-test-container').innerHTML = `<div class="js-order-products">
        </div>
        <div class="order-summary js-order-summary"></div>
        `;
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 2,
                deliveryOptionId: '3'
            }, {
                productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                quantity: 1,
                deliveryOptionId: '2'
            }]);
        });
        loadFromStorage();
        renderOrderSummary();


    });
    afterEach(()=>{
        document.querySelector('.js-test-container').innerHTML = '';
    })
    it('displays the cart', () => {

        expect(document.querySelectorAll('.test-js-product').length).toEqual(2);
        // document.querySelector('.js-test-container').innerHTML = '';

    });
    it('removes a product', () => {

        expect(document.querySelector(`.test-product-quantity-${productId1}`).innerText).toContain('Quantity: 2');

        document.querySelector(`.test-js-delete-quantity-link-${productId1}`).click();
        expect(document.querySelectorAll('.test-js-product').length).toEqual(1);

        expect(document.querySelector(`.test-js-delete-quantity-link-${productId1}`)).toEqual(null);
        expect(document.querySelector(`.test-js-delete-quantity-link-${productId2}`)).not.toEqual(null);
        expect(cart.length).toEqual(1);
        expect(cart[0].productId).toEqual(productId2);
        // document.querySelector('.js-test-container').innerHTML = '';

    })
});