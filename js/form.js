const changeFlatPriceOnChange = () => {
  const option = document.querySelector('#type');
  const price = document.querySelector('#price');
  option.addEventListener('change', () => {
    if (option.value === 'bungalow') {
      price.placeholder = 0;
      price.min = 0;
    } else if (option.value === 'flat') {
      price.placeholder = 1000;
      price.min = 1000;
    } else if (option.value === 'house') {
      price.placeholder = 5000;
      price.min = 5000;
    } else if (option.value === 'palace') {
      price.placeholder = 10000;
      price.min = 10000;
    }
  });
}

const changeCheckInOutOnCHange = () => {
  const checkin = document.querySelector('#timein');
  const checkout = document.querySelector('#timeout');
  checkin.addEventListener('change', () => {
    if (checkout.value !== checkin.value) {
      checkout.value = checkin.value;
    }
  });
  checkout.addEventListener('change', () => {
    if (checkin.value !== checkout.value) {
      checkin.value = checkout.value;
    }
  });
};

export { changeFlatPriceOnChange, changeCheckInOutOnCHange };
