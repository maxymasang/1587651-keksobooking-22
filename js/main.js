import './util.js';
import './data.js';
import './generate.js';
import { setUserFormSubmit } from './form.js';
import { initMap } from './map.js';
import { getData } from './data-service.js';

const main = () => {
  getData()
    .then(initMap);
  setUserFormSubmit();
}

main();
