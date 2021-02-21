const option = document.querySelector('#type');
const price = document.querySelector('#price');
const flatPrice = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
}

option.addEventListener('change', () => {
  const priceValue = flatPrice[option.value];
  price.placeholder = priceValue;
  price.min = priceValue;
});

const checkin = document.querySelector('#timein');
const checkout = document.querySelector('#timeout');

checkin.addEventListener('change', () => {
  if (checkin.value) {
    checkout.value = checkin.value;
  }
});

checkout.addEventListener('change', () => {
  if (checkout.value) {
    checkin.value = checkout.value;
  }
});
