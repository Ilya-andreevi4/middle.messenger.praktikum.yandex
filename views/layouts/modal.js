Handlebars.registerHelper("modal", function (options) {
  const body = options.fn(this);
  let backgroundDarker = "";
  //Если это модальное окно - попап, то делаем основной фон темнее
  if (options.hash.isPopup) {
    backgroundDarker = "container_darker";
  }
  return (
    `
    <div class="container ` +
    backgroundDarker +
    `">
      <div class="modal modal__container">
        ${body}
      </div>
    </div>
  `
  );
});
