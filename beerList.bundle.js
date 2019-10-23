/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/beer-list.js":
/*!*****************************!*\
  !*** ./src/js/beer-list.js ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_styles_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scss/styles.scss */ "./src/scss/styles.scss");
/* harmony import */ var _scss_styles_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_scss_styles_scss__WEBPACK_IMPORTED_MODULE_0__);


const pageInput = document.querySelector('.page-number');
const previousPage = document.querySelector('.button__previous-page');
const nextPage = document.querySelector('.button__next-page');
const baseURL = 'https://api.punkapi.com/v2/beers';
let pageNumber = 1;
const itemsPerPage = 20;

previousPage.addEventListener('click', async () => {
    if (pageNumber == 1) return;
    const url = createURL(pageNumber - 1, itemsPerPage);
    const data = await getBeerData(url);
    if (data.length != 0) {
        clearBeerList();
        addBeerImages(data);
        pageInput.setAttribute('value', --pageNumber);
    }
});


nextPage.addEventListener('click', async () => {
    const url = createURL(pageNumber + 1, itemsPerPage);
    const data = await getBeerData(url);
    if (data.length != 0) {
        clearBeerList();
        addBeerImages(data);
        pageInput.setAttribute('value', ++pageNumber);
    }
});


const createURL = (pageNumber, itemsPerPage) => `${baseURL}?page=${pageNumber}&per_page=${itemsPerPage}`;

const getBeerData = async (url) => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('Request failed', error);
    }
}

const addBeerImages = (data) => {
    let beerList = document.querySelector('.beer-list');
    for (const obj of data) {
        const beer = document.createElement('li');
        beer.classList.add('beer')
        const beerName = document.createElement('span');
        beerName.classList.add('beer__name');
        const beerAbv = document.createElement('span');
        beerAbv.classList.add('beer__abv');
        const beerIbu = document.createElement('span');
        beerIbu.classList.add('beer__ibu');
        const beerImage = document.createElement('img');
        beerImage.classList.add('beer__image');
        const buttonModal = document.createElement('button');
        buttonModal.classList.add('beer__button-modal');

        beerList.appendChild(beer);
        beer.appendChild(beerName);
        beer.appendChild(beerAbv);
        beer.appendChild(beerIbu);
        beer.appendChild(buttonModal);
        beer.appendChild(beerImage);

        beerName.innerHTML = obj.name;
        beerAbv.innerHTML = `ABV:${obj.abv}%`
        beerIbu.innerHTML = `IBU: ${obj.ibu}`;
        buttonModal.innerHTML = `Read more`;
        buttonModal.value = obj.id;
        beerImage.src = obj.image_url;
    }
}

const clearBeerList = () => {
    let beerList = document.querySelector('.beer-list');
    while (beerList.firstChild) {
        beerList.removeChild(beerList.firstChild);
    }
}

(async function showFirstPage() {
    const url = createURL(pageNumber, itemsPerPage);
    const data = await getBeerData(url);
    if (data.length != 0) {
        clearBeerList();
        addBeerImages(data);
        console.log(data);
        pageInput.setAttribute('value', pageNumber);
    }
})();





/***/ }),

/***/ "./src/js/navigation.js":
/*!******************************!*\
  !*** ./src/js/navigation.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');
const menuItems = document.querySelectorAll('.menu__list__item');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('hamburger--active');
    menu.classList.toggle('menu--active');
}, false);

menuItems.forEach(item => item.addEventListener('click', () => {
    hamburger.classList.remove  ('hamburger--active');
    menu.classList.remove('menu--active');
}));


/***/ }),

/***/ "./src/scss/styles.scss":
/*!******************************!*\
  !*** ./src/scss/styles.scss ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 1:
/*!**********************************************************!*\
  !*** multi ./src/js/beer-list.js ./src/js/navigation.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./src/js/beer-list.js */"./src/js/beer-list.js");
module.exports = __webpack_require__(/*! ./src/js/navigation.js */"./src/js/navigation.js");


/***/ })

/******/ });