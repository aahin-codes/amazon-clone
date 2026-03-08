const products = [
    {
        image:'https://m.media-amazon.com/images/I/713n+TxyfCL._SX522_.jpg',
        altName:"Polo T Shirt",
        name:'Amazon Brand - Symbol Men\'s Cotton Rich Solid Polo Tshirt | Collar Tshirts | Half Sleeves | Plain-Regular Fit (Available in Plus Sizes)',
        rating:{
            stars:4.5,
            count:120
        },
        priceCents:277
    },
    {
        image:'https://m.media-amazon.com/images/I/71fhuffKqCL._AC_UL480_FMwebp_QL65_.jpg',
        altName:"Polo T Shirt", 
        name:'Polo T Shirt for Men || T Shirt for Man || Collar Style (Packs Also Available) (121-124)',
        rating:{
            stars:3.5,
            count:110
        },
        priceCents:284
    },
    {
        image:'https://m.media-amazon.com/images/I/61WYx598KKL._AC_UL480_FMwebp_QL65_.jpg',
        altName:"Oversized T Shirt",
        name:'Men\'s Half Sleeve Round Neck Cottonblend Graphic Print Oversized Tshirt for Man',
        rating:{
            stars:2.5,
            count:80
        },
        priceCents:170
    }
];

let productsHTML ='';

products.forEach(product=>{
    let fullStars = Math.floor(product.rating.stars);
    let halfStar = product.rating.stars%1;

    // Accumulator Pattern
    productsHTML += `
     <div class="product">
            <figure class="product-image-container">
                <img src="${product.image}" alt="${product.altName}">
            </figure>
            <div class="product-name">${product.name}</div>
            <div class="rating-container">
                <div class="star-container">
                ${
                    Array(fullStars).fill('<img src="./assets/full-star.png" alt="Single Full Star">').join('') +
                    (halfStar ? '<img src="./assets/half-star.png" alt="Single Half Star">' : '')
                 }
                </div>
                <span>${product.rating.count}</span>
            </div>
            <div class="product-price">$${(product.priceCents / 100).toFixed(2)}</div>
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
            <button>Add to Cart</button>
         </div>
    `
})

document.querySelector('.js-products-container').innerHTML = productsHTML;
