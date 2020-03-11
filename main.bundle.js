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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/beerStyleCarousel.js":
/*!*************************************!*\
  !*** ./src/js/beerStyleCarousel.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BeerStyleCarousel; });
/* harmony import */ var _mobileAndTabletCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mobileAndTabletCheck */ "./src/js/mobileAndTabletCheck.js");
/* harmony import */ var _isInViewport__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./isInViewport */ "./src/js/isInViewport.js");



class BeerStyleCarousel {
    constructor(beerStyles, maxRadius) {
        this.beerStyles = beerStyles;
        this.maxRadius = maxRadius;
        this.viewportWidth = window.innerWidth;
        this.theta;
        this.radius;
        this.sceneWidth;
        this.carouselCellWidth;
        this.numberOfCarouselCells;
    }

    calculateCaruselParameters() {
        this.numberOfCarouselCells  = this.beerStyles.length;
        this.theta = 360 / this.numberOfCarouselCells;
        let thetaRadians = Math.PI * this.theta / 180;
        this.radius = (this.viewportWidth - 30) / 2;
        this.radius = (this.radius < this.maxRadius) ? this.radius : this.maxRadius;
        this.sceneWidth = Math.round(Math.tan(thetaRadians / 2) * this.radius * 2);
        this.carouselCellWidth = this.sceneWidth - 20;
    }

    rotateCarousel(carousel, rotation) {
        carousel.style.transform = 'translateZ(' + -this.radius + 'px) rotateY(' + rotation + 'deg)';
    }

    createCarousel() {
        this.calculateCaruselParameters();    
        const beerStylesContainer = document.createElement('div');
        beerStylesContainer.classList.add('beer-styles__container');
        // beerStylesContainer.setAttribute('tabindex', '0')
        const scene = document.createElement('div');
        scene.classList.add('beer-styles__scene');
        scene.style.width = this.sceneWidth + 'px';
        scene.style.height =this.sceneWidth + 'px';
        const carousel = document.createElement('div');
        carousel.classList.add('beer-styles__carousel');
        carousel.style.transform = 'translateZ(' + -this.radius + 'px)';
        document.querySelector('.section__beer-styles').appendChild(beerStylesContainer);
        beerStylesContainer.appendChild(scene);
        scene.appendChild(carousel);

        for (let i = 0; i < this.numberOfCarouselCells; i++) {
            const carouselCell = document.createElement('div');
            carouselCell.classList.add('carousel__cell');
            carouselCell.style.width = this.carouselCellWidth + 'px';
            carouselCell.style.height = this.carouselCellWidth + 'px';
            let cellAngle = this.theta * i;
            carouselCell.style.transform = 'rotateY' + '(' + cellAngle + 'deg) translateZ(' + this.radius + 'px)';
            const carouselCellLink = document.createElement('a');
            carouselCellLink.classList.add('cell__link');
            carouselCellLink.href = "#" + this.beerStyles[i];
            carouselCellLink.innerHTML = this.beerStyles[i];
            carousel.appendChild(carouselCell);
            carouselCell.appendChild(carouselCellLink);
        }
        this.addCarouselMovement(beerStylesContainer, carousel);
    }

