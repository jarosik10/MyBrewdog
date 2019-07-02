console.log("hello im here!");

let url = 'https://api.punkapi.com/v2/beers?page=1&per_page=5&brewed_after=01-2010';

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