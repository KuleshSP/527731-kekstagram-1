'use strict';

(function () {
  window.UPLOAD = document.getElementById('upload-file');
  var UPLOAD_OVERLAY = document.querySelector('.img-upload__overlay');
  var CLOSE_UPLOAD_BUTTON = document.querySelector('.img-upload__cancel');
  var UPLOAD_COMMENT = document.querySelector('.text__description');
  var RESIZE_CONTROL_VALUE = document.querySelector('.resize__control--value');
  var RESIZE_PLUS_BUTTON = document.querySelector('.resize__control--plus');
  var RESIZE_MINUS_BUTTON = document.querySelector('.resize__control--minus');
  var RESIZE_MAX_VALUE = 100;
  var RESIZE_MIN_VALUE = 25;
  var RESIZE_STEP = 25;
  var defaultResizeValue = 100;
  window.imgUploadPreview = document.querySelector('.img-upload__preview').children[0];
  window.UPLOAD_SCALE = document.querySelector('.img-upload__scale');
  var FORM = document.querySelector('.img-upload__form');

  var onUploadEscPress = function (evt) {
    if (evt.keyCode === window.utils.ESC_KEYCODE) {
      closeUpload();
    }
  };
  var openUploadSettings = function () {
    window.imgUploadPreview.className = '';
    window.imgUploadPreview.style.filter = '';
    RESIZE_CONTROL_VALUE.value = RESIZE_MAX_VALUE + '%';
    resizeImage(window.imgUploadPreview, RESIZE_MAX_VALUE);
    defaultResizeValue = RESIZE_MAX_VALUE;
    RESIZE_PLUS_BUTTON.disabled = true;
    window.UPLOAD_SCALE.classList.add('hidden');
  };
  var openUpload = function () {
    UPLOAD_OVERLAY.classList.remove('hidden');
    document.addEventListener('keydown', onUploadEscPress);
    openUploadSettings();
  };
  var closeUpload = function () {
    UPLOAD_OVERLAY.classList.add('hidden');
    document.removeEventListener('keydown', onUploadEscPress);
    window.UPLOAD.value = '';
  };

  var resizeImage = function (image, resizeValue) {
    image.style.transform = 'scale(' + (resizeValue * 0.01) + ')';
  };

  var resizeControlPlus = function () {
    var resizeValue = (defaultResizeValue += RESIZE_STEP) + '%';
    RESIZE_CONTROL_VALUE.value = resizeValue;
    if (defaultResizeValue < RESIZE_MAX_VALUE) {
      RESIZE_MINUS_BUTTON.disabled = false;
    } else {
      RESIZE_PLUS_BUTTON.disabled = true;
    }
    resizeImage(window.imgUploadPreview, defaultResizeValue);
  };
  var resizeControlMinus = function () {
    RESIZE_CONTROL_VALUE.value = (defaultResizeValue -= RESIZE_STEP) + '%';
    if (defaultResizeValue > RESIZE_MIN_VALUE) {
      RESIZE_PLUS_BUTTON.disabled = false;
    } else {
      RESIZE_MINUS_BUTTON.disabled = true;
    }
    resizeImage(window.imgUploadPreview, defaultResizeValue);
  };

  window.UPLOAD.addEventListener('change', openUpload);
  CLOSE_UPLOAD_BUTTON.addEventListener('click', closeUpload);
  UPLOAD_OVERLAY.addEventListener('keydown', function (evt) {
    if (document.activeElement === window.utils.UPLOAD_HASTAG || document.activeElement === UPLOAD_COMMENT) {
      if (evt.keyCode === window.utils.ESC_KEYCODE) {
        evt.stopPropagation();
      }
    }
  });

  resizeImage(window.imgUploadPreview, defaultResizeValue);
  RESIZE_PLUS_BUTTON.addEventListener('click', function () {
    resizeControlPlus();
  });
  RESIZE_MINUS_BUTTON.addEventListener('click', function () {
    resizeControlMinus();
  });

  FORM.addEventListener('submit', function (evt) {
    window.uploadInfo(new FormData(FORM), function () {
      closeUpload();
    });
    evt.preventDefault();
  });
})();
