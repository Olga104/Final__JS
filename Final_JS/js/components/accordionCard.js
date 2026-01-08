const accordionButtons = document.querySelectorAll('.accordion__btn');

// Получение аккордеона
export default function getAccordionCard() {
  accordionButtons.forEach(accordionButton => {
    accordionButton.addEventListener('click', function () {
      this.classList.toggle('accordion__btn--active');

      accordionButtons.forEach(btn => {
        if (btn !== accordionButton) {
          btn.classList.remove('accordion__btn--active');
        }
      })
    });
  });
}