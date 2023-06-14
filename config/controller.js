"use strict";

const response = require("./res");
const connection = require("./database");
const util = require("util");

exports.index = (req, res) => {
  response.ok("REST API Success", res);
};

exports.login = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const query = `select * from admin where username='${username}' and password='${password}'`;

  connection.query(query, (error, rows, fileds) => {
    if (error) {
      console.log("error");
    } else {
      if (rows.length > 0) {
        response.ok(rows[0], res);
      } else {
        response.ok("Failed to login", res);
      }
    }
  });
};

exports.getArticle = async (req, res) => {
  try {
    const search = req.query.search;

    let query = `SELECT * FROM article `;

    if (search) {
      query = `SELECT * FROM article WHERE title LIKE '%${search}%'`;
    } else {
      query = `SELECT * FROM article `;
    }

    const queryAsync = util.promisify(connection.query).bind(connection);
    const queryResult = await queryAsync(query);

    response.ok(queryResult, res);
  } catch (error) {
    console.log("error");
  }
};

exports.showArticleById = async (req, res) => {
  try {
    const id = req.params.id;
    const query = `select * from article where id=${id}`;

    const queryAsync = util.promisify(connection.query).bind(connection);
    const queryResult = await queryAsync(query);

    response.ok(queryResult, res);
  } catch (error) {
    console.log("error");
  }
};

exports.createArticle = async (req, res) => {
  try {
    const idAdmin = req.body.admin_id;
    const title = req.body.title;
    const content = req.body.content;
    const imgUrl = req.body.image_url;

    const query = `insert into article (admin_id, title, content, image_url) values('${idAdmin}', '${title}', '${content}', '${imgUrl}')`;
    const queryAsync = util.promisify(connection.query).bind(connection);
    const queryResult = await queryAsync(query);

    response.ok("Success create article", res);
  } catch (error) {
    console.error(error);
  }
};

exports.updateArticle = async (req, res) => {
  try {
    const id = req.params.id;
    const title = req.body.title;
    const content = req.body.content;
    const image_url = req.body.image_url;

    const query = `UPDATE article SET title = '${title}', content = '${content}', image_url = '${image_url}' WHERE id = ${id}`;

    const queryAsync = util.promisify(connection.query).bind(connection);
    const queryResult = await queryAsync(query);

    response.ok("Success update article", res);
  } catch (error) {
    console.error(error);
  }
};

exports.deleteArticle = async (req, res) => {
  try {
    const id = req.params.id;
    const query = `delete from article where id=${id}`;

    const queryAsync = util.promisify(connection.query).bind(connection);
    const queryResult = await queryAsync(query);

    response.ok("Success delete article", res);
  } catch (error) {
    console.error(error);
  }
};
