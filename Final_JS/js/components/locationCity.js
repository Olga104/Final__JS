// Переключение локации
export default function choiceLocationCity() {
  const buttonLocation = document.querySelector('.location__city');

  buttonLocation.addEventListener('click', function () {
    buttonLocation.classList.toggle('location__city--active');

    const locationCityAll = document.querySelectorAll('.location__sublink');

    locationCityAll.forEach(locationCity => {
      locationCity.addEventListener('click', function () {
        const locationName = document.querySelector('.location__city-name');
        locationName.textContent = locationCity.textContent;
        buttonLocation.classList.remove('location__city--active');
        buttonLocation.classList.remove('location__sublist');
      })
    });
  });
}