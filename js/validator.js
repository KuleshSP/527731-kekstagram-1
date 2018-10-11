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

  var regExpCheck = function (arr, regEx) {
    var check = arr.every(function (el) {
      return el.match(regEx)[0];
    });
    if (!check) {
      window.utils.UPLOAD_HASTAG.setCustomValidity('Хештэг начинается с символа "#" и не должен привышать 20 символов!');
    }

    return arr;
  };

  var similarCheck = function (arr) {
    arr.reduce(function (a, b) {
      if (a === b) {
        window.utils.UPLOAD_HASTAG.setCustomValidity('Удалите одинаковые хештеги!');
      }
    });

    return arr;
  };

  var stringRegExpCheck = function (stringToSplit, separator, hashtagAmount) {
    var strings = splitString(stringToSplit, separator);
    var sortedArray = sortArray(strings);
    var regExp = /([#]{1,1}[A-Za-zА-Яа-яЁё0-9\-\_]{1,19}\s?){0,1}$/;

    if (sortedArray.length > hashtagAmount) {
      window.utils.UPLOAD_HASTAG.setCustomValidity('Не больше пяти хэштэгов!');
    } else {
      window.utils.UPLOAD_HASTAG.setCustomValidity('');
      var checkedArray = regExpCheck(sortedArray, regExp);
      var similarChecked = similarCheck(checkedArray);
    }
    return similarChecked;
  };

  var textLimiter = function (inputValue, limit) {
    if (inputValue.length > limit) {
      window.utils.UPLOAD_TEXT.setCustomValidity('Не больше 140 символов!');
    } else {
      window.utils.UPLOAD_TEXT.setCustomValidity('');
    }
  };

  window.utils.UPLOAD_HASTAG.addEventListener('input', function () {
    stringRegExpCheck(window.utils.UPLOAD_HASTAG.value, SPACE, HASHTAG_AMOUNT);
  });
  window.utils.UPLOAD_TEXT.addEventListener('input', function () {
    textLimiter(window.utils.UPLOAD_TEXT.value, TEXT_LIMIT);
  });
})();
