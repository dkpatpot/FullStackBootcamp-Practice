import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const date = new Date();
const API_URL = "https://api.blockchain.com/v3/exchange";
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.get("/", async (req, res) => {
    try{
        const result = await axios.get(API_URL + "/tickers");
        console.log(JSON.stringify(result.data));
        res.render("index.ejs",{token:result.data,date:date.toLocaleDateString()});
    }catch (error){
        res.render("index.ejs", { error: JSON.stringify(error.response.data) });
    }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
