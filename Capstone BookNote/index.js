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
let updatedBook = [];
app.get("/", async (req, res) => {
  const result = await db.query("SELECT * FROM books ORDER BY id ASC");
  books = result.rows;
  res.render("index.ejs", {
    books: books,
  });
});
app.get("/addbook", async (req, res) => {
  const result = await db.query("SELECT * FROM books ORDER BY id ASC");
  books = result.rows;
  res.render("index.ejs", {
    books: books,
  });
});
app.get("/edit", async (req, res) => {
  const result = await db.query("SELECT * FROM books ORDER BY id ASC");
  books = result.rows;
  res.render("index.ejs", {
    books: books,
  });
});
app.post("/addbook", async (req, res) => {
  res.render("newbook.ejs");
});
app.post("/edit", async (req, res) => {
  const updatedBookId = req.body.updatedBookId;
  const result = await db.query("SELECT * FROM books WHERE id = $1",[updatedBookId]);
  updatedBook = result.rows;
  res.render("editbook.ejs", {
    updatedbook: updatedBook,
  });
});
app.post("/delete", async (req, res) => {
  const deletedBookId = req.body.deletedBookId;
  await db.query("DELETE FROM books WHERE id = $1",[deletedBookId]);
  res.redirect("/")
});
app.post("/home", async (req, res) => {
  res.redirect("/")
});
app.post("/addnewbook", async (req, res) => {
  const title = req.body["title"];
  const description = req.body["description"];
  const rating = req.body["rating"];
  const date = new Date();
  await db.query(
    "INSERT INTO books (book_title,book_description,date_readed,book_rating) VALUES ($1,$2,$3,$4)",
    [title, description,date,rating]
  );
  res.redirect("/")
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
