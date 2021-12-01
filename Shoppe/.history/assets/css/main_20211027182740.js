
var user = document.querySelector('.header__navbar-user');
var logOut = document.querySelector('.header__navbar-user-item--logout');
var register = document.querySelector('.header__navbar-item--strong');

logOut.onclick = function(e) {
    e.stopPropagation();

    user.classList.add('close');
    register.classList.add('open');
};

