import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import morgan from "morgan";
const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

var bandname = "";
app.use(morgan("tiny"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});
app.post("/submit",(req,res,next) => {
  console.log(req.body);
  bandname = req.body["street"]+req.body["pet"];
  res.send(`<h1>your bandname is : </h1><h2>${bandname}</h2>`);
  next();
}); 
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
