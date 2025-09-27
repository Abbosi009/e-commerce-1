import { BASE_URL, cartApi } from './api/api.js';

let product_container = document.querySelector('.cards-panel');
let showbtn = document.querySelector('.show-more-btn');

window.addEventListener('DOMContentLoaded', () => {
  getAllProducts();
});

let limit = 4;
let products = [];

async function getAllProducts() {
  const response = await fetch(BASE_URL);
  const { recipes } = await response.json();

  products = [...recipes];

  displayProducts();
}

function displayProducts() {
  product_container.innerHTML = '';
  products.slice(0, limit).forEach((item) => {
    const product = { ...item, price: Math.floor(Math.random() * 100) };
    const rating = Math.floor(product.rating);
    const li = document.createElement('li');

    li.addEventListener('click', (e) => {
      if (e.target.classList.contains('add-to-cart-btn')) {
        addPoructToCart(product);
      }
    });

    li.classList.add('card');
    li.innerHTML = `
    <div class="top">
    <img src="${
      product.image
    }" alt="" class="product-image" style="max-height:220px; object-fit:cover">
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

    <p class="about-product">${product.name}</p>

    <div class="bottom">
        <div class="rating-stars">
           ${Array(rating)
             .fill('')
             .map((rate) => {
               return ` <img src="./assets/icons/star-yellow.png" alt="">`;
             })
             .join('')}
        </div>

        <button class="add-to-cart-btn">В корзину</button>
    </div>
</div>`;

    product_container.appendChild(li);
  });
}

async function addPoructToCart(product) {
  try {
    await fetch(cartApi, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });

    alert('Товар добавлен в корзину');
  } catch (error) {
    console.log(error);
  }
}

showbtn.addEventListener('click', () => {
  let checkLimit = limit + 1;

  if (checkLimit > products.length) {
    showbtn.disabled = 'true';
  } else {
    limit += 4;
    showbtn.textContent = 'Loading...';

    setTimeout(() => {
      showbtn.textContent = 'show more';
      displayProducts();
    }, 1000);
  }
});
