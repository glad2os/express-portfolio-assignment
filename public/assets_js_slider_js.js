"use strict";
(self["webpackChunkassignment1"] = self["webpackChunkassignment1"] || []).push([["assets_js_slider_js"],{

/***/ "./assets/js/slider.js":
/*!*****************************!*\
  !*** ./assets/js/slider.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ slider)
/* harmony export */ });
function slider() {
  var blockLeft = document.getElementById('block-left');
  var blockMain = document.getElementById('block-main');
  var blockRight = document.getElementById('block-right');
  var images = {
    0: 'blobid0.png',
    1: 'blobid1.png',
    2: 'blobid2.png',
    3: 'blobid3.png',
    4: 'blobid4.png'
  };
  var count = Object.keys(images).length;
  var currentImageIndex = 1;

  Element.prototype.changeBackground = function (imageIndex) {
    this.style.backgroundImage = "url(assets/images/".concat(images[imageIndex], ")");
  };

  blockLeft.changeBackground(0);
  blockMain.changeBackground(1);
  blockRight.changeBackground(2);

  blockMain.onclick = function () {
    return document.location.href = "image.html?id=".concat(images[currentImageIndex]);
  };

  blockLeft.onclick = function () {
    return changeImageWithAnimation(currentImageIndex - 1);
  };

  blockRight.onclick = function () {
    return changeImageWithAnimation(currentImageIndex + 1);
  };

  var timeout = undefined;

  function changeImageWithAnimation(expectedIndex) {
    clearTimeout(timeout);
    currentImageIndex = mod(expectedIndex, count);
    blockLeft.changeBackground(mod(currentImageIndex - 1, count));
    blockMain.changeBackground(currentImageIndex);
    blockRight.changeBackground(mod(currentImageIndex + 1, count));
    blockMain.classList.remove("fade-in");
    timeout = setTimeout(function () {
      blockMain.classList.add("fade-in");
      timeout = setTimeout(function () {
        return blockMain.classList.remove("fade-in");
      }, 1000);
    }, 12);
  }

  function mod(n, m) {
    return (n % m + m) % m;
  }
  /*
      Favourites block
   */


  var counter = 0;
  var addToFavourites = document.querySelector('.buttons').children[0];
  var RemoveFromFavourites = document.querySelector('.buttons').children[1];

  addToFavourites.onclick = function () {
    if (counter + 1 === 6) {
      document.querySelector('.message').style.display = 'block';
      return;
    }

    var elem = document.createElement('div');
    elem.innerHTML = "<img width='50px' height='50px' src='assets/images/".concat(images[currentImageIndex], "'>");
    document.querySelector('.favorites').insertAdjacentElement('beforeend', elem);
    counter++;
  };

  RemoveFromFavourites.onclick = function () {
    var children = document.querySelector('.favorites').children;

    if (children.length > 0) {
      children[children.length - 1].remove();
      counter -= 1;
    }
  };
  /*
      Message block
   */


  var clear = document.querySelector('.message').querySelector('.buttons').children[0];
  var close = document.querySelector('.message').querySelector('.buttons').children[1];

  clear.onclick = function () {
    counter = 0;
    document.querySelector('.message').style.display = 'none';
    document.querySelector('.favorites').innerHTML = '';
  };

  close.onclick = function () {
    return document.querySelector('.message').style.display = 'none';
  };
}

/***/ })

}]);
//# sourceMappingURL=assets_js_slider_js.js.map