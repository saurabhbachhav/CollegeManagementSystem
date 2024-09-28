// const express = require("express")
// const cors = require("cors")
const mysql = require('mysql2')
// const app = require('../server.js')

 // Enable CORS for front-end requests

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "iiitn",
  database: "collegemanagementsystem",
});


db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL");
});

module.exports = db;

