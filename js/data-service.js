import { showFormAlert } from './util.js';

const Url = {
  GET: 'https://22.javascript.pages.academy/keksobooking/data',
  SEND: 'https://22.javascript.pages.academy/keksobooking',
};

const getData = () => {
  return fetch(Url.GET)
    .then((response) => response.json())
    .catch(() => {
      showFormAlert('Непредвиденная ошибка');
    });
}

const sendData = (onSuccess, onFail, body) => {
  return fetch(Url.SEND,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail('Непредвиденная ошибка');
      }
    })
    .catch(() => {
      onFail('Непредвиденная ошибка');
    })
}

export { getData, sendData };
