'use strict';

(function () {
  var SORTING = document.querySelector('.img-filters');
  window.SORTING_BUTTONS = document.querySelectorAll('.img-filters__button');
  var BUTTON_SORT_POPULAR = document.getElementById('filter-popular');
  var BUTTON_SORT_NEW = document.getElementById('filter-new');
  var BUTTON_SORT_DISCUSSED = document.getElementById('filter-discussed');

  window.sortingShow = function () {
    SORTING.classList.remove('img-filters--inactive');
  };
  var shuffle = function (array) {
    var counter = array.length;

    while (counter > 0) {
      var index = Math.floor(Math.random() * counter);

      counter--;

      var temp = array[counter];
      array[counter] = array[index];
      array[index] = temp;
    }

    return array;
  };

  var sortNewImages = function (array) {
    var newArray = array.slice();
    var shuffledArray = shuffle(newArray);
    shuffledArray.length = 10;
    return shuffledArray;
  };

  var sortDiscussingImages = function (array) {
    var newArray = array.slice();
    newArray.sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
    return newArray;
  };

  var createSortEventListener = function (btns, array) {
    btns.addEventListener('click', function (evt) {
      window.SORTING_BUTTONS.forEach(function (element) {
        element.className = 'img-filters__button';
      });
      var target = evt.target;
      target.classList.add('img-filters__button--active');
      clearGallery();
      sorting(array);
    });
  };

  window.addSortingEvents = function (btns, array) {
    Array.prototype.some.call(btns, function (elem, i) {
      return createSortEventListener(btns[i], array);
    });
  };

  var clearGallery = function () {
    var pictureLink = document.querySelectorAll('.picture__link');
    pictureLink.forEach(function (element) {
      window.userDialog.removeChild(element);
    });
  };

  var sorting = function (arr) {
    var activeButton = 'img-filters__button--active';
    var sorted;
    switch (activeButton) {
      case BUTTON_SORT_POPULAR.classList[1]:
        sorted = arr;
        break;
      case BUTTON_SORT_NEW.classList[1]:
        sorted = sortNewImages(arr);
        break;
      case BUTTON_SORT_DISCUSSED.classList[1]:
        sorted = sortDiscussingImages(arr);
        break;
    }
    var photosFragment = window.createPhotosFragment(sorted);
    window.userDialog.appendChild(photosFragment);
    window.onImageClick(sorted);
  };
})();
