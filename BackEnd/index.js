const bodyParser = require("body-parser");
const express = require("express");
const cookie = require("cookie-parser");
const routes = require("./route");

const port = 8000;
const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookie());

app.use(routes);

app.use(({ res }) => {
  const message = "Not found";
  res.status(404).json({ message });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
