import { getProduct, renderCard } from "./productCard.js";

// Отрисовка карточек товаров с навигацией
export default async function getSliderProducts() {
  const dayProductsList = document.querySelector('.day-products__list');
  const result = await getProduct();
  const goodsOfDayCard = [];

  result.forEach(product => {
    if (product.goodsOfDay) {
      goodsOfDayCard.push(product);
    }
  });

  renderCard(goodsOfDayCard, dayProductsList, 'day-products__item', 'swiper-slide');

  const productCards = dayProductsList.querySelectorAll('.product-card');

  productCards.forEach(productCard => {
    productCard.classList.add('product-card--small');
  });

  navigationSlider();
}

// Навигация слайдеров
function navigationSlider() {
  const prevButton = document.querySelector('.day-products__navigation-btn--prev');
  const nextButton = document.querySelector('.day-products__navigation-btn--next');

  const swiper = new Swiper('.swiper', {
    spaceBetween: 40,
    slidesPerView: 4,
    navigation: {
      nextEl: nextButton,
      prevEl: prevButton,
    }
  })
}

