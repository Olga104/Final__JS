import { getProduct, updateDisplayProduct } from "./productCard.js";

export default async function getSortProduct() {
  const products = await getProduct();
  const sortSelect = document.querySelector('.catalog__sort-select');

  sortSelect.addEventListener('change', function () {
    const sortOption = this.value;
    let sortProducts;

    if (sortOption === 'price-min') {
      sortProducts = products.sort((a, b) => a.price.new - b.price.new);
    } else if (sortOption === 'price-max') {
      sortProducts = products.sort((a, b) => b.price.new - a.price.new);
    } else if (sortOption === 'rating-max') {
      sortProducts = products.sort((a, b) => b.rating - a.rating);
    }

    updateDisplayProduct(sortProducts);
  });
}