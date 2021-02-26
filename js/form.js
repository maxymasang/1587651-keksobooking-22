const option = document.querySelector('#type');
const price = document.querySelector('#price');
const checkin = document.querySelector('#timein');
const checkout = document.querySelector('#timeout');
const filterForm = document.querySelector('.map__filters');
const announcementForm = document.querySelector('.ad-form');
const formElements = document.querySelectorAll('select, fieldset');

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

export { unblockForms }
