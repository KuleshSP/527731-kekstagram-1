'use strict';

(function () {
  var URL_LOAD = 'https://js.dump.academy/kekstagram/data';
  var URL_UPLOAD = 'https://js.dump.academy/kekstagram';
  var XHR_LOAD_TIMEOUT = 5000;
  var XHR_UPLOAD_TIMEOUT = 10000;
  var ERROR_400 = 'Неверный запрос';
  var ERROR_401 = 'Пользователь не авторизован';
  var ERROR_404 = 'Ничего не найдено';

  window.load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      var error;
      switch (xhr.status) {
        case 200:
          onLoad(xhr.response);
          break;
        case 400:
          error = ERROR_400;
          break;
        case 401:
          error = ERROR_401;
          break;
        case 404:
          error = ERROR_404;
          break;

        default:
          error = 'Статус ответа: : ' + xhr.status + ' ' + xhr.statusText;
      }
      if (error) {
        onError(error);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = XHR_LOAD_TIMEOUT;

    xhr.open('GET', URL_LOAD);
    xhr.send();
  };


  window.uploadInfo = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      var error;
      switch (xhr.status) {
        case 200:
          onLoad(xhr.response);
          break;
        case 400:
          error = ERROR_400;
          break;
        case 401:
          error = ERROR_401;
          break;
        case 404:
          error = ERROR_404;
          break;

        default:
          error = 'Статус ответа: : ' + xhr.status + ' ' + xhr.statusText;
      }
      if (error) {
        onError(error);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = XHR_UPLOAD_TIMEOUT;

    xhr.open('POST', URL_UPLOAD);
    xhr.send(data);
  };
})();
