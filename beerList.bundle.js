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

/***/ "./src/js/beerList.js":
/*!****************************!*\
  !*** ./src/js/beerList.js ***!
  \****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_styles_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scss/styles.scss */ "./src/scss/styles.scss");
/* harmony import */ var _scss_styles_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_scss_styles_scss__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _getQueryVariable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getQueryVariable */ "./src/js/getQueryVariable.js");



const pageNumberSpan = document.querySelector('.page-number__value');
const previousPage = document.querySelector('.button__previous-page');
const nextPage = document.querySelector('.button__next-page');
const baseURL = 'https://api.punkapi.com/v2/beers';
let pageNumber = 1;
const itemsPerPage = 20;
const searchedBeerName = Object(_getQueryVariable__WEBPACK_IMPORTED_MODULE_1__["default"])('beer');
const searchedFood = Object(_getQueryVariable__WEBPACK_IMPORTED_MODULE_1__["default"])('food');
const createURLforBeerList = (pageNumber, itemsPerPage) => `${baseURL}?page=${pageNumber}&per_page=${itemsPerPage}`;
const createURLforBeerID = (beerID) => `${baseURL}/${beerID}`;
const createURLforBeerName = (beerName, pageNumber, itemsPerPage) => `${baseURL}?beer_name=${beerName}&page=${pageNumber}&per_page=${itemsPerPage}`;
const createURLforFood = (food, pageNumber, itemsPerPage) => `${baseURL}?food=${food}&page=${pageNumber}&per_page=${itemsPerPage}`;

previousPage.addEventListener('click', async () => {
    // Equal or less to prevent bug caused by fast button clicking
    if (pageNumber <= 1) {
        pageNumber = 1;
        return;
    };
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
        pageNumberSpan.dataset.pageNumber = --pageNumber;
        pageNumberSpan.innerHTML = pageNumber;
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
        pageNumberSpan.dataset.pageNumber = ++pageNumber;
        pageNumberSpan.innerHTML = pageNumber;
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
        beer.classList.add('beer');
        const beerNameContainer = document.createElement('div');
        beerNameContainer.classList.add('beer__name');
        const beerName = document.createElement('span');
        const beerAbv = document.createElement('div');
        beerAbv.classList.add('beer__abv');
        const beerIbu = document.createElement('div');
        beerIbu.classList.add('beer__ibu');
        const beerImage = document.createElement('img');
        beerImage.classList.add('beer__image');
        const buttonModal = document.createElement('button');
        buttonModal.classList.add('beer__button-modal');
        buttonModal.setAttribute('aria-label', 'Open beer dialog');

        beerList.appendChild(beer);
        beer.appendChild(beerNameContainer);
        beerNameContainer.appendChild(beerName);
        beer.appendChild(beerAbv);
        beer.appendChild(beerIbu);
        beer.appendChild(buttonModal);
        beer.appendChild(beerImage);

        const {name, abv, ibu, image_url, id} = obj;
        beerName.innerHTML = name;
        beerAbv.innerHTML = `ABV: ${abv == null ? "Unknown" : abv}%`;
        beerIbu.innerHTML = `IBU: ${ibu == null ? "Unknown" : ibu}`;
        buttonModal.innerHTML = `Read more`;
        buttonModal.dataset.beerId = id;
        buttonModal.addEventListener('click', showBeerDetails);
        beerImage.src = image_url;
        beerImage.alt = "";
    }
}

const clearBeerList = () => {
    let beerList = document.querySelector('.beer-list');
    while (beerList.firstChild) {
        beerList.removeChild(beerList.firstChild);
    }
}

const beerDialogContainer = document.querySelector('.beer-dialog__container');
const beerDialog = document.querySelector('.beer-dialog');
const beerDialogCloseButton = document.querySelector('.beer-dialog__close-button');
let focusedBoforeDialog; 

const openBeerDialog = () => {
    beerDialogContainer.classList.add('beer-dialog__container--active');
    document.body.classList.add('scroll-lock');
    focusedBoforeDialog = document.activeElement;
    focusFirstElement();
    trapFocus();
}

const focusFirstElement = () => {
    const focusable = beerDialog.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    focusable[0].focus();
}

const keepFocusInside = (event) => {
    if (event.keyCode == 9) {
        const focusable = beerDialog.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        const focusedIndex = Array.prototype.indexOf.call(focusable, document.activeElement);
        if (!event.shiftKey && focusedIndex == focusable.length - 1) {
            focusable[0].focus();
            event.preventDefault();
        }
        else if (event.shiftKey && focusedIndex == 0) {
            focusable[focusable.length - 1].focus();
            event.preventDefault();
        }
    }
}

const retriveLostFocus = (event) => {
    if (!beerDialog.contains(event.target)) {
        focusFirstElement();
    }
}

const trapFocus = () => {
    document.addEventListener('keydown', keepFocusInside);
    document.body.addEventListener('focus', retriveLostFocus, true)
}

beerDialogCloseButton.addEventListener('click', () => {
    beerDialogContainer.classList.remove('beer-dialog__container--active');
    document.body.classList.remove('scroll-lock');
    document.removeEventListener('keydown', keepFocusInside);
    document.body.removeEventListener('focus', retriveLostFocus, true);
    focusedBoforeDialog.focus();
});

async function showBeerDetails() {
    const beerID = this.dataset.beerId;
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
        if (!hopsNames.includes(name)) hopsNames.push(name);
    })
    const maltNames = []
    malt.map(malt => {
        const {name} = malt;
        if (!maltNames.includes(name)) maltNames.push(name);
    })
    beerName.innerHTML = name;
    beerAbv.innerHTML = `ABV: ${abv == null ? "Unknown" : abv}%`;
    beerIbu.innerHTML = `IBU: ${ibu == null ? "Unknown" : ibu}`;
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
    }
})();





/***/ }),

/***/ "./src/js/getQueryVariable.js":
/*!************************************!*\
  !*** ./src/js/getQueryVariable.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getQueryVariable; });
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
const menuItems = document.querySelectorAll('.menu__item');
const navigation = document.querySelector('.navigation');
let isMobileMenuOpen = false;

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('hamburger--active');
    menu.classList.toggle('menu--active');
    document.body.classList.toggle('scroll-lock')
    if (!isMobileMenuOpen) {
        document.addEventListener('keydown', keepFocusInside);
    } else {
        document.removeEventListener('keydown', keepFocusInside);
    }
    isMobileMenuOpen = !isMobileMenuOpen;
});

menuItems.forEach(item => item.addEventListener('click', () => {
    hamburger.classList.remove('hamburger--active');
    menu.classList.remove('menu--active');
    document.body.classList.remove('scroll-lock')
    if (isMobileMenuOpen) {
        document.removeEventListener('keydown', keepFocusInside);
        isMobileMenuOpen = false;
    }
}));

const keepFocusInside = (event) => {
    if (event.keyCode == 9) {
        const focusable = navigation.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        const focusedIndex = Array.prototype.indexOf.call(focusable, document.activeElement);
        if (!event.shiftKey && focusedIndex == focusable.length - 1) {
            focusable[0].focus();
            event.preventDefault();
        }
        else if (event.shiftKey && focusedIndex == 0) {
            focusable[focusable.length - 1].focus();
            event.preventDefault();
        }
    }
}


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
/*!*********************************************************!*\
  !*** multi ./src/js/beerList.js ./src/js/navigation.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./src/js/beerList.js */"./src/js/beerList.js");
module.exports = __webpack_require__(/*! ./src/js/navigation.js */"./src/js/navigation.js");


/***/ })

/******/ });