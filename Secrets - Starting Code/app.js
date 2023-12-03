//jshint esversion:6
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
mongoose.connect("mongodb://localhost:27017/userDB",{useNewUrlParser:true});
const userSchema={
    email:String,
    password: String
}
const User = new mongoose.model("User",userSchema);
app.get("/",(req,res)=>{
    res.render("home.ejs")
});
app.get("/login",(req,res)=>{
    res.render("login.ejs")
});
app.get("/register",(req,res)=>{
    res.render("register.ejs")
});
app.post("/register",(req,res)=>{
    const newUser = new User({
        email: req.body.username ,
        password: req.body.password
    })
    newUser.save((err)=>{
        if (err) {
            console.log(err);
        } else {
            res.render("secret.ejs");
        }
    })
});
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });