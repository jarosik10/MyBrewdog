import "../scss/styles.scss";
import BeerStyleCarousel from "./beerStyleCarousel";

const beerStyles = ['India Pale Ale (IPA)', 'Double IPA', 'American IPA', 'Witbier', 'Saison', 'Pilsner', 'Russian Imperial Stout (RIS)', 'Oatmeal Stout', 'Baltic Porter', 'Barley Wine', 'Lambic'];
const maxRadius = 630;
const beerStyleCarousel = new BeerStyleCarousel(beerStyles, maxRadius);

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

