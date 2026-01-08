import { getProduct, updateDisplayProduct } from "./productCard.js";

const formCatalog = document.querySelector('.catalog-form');
const checkboxAll = formCatalog.querySelectorAll('.custom-checkbox__field');
const radioAll = formCatalog.querySelectorAll('.custom-radio__field');

// Фильтрация карточек по типу и статусу
export default async function getFilterProduct() {
  const products = await getProduct();

  checkboxAll.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      getFilter(products);
    });
  });

  radioAll.forEach(radio => {
    radio.addEventListener('change', () => {
      getFilter(products);
    });
  });

  updateDisplayProduct(products);
  getCountFilter(products);
}

// Получение фильтров
function getFilter(products) {
  let filteredProducts = products;

  const checkedBox = Array.from(checkboxAll).some(checkbox => checkbox.checked);
  const selectedTypes = Array.from(checkboxAll).filter(checkbox => checkbox.checked).map(checkbox => checkbox.value);
  const selectedStatus = Array.from(radioAll).find(radio => radio.checked);

  if (!checkedBox) {
    return updateDisplayProduct(products);
  }

  filteredProducts = filteredProducts.filter(product => product.type.some(type => selectedTypes.includes(type)));

  filteredProducts = filteredProducts.filter(product => {
    if (selectedStatus.value === 'instock') {
      return product.availability.moscow > 0 || product.availability.orenburg > 0 || product.availability.saintPetersburg > 0;
    } else {
      return product;
    }
  })

  updateDisplayProduct(filteredProducts);
}

// Получение счетчика
function getCountFilter(products) {
  const countType = {};

  products.forEach(product => {
    product.type.forEach(type => {
      if (!countType[type]) {
        countType[type] = 1;
      } else {
        countType[type]++;
      }
    });
  });

  checkboxAll.forEach(checkbox => {
    const typeCheck = checkbox.value;
    const count = countType[typeCheck] || 0;
    const checkboxCounter = checkbox.nextElementSibling.lastElementChild;
    checkboxCounter.textContent = count;
  });
}