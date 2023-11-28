import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
const app = express();
const port = 3000;
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "book",
  password: "smallnai8",
  port: 5432,
});
db.connect();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
let books = [];
app.get("/", async (req, res) => {
    const result = await db.query("SELECT * FROM books ORDER BY id ASC");
    books = result.rows;
    res.render("index.ejs", {
        books:books,
      });
  });

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });