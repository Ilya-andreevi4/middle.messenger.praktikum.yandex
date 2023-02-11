
// function init(){
//   let password = doc.getElementById("password")
//     , confirm_password = doc.getElementById("confirm_password");
//   function validatePassword(){
//     if(password.value != confirm_password.value) {
//       confirm_password.setCustomValidity("Passwords don't match");
//     } else {
//       confirm_password.setCustomValidity('');
//     };
//   };
//   password.onchange = validatePassword;
//   confirm_password.onkeyup = validatePassword;
// }

// window.addEventListener('DOMContentLoaded', ()=> {
//   init();
// })

// ToDo: Выдаёт ошибку: document is not defined
// Надо попробовать сделать валидацию через Handlebars.Helper


// let Handlebars =require("handlebars");
// Handlebars.registerHelper("validatePassword", function (options) {
//   const password = options.hash.password;
//   const confirm_password = options.hash.confirm_password;
//   const body = options.fn(this);
//   console.log(password, confirm_password);
//   let alert = ``;
//   if(password !== confirm_password) {
//     alert = `<p class="text alert-text modal__alert-text">Passwords don't match</p>`;
//   } else {
//     alert = ``;
//   };

//   return `
//         ${body}
//         ${alert}
//   `;
// })