function Cart(localStorageKey){
    const cart = {
    cartItems: undefined,
    loadFromStorage() {
        this.cartItems = JSON.parse(localStorage.getItem(localStorageKey)) || [{
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 2,
            deliveryOptionId: '3'
        }, {
            productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
            quantity: 1,
            deliveryOptionId: '2'
        }];
    },
    saveToLocalStorage() {
        localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
    },
    addToCart(productId) {
        let matcheditem;
        this.cartItems.forEach((cartItem) => {
            if (cartItem.productId === productId) {
                matcheditem = cartItem;
            }
        })
        if (matcheditem) {
            matcheditem.quantity += 1;
        }
        else {
            this.cartItems.push({
                productId: productId,
                quantity: 1,
                deliveryOptionId: '1'
            })
        }
        this.saveToLocalStorage();
    },
    removeFromCart(productId) {
        const newCart = [];
        this.cartItems.forEach((cartItem) => {
            if (cartItem.productId !== productId) {
                newCart.push(cartItem);
            }
        })

        this.cartItems = newCart;

        this.saveToLocalStorage();
    },
    updateCartQuantity() {
        let cartQuantity = 0;

        this.cartItems.forEach(cartItem => {
            cartQuantity += cartItem.quantity;
        })

        document.querySelector('.js-cart-quantity').textContent = cartQuantity > 10 ? "10+" : cartQuantity;

        this.saveToLocalStorage();
    },
    updateDeliveryOption(productId, deliveryOptionId) {
        let matcheditem;
        this.cartItems.forEach((cartItem) => {
            if (cartItem.productId === productId) {
                matcheditem = cartItem;
            }
        })
        matcheditem.deliveryOptionId = deliveryOptionId;

        this.saveToLocalStorage();
    }
};
return cart;
}

const cart = Cart('cart-oop');
cart.loadFromStorage();
const businessCart = Cart('cart-business');
businessCart.loadFromStorage();

console.log(cart);
console.log(businessCart);

