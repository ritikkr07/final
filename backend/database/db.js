const mysql = require("mysql2");

const db = mysql.createPool({
  host: "localhost",
  user: "root",           
  password: "Ritik@1234",
  database: "document_portal",
  port: 3306,
});

module.exports = db;

