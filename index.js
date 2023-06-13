const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const app = express();
const upload = multer();

// parse application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(upload.array());

// call routes
var routes = require("./route/router");
routes(app);

app.listen(3001, () => {
  console.log("API is Running");
});
