const pageInput = document.querySelector('.page-number');
const previousPage = document.querySelector('.button__previous-page');
const nextPage = document.querySelector('.button__next-page');
let pageNumber = 1;
showBeerList();

previousPage.addEventListener('click', ()=>{
    if (pageNumber == 1) return;
    pageNumber--;
    clearBeerList();
    showBeerList();
    pageInput.setAttribute('value', pageNumber);
});

nextPage.addEventListener('click', ()=>{
    pageNumber++;
    clearBeerList();
    showBeerList();
    pageInput.setAttribute('value', pageNumber);
});

async function showBeerList(){
    let url = createURL();
    let data = await getBeerData(url);
    addBeerImages(data);
}

function createURL() {
     return `https://api.punkapi.com/v2/beers?page=${pageNumber}&per_page=20`;
}

async function getBeerData(url) {
    const data = await fetch(url)
    .then(response => response.json())
    .catch(function(error) {
        console.log('Request failed', error);
    });
    return data;
}

function addBeerImages(data) {
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
        beerImage.src = obj.image_url;
    }
}

function clearBeerList(){
    let beerList = document.querySelector('.beer-list');
    while (beerList.firstChild){
        beerList.removeChild(beerList.firstChild);
    }
}

