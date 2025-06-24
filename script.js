const products = [
    {
        id: 1,
        image: "./assets/images/cart-img.png",
        title: "Г/Ц Блинчики с мясом вес, Россия",
        price: 44.50,
        rating: 2,
    },
    {
        id: 2,
        image: "./assets/images/cart-img.png",
        title: "Молоко ПРОСТОКВАШИНО паст. питьевое цельное отборное...",
        price: 44.50,
        rating: 3,
    },
    {
        id: 3,
        image: "./assets/images/cart-img.png",
        title: "Колбаса сырокопченая МЯСНАЯ ИСТОРИЯ Сальчичон и Тоскан...",
        price: 44.50,
        rating: 5,
    },
    {
        id: 4,
        image: "./assets/images/cart-img.png",
        title: "Сосиски вареные МЯСНАЯ ИСТОРИЯ Молочные и С сыро...",
        price: 44.50,
        rating: 4,
    },
];

const ul = document.querySelector(".cards-panel");
const addToCartBtn = document.querySelectorAll(".add-to-cart-btn");

let cart = JSON.parse(localStorage.getItem('cart') || '[]');

products.forEach((product) => {
    let div = document.createElement("div");
    div.innerHTML = `
            <li class="card">
                <div class="top">
                    <img src="${product.image}" alt="" class="product-image">
                    <img src="./assets/icons/like.png" alt="" class="like-btn">
                </div>

                <div class="main-part">
                    <div class="price-and-others">
                        <div class="left">
                            <span class="price">${product.price} ₽</span>
                            <span class="desc">С картой</span>
                        </div>
                        <div class="right">
                            <span class="price">50,50 ₽</span>
                            <span class="desc">Обычная</span>
                        </div>
                    </div>

                    <p class="about-product">${product.title}</p>

                    <div class="bottom">
                        <div class="rating-stars">
                            <img src="./assets/icons/star-yellow.png" alt="">
                            <img src="./assets/icons/star-yellow.png" alt="">
                            <img src="./assets/icons/star-grey.png" alt="">
                            <img src="./assets/icons/star-grey.png" alt="">
                            <img src="./assets/icons/star-grey.png" alt="">
                        </div>

                        <a href="#" class="add-to-cart-btn" onclick="addToCart(${product.id})">В корзину</a>
                    </div>
                </div>
            </li>`

    ul.appendChild(div)
})

function addToCart(id) {
    const product = products.find((item) => item.id === Number(id));

    if (cart.includes(product)) {
        return;
    }
    cart.push(product);
    setLocalStorage(cart);
}

// function displayCart() {
//     cart_items.innerHTML = '';

//     cart_items.innerHTML += cart
//         .map((item) => {
//             return `<li>${item.title} <button onclick='removeFromCart("${item.id}")'>delete</button> </li> `;
//         })
//         .join('');
// }

// function removeFromCart(id) {
//     const productId = Number(id);
//     cart = cart.filter((item) => item.id !== productId);
//     setLocalStorage(cart);
//     displayCart();
// }

function setLocalStorage(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}