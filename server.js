// const fallback = require("express-history-api-fallback");
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

const root = `${__dirname}/dist`;
app.use(express.static(root));
// app.use(fallback("index.html", { root }));

app.listen(PORT, () => {
  console.log(`Example app listening on port http://localhost:${PORT}/`);
});
