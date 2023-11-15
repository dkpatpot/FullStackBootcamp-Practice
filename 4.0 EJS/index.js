import express, { query } from "express";

const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});
app.get("/", (req, res) => {
    const date = new Date();
    var days = date.getDay();
    let type = "a weekday";
    let adv = "it's time to work hard";
  
    if (days === 0 || days === 6) {
      type = "the weekend";
      adv = "it's time to have some fun";
    }
    console.log("daytype : "+type);
    console.log("advice : "+adv);
    res.render("index.ejs",{dayType:type,advice:adv});
});