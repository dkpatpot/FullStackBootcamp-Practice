import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "dkpatpot";
const yourPassword = "dkpatpot";
const yourAPIKey = "2287289a-04a0-4dc5-a6c3-9f43f3876369";
const yourBearerToken = "c59796ff-92b2-4fc5-b32f-72e2afc05a66";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  const response = await axios.get(API_URL + "random");
  res.render("index.ejs", { content: JSON.stringify(response.data) });
  //TODO 2: Use axios to hit up the /random endpoint
  //The data you get back should be sent to the ejs file as "content"
  //Hint: make sure you use JSON.stringify to turn the JS object from axios into a string.
});

app.get("/basicAuth", async (req, res) => {
  //TODO 3: Write your code here to hit up the /all endpoint
  //Specify that you only want the secrets from page 2
  //HINT: This is how you can use axios to do basic auth:
  // https://stackoverflow.com/a/74632908
  const response = await axios.get(API_URL + "all?page=2", {
    auth: {
      username: yourUsername,
      password: yourPassword,
    },
  });
  res.render("index.ejs", { content: JSON.stringify(response.data) });
});

app.get("/apiKey",async (req, res) => {
  const response = await axios.get(API_URL + "filter/?score=5&apiKey=" +yourAPIKey);
  res.render("index.ejs", { content: JSON.stringify(response.data) });
  //TODO 4: Write your code here to hit up the /filter endpoint
  //Filter for all secrets with an embarassment score of 5 or greater
  //HINT: You need to provide a query parameter of apiKey in the request.
});

app.get("/bearerToken",async (req, res) => {
  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  //and get the secret with id of 42
  //HINT: This is how you can use axios to do bearer token auth:
  // https://stackoverflow.com/a/52645402
  const response = await axios.get(API_URL+"secrets/2", {
    headers: { 
      Authorization: `Bearer `+ yourBearerToken
    },
  });
  res.render("index.ejs", { content: JSON.stringify(response.data) });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
