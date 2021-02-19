import { drawPopup } from './generate.js';
import { generateData } from './data.js';
import { changeFlatPriceOnChange } from './form.js';
import { changeCheckInOutOnCHange } from './form.js';

const main = () => {
  const data = generateData();
  const flatPrice = changeFlatPriceOnChange();
  const checkinCheckout = changeCheckInOutOnCHange();
  drawPopup(data[0]);
}

main();
