function add_class(id, cl){
    document.getElementById(id).className=cl
}
function  data_checking() {
    const re_name       = /^[a-zа-я]+$/gi; // только буквы
    const re_email      = /^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/;
    const re_phone      = /^\+\d{1,3}\s?\(\d{3}\)\s?\d{3}(-\d{4})$/;//формат +7(000)000-0000
    const re_message    = /[a-zа-я0-9]/;

    let name    = document.getElementsByName('name')[0].value;
    let email   = document.getElementsByName('email')[0].value;
    let phone   = document.getElementsByName('phone')[0].value;
    let message = document.getElementsByName('message')[0].value;

    // Проверяем имя
    add_class('name', re_name.test(name) ?'done':'error');

    // Проверяем телефон
    add_class('phone', re_phone.test(phone) ?'done':'error');

    // Проверяем email
    add_class('email', re_email.test(email) ?'done':'error');
    
    // Проверяем сообщение
    add_class('message', re_message.test(message) ?'done':'error');
}
document.querySelector('.button').addEventListener("click", data_checking);