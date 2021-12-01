
var user = document.querySelector('.header__navbar-user');
var logOut = document.querySelector('.header__navbar-user-item--logout');
var registers = document.querySelector('.header__navbar-item--strong');

logOut.onclick = function() {
    user.style.display = 'none';
    for(const register of registers) {
        register.style.display = 'flex';
    }
};

