import { setDefaultCoordinate } from './map.js';
import { showFormAlert, showFormSucces } from './util.js';
import { sendData } from './data-service.js';

const filterForm = document.querySelector('.map__filters');
const announcementForm = document.querySelector('.ad-form');
const formElements = document.querySelectorAll('select, fieldset');
const option = announcementForm.querySelector('#type');
const price = announcementForm.querySelector('#price');
const checkin = announcementForm.querySelector('#timein');
const checkout = announcementForm.querySelector('#timeout');
const roomNumber = announcementForm.querySelector('#room_number');
const roomCapacity = announcementForm.querySelector('#capacity');
const submit = announcementForm.querySelector('.ad-form__submit');
const clear = announcementForm.querySelector('.ad-form__reset');

const flatPrice = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
}

/**
 * Функция добавляет класс модификатор для форм,
 * а также отключает интерактивные элементы формы
 */
const blockForms = () => {
  filterForm.classList.add('map__filters--disabled');
  announcementForm.classList.add('ad-form--disabled');
  for (let i = 0; i < formElements.length; i++) {
    formElements[i].disabled = true;
  }
};

blockForms();

/**
 * Функция удаляет класс модификатор с форм,
 * а также включет интерактивные элементы формы
 */
const unblockForms = () => {
  filterForm.classList.remove('map__filters--disabled');
  announcementForm.classList.remove('ad-form--disabled');
  for (let i = 0; i < formElements.length; i++) {
    formElements[i].disabled = false;
  }
}

/**
 * Событие отвечает за выбор опции (Тип жилья)
 * и меняет атрибуты минимального значения и плейсхолдера поля (Цена за ночь, руб)
 */
option.addEventListener('change', () => {
  const priceValue = flatPrice[option.value];
  price.placeholder = priceValue;
  price.min = priceValue;
});

/**
 * Событие отвечает за выбор опции поля (Время заезда)
 * и автоматически изменят значение поля (Время выезда)
 */
checkin.addEventListener('change', () => {
  if (checkin.value) {
    checkout.value = checkin.value;
  }
});

/**
 * Событие отвечает за выбор опции поля (Время выезда)
 * и автоматически изменят значение поля (Время заезда)
 */
checkout.addEventListener('change', () => {
  if (checkout.value) {
    checkin.value = checkout.value;
  }
});

/**
 * Событие отвечает за проверку количества комнат и сравнивает с количеством мест
 */
submit.addEventListener('click', () => {
  if (roomNumber.value == 100 && roomCapacity.value > 0 || roomCapacity.value == 0 && roomNumber.value < 100) {
    roomNumber.setCustomValidity('Не для гостей');
  } else if (roomNumber.value < roomCapacity.value) {
    roomNumber.setCustomValidity('Количество комнат не может быть меньше чем количество гостей');
  } else {
    roomNumber.setCustomValidity('');
  }
  roomNumber.reportValidity();
})

/**
 * Функция сбрасывает поля формы, и устанавливает координаты по умолчанию
 */
const formReset = () => {
  announcementForm.reset();
  setTimeout(setDefaultCoordinate, 0);
}

/**
 * Событие отвечает за сбрасывание поля формы, и устанавливает координаты по умолчанию
 */
clear.addEventListener('click', (evt) => {
  evt.preventDefault();
  formReset();
})

/**
 * Событие отвечает за отправку данных
 */
announcementForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  sendData(
    () => showFormSucces('Успех'),
    () => showFormAlert('Непредвиденная ошибка'),
    new FormData(evt.target),
  )
})

export { unblockForms, formReset }
