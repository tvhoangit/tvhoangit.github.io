
var logOut = document.querySelector('.header__navbar-user-item--logout [a]');
var register = document.querySelector('.header__navbar-item--strong');

logOut.onclick = function(e) {
    e.stopPropagation();
    console.log(123);
};

