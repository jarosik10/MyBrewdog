const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');
const menuItems = document.querySelectorAll('.menu__list__item');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('hamburger--active');
    menu.classList.toggle('menu--active');
}, false);

menuItems.forEach(item => item.addEventListener('click', () => {
    hamburger.classList.remove('hamburger--active');
    menu.classList.remove('menu--active');
}));
