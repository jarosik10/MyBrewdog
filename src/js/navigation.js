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
