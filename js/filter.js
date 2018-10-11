'use strict';

(function () {
  var EFFECT_NONE = document.querySelector('.effects__preview--none');
  var EFFECT_CHROME = document.querySelector('.effects__preview--chrome');
  var EFFECT_SEPIA = document.querySelector('.effects__preview--sepia');
  var EFFECT_MARVIN = document.querySelector('.effects__preview--marvin');
  var EFFECT_PHOBOS = document.querySelector('.effects__preview--phobos');
  var EFFECT_HEAT = document.querySelector('.effects__preview--heat');
  var FILTERS = [EFFECT_NONE, EFFECT_CHROME, EFFECT_SEPIA, EFFECT_MARVIN, EFFECT_PHOBOS, EFFECT_HEAT];
  var MAX_BLUR_VALUE = 3;
  var MIN_BRIGHTNESS_VALUE = 1;
  var MAX_BRIGHTNESS_VALUE = 3;
  var MAX_SCALE_VALUE = '100%';
  var SCALE_PIN = document.querySelector('.scale__pin');
  var SCALE_LEVEL = document.querySelector('.scale__level');

  var getFiltersClass = function (arr) {
    var secondClassArr = [];
    arr.forEach(function (el, i) {
      secondClassArr[i] = el.classList[1];
    });

    return secondClassArr;
  };

  var hideScale = function (classArr) {
    if (classArr !== filtersClassArray[0]) {
      window.UPLOAD_SCALE.classList.remove('hidden');
    } else {
      window.UPLOAD_SCALE.classList.add('hidden');
    }
  };

  var scalePinPosition = function (pinPositionValue) {
    SCALE_PIN.style.left = pinPositionValue;
    SCALE_LEVEL.style.width = SCALE_PIN.style.left;
  };

  var addEffect = function (className) {
    window.imgUploadPreview.className = '';
    window.imgUploadPreview.style.filter = '';
    window.imgUploadPreview.classList.add(className);
  };

  var createEventListener = function (filter, classArr) {
    filter.addEventListener('click', function () {
      scalePinPosition(MAX_SCALE_VALUE);
      addEffect(classArr);
      hideScale(classArr);
    });
  };

  var addEvents = function (filter, classArr) {
    classArr.forEach(function (el, i) {
      return createEventListener(filter[i], el);
    });
  };

  var selectFilter = function (currentImageClass, pinPositionValue) {
    var ret = '';
    switch (currentImageClass) {
      case filtersClassArray[1]:
        ret = 'grayscale(' + (pinPositionValue * 0.01) + ')';
        break;
      case filtersClassArray[2]:
        ret = 'sepia(' + (pinPositionValue * 0.01) + ')';
        break;
      case filtersClassArray[3]:
        ret = 'invert(' + pinPositionValue + '%)';
        break;
      case filtersClassArray[4]:
        ret = 'blur(' + (pinPositionValue * MAX_BLUR_VALUE) * 0.01 + 'px)';
        break;
      case filtersClassArray[5]:
        ret = 'brightness(' + (MIN_BRIGHTNESS_VALUE + ((MAX_BRIGHTNESS_VALUE - MIN_BRIGHTNESS_VALUE) * (pinPositionValue * 0.01))) + ')';
        break;
    }
    return ret;
  };

  var filterSaturation = function () {
    var currentImageClass = window.imgUploadPreview.className;
    var pinPosition = parseInt(SCALE_PIN.style.left, 10);
    window.imgUploadPreview.style.filter = selectFilter(currentImageClass, pinPosition);
    return window.imgUploadPreview.style.filter;
  };

  var filtersClassArray = getFiltersClass(FILTERS);
  addEvents(FILTERS, filtersClassArray);

  SCALE_PIN.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX
      };

      startCoords = {
        x: moveEvt.clientX
      };

      var MIN_SCALE_PIN_VALUE = 0;
      var MAX_SCALE_PIN_VALUE = 100;
      var SCALE_PIN_OFFSET_LEFT = 453;
      SCALE_PIN.style.left = (SCALE_PIN.offsetLeft - shift.x) * 100 / SCALE_PIN_OFFSET_LEFT + '%';
      SCALE_LEVEL.style.width = SCALE_PIN.style.left;
      var pinPosition = parseInt(SCALE_PIN.style.left, 10);
      if (pinPosition < MIN_SCALE_PIN_VALUE) {
        SCALE_PIN.style.left = MIN_SCALE_PIN_VALUE + '%';
        SCALE_LEVEL.style.width = MIN_SCALE_PIN_VALUE + '%';
        document.removeEventListener('mousemove', onMouseMove);
      } else {
        document.addEventListener('mousemove', onMouseMove);
      }
      if (pinPosition > MAX_SCALE_PIN_VALUE) {
        SCALE_PIN.style.left = MAX_SCALE_PIN_VALUE + '%';
        SCALE_LEVEL.style.width = MAX_SCALE_PIN_VALUE + '%';
        document.removeEventListener('mousemove', onMouseMove);
      }
      filterSaturation();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
