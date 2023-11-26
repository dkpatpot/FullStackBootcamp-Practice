import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "smallnai8",
  port: 5432,
});
db.connect();
let countries = [];
app.get("/", async (req, res) => {
  countries = [];
  const result = await db.query("SELECT country_code FROM visited_countries");
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  res.render("index.ejs", { countries: countries, total: countries.length });
  //Write your code here.
});

app.post("/add", async (req, res) => {
  try {
    var result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%'",
      [req.body["country"].toLowerCase()]
    );
    const data = result.rows[0].country_code; //for send to catch error
    try {
      if (result.rows.length !== 0) {
        await db.query(
          "INSERT INTO visited_countries (country_code) VALUES ($1)",
          [result.rows[0].country_code]
        );
        countries.push(result.rows[0].country_code);
      }
      res.redirect("/");
    } catch (error) {
      res.render("index.ejs", {
        countries: countries,
        total: countries.length,
        error: "The country is already added.",
      });
    }
  } catch (error) {
    res.render("index.ejs", {
      countries: countries,
      total: countries.length,
      error: "The country name does not exist.",
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
