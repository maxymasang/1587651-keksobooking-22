const option = document.querySelector('#type');
const price = document.querySelector('#price');
const checkin = document.querySelector('#timein');
const checkout = document.querySelector('#timeout');
const filterForm = document.querySelector('.map__filters');
const announcementForm = document.querySelector('.ad-form');
const formElements = document.querySelector('form').elements;

const flatPrice = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
}

const blockForms = () => {
  filterForm.classList.add(filterForm.className + '--disabled');
  announcementForm.classList.add(announcementForm.className + '--disabled');
  for (let j = 0; j < formElements.length; j++) {
    formElements[j].disabled = true;
  }
}

blockForms();

const unblockForms = () => {
  filterForm.classList.remove('map__filters--disabled');
  announcementForm.classList.remove('ad-form--disabled');
  for (let j = 0; j < formElements.length; j++) {
    formElements[j].disabled = false;
  }
}

// Событие отвечает за выбор опции (Тип жилья) и  меняет атрибуты минимального значения и плейсхолдера поля (Цена за ночь, руб)
option.addEventListener('change', () => {
  const priceValue = flatPrice[option.value];
  price.placeholder = priceValue;
  price.min = priceValue;
});

// Событие отвечает за выбор опции поля (Время заезда) и автоматически изменят значение поля (Время выезда)
checkin.addEventListener('change', () => {
  if (checkin.value) {
    checkout.value = checkin.value;
  }
});

// Событие отвечает за выбор опции поля (Время выезда) и автоматически изменят значение поля (Время заезда)
checkout.addEventListener('change', () => {
  if (checkout.value) {
    checkin.value = checkout.value;
  }
});

export { blockForms, unblockForms };
