import { checkRoomNumber } from './util.js'

const cardInsert = document.querySelector('.map__canvas');
const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const feature = document.querySelector('#card').content.querySelector('.popup__features');
const photo = document.querySelector('#card').content.querySelector('.popup__photo');
const photos = document.querySelector('#card').content.querySelector('.popup__photos');
feature.innerHTML = '';
photos.innerHTML = '';

const featureFragment = document.createDocumentFragment();
const photoFragment = document.createDocumentFragment();

const flatType = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
};

const drawPopup = (flat) => {
  const cardElement = cardTemplate.cloneNode(true);

  for (let i = 0; i < flat.offer.features.length; i++) {
    const featureElement = document.createElement('li');
    featureElement.classList.add('popup__feature');
    featureElement.classList.add('popup__feature--' + flat.offer.features[i]);
    featureFragment.appendChild(featureElement);
  }

  for (let i = 0; i < flat.offer.photo.length; i++) {
    const photoElement = photo.cloneNode(true);
    photoElement.src = flat.offer.photo[i];
    photoFragment.appendChild(photoElement);
  }

  cardElement.querySelector('.popup__title').textContent = flat.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = flat.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = `${flat.offer.price} ₽/ночь`;
  cardElement.querySelector('.popup__type').textContent = flatType[flat.offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = checkRoomNumber(flat.offer.rooms) + flat.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${flat.offer.checkin}, выезд до  ${flat.offer.checkout}`;
  cardElement.querySelector('.popup__features').appendChild(featureFragment);
  cardElement.querySelector('.popup__description').textContent = flat.offer.description;
  cardElement.querySelector('.popup__photos').appendChild(photoFragment);
  cardElement.querySelector('.popup__avatar').src = flat.author.avatar;

  cardInsert.appendChild(cardElement);
}

export { drawPopup };
