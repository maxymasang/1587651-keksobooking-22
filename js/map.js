/* global _:readonly */

import { drawPopup } from './generate.js';
import { unblockForms } from './form.js';
import { filterForm } from './filter.js';

const RERENDER_DELAY = 500;

const mapFilters = document.querySelector('.map__filters');

const savedPoints = [];

const marketCoordinate = {
  lat: 35.6810912,
  lng: 139.7671861,
}

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
  marketCoordinate,
  {
    draggable: true,
    icon: mainMarkerIcon,
  },
);

/**
 * Функция устанавливает координаты по умолчанию
 */
const setDefaultCoordinate = () => {
  mainMarker.setLatLng(marketCoordinate);
  address.value = 'Ширина: ' + mainMarker._latlng.lat.toFixed(5) + ', Высота: ' + mainMarker._latlng.lng.toFixed(5);
}

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
  address.value = evt.target.getLatLng().lat.toFixed(5) + ', ' + evt.target.getLatLng().lng.toFixed(5);
});

/**
 * Функция отрисовывает сгенерированные объявления на карте
 */
const generatePoints = (data) => {
  data.forEach((pin) => {
    const sideIcon = leaflet.icon({
      iconUrl: '../img/pin.svg',
      iconSize: [20, 20],
      iconAnchor: [10, 20],
    });

    const sideMarker = leaflet.marker(
      {
        lat: pin.location.lat,
        lng: pin.location.lng,
      },
      {
        sideIcon,
      },
    );
    sideMarker.addTo(map).bindPopup(drawPopup(pin));
    mapFilters.addEventListener('change', (evt) => {
      if (evt.target.classList.contains('map__filter') || evt.target.classList.contains('map__checkbox')) {
        sideMarker.remove();
      }
    })
  })
}

const drewPoints = (points) => {
  generatePoints(filterForm(points));
}

/**
 * Событие отвечает за включение интерактивных элементов форм,
 * добавление сгенерированых объявлений на карте,
 * установку дефолтного значения поля с координатами
 */
const initMap = (points) => {
  savedPoints.push(...points);
  map.on('load', () => {
    unblockForms();
    drewPoints(savedPoints);
    address.readOnly = true;
    address.value = mainMarker._latlng.lat.toFixed(5) + ', ' + mainMarker._latlng.lng.toFixed(5);
  });
  map.setView({
    lat: 35.6810912,
    lng: 139.7671861,
  }, 9);
}

mapFilters.addEventListener('change', _.debounce((evt) => {
  if (evt.target.classList.contains('map__filter') || evt.target.classList.contains('map__checkbox')) {
    map.closePopup();
    drewPoints(savedPoints);
  }
}, RERENDER_DELAY))

export { initMap, setDefaultCoordinate }
