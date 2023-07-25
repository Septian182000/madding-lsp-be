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

exports.register = async (req, res) => {
  try {
    const name = req.body.name;
    const username = req.body.username;
    const password = req.body.password;
    const role = "admin";

    const query = `insert into admin (name, username, password, role) values('${name}', '${username}', '${password}', '${role}')`;

    const queryAsync = util.promisify(connection.query).bind(connection);
    const queryResult = await queryAsync(query);

    response.ok("Success register", res);
  } catch (error) {
    console.log(error);
  }
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
    const hideComment = req.body.hide_comment;

    const query = `insert into article (admin_id, title, content, image_url, hide_comment) values('${idAdmin}', '${title}', '${content}', '${imgUrl}', '${hideComment}')`;
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
    const hideComment = req.body.hide_comment;

    const query = `UPDATE article SET title = '${title}', content = '${content}', image_url = '${image_url}',  hide_comment= '${hideComment}' WHERE id = ${id}`;

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

// comments
exports.showComments = async (req, res) => {
  try {
    const id = req.params.id;
    const query = `select * from comments where article_id=${id} ORDER BY created_at DESC`;

    const queryAsync = util.promisify(connection.query).bind(connection);
    const queryResult = await queryAsync(query);

    response.ok(queryResult, res);
  } catch (error) {
    console.error(error);
  }
};

exports.storeComments = async (req, res) => {
  try {
    const article_id = req.body.article_id;
    const name = req.body.name;
    const email = req.body.email;
    const comment = req.body.comment;

    const query = `insert into comments (article_id, name, email, comment) values('${article_id}', '${name}', '${email}', '${comment}')`;

    const queryAsync = util.promisify(connection.query).bind(connection);
    const queryResult = await queryAsync(query);

    response.ok("Success create comment", res);
  } catch (error) {
    console.error(error);
  }
};

exports.editComment = async (req, res) => {
  try {
    const id = req.params.id;
    const hideComment = req.body.hide_comment

    const query = `update comments set hide_comment = '${hideComment}' where id=${id}`;

    const queryAsync = util.promisify(connection.query).bind(connection);
    const queryResult = await queryAsync(query);

    response.ok("Success update comment", res);
  } catch (error) {
    console.error(error);
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const id = req.params.id;
    const query = `delete from comments where id=${id}`;

    const queryAsync = util.promisify(connection.query).bind(connection);
    const queryResult = await queryAsync(query);

    response.ok("Success delete comment", res);
  } catch (error) {
    console.error(error);
  }
};
