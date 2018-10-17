'use strict';

(function () {
  window.successHandler = function (array) {
    var photosFragment = window.createPhotosFragment(array);
    window.utils.userDialog.appendChild(photosFragment);
    window.onImageClick(array);
    window.addSortingEvents(window.utils.SORTING_BUTTONS, array);
    window.sortingShow();
  };

  window.errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.load(window.successHandler, window.errorHandler);
})();
