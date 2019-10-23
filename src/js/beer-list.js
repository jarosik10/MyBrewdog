import "../scss/styles.scss";

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



