'use strict';

(function () {
  var AVATAR_ALT = 'Аватар комментатора фотографии';
  var AVATAR_WIDTH = 35;
  var AVATAR_HEIGHT = 35;
  var AVATAR_URL_INDEX_MIN = 1;
  var AVATAR_URL_INDEX_MAX = 6;
  window.userDialog = document.querySelector('.pictures');
  var BIG_PICTURE = document.querySelector('.big-picture');
  var BIG_PICTURE_IMG = document.querySelector('.big-picture__img').children[0];
  var LIKES_COUNT = document.querySelector('.likes-count');
  var COMMENTS_COUNT = document.querySelector('.comments-count');
  var SOCIAL_CAPTION = document.querySelector('.social__caption');
  var SOCIAL_COMMENTS = document.querySelector('.social__comments');
  var CLOSE_BUTTON_BIG_PICTURE = document.querySelector('.big-picture__cancel');
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var setBigPictureData = function (control, data, avatarIndexMin, avatarIndexMax) {
    var commentsFragment = createCommentsFragment(data, avatarIndexMin, avatarIndexMax);
    control.imageElement.src = data.url;
    control.likesElement.textContent = data.likes;
    control.commentsElement.textContent = data.comments.length;
    control.socialElement.textContent = data.description;
    clearComments(control.socialCommentsElement);
    control.socialCommentsElement.appendChild(commentsFragment);
  };
  var makeComment = function (tagName, className, secondClassName) {
    var element = document.createElement(tagName);
    element.classList.add(className);
    if (secondClassName) {
      element.classList.add(secondClassName);
    }
    return element;
  };

  var getRandomNumber = function (min, max) {
    return Math.round(Math.random() * (max - min) + min);
  };
  var generateAvatarUrl = function (avatarUrlMin, avatarUrlMax) {
    var avatarUrl = 'img/avatar-' + getRandomNumber(avatarUrlMin, avatarUrlMax) + '.svg';
    return avatarUrl;
  };

  var createCommentsFragment = function (data, avatarUrlMin, avatarUrlMax) {
    var fragment = document.createDocumentFragment();
    data.comments.forEach(function (el) {
      var text = el;
      var url = generateAvatarUrl(avatarUrlMin, avatarUrlMax);
      var commentItem = renderComment(text, url);
      fragment.appendChild(commentItem);
    });

    return fragment;
  };
  var renderComment = function (text, avatarURL) {
    var listItem = makeComment('li', 'social__comment', 'social__comment--text');

    var picture = makeComment('img', 'social__picture');
    picture.src = avatarURL;
    picture.alt = AVATAR_ALT;
    picture.width = AVATAR_WIDTH;
    picture.height = AVATAR_HEIGHT;
    listItem.appendChild(picture);

    var textComment = makeComment('p', 'social__text');

    textComment.textContent = text;
    listItem.appendChild(textComment);
    return listItem;
  };
  var clearComments = function (el) {
    var element = el;
    element.innerHTML = '';
  };

  window.onImageClick = function (arr) {
    var pictureImage = document.querySelectorAll('.picture__img');
    pictureImage.forEach(function (element, i) {
      element.addEventListener('click', function () {
        setBigPictureData({
          'imageElement': BIG_PICTURE_IMG,
          'likesElement': LIKES_COUNT,
          'commentsElement': COMMENTS_COUNT,
          'socialElement': SOCIAL_CAPTION,
          'socialCommentsElement': SOCIAL_COMMENTS
        }, arr[i], AVATAR_URL_INDEX_MIN, AVATAR_URL_INDEX_MAX);
        showBigPicture();
      });
    });
  };

  var onBigPictureEscPress = function (evt) {
    if (evt.keyCode === window.utils.ESC_KEYCODE) {
      closeBigPicture();
    }
  };

  var showBigPicture = function () {
    BIG_PICTURE.classList.remove('hidden');
    document.addEventListener('keydown', onBigPictureEscPress);
  };
  var closeBigPicture = function () {
    BIG_PICTURE.classList.add('hidden');
    document.removeEventListener('keydown', onBigPictureEscPress);
  };

  CLOSE_BUTTON_BIG_PICTURE.addEventListener('click', function () {
    closeBigPicture();
  });

  window.UPLOAD.addEventListener('change', function () {
    var file = window.UPLOAD.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        window.imgUploadPreview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });
})();