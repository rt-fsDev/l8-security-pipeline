const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Koppling till databas (anpassa vid behov)
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "SalonBooking",
});

db.connect();

// Sårbar för SQL Injection
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;

  db.query(query, (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      res.send(`Välkommen ${username}`);
    } else {
      res.send("Fel användarnamn eller lösenord");
    }
  });
});

// Sårbar för XSS
app.get("/messages", (req, res) => {
  const msg = req.query.msg || "Inget meddelande";
  res.send(`<html><body><h1>Meddelande: ${msg}</h1></body></html>`);
});

app.listen(3000, () => {
  console.log("Sårbar app körs på http://localhost:3000");
});
