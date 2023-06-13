"use strict";

module.exports = (app) => {
  var json = require("../config/controller");

  app.get("/", json.index);

  app.post("/login", json.login);

  app.get("/article", json.getArticle);
};
