console.log("hello im here!");

let hamburger = document.querySelector('.hamburger');
let menu = document.querySelector('.menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('hamburger--active');
    menu.classList.toggle('menu--active');
}, false);



let url = 'https://api.punkapi.com/v2/beers?page=1&per_page=5';

fetch(url)
.then(response => response.json())
.then(data => {
    console.log(data)
    // addBeerImages(data);
});

function addBeerImages(data) {
    let beers = document.querySelector('.beers');
    for (const beer of data){
        let beerImage = document.createElement('img');
        beerImage.src = beer.image_url;
        beers.appendChild(beerImage);
    }
}