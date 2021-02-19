import { drawPopup } from './generate.js';
import { generateData } from './data.js';
import './form.js';

const main = () => {
  const data = generateData();
  drawPopup(data[0]);
}

main();
