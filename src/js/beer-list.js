import "../scss/styles.scss";
import getQueryVariable from "./getUrlVariable"

const pageInput = document.querySelector('.page-number');
const previousPage = document.querySelector('.button__previous-page');
const nextPage = document.querySelector('.button__next-page');
const baseURL = 'https://api.punkapi.com/v2/beers';
let pageNumber = 1;
const itemsPerPage = 20;
const searchedBeerName = getQueryVariable('beer')
const searchedFood = getQueryVariable('food')
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



