import { generateData } from './data.js';
import { drawPopup } from './generate.js';

const filterForm = document.querySelector('.map__filters');
const announcementForm = document.querySelector('.ad-form');
const formElements = document.querySelectorAll('select, fieldset');
const address = document.querySelector('#address');

const leaflet = window.L;

/**
 * Объявление карты
 */
const map = leaflet.map('map-canvas');

/**
 * Иконка маркера
 */
const mainMarkerIcon = leaflet.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [50, 50],
  iconAnchor: [25, 50],
});

/**
 * Координаты и настройка маркера
 */
const mainMarker = leaflet.marker(
  {
    lat: 35.6810912,
    lng: 139.7671861,
  },
  {
    draggable: true,
    icon: mainMarkerIcon,
  },
);

/**
 * Отрисовка карты и добавление маркера на карту
 */
leaflet.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);
mainMarker.addTo(map);

/**
 * Событие отвечает за вывод координат маркера после перемщения на карте
 */
mainMarker.on('moveend', (evt) => {
  address.value = 'Ширина: ' + evt.target.getLatLng().lat.toFixed(5) + ', Высота: ' + evt.target.getLatLng().lng.toFixed(5);
});

/**
 * Функция отрисовывает сгенерированные объявления на карте
 */
const generatePoints = () => {
  const data = generateData();

  for (let i = 0; i < data.length; i++) {
    const sideIcon = leaflet.icon({
      iconUrl: '../img/pin.svg',
      iconSize: [20, 20],
      iconAnchor: [10, 20],
    });

    const sideMarker = leaflet.marker(
      {
        lat: data[i].location.x,
        lng: data[i].location.y,
      },
      {
        sideIcon,
      },
    );

    sideMarker.addTo(map).bindPopup(drawPopup(data[i]));
  }
}

/**
 * Функция добавляет класс модификатор для форм, а также отключает интерактивные элементы формы
 */
window.addEventListener('load', () => {
  filterForm.classList.add('map__filters--disabled');
  announcementForm.classList.add('ad-form--disabled');
  for (let i = 0; i < formElements.length; i++) {
    formElements[i].disabled = true;
  }
});

/**
 * Функция удаляет класс модификатор с форм, а также включет интерактивные элементы формы
 */
const unblockForms = () => {
  filterForm.classList.remove('map__filters--disabled');
  announcementForm.classList.remove('ad-form--disabled');
  for (let i = 0; i < formElements.length; i++) {
    formElements[i].disabled = false;
  }
}

map.on('load', () => {
  unblockForms();
  generatePoints();
  address.readOnly = true;
  address.value = 'Ширина: ' + mainMarker._latlng.lat.toFixed(5) + ', Высота: ' + mainMarker._latlng.lng.toFixed(5);
});
map.setView({
  lat: 35.6810912,
  lng: 139.7671861,
}, 12);


