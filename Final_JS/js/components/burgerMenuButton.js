export default function openCloseBurgerMenu() {
  const buttonOpenMenu = document.querySelector('.header__catalog-btn');
  const mainMenu = document.querySelector('.main-menu');

  // Открыть бургерное меню
  buttonOpenMenu.addEventListener('click', function () {
    mainMenu.classList.add('main-menu--active');
  });

  // Закрыть бургерное меню
  const buttonCloseMenu = document.querySelector('.main-menu__close');
  buttonCloseMenu.addEventListener('click', function () {
    mainMenu.classList.remove('main-menu--active');
  });
}