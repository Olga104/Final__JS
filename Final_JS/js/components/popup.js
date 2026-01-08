export function getPopup(icon, title, text) {
  const popudDiv = document.querySelector('.popup');
  popudDiv.innerHTML = '';
  popudDiv.innerHTML = `
    <div class="popup__wrap">
      <div class="popup__inner">
        <svg class="popup__icon" width="44" height="44" aria-hidden="true">
          <use xlink:href="${icon}"></use>
        </svg>
        <h2 class="popup__title">${title}</h2>
        <p class="popup__text">${text}</p>
      </div>
      <button class="popup__close" type="button">
        <svg class="popup__close-icon" width="24" height="24" aria-hidden="true">
          <use xlink:href="images/sprite.svg#icon-close"></use>
        </svg>
      </button>
    </div>
  `;
}