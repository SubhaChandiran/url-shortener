const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { UrlModel } = require("./models/urlshort");

mongoose.connect(
  `mongodb+srv://Subha_Chandiran:SubhasH1058@cluster0.i3ist1y.mongodb.net/myUrlShortener`
);

// Middleware
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

// get method for redirect to home page
app.get("/", function (req, res) {
  res.render("home");
});

// post method for create short url
app.post("/create", function (req, res) {
  // Create a Short URL
  // Store it in DB
  console.log(req.body.longurl);
});

app.listen(3000, function () {
  console.log("Post is running in 3000");
});
