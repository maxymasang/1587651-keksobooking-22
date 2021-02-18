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
 * @param {Array} arr
 * @returns {string}
 */
const getRandomArrayItem = (arr) => {
  return arr[getRandomIntNumber(0, arr.length - 1)];
}

/**
 * Функция перемешивает массив данных и возвращает случайный массив
 * @param {Array} arr
 * @returns {Array}
 */
const shuffleArray = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const temp = arr[i];
    const random = Math.floor(Math.random() * (i + 1));

    arr[i] = arr[random];
    arr[random] = temp;
  }
  return arr;
}

/**
 * Функция получает случайный массив данных и возвращает массив случайной длинны
 * @param {Array} arr
 * @returns {Array}
 */
const getRandomArrayLength = (arr) => {
  const newArray = shuffleArray(arr);
  const randomArrayLength = newArray.slice(0, getRandomIntNumber(1, newArray.length));
  return randomArrayLength;
}


/**
 * Функция получает случайное количество комнат, и возвращает строку с определенным склонением
 * @param {Number} room
 * @returns {String}
 */
const checkRoomNumber = (room) => {
  if (room === 1) {
    return room + ' комната для ';
  } else if (room > 1 && room < 5) {
    return room + ' комнаты для ';
  } else {
    return room + ' комнат для ';
  }
}

export { getRandomIntNumber, getRandomFloatNumber, getRandomArrayItem, getRandomArrayLength, checkRoomNumber };