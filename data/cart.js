export const cart = [];

export function addToCart(productId) {
    let matcheditem;
    cart.forEach((cartItem) => {
        if (cartItem.productId === productId) {
            matcheditem = cartItem;
        }
    })
    if (matcheditem) {
        matcheditem.quantity += 1;
    }
    else {
        cart.push({
            productId: productId,
            quantity: 1,
        })
    }
}

export function updateCartQuantity() {
    let cartQuantity = 0;

    cart.forEach(cartItem => {
        cartQuantity += cartItem.quantity;
    })

    document.querySelector('.js-cart-quantity').textContent = cartQuantity > 10 ? "10+" : cartQuantity;
}