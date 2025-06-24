const left = document.querySelector(".left")
const right = document.querySelector(".right")
const section = document.querySelector(".section")

let cart = JSON.parse(localStorage.getItem('cart') || '[]');

if (cart == []) {
    section.removeChild(right)
}

let elementCount = 0;
let allPrice = 0;

cart.forEach(element => {
    let div = document.createElement('div')
    div.innerHTML = `
        <li>
            <img src="${element.image}" alt="" class="tovar">
            <div class="inside">
                <div class="info">
                    <p>${element.title}</p>
                    <div>
                        <span class="price">${element.price} ₽</span>
                        <span class="count">за шт.</span>
                    </div>
                </div>

                <div class="aside">
                    <div class="item-count">
                        <img src="./assets/icons/minus.png" alt="" class="decrease">
                        <span class="the-count">1</span>
                        <img src="./assets/icons/plus.png" alt="" class="increase">
                    </div>
                    <span class="total-sum">${element.price} ₽</span>
                </div>
            </div>
            <input type="checkbox">
        </li>`

    left.appendChild(div)

    elementCount++
    allPrice += element.price
});

let tovarLength = document.querySelector(".tovar-length")
let tovarPrice = document.querySelector(".all-price")
let tovarPriceTwo = document.querySelector(".all-price-two")

tovarLength.textContent = `${elementCount} товара`
tovarPrice.textContent = `${allPrice} ₽`
tovarPriceTwo.textContent = `${allPrice} ₽`

let decrease = document.querySelectorAll(".decrease")
let increase = document.querySelectorAll(".increase")
let theCount = document.querySelector(".the-count")
let totalSum = document.querySelector(".total-sum")

increase.forEach((element) => {
    element.addEventListener('click', () => {
        if (theCount.textContent >= 10) return;
        theCount.textContent++
    })
})

decrease.forEach((element) => {
    element.addEventListener('click', () => {
        if (theCount.textContent <= 0) return;
        theCount.textContent--
    })
})