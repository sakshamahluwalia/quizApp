require("dotenv").config();
const mysql = require("mysql");
let db;

/*
    @info   : This application implements singleton design pattern to have only 1 db conn
    @input  :
    @return : (db object) return the db connection
*/
function connectDatabase() {
  if (!db) {
    db = mysql.createConnection({
      user: process.env.DB_USER,
      host: process.env.DB_URL,
      password: process.env.DB_PASS,
      database: process.env.DB_SCHEMA,
    });
    db.connect(function (err) {
      if (!err) {
        console.log("Database is connected!");
      } else {
        console.log(err);
      }
    });
  }
  return db;
}

module.exports = connectDatabase();
