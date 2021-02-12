import { getRandomIntNumber, getRandomFloatNumber, getRandomArrayItem, getRandomArrayLength } from './util.js';

const FLAT_TYPES = ['palace', 'flat', 'house', 'bungalow'];
const CHECKIN_TIMES = ['12:00', '13:00', '14:00'];
const CKECKOUT_TIMES = ['12:00', '13:00', '14:00'];
const FEATURE_TYPES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

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

export { generateData };
