import { checkRoomNumber } from './util.js';

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const feature = document.querySelector('#card').content.querySelector('.popup__features');
const photos = document.querySelector('#card').content.querySelector('.popup__photos');
const photo = document.querySelector('#card').content.querySelector('.popup__photo');

const flatType = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
};

/**
 * Функция создает DOM-элементы на основе сгенерированых данных
 * @param {array} flat
 * @returns {array}
 */
const drawPopup = (flat) => {
  const featureFragment = document.createDocumentFragment();
  const photoFragment = document.createDocumentFragment();
  feature.innerHTML = '';
  photos.innerHTML = '';

  const cardElement = cardTemplate.cloneNode(true);

  flat.offer.features.forEach((feature) => {
    const featureElement = document.createElement('li');
    featureElement.classList.add('popup__feature');
    featureElement.classList.add('popup__feature--' + feature);
    featureFragment.appendChild(featureElement);
  })

  flat.offer.photos.forEach((picture) => {
    const photoElement = photo.cloneNode(true);
    photoElement.src = picture;
    photoFragment.appendChild(photoElement);
  })

  cardElement.querySelector('.popup__title').textContent = flat.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = flat.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = `${flat.offer.price} ₽/ночь`;
  cardElement.querySelector('.popup__type').textContent = flatType[flat.offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = checkRoomNumber(flat.offer.rooms) + flat.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${flat.offer.checkin}, выезд до  ${flat.offer.checkout}`;
  if ((flat.offer.features).length) {
    cardElement.querySelector('.popup__features').appendChild(featureFragment);
  } else {
    cardElement.querySelector('.popup__features').remove();
  }
  if ((flat.offer.photos).length) {
    cardElement.querySelector('.popup__photos').appendChild(photoFragment);
  } else {
    cardElement.querySelector('.popup__photos').remove();
  }
  cardElement.querySelector('.popup__description').textContent = flat.offer.description;
  cardElement.querySelector('.popup__avatar').src = flat.author.avatar;

  return cardElement;
}

export { drawPopup };
