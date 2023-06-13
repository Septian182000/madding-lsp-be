const mysql = require("mysql2");

// connect datatabe
const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "mading_lsp",
});

conn.connect((err) => {
  if (err) throw err;
  console.log("Mysql Connected");
});

module.exports = conn;
