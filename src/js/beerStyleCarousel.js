import { mobileAndTabletCheck } from "./mobileAndTabletCheck";
export class BeerStyleCarousel {
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

    //Calculates beer styles carousel parameters (depends on viewport width size and number of carousel cells)
    calculateCaruselParameters() {
        this.numberOfCarouselCells  = this.beerStyles.length;
        this.theta = 360 / this.numberOfCarouselCells;
        let thetaRadians = Math.PI * this.theta / 180;
        this.radius = (this.viewportWidth - 30) / 2;
        this.radius = (this.radius < this.maxRadius) ? this.radius : this.maxRadius;
        this.sceneWidth = Math.round(Math.tan(thetaRadians / 2) * this.radius * 2);
        this.carouselCellWidth = this.sceneWidth - 20;
    }

    //Rotates the carousel
    rotateCarousel(carousel, rotation) {
        carousel.style.transform = 'translateZ(' + -this.radius + 'px) rotateY(' + rotation + 'deg)';
    }

    //Creates beer styles carousel
    createCarousel() {
        this.calculateCaruselParameters();    

        const beerStylesContainer = document.createElement('div');
        beerStylesContainer.classList.add('beer-styles__container');
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
            carouselCell.classList.add('beer-styles__carousel__cell');
            carouselCell.style.width = this.carouselCellWidth + 'px';
            carouselCell.style.height = this.carouselCellWidth + 'px';
            let cellAngle = this.theta * i;
            carouselCell.style.transform = 'rotateY' + '(' + cellAngle + 'deg) translateZ(' + this.radius + 'px)';
            const carouselCellLink = document.createElement('a');
            carouselCellLink.href = "#" + this.beerStyles[i];
            carouselCellLink.classList.add('cell__link');
            const beerStyleName = document.createElement('span');
            beerStyleName.innerHTML = this.beerStyles[i];
            beerStyleName.classList.add('cell__name');
            carousel.appendChild(carouselCell);
            carouselCell.appendChild(carouselCellLink);
            carouselCellLink.appendChild(beerStyleName);
        }
        this.addCarouselMovement(beerStylesContainer, carousel);
    }

   

    //Adds movement of carousel (rotation)
    addCarouselMovement(field, carousel) {
        let rotation = 0;
        let rotationForce = 252 * Math.pow(this.radius, -1.2); //rotation force equation calculated experimentally

        if (mobileAndTabletCheck()) {
            field.ontouchstart = (event) => {
                event = event || window.event;
                // event.preventDefault();
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
                field.onmouseup = (event) => {
                    field.onmousemove = field.onmouseup = null;
                }
            }
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