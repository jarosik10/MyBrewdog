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
/* harmony import */ var _getUrlVariable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getUrlVariable */ "./src/js/getUrlVariable.js");



const pageInput = document.querySelector('.page-number');
const previousPage = document.querySelector('.button__previous-page');
const nextPage = document.querySelector('.button__next-page');
const baseURL = 'https://api.punkapi.com/v2/beers';
let pageNumber = 1;
const itemsPerPage = 20;
const searchedBeerName = Object(_getUrlVariable__WEBPACK_IMPORTED_MODULE_1__["getQueryVariable"])('beer')
const searchedFood = Object(_getUrlVariable__WEBPACK_IMPORTED_MODULE_1__["getQueryVariable"])('food')
const createURLforBeerList = (pageNumber, itemsPerPage) => `${baseURL}?page=${pageNumber}&per_page=${itemsPerPage}`;
const createURLforBeerID = (beerID) => `${baseURL}/${beerID}`;
const createURLforBeerName = (beerName, pageNumber, itemsPerPage) => `${baseURL}?beer_name=${beerName}&page=${pageNumber}&per_page=${itemsPerPage}`;
const createURLforFood = (food, pageNumber, itemsPerPage) => `${baseURL}?food=${food}&page=${pageNumber}&per_page=${itemsPerPage}`;

previousPage.addEventListener('click', async () => {
    if (pageNumber == 1) return;
    let url;
    if (searchedBeerName) {
        url = createURLforBeerName(searchedBeerName, pageNumber - 1, itemsPerPage); 
    }
    else if (searchedFood) {
        url = createURLforFood(searchedFood, pageNumber - 1, itemsPerPage); 
    }
    else {
        url = createURLforBeerList(pageNumber - 1, itemsPerPage);
    }
    const data = await getBeerData(url);
    if (data.length != 0) {
        clearBeerList();
        addBeerImages(data);
        pageInput.setAttribute('value', --pageNumber);
    }
});


nextPage.addEventListener('click', async () => {
    let url;
    if (searchedBeerName) {
        url = createURLforBeerName(searchedBeerName, pageNumber + 1, itemsPerPage); 
    }
    else if (searchedFood) {
        url = createURLforFood(searchedFood, pageNumber + 1, itemsPerPage); 
    }
    else {
        url = createURLforBeerList(pageNumber + 1, itemsPerPage);
    }
    const data = await getBeerData(url);
    if (data.length != 0) {
        clearBeerList();
        addBeerImages(data);
        pageInput.setAttribute('value', ++pageNumber);
    }
});

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
        const beerName = document.createElement('div');
        beerName.classList.add('beer__name');
        const beerAbv = document.createElement('div');
        beerAbv.classList.add('beer__abv');
        const beerIbu = document.createElement('div');
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

        const {name, abv, ibu, image_url, id} = obj;
        beerName.innerHTML = name;
        beerAbv.innerHTML = `ABV: ${abv == null ? "Unknown" : abv}%`
        beerIbu.innerHTML = `IBU: ${ibu == null ? "Unknown" : ibu}`;
        buttonModal.innerHTML = `Read more`;
        buttonModal.value = id;
        buttonModal.addEventListener('click', showBeerDetails)
        beerImage.src = image_url;
    }
}

const clearBeerList = () => {
    let beerList = document.querySelector('.beer-list');
    while (beerList.firstChild) {
        beerList.removeChild(beerList.firstChild);
    }
}

const beerDialogContainer = document.querySelector('.beer-dialog__container');
const beerDialogCloseButton = document.querySelector('.beer-dialog__close-button');


beerDialogCloseButton.addEventListener('click', () => {
    beerDialogContainer.classList.remove('beer-dialog__container--active');
    document.body.classList.remove('scroll-lock')
})


const openBeerDialog = () => {
    beerDialogContainer.classList.add('beer-dialog__container--active');
    document.body.classList.add('scroll-lock')
}

async function showBeerDetails() {
    const beerID = this.value;
    const url = createURLforBeerID(beerID);
    const data = await getBeerData(url);
    const [beer] = data;
    const {name, abv, ibu, ingredients:{hops, malt}, description, image_url} = beer;
    const beerName = document.querySelector('.beer-dialog__name');
    const beerAbv = document.querySelector('.beer-dialog__abv');
    const beerIbu = document.querySelector('.beer-dialog__ibu');
    const beerHops = document.querySelector('.beer-dialog__hops');
    const beerMatls = document.querySelector('.beer-dialog__malts');
    const beerDescription = document.querySelector('.beer-dialog__description');
    const beerImage = document.querySelector('.beer-dialog__image');

    const hopsNames = []
    hops.map(hop => {
        const {name} = hop;
        if (!hopsNames.includes(name)) hopsNames.push(name)
    })
    const maltNames = []
    malt.map(malt => {
        const {name} = malt;
        if (!maltNames.includes(name)) maltNames.push(name)
    })
    beerName.innerHTML = name;
    beerAbv.innerHTML = `ABV: ${abv == null ? "Unknown" : abv}%`
    beerIbu.innerHTML = `IBU: ${ibu == null ? "Unknown" : ibu}`
    beerHops.innerHTML = `Hops: ${hopsNames.join(", ")}`;
    beerMatls.innerHTML = `Malts: ${maltNames.join(", ")}`;
    beerDescription.innerHTML = description;
    beerImage.src = image_url;
    openBeerDialog();   
}

(async function showFirstPage() {
    let url;
    if (searchedBeerName) {
        url = createURLforBeerName(searchedBeerName, pageNumber, itemsPerPage); 
    }
    else if (searchedFood) {
        url = createURLforFood(searchedFood, pageNumber, itemsPerPage); 
    }
    else {
        url = createURLforBeerList(pageNumber, itemsPerPage);
    }
    const data = await getBeerData(url);
    if (data.length != 0) {
        clearBeerList();
        addBeerImages(data);
        pageInput.setAttribute('value', pageNumber);
    }
})();





/***/ }),

/***/ "./src/js/getUrlVariable.js":
/*!**********************************!*\
  !*** ./src/js/getUrlVariable.js ***!
  \**********************************/
/*! exports provided: getQueryVariable */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getQueryVariable", function() { return getQueryVariable; });
function getQueryVariable(variable) {
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}

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
    hamburger.classList.remove('hamburger--active');
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