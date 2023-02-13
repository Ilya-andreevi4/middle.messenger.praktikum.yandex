const express = require("express");
let Handlebars = require("handlebars");
const path = require("path");
const app = express();
const expbs = require("express-handlebars");
const PORT = process.env.PORT || 3000;
const pageList = require("./data/page-list.ts");

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

const router = (pages) => {
  console.log(pages);
  for (let i = 0; i < pages.length; i++) {
    console.log("render page:", pages[i].path);
    app.get("/" + pages[i].path + ".hbs", (req, res) => {
      res.render(pages[i].path);
    });
  }
};

app.engine("hbs", expbs.engine({ defaultLayout: "mainLayout" }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(express.static(path.join(__dirname, "static")));

app.get("/", (req, res) => {
  res.render("index");
});

router(pageList);

app.listen(PORT, function () {
  console.log(`Example app listening on port http://localhost:${PORT}/`);
});
