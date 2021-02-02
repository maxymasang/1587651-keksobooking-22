/**
 * Функция, возвращающая случайное целое число из переданного диапазона включительно
 * @param {number} min - минимальное число
 * @param {number} max - максимальное число
 * @returns {number}
 */
const getRandomIntNumber = function (min, max) {
  if (min >= max) {
    throw new Error('Значение (min) должно быть меньше значения (max)');
  }
  return Math.floor(Math.random() * (max - min)) + min;
}

getRandomIntNumber(4, 10);

/**
 * Функция для проверки максимальной длины строки
 * @param {string} checkedString - строка
 * @param {number} maxLength - максимальная длина строки
 * @returns {boolean}
 */
const checkMaxStringLenght = function (checkedString, maxLength) {
  return checkedString.length < maxLength;
}

checkMaxStringLenght('Test text', 3);

/**
 * Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно
 * @param {*} min - минимальное число
 * @param {*} max - максимальное число
 * @param {*} signsNumber - количество символов после запятых
 */
const getRandomFloatNumber = function (min, max, signsNumber) {
  if (min >= max) {
    throw new Error('Значение (min) должно быть меньше значения (max)');
  }
  return Number((Math.random() * (max - min) + min).toFixed(signsNumber));
}

getRandomFloatNumber(1.1, 2.3, 5);
