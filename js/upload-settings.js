'use strict';

(function () {
  window.UPLOAD = document.getElementById('upload-file');
  var UPLOAD_OVERLAY = document.querySelector('.img-upload__overlay');
  var CLOSE_UPLOAD_BUTTON = document.querySelector('.img-upload__cancel');
  var UPLOAD_COMMENT = document.querySelector('.text__description');
  var RESIZE_CONTROL_VALUE = document.querySelector('.scale__control--value');
  var RESIZE_PLUS_BUTTON = document.querySelector('.scale__control--bigger');
  var RESIZE_MINUS_BUTTON = document.querySelector('.scale__control--smaller');
  var EFFECT_INPUT_NONE = document.getElementById('effect-none');
  var SIMILAR_SUCCESS_TEMPLATE = document.querySelector('#success').content.querySelector('.success');
  var SIMILAR_ERROR_TEMPLATE = document.querySelector('#error').content.querySelector('.error');
  var RESIZE_MAX_VALUE = 100;
  var RESIZE_MIN_VALUE = 25;
  var RESIZE_STEP = 25;
  var defaultResizeValue = 100;
  window.imgUploadPreview = document.querySelector('.img-upload__preview').children[0];
  window.UPLOAD_SCALE = document.querySelector('.img-upload__effect-level');
  var FORM = document.querySelector('.img-upload__form');

  var onUploadEscPress = function (evt) {
    if (evt.keyCode === window.utils.ESC_KEYCODE) {
      onCloseUploadClick();
    }
  };
  var openUploadSettings = function () {
    document.querySelector('.text__hashtags').value = '';
    document.querySelector('.text__description').value = '';
    window.imgUploadPreview.className = '';
    window.imgUploadPreview.style.filter = '';
    RESIZE_CONTROL_VALUE.value = RESIZE_MAX_VALUE + '%';
    resizeImage(window.imgUploadPreview, RESIZE_MAX_VALUE);
    defaultResizeValue = RESIZE_MAX_VALUE;
    RESIZE_PLUS_BUTTON.disabled = true;
    window.UPLOAD_SCALE.classList.add('hidden');
    EFFECT_INPUT_NONE.checked = true;
  };
  var onUploadClick = function () {
    UPLOAD_OVERLAY.classList.remove('hidden');
    document.addEventListener('keydown', onUploadEscPress);
    RESIZE_PLUS_BUTTON.addEventListener('click', onPlusClick);
    RESIZE_MINUS_BUTTON.addEventListener('click', onMinusClick);
    openUploadSettings();
  };
  var onCloseUploadClick = function () {
    UPLOAD_OVERLAY.classList.add('hidden');
    document.removeEventListener('keydown', onUploadEscPress);
    RESIZE_PLUS_BUTTON.removeEventListener('click', onPlusClick);
    RESIZE_MINUS_BUTTON.removeEventListener('click', onMinusClick);
    window.UPLOAD.value = '';
  };

  var resizeImage = function (image, resizeValue) {
    image.style.transform = 'scale(' + (resizeValue * 0.01) + ')';
  };

  var onPlusClick = function () {
    var resizeValue = (defaultResizeValue += RESIZE_STEP) + '%';
    RESIZE_CONTROL_VALUE.value = resizeValue;
    defaultResizeValue < RESIZE_MAX_VALUE ? RESIZE_MINUS_BUTTON.disabled = false : RESIZE_PLUS_BUTTON.disabled = true;
    resizeImage(window.imgUploadPreview, defaultResizeValue);
  };
  var onMinusClick = function () {
    RESIZE_CONTROL_VALUE.value = (defaultResizeValue -= RESIZE_STEP) + '%';
    defaultResizeValue > RESIZE_MIN_VALUE ? RESIZE_PLUS_BUTTON.disabled = false : RESIZE_MINUS_BUTTON.disabled = true;
    resizeImage(window.imgUploadPreview, defaultResizeValue);
  };

  var successShow = function () {
    var successElement = SIMILAR_SUCCESS_TEMPLATE.cloneNode(true);
    var fragment = document.createDocumentFragment();
    fragment.appendChild(successElement);
    document.body.appendChild(fragment);
  };
  var onSuccessButtonClick = function () {
    var SUCCESS_POPUP = document.querySelector('.success');
    SUCCESS_POPUP.parentNode.removeChild(SUCCESS_POPUP);
    SUCCESS_POPUP.removeEventListener('click', onSuccessButtonClick);
    document.removeEventListener('keydown', onSuccessButtonEscPress);
  };
  var onSuccessButtonEscPress = function (evt) {
    if (evt.keyCode === window.utils.ESC_KEYCODE) {
      onSuccessButtonClick();
    }
  };

  var errorShow = function () {
    var errorElement = SIMILAR_ERROR_TEMPLATE.cloneNode(true);
    var fragment = document.createDocumentFragment();
    fragment.appendChild(errorElement);
    document.body.appendChild(fragment);
  };
  var onErrorButtonClick = function () {
    var ERROR_POPUP = document.querySelector('.error');
    ERROR_POPUP.parentNode.removeChild(ERROR_POPUP);
    ERROR_POPUP.removeEventListener('click', onErrorButtonClick);
    document.removeEventListener('keydown', onErrorButtonClick);
  };
  var onErrorButtonEscPress = function (evt) {
    if (evt.keyCode === window.utils.ESC_KEYCODE) {
      onErrorButtonClick();
    }
  };

  window.UPLOAD.addEventListener('change', onUploadClick);
  CLOSE_UPLOAD_BUTTON.addEventListener('click', onCloseUploadClick);
  UPLOAD_OVERLAY.addEventListener('keydown', function (evt) {
    if (document.activeElement === window.utils.UPLOAD_HASHTAG || document.activeElement === UPLOAD_COMMENT) {
      if (evt.keyCode === window.utils.ESC_KEYCODE) {
        evt.stopPropagation();
      }
    }
  });

  resizeImage(window.imgUploadPreview, defaultResizeValue);

  FORM.addEventListener('submit', function (evt) {
    window.uploadInfo(new FormData(FORM), function () {
      onCloseUploadClick();
      successShow();
      var SUCCESS_POPUP = document.querySelector('.success');
      SUCCESS_POPUP.addEventListener('click', onSuccessButtonClick);
      document.addEventListener('keydown', onSuccessButtonEscPress);
    }, function () {
      onCloseUploadClick();
      errorShow();
      var ERROR_POPUP = document.querySelector('.error');
      ERROR_POPUP.addEventListener('click', onErrorButtonClick);
      document.addEventListener('keydown', onErrorButtonEscPress);
    });
    evt.preventDefault();
  });
})();
