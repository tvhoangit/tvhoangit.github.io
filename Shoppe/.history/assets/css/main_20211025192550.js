
var logOut = document.querySelector('.header__navbar-user-item--logout');
var register = document.querySelector('.header__navbar-item--strong');


function showByRegister() {
    register.classList.add('open');
    logOut.classList.add('close');
}

logOut.addEventListener('click', showByRegister);

