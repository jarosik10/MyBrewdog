import mobileAndTabletCheck from "./mobileAndTabletCheck";
import isInViewport from "./isInViewport";

export default class BeerStyleCarousel {
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

        if (mobileAndTabletCheck()) {
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
                if (isInViewport(carousel)) {
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