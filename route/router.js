"use strict";

module.exports = (app) => {
  var json = require("../config/controller");

  app.get("/", json.index);

  app.post("/login", json.login);

  app.get("/article", json.getArticle);

  app.get("/detail-article/:id", json.showArticleById);

  app.post("/article/create", json.createArticle);

  app.delete("/article/delete/:id", json.deleteArticle);

  app.put("/article/update/:id", json.updateArticle);
};
