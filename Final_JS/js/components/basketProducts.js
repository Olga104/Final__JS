import { getProduct } from './productCard.js'

const basketWrap = document.querySelector('.basket');
const basketList = document.querySelector('.basket__list');
const buttonBasket = document.querySelector('.header__user-btn');
const emptyBlock = document.querySelector('.basket__empty-block');
const countProduct = document.querySelector('.header__user-count');
const registrationButton = document.createElement('a');
let basketItems = [];
countProduct.textContent = 0;

// Обновление отображения корзины
function updateBasketDisplay() {
  if (basketItems.length === 0) {
    emptyBlock.classList.remove('basket__empty-block--hidden');
    basketList.classList.add('basket__list--hidden');
    registrationButton.classList.add('basket__link--hidden');
    countProduct.textContent = 0;
  } else {
    emptyBlock.classList.add('basket__empty-block--hidden');
    basketList.classList.remove('basket__list--hidden');
    registrationButton.classList.remove('basket__link--hidden');
    countProduct.textContent = basketItems.length;
    renderCardBasket();
  }
}

// Обновление корзины с товарами
function updateBasketProducts() {
  buttonBasket.addEventListener('click', function () {
    basketWrap.classList.toggle('basket--active');
    updateBasketDisplay();
  });
}

// Добавление товара в корзину
async function addBasketProduct() {
  const addBasketButtons = document.querySelectorAll('.product-card__link.btn--icon');

  addBasketButtons.forEach(addBasketButton => {
    addBasketButton.addEventListener('click', async function () {
      const productIdButton = this.dataset.id;
      const products = await getProduct();
      const productId = products.find(product => product.id === +productIdButton);

      if (productId) {
        const existsInBasket = basketItems.some(product => product.id === productId.id);

        if (!existsInBasket) {
          basketItems.push(productId)
          updateBasketDisplay()
        }
      }
    });
  });
}

// Отрисовка карточек в корзине
function renderCardBasket() {
  basketList.innerHTML = '';

  basketItems.forEach((product, index) => {
    const basketItem = document.createElement('li');
    basketItem.classList.add('basket__item');

    basketItem.innerHTML = `
    <div class="basket__img">
      <img src="${product.image}" alt="Фотография товара" height="60" width="60">
    </div>
    <span class="basket__name">${product.name}</span>
    <span class="basket__price">${product.price.new} руб</span>
    <button class="basket__close" type="button" data-index="${index}">
      <svg class="main-menu__icon" width="24" height="24" aria-hidden="true">
        <use xlink:href="images/sprite.svg#icon-close"></use>
      </svg>
    </button>
  `
    basketList.append(basketItem)
  });

  getCloseButton();
  getRegistrationButton();
}

// Получение кнопки оформления товаров в корзине
function getRegistrationButton() {
  registrationButton.classList.add('basket__link', 'btn');
  registrationButton.setAttribute('href', '#');
  registrationButton.textContent = 'Перейти к оформлению';

  basketWrap.append(registrationButton)
}

// Получение кнопки удаления товара из корзины
function getCloseButton() {
  const basketCloseButtons = document.querySelectorAll('.basket__close');

  basketCloseButtons.forEach(basketCloseButton => {
    basketCloseButton.addEventListener('click', function () {
      const index = this.dataset.index;
      basketItems.splice(index, 1);
      this.closest('li').remove();
      updateBasketDisplay();
    });
  });
}

export {
  updateBasketProducts,
  addBasketProduct
}