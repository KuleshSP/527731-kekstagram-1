'use strict';

(function () {
  window.utils = {
    ESC_KEYCODE: 27,
    UPLOAD_HASTAG: document.querySelector('.text__hashtags'),
    UPLOAD_TEXT: document.querySelector('.text__description')
  };
  var SOCIAL_COMMENT_COUNT = document.querySelector('.social__comment-count');
  var SOCIAL_LOAD_MORE = document.querySelector('.social__loadmore');

  SOCIAL_COMMENT_COUNT.classList.add('hidden');
  SOCIAL_LOAD_MORE.classList.add('hidden');
})();
