const express = require("express");
require("dotenv").config();
const mysql = require("mysql2");
const app = express();
const port = 3005;
const connection = mysql.createConnection(process.env.DATABASE_URL);

// connection.connect((err) => {
//   if (err) {
//     console.error("Error connecting to PlanetScale:", err.stack);
//     return;
//   }
//   console.log("Connected to PlanetScale!");

//   // Perform operations on the database here, such as executing queries
//   // For example:
//   connection.query("SELECT * FROM Movies", (error, results) => {
//     if (error) throw error;
//     console.log("Fetched data:", results);
//   });

//   connection.end(); // Close the connection when done with database operations
// });

app.get("/movies", function (request, respond) {
  connection.query("SELECT * FROM Movies", (error, results) => {
    if (error) {
      respond.status(500).json({ error: "Error fetching data" });
    } else {
      respond.json(results);
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
