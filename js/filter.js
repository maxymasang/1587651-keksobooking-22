const houseType = document.querySelector('#housing-type');
const houseRoom = document.querySelector('#housing-rooms');
const housePrice = document.querySelector('#housing-price');
const houseGuest = document.querySelector('#housing-guests');
const houseFeature = document.querySelector('#housing-features');
const featuresCheckbox = houseFeature.querySelectorAll('input');

const MiddlePrice = {
  min: 10000,
  max: 50000,
}

const filterByType = (point) => {
  return houseType.value === 'any' || point.offer.type === houseType.value;
}

const filterByPrice = (point) => {
  switch (housePrice.value) {
    case 'low':
      return (point.offer.price < MiddlePrice.min);
    case 'middle':
      return (point.offer.price >= MiddlePrice.min && point.offer.price <= MiddlePrice.max);
    case 'high':
      return (point.offer.price > MiddlePrice.max);
    default:
      return (housePrice.value === 'any');
  }
}

const filterByRooms = (point) => {
  return houseRoom.value === 'any' || point.offer.rooms === Number(houseRoom.value);
}

const filterByGuests = (point) => {
  return houseGuest.value === 'any' || point.offer.guests === Number(houseGuest.value);
}

const filterByFeatures = (point) => {
  const features = Array.from(featuresCheckbox).filter((checkbox) => checkbox.checked);

  const featuresArr = features.map((feature) => {
    return feature.value;
  });

  return featuresArr.every((item) => point.offer.features.includes(item));
}

const filterForm = (points) => {
  const filteredPoints = [];

  for (let i = 0; i < points.length && filteredPoints.length < 10; i++) {
    if (filterByType(points[i]) && filterByRooms(points[i]) && filterByPrice(points[i]) && filterByGuests(points[i]) && filterByFeatures(points[i])) {
      filteredPoints.push(points[i]);
    }
  }

  return filteredPoints;
}

export { filterForm }
