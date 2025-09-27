import { cartApi } from '../../api/api.js';

const cartProductsContainer = document.querySelector('.cart-products');
const procutsQty = document.querySelector('.tovar-length');
const totalPriceElement = document.querySelector('.all-price-two');

window.addEventListener('DOMContentLoaded', () => {
  getCartProducts();
});

async function getCartProducts() {
  try {
    const response = await fetch(cartApi);
    const data = await response.json();

    renderCartProducts(data);
  } catch (error) {}
}

function renderCartProducts(products = []) {
  cartProductsContainer.innerHTML = '';

  procutsQty.textContent = products.length + ' товара';
  calculateTotalPrice(products);

  products.forEach((cartItem) => {
    const li = document.createElement('li');
    li.classList.add('tovar');

    li.addEventListener('click', (e) => {
      if (e.target.classList.contains('delete-btn')) {
        deleteFromCart(cartItem.id);
      }
    });

    li.innerHTML = `
         <img src="${cartItem.image}" alt="" class="tovar">
            <div class="inside">
              <div class="info">
              <p>${cartItem.name}</p>
              <div>
                 <span class="price">${cartItem.price} ₽</span>
                   <span class="count">за шт.</span>
              </div>
        </div>
            
          <div class="aside">
             <div class="item-count">
              <img src="./assets/icons/minus.png" alt="" class="decrease">
                <span class="the-count">1</span>
                <img src="./assets/icons/plus.png" alt="" class="increase">
            </div>

             <div class="item-count delete-btn" style="background-color:red; cursor:pointer; color:white">
                delete
            </div>

            <span class="total-sum">${cartItem.price} ₽</span>
        </div>
    </div>`;

    cartProductsContainer.appendChild(li);
  });
}

async function deleteFromCart(productId) {
  try {
    await fetch(`${cartApi}/${productId}`, {
      method: 'DELETE',
    });
  } catch (error) {}

  getCartProducts();
}

function calculateTotalPrice(product) {
  const sum = product.reduce((acc, cur) => {
    return acc + cur.price;
  }, 0);

  console.log(sum);

  totalPriceElement.textContent = `${sum} ₽`;
}
