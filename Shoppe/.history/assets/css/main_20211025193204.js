
var logOut = document.querySelector('.header__navbar-user');
var register = document.querySelector('.header__navbar-item--strong');

logOut.onclick = function() {
    register.classList.add('open');
    logOut.classList.add('close');
};
