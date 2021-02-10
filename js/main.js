const FLAT_TYPES = ['palace', 'flat', 'house', 'bungalow'];
const CHECKIN_TIMES = ['12:00', '13:00', '14:00'];
const CKECKOUT_TIMES = ['12:00', '13:00', '14:00'];
const FEATURE_TYPES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

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
  return arr[getRandomIntNumber(0, arr.length)];
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

const generateData = () => {
  const flats = [];

  for (let i = 1; i <= 10; i++) {
    const locationX = getRandomFloatNumber(35.65, 35.7, 5);
    const locationY = getRandomFloatNumber(139.7, 139.8, 5);

    flats.push({
      author: {
        avatar: `img/avatars/user0${getRandomIntNumber(1, 8)}.png`,
      },
      offer: {
        title: 'Заголовок предложения',
        address: `${locationX}, ${locationY}`,
        price: getRandomIntNumber(300000, 1000000),
        type: getRandomArrayItem(FLAT_TYPES),
        rooms: getRandomIntNumber(1, 10),
        guests: getRandomIntNumber(5, 20),
        checkin: getRandomArrayItem(CHECKIN_TIMES),
        checkout: getRandomArrayItem(CKECKOUT_TIMES),
        features: getRandomArrayLength(FEATURE_TYPES),
        description: 'Описание помещения',
        photo: getRandomArrayLength(PHOTOS),
      },
      location: {
        x: getRandomFloatNumber(35.65, 35.7, 5),
        y: getRandomFloatNumber(139.7, 139.8, 5),
      },
    });
  }

  return flats;
}

generateData();
