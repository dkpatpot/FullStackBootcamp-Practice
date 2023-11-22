// HINTS:
// 1. Import express and axios
import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
// 2. Create an express app and set the port number.
app.get("/", async (req, res) => {
  const result = await axios.get(API_URL + "/random");
  res.render("index.ejs", { secret: JSON.stringify(result.data.secret),user: JSON.stringify(result.data.username)});
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
// 3. Use the public folder for static files.

// 4. When the user goes to the home page it should render the index.ejs file.

// 5. Use axios to get a random secret and pass it to index.ejs to display the
// secret and the username of the secret.

// 6. Listen on your predefined port and start the server.
