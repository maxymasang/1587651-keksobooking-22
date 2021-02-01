// Функция, возвращающая случайное целое число из переданного диапазона включительно
// Временная функция
const getRandomIntNumber = function (min, max) {
  if (min >= max) {
    alert('Некорректно введены данные, значение (min) должно быть меньше значения (max)!');
  }
  return Math.floor(Math.random() * (max - min)) + min;
}

getRandomIntNumber(4, 10);

// Функция для проверки максимальной длины строки
// Функция из другого домашнего задания
const checkMaxStringLenght = function (checkedString, maxLength) {
  if (checkedString.length > maxLength) {
    return false;
  }
  else {
    return true;
  }
}

checkMaxStringLenght('Test text', 3);

// Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно
// Генерации временных географических координат в следующем задании
const getRandomFloatNumber = function (min, max, signsNumber) {
  if (min >= max) {
    alert('Некорректно введены данные, значение (min) должно быть меньше значения (max)!');
  }
  return (Math.random() * (max - min) + min).toFixed(signsNumber);
}

getRandomFloatNumber(1.1, 2.3);

