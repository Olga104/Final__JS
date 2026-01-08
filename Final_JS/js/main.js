import openCloseBurgerMenu from "./components/burgerMenuButton.js";
import choiceLocationCity from "./components/locationCity.js";
import { loadProductCard } from "./components/productCard.js";
import getFilterProduct from "./components/productFilter.js";
import getSortProduct from "./components/productSort.js";
import { updateBasketProducts } from "./components/basketProducts.js";
import getAccordionCard from "./components/accordionCard.js";
import getSliderProducts from "./components/slider.js";
import { handleFormSubmit } from "./components/submitForm.js";

window.addEventListener('DOMContentLoaded', () => {
  openCloseBurgerMenu();
  choiceLocationCity();
  loadProductCard();
  getFilterProduct();
  getSortProduct();
  updateBasketProducts();
  getAccordionCard();
  getSliderProducts();
  handleFormSubmit();
});
