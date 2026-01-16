# Briaton - E-commerce Lighting Catalog

The website is an online store for Briaton lighting fixtures, where users can browse the product catalog, select fixtures, and add them to their shopping cart for subsequent order processing and payment. The project is built using vanilla JavaScript (ES6+), HTML5, and SCSS, demonstrating a range of modern frontend features without relying on a framework.

## Features

-   **Dynamic Product Catalog**: Products are fetched from a local `data.json` file and rendered dynamically on the page.
-   **Client-Side Pagination**: The product list is paginated to enhance user experience and performance.
-   **Advanced Filtering**: Users can filter products by multiple criteria, such as type (e.g., pendant, ceiling) and availability status.
-   **Product Sorting**: The catalog can be sorted by price (ascending and descending) and popularity (rating).
-   **Interactive Shopping Cart**: A fully functional shopping cart that allows users to add/remove items. The cart content and item count are updated in real-time in the header.
-   **"Products of the Day" Slider**: A responsive slider built with Swiper.js to showcase featured products.
-   **Form Validation**: A "Contact Us" form with client-side validation for name and email fields, powered by `just-validate.js`.
-   **Interactive UI Components**:
    -   An accordion for the FAQ section.
    -   Tooltips on product cards to show stock availability by city, using Tippy.js.
    -   A responsive burger menu for product categories.
    -   A city selection dropdown in the header.
-   **Modular JavaScript**: The application logic is organized into reusable components/modules for better maintainability.

## Technologies Used

-   **Frontend**: HTML5, SCSS, CSS3
-   **JavaScript**: Vanilla JavaScript (ES6+), organized with modules.
-   **Libraries**:
    -   **Swiper.js**: For the responsive and interactive product slider.
    -   **just-validate.js**: For robust, client-side form validation.
    -   **Tippy.js**: For creating accessible and customizable tooltips.

## Project Structure

The codebase is organized into a clear and maintainable structure:

```
Final_JS/
├── catalog.html            # Main HTML file
├── css/
│   └── style.css           # Compiled CSS
├── data/
│   └── data.json           # Product data source
├── fonts/                  # Web fonts
├── images/                 # Static images and SVG sprites
├── js/
│   ├── main.js             # Main entry point for JavaScript
│   ├── components/         # Directory for modular JS components
│   │   ├── accordionCard.js
│   │   ├── basketProducts.js
│   │   ├── productCard.js
│   │   └── ...
│   └── vendor/             # Third-party JS libraries
└── scss/
    ├── style.scss          # Main SCSS file that imports all partials
    ├── blocks/             # Component-specific SCSS partials
    ├── global/             # Global styles, variables, and mixins
    └── vendor/             # Third-party SCSS/CSS
```

## Setup and Installation

This is a static frontend project and does not require a complex build process. To run it locally:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/olga104/final__js.git
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd final__js/Final_JS/
    ```

3.  **Serve the files:**
    Since the application uses the `fetch` API to load `data/data.json`, it must be run on a local web server to avoid CORS errors. A simple way to do this is using the **Live Server** extension in Visual Studio Code.
    -   Right-click `catalog.html` in VS Code.
    -   Select "Open with Live Server".

## How It Works

-   **Product Rendering**: The `loadProductCard` function in `js/components/productCard.js` fetches data from `data.json`. It then dynamically creates and appends product card elements to the DOM. Pagination logic is also handled within this module.
-   **Filtering and Sorting**: Event listeners in `productFilter.js` and `productSort.js` watch for changes in the filter and sort controls. They process the master product list according to the selected criteria and re-render the catalog.
-   **Shopping Cart**: The `addBasketProduct` function attaches event listeners to the "Add to Cart" buttons. The `basketProducts.js` module manages a `basketItems` array, which stores the products in the cart. Functions within this module handle rendering the cart dropdown and updating the item count in the header.
-   **Slider**: `getSliderProducts` in `js/components/slider.js` filters products with `goodsOfDay: true`, renders them as cards, and initializes a Swiper.js instance with navigation controls.
-   **Form Validation**: `handleFormSubmit` in `js/components/submitForm.js` uses `just-validate.js` to define validation rules. On successful validation, it sends the form data via a `POST` request and displays a success/error popup.