    addCarouselMovement(field, carousel) {
        let rotation = 0;
        let rotationForce = 252 * Math.pow(this.radius, -1.2); //rotation force equation calculated experimentally

        if (Object(_mobileAndTabletCheck__WEBPACK_IMPORTED_MODULE_0__["default"])()) {
            field.ontouchstart = (event) => {
                event = event || window.event;
                let touchPositionX = event.touches[0].clientX;
                field.ontouchmove = (event) => {
                    event = event || window.event;
                    let newTouchPositionX = event.touches[0].clientX;
                    let shift = touchPositionX - newTouchPositionX;
                    rotation += shift * -rotationForce;
                    this.rotateCarousel(carousel, rotation);
                    touchPositionX = newTouchPositionX;
                }
                field.ontouchend = (event) => {
                    field.ontouchmove = field.ontouchend = null;
                }
            }
        } else {
            field.onmousedown =  (event) => {
                event = event || window.event;
                event.preventDefault();
                let mousePositionX = event.clientX;
                field.onmousemove = (event) => {
                    event = event || window.event;
                    let newMousePositionX = event.clientX;
                    let shift = mousePositionX - newMousePositionX;
                    rotation += shift * -rotationForce;
                    this.rotateCarousel(carousel, rotation);
                    mousePositionX = newMousePositionX;
                }
                document.addEventListener('mouseup', function removeListeners() {
                    field.onmousemove = field.onmouseup = null;
                    document.removeEventListener('mouseup', removeListeners);
                });
            }

            const focusalbeCells = carousel.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
            document.addEventListener('keydown', (event) => {
                if (Object(_isInViewport__WEBPACK_IMPORTED_MODULE_1__["default"])(carousel)) {
                    if (event.keyCode == 39) {
                        rotation -= this.theta;
                        this.rotateCarousel(carousel, rotation);
                    }
                    if (event.keyCode == 37) {  
                        rotation += this.theta;
                        this.rotateCarousel(carousel, rotation);
                    }
                }
            });
            
            field.addEventListener('keydown', (event) => {
                if (event.keyCode == 9) {
                    const focusedIndex = Array.prototype.indexOf.call(focusalbeCells, document.activeElement);
                    if (!event.shiftKey && focusedIndex != focusalbeCells.length - 1) {
                        rotation -= this.theta;
                        this.rotateCarousel(carousel, rotation);
                    }
                    else if (event.shiftKey && focusedIndex != 0) {
                        rotation += this.theta;
                        this.rotateCarousel(carousel, rotation);
                    }
                }
            });
        }
    }

    //Recreate the carousel (checks if the viewport width was changed)
    recreateBeerStyleCarousel() {   
        let newViewportWidth = window.innerWidth;
        if (this.viewportWidth != newViewportWidth) {
            this.viewportWidth = newViewportWidth;
            document.querySelector('.beer-styles__container').remove();
            this.createCarousel();
        }
    }
}

/***/ }),

/***/ "./src/js/isInViewport.js":
/*!********************************!*\
  !*** ./src/js/isInViewport.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return isInViewport; });
function isInViewport(element) {
    const rect = element.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) 
    );
}

/***/ }),

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_styles_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scss/styles.scss */ "./src/scss/styles.scss");
/* harmony import */ var _scss_styles_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_scss_styles_scss__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _beerStyleCarousel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./beerStyleCarousel */ "./src/js/beerStyleCarousel.js");



const beerStyles = ['India Pale Ale (IPA)', 'Double IPA', 'American IPA', 'Witbier', 'Saison', 'Pilsner', 'Russian Imperial Stout (RIS)', 'Oatmeal Stout', 'Baltic Porter', 'Barley Wine', 'Lambic'];
const maxRadius = 630;
const beerStyleCarousel = new _beerStyleCarousel__WEBPACK_IMPORTED_MODULE_1__["default"](beerStyles, maxRadius);

window.onresize = () =>{
    beerStyleCarousel.recreateBeerStyleCarousel();
};

beerStyleCarousel.createCarousel();

const foodPairingButton = document.querySelector('.food-pairing__button');
const foodPairingFork = document.querySelector('.food-pairing__logo-fork');
const foodPairingKnife = document.querySelector('.food-pairing__logo-knife');
const foodPairingForm = document.querySelector('.food-pairing__form');

foodPairingButton.addEventListener('click', () => {
    foodPairingFork.classList.toggle('food-pairing__logo-fork--active');
    foodPairingKnife.classList.toggle('food-pairing__logo-knife--active');
    foodPairingForm.classList.toggle('food-pairing__form--active');
});



/***/ }),

/***/ "./src/js/mobileAndTabletCheck.js":
/*!****************************************!*\
  !*** ./src/js/mobileAndTabletCheck.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return mobileAndTabletCheck; });
//Detects mobile and tablet browser (https://stackoverflow.com/questions/11381673/detecting-a-mobile-browser)
function mobileAndTabletCheck() {
    var check = false;
    (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
};

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

/***/ 0:
/*!*****************************************************!*\
  !*** multi ./src/js/main.js ./src/js/navigation.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./src/js/main.js */"./src/js/main.js");
module.exports = __webpack_require__(/*! ./src/js/navigation.js */"./src/js/navigation.js");


/***/ })

/******/ });