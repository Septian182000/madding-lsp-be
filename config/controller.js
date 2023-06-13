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

    let query = "";

    if (!search) {
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
