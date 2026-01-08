import { addBasketProduct } from "./basketProducts.js";
import { getTooltip } from "./tooltip.js";

export const catalogList = document.querySelector('.catalog__list');
const pagination = document.querySelector('.catalog__pagination');
let currentPage = 1;
const cardsOnPage = 6;

// Отрисовка карточки
function renderCard(products, list, ...classText) {
  list.innerHTML = '';

  products.forEach(product => {
    const catalogItem = document.createElement('li');
    catalogItem.classList.add(...classText);
    catalogItem.innerHTML = `
      <div class="product-card">
        <div class="product-card__visual">
          <img class="product-card__img" src="${product.image}" height="436" width="290" alt="Изображение товара">
            <div class="product-card__more">
              <a href="#" class="product-card__link btn btn--icon" data-id=${product.id}>
                <span class="btn__text">В корзину</span>
                <svg width="24" height="24" aria-hidden="true">
                  <use xlink:href="images/sprite.svg#icon-basket"></use>
                </svg>
              </a>
              <a href="#" class="product-card__link btn btn--secondary">
                <span class="btn__text">Подробнее</span>
              </a>
            </div>
        </div>
        <div class="product-card__info">
          <h2 class="product-card__title">${product.name}</h2>
          <span class="product-card__old">
            <span class="product-card__old-number">${product.price.old}</span>
            <span class="product-card__old-add">₽</span>
          </span>
          <span class="product-card__price">
            <span class="product-card__price-number">${product.price.new}</span>
            <span class="product-card__price-add">₽</span>
          </span>
          <div class="product-card__tooltip tooltip">
            <button class="tooltip__btn" aria-label="Показать подсказку">
              <svg class="tooltip__icon" width="5" height="10" aria-hidden="true">
                <use xlink:href="images/sprite.svg#icon-i"></use>
              </svg>
            </button>
            <div class="tooltip__content">
              <span class="tooltip__text">Наличие товара по городам:</span>
              <ul class="tooltip__list">
                <li class="tooltip__item">
                  <span class="tooltip__text">Москва: <span class="tooltip__count">${product.availability.moscow}</span></span>
                </li>
                <li class="tooltip__item">
                  <span class="tooltip__text">Оренбург: <span class="tooltip__count">${product.availability.orenburg}</span></span>
                </li>
                <li class="tooltip__item">
                  <span class="tooltip__text">Санкт-Петербург: <span class="tooltip__count">${product.availability.saintPetersburg}</span></span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
  `;
    list.append(catalogItem);
  });

  getTooltip();
  addBasketProduct();
}

// Функция для отрисовки пагинации
function renderPagination(totalCards, arr) {
  pagination.innerHTML = '';
  const totalPages = Math.ceil(totalCards / cardsOnPage);

  for (let i = 1; i <= totalPages; i++) {
    const paginationItem = document.createElement('li');
    paginationItem.classList.add('catalog__pagination-item');

    const pageButton = document.createElement('button');
    pageButton.classList.add('catalog__pagination-link');
    pageButton.textContent = i;

    if (i === currentPage) {
      pageButton.disabled = true;
    }

    pageButton.addEventListener('click', () => {
      currentPage = i;
      updateDisplayProduct(arr);
    });

    paginationItem.append(pageButton);
    pagination.append(paginationItem);
  }
}

// Получение массива данных
async function getProduct() {
  try {
    const response = await fetch("./data/data.json", {
      method: 'GET',
      headers: {
        email: "zabiranolga120@gmail.com",
      }
    });

    if (!response.ok) {
      throw new Error(`Ошибка сети`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error.message);
  }
}

// Загрузка карточек товара
async function loadProductCard() {
  const result = await getProduct();

  updateDisplayProduct(result);
}

// Обновление отрисовки карточек
function updateDisplayProduct(result) {
  const startIndex = (currentPage - 1) * cardsOnPage;
  const endIndex = startIndex + cardsOnPage;
  const currentProducts = result.slice(startIndex, endIndex);

  renderCard(currentProducts, catalogList, 'catalog__item');

  if (result.length <= cardsOnPage) {
    return pagination.innerHTML = '';
  } else {
    renderPagination(result.length, result);
    currentPage = 1
  }
}

export {
  renderCard,
  renderPagination,
  getProduct,
  loadProductCard,
  updateDisplayProduct
}