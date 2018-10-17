'use strict';

(function () {
  var SPACE = ' ';
  var HASHTAG_AMOUNT = 5;
  var TEXT_LIMIT = 140;

  var splitString = function (stringToSplit, separator) {
    var arrayOfStrings = stringToSplit.split(separator);

    return arrayOfStrings;
  };

  var sortArray = function (arrayForSorting) {
    var stringToLowerCase = arrayForSorting.map(function (el) {
      return el.toLowerCase();
    });
    var sortedArr = stringToLowerCase.sort();

    return sortedArr;
  };

  var lengthСheck = function (arr, regEx) {
    var check = arr.every(function (el) {
      return el.match(regEx)[0];
    });
    if (!check) {
      window.utils.UPLOAD_HASHTAG.setCustomValidity('Хештэг начинается с символа "#" и не должен привышать 20 символов!');
    }

    return arr;
  };

  var similarCheck = function (array) {
    array.forEach(function (el, i, arr) {
      if (arr[i] === arr[i + 1]) {
        window.utils.UPLOAD_HASHTAG.setCustomValidity('Удалите одинаковые хештеги!');
      }
    });

    return array;
  };

  var validityCheck = function (stringToSplit, separator, hashtagAmount) {
    var strings = splitString(stringToSplit, separator);
    var sortedArray = sortArray(strings);
    var regExp = /([#]{1,1}[A-Za-zА-Яа-яЁё0-9\-\_]{1,19}\s?){0,1}$/;

    if (sortedArray.length > hashtagAmount) {
      window.utils.UPLOAD_HASHTAG.setCustomValidity('Не больше пяти хэштэгов!');
    } else {
      window.utils.UPLOAD_HASHTAG.setCustomValidity('');
      var checkedArray = lengthСheck(sortedArray, regExp);
      var similarChecked = similarCheck(checkedArray);
    }
    return similarChecked;
  };

  var textLimiter = function (inputValue, limit) {
    inputValue.length > limit ? window.utils.UPLOAD_TEXT.setCustomValidity('Не больше 140 символов!') : window.utils.UPLOAD_TEXT.setCustomValidity('');
  };

  window.utils.UPLOAD_HASHTAG.addEventListener('input', function () {
    validityCheck(window.utils.UPLOAD_HASHTAG.value, SPACE, HASHTAG_AMOUNT);
  });
  window.utils.UPLOAD_TEXT.addEventListener('input', function () {
    textLimiter(window.utils.UPLOAD_TEXT.value, TEXT_LIMIT);
  });
})();
