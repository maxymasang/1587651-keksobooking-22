/* global L:readonly */
import { unblockForms } from './form.js';
import { generateData } from './data.js';
import { drawPopup } from './generate.js';

const address = document.querySelector('#address');

const map = L.map('map-canvas')
  .on('load', () => {
    unblockForms();
  })
  .setView({
    lat: 35.6810912,
    lng: 139.7671861,
  }, 12);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainMarkerIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [50, 50],
  iconAnchor: [25, 50],
});

const mainMarker = L.marker(
  {
    lat: 35.6810912,
    lng: 139.7671861,
  },
  {
    draggable: true,
    icon: mainMarkerIcon,
  },
);

mainMarker.addTo(map);

const mainMarkerCoordinates = () => {
  address.disabled = true;
  address.value = 'Ширина: ' + mainMarker._latlng.lat.toFixed(5) + ', Высота: ' + mainMarker._latlng.lng.toFixed(5);

  mainMarker.on('moveend', (evt) => {
    address.value = 'Ширина: ' + evt.target.getLatLng().lat.toFixed(5) + ', Высота: ' + evt.target.getLatLng().lng.toFixed(5);
  });
}

mainMarkerCoordinates();

const generatePoints = () => {
  const data = generateData();

  for (let i = 0; i < data.length; i++) {
    const sideIcon = L.icon({
      iconUrl: '../img/pin.svg',
      iconSize: [20, 20],
      iconAnchor: [10, 20],
    });

    const sideMarker = L.marker(
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

generatePoints();
