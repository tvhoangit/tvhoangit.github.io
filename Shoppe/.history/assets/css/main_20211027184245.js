
var user = document.querySelector('.header__navbar-user');
var logOut = document.querySelector('.header__navbar-user-item--logout');
var registers = document.querySelector('.header__navbar-item--strong');

for(const register of registers) {
    logOut.onclick = function() {
        user.style.display = 'none'; 
        register.style.display = 'flex';
    };
}

