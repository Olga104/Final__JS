export function getTooltip() {
  const tooltipButtons = document.querySelectorAll('.tooltip__btn');

  tooltipButtons.forEach(button => {
    const tooltipContent = button.closest('.product-card__tooltip').querySelector('.tooltip__content');

    tippy(button, {
      content: tooltipContent.innerHTML,
      allowHTML: true,
      theme: 'lightwhite',
      arrow: false,
      placement: 'top-end',
    });
  });
}