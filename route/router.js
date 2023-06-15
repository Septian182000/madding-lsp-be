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

  // comments
  app.get("/comments/:id", json.showComments);

  app.post("/comments/create", json.storeComments);

  app.delete("/comments/delete/:id", json.deleteComment);
};
