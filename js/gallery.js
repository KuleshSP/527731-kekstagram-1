'use strict';

(function () {
  var similarPhotoTemplate = document.querySelector('#picture').content.querySelector('.picture__link');

  var renderPhoto = function (array, imageTemplate) {
    var photoElement = imageTemplate.cloneNode(true);

    photoElement.querySelector('.picture__img').src = array.url;
    photoElement.querySelector('.picture__stat--likes').textContent = array.likes;
    photoElement.querySelector('.picture__stat--comments').textContent = array.comments.length;

    return photoElement;
  };

  window.createPhotosFragment = function (array) {
    var fragment = document.createDocumentFragment();
    array.forEach(function (el) {
      fragment.appendChild(renderPhoto(el, similarPhotoTemplate));
    });

    return fragment;
  };
})();
