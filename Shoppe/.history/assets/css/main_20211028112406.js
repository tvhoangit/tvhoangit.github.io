
var user = document.querySelector('.header__navbar-user');
var logOut = document.querySelector('.header__navbar-user-item--logout');
var register = document.querySelector('.header__navbar-item--register');
var logIn = document.querySelector('.header__navbar-item--login');
var showProduct = document.querySelector('.header__cart-list--show-product');
var cartNoProduct = document.querySelector('.header__cart-list--no-product');

logOut.onclick = function() {
    user.style.display = 'none';
    register.style.display = 'flex';
    logIn.style.display = 'flex';
    showProduct.style.display = 'none';
    cartNoProduct.style.display = 'flex';
};


