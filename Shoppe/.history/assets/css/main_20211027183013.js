
var user = document.querySelector('.header__navbar-user');
var logOut = document.querySelector('.header__navbar-user-item--logout');
var register = document.querySelector('.header__navbar-item--strong');

logOut.onclick = function() {

    user.classList.add('close');
    register.classList.add('open');
};

