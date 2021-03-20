import './util.js';
import './generate.js';
import { initMap } from './map.js';
import { getData } from './data-service.js';

const main = () => {
  getData()
    .then(initMap);
}

main();
