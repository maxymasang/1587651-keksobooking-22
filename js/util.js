import { formReset } from './form.js';

const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const successTemplate = document.querySelector('#success').content.querySelector('.success');

const RoomNumber = {
  min: 1,
  max: 5,
}

/**
 * Функция, возвращающая случайное целое число из переданного диапазона включительно
 * @param {number} min - минимальное число
 * @param {number} max - максимальное число
 * @returns {number}
 */
const getRandomIntNumber = (min, max) => {
  if (min >= max) {
    throw new Error('Значение (min) должно быть меньше значения (max)');
  }
  return Math.round(Math.random() * (max - min)) + min;
}

/**
 * Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно
 * @param {number} min - минимальное число
 * @param {number} max - максимальное число
 * @param {number} signsNumber - количество символов после запятых
 * @returns {number}
 */
const getRandomFloatNumber = (min, max, signsNumber) => {
  if (min >= max) {
    throw new Error('Значение (min) должно быть меньше значения (max)');
  }
  return Number((Math.random() * (max - min) + min).toFixed(signsNumber));
}

/**
 * Функция получает случайное значение из массива данных
 * @param {array} arr
 * @returns {string}
 */
const getRandomArrayItem = (arr) => {
  return arr[getRandomIntNumber(0, arr.length - 1)];
}

/**
 * Функция перемешивает массив данных и возвращает случайный массив
 * @param {array} arr
 * @returns {array}
 */
const shuffleArray = (arr) => {
  arr.forEach((element) => {
    const temp = element;
    const random = Math.floor(Math.random() * (element + 1));

    element = arr[random];
    arr[random] = temp;
  })
  return arr;
}

/**
 * Функция получает случайный массив данных и возвращает массив случайной длинны
 * @param {array} arr
 * @returns {array}
 */
const getRandomArrayLength = (arr) => {
  const newArray = shuffleArray(arr);
  const randomArrayLength = newArray.slice(0, getRandomIntNumber(1, newArray.length));
  return randomArrayLength;
}


/**
 * Функция получает случайное количество комнат, и возвращает строку с определенным склонением
 * @param {number} room
 * @returns {string}
 */
const checkRoomNumber = (room) => {
  if (room === RoomNumber.min) {
    return room + ' комната для ';
  } else if (room > RoomNumber.min && room < RoomNumber.max) {
    return room + ' комнаты для ';
  }
  return room + ' комнат для ';
}

const isEscEvent = (evt) => {
  return evt.key === 'Escape' || evt.key === 'Esc';
};

const showFormAlert = (message) => {
  const errorBlock = errorTemplate.cloneNode(true);
  const errorButton = errorBlock.querySelector('.error__button');

  const removeListener = () => {
    document.removeEventListener('keydown', closeEscEvent);
    document.removeEventListener('click', removeError);
  }

  const closeEscEvent = (evt) => {
    if (isEscEvent(evt)) {
      errorBlock.remove();
      removeListener();
    }
  }

  const removeError = () => {
    errorBlock.remove();
    removeListener();
  }

  errorButton.remove();
  errorBlock.querySelector('.error__message').textContent = message;
  document.body.append(errorBlock);

  document.addEventListener('keydown', closeEscEvent);
  document.addEventListener('click', removeError);
}

const showFormSucces = (message) => {
  const successBlock = successTemplate.cloneNode(true);

  successBlock.querySelector('.success__message').textContent = message;
  document.body.append(successBlock);
  formReset();

  document.addEventListener('keydown', function (evt) {
    if (isEscEvent(evt)) {
      successBlock.remove();
    }
  });

  document.addEventListener('click', function () {
    successBlock.remove();
  });
}

export { getRandomIntNumber, getRandomFloatNumber, getRandomArrayItem, getRandomArrayLength, checkRoomNumber, showFormAlert, showFormSucces };
