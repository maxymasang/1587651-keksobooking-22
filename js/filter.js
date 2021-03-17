const housingType = document.querySelector('#housing-type');
const housingRooms = document.querySelector('#housing-rooms');
const housingPrice = document.querySelector('#housing-price');
const housingGuests = document.querySelector('#housing-guests');
const housingFeatures = document.querySelector('#housing-features');
const featuresCheckbox = housingFeatures.querySelectorAll('input');

const MIDDLE_PRICE = {
  min: 10000,
  max: 50000,
}

const filterByType = (point) => {
  return housingType.value === 'any' || point.offer.type === housingType.value;
}

const filterByPrice = (point) => {
  switch (housingPrice.value) {
    case 'low':
      return (point.offer.price < MIDDLE_PRICE.min);
    case 'middle':
      return (point.offer.price >= MIDDLE_PRICE.min && point.offer.price <= MIDDLE_PRICE.max);
    case 'high':
      return (point.offer.price > MIDDLE_PRICE.max);
    default:
      return (housingPrice.value === 'any');
  }
}

const filterByRooms = (point) => {
  return housingRooms.value === 'any' || point.offer.rooms === Number(housingRooms.value);
}

const filterByGuests = (point) => {
  return housingGuests.value === 'any' || point.offer.guests === Number(housingGuests.value);
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
