const express = require("express");
require("dotenv").config();
const mysql = require("mysql2");
const cors = require("cors");
const app = express();
const port = 3005;
const connection = mysql.createConnection(process.env.DATABASE_URL);

app.use(cors());
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.json()); // Parse JSON bodies

app.post("/movies-db", (request, respond) => {
  const emotion = request.body.emotion;
  connection.query(
    `SELECT * FROM Movies WHERE emotion='${emotion}'`,
    (error, results) => {
      if (error) {
        respond.status(500).json({ error: `Error fetching data, ${error}` });
      } else {
        respond.json(results);
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
