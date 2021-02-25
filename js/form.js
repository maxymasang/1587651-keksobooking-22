const option = document.querySelector('#type');
const price = document.querySelector('#price');
const checkin = document.querySelector('#timein');
const checkout = document.querySelector('#timeout');

const flatPrice = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
}
/**
 * Событие отвечает за выбор опции (Тип жилья) и  меняет атрибуты минимального значения и плейсхолдера поля (Цена за ночь, руб)
 */
option.addEventListener('change', () => {
  const priceValue = flatPrice[option.value];
  price.placeholder = priceValue;
  price.min = priceValue;
});

/**
 * Событие отвечает за выбор опции поля (Время заезда) и автоматически изменят значение поля (Время выезда)
 */
checkin.addEventListener('change', () => {
  if (checkin.value) {
    checkout.value = checkin.value;
  }
});

/**
 * Событие отвечает за выбор опции поля (Время выезда) и автоматически изменят значение поля (Время заезда)
 */
checkout.addEventListener('change', () => {
  if (checkout.value) {
    checkin.value = checkout.value;
  }
});
