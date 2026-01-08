import { getPopup } from "./popup.js";

const questionsForm = document.querySelector('.questions__form');
const questionsSubmit = document.querySelector('.questions__btn');
const popudDiv = document.querySelector('.popup');
const overlayDiv = document.querySelector('.overlay');
let validate;

questionsForm.action = "https://httpbin.org/post";

// Валидация формы
function validationForm() {
  validate = new JustValidate(document.querySelector('.questions__form'));
  validate
    .addField('#name', [
      {
        rule: 'required',
        errorMessage: 'Введите ваше имя',
      },
      {
        rule: 'minLength',
        value: 3,
        errorMessage: 'Минимальная длина три символа',
      },
      {
        rule: 'maxLength',
        value: 20,
        errorMessage: 'Максимальная длина двадцать символов',
      },
    ])
    .addField('#email', [
      {
        rule: 'required',
        errorMessage: 'Введите вашу почту',
      },
      {
        rule: 'email',
        errorMessage: 'Почта введена неверно',
      },
    ])
    .addField('#agree', [
      {
        rule: 'required',
        errorMessage: 'Согласие обязательно',
      },
    ])
}

// Обработка отправки формы
export function handleFormSubmit() {
  validationForm();

  questionsForm.addEventListener('submit', function (e) {
    e.preventDefault();

    if (validate.isValid) {
      const name = document.querySelector('#name').value;
      const email = document.querySelector('#email').value;
      const agree = document.querySelector('#agree').checked;

      const dataForm = {
        name,
        email,
        agree
      }

      addDataForm(dataForm);

      questionsSubmit.disabled = true;
      questionsForm.reset();
    }
  });
}

// Отправка данных формы
async function addDataForm(data) {
  try {
    const response = await fetch(questionsForm.action, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        email: "zabiranolga120@gmail.com",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Ошибка сети');
    }

    showSuccess();

  } catch (error) {
    console.error(error.message)
    showError();
  }
}

// Показать модальное окно при успещной отправке
function showSuccess() {
  const titleSuccess = 'Благодарим за обращение!';
  const textSuccess = 'Мы получили вашу заявку и свяжемся с вами в ближайшее время';
  getPopup('images/sprite.svg#icon-success', titleSuccess, textSuccess);

  popudDiv.classList.add('popup--active');
  overlayDiv.classList.add('overlay--active');

  closeButton();
}

// Показать модальное окно при ошибке
function showError() {
  const titleError = 'Не удалось отправить обращение';
  const textError = 'Что-то пошло не так, попробуйте отправить форму еще раз. Если ошибка повторится — свяжитесь со службой поддержки.';
  getPopup('images/sprite.svg#icon-error', titleError, textError);

  popudDiv.classList.add('popup--active');
  overlayDiv.classList.add('overlay--active');

  closeButton();
}

// Скрыть модальное окно
function hiddenModal() {
  popudDiv.classList.remove('popup--active');
  overlayDiv.classList.remove('overlay--active');
}

// Закрытие модального окна
function closeButton() {
  const buttonClose = document.querySelector('.popup__close');

  buttonClose.addEventListener('click', function () {
    hiddenModal();
    questionsSubmit.disabled = false;
  });
}