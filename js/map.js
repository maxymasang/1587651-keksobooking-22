import { generateData } from './data.js';
import { drawPopup } from './generate.js';
import { unblockForms } from './form.js';

const address = document.querySelector('#address');
const roomNumber = document.querySelector('#room_number');
const roomCapacity = document.querySelector('#capacity');

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
 * Отрисовка карты
 * добавление маркера на карту
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
 * Событие отвечает за включение интерактивных элементов форм,
 * добавление сгенерированых объявлений на карте,
 * установку дефолтного значения поля с координатами
 */
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

/**
 * Событие отвечает за проверку количества комнат и сравнивает с количеством мест
 */
roomNumber.addEventListener('change', () => {
  if (roomNumber.value == 100 && roomCapacity.value > 0 || roomCapacity.value == 0 && roomNumber.value < 100) {
    roomNumber.setCustomValidity('Не для гостей');
  } else if (roomNumber.value < roomCapacity.value) {
    roomNumber.setCustomValidity('Количество комнат не может быть меньше чем количество гостей');
  } else {
    roomNumber.setCustomValidity('');
  }
  roomNumber.reportValidity();
})
