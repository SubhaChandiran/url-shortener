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
app.get("/", async function (req, res) {
  try {
    const allUrl = await UrlModel.find().exec();
    res.render("home", {
      urlResult: allUrl,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

// post method for create short url ---------
app.post("/create", async function (req, res) {
  try {
    // Create a Short URL
    // Store it in DB
    let urlShort = new UrlModel({
      longUrl: req.body.longurl,
      shortUrl: generateUrl(),
    });

    // Save th document and handle the result with a promise
    const savedData = await urlShort.save();
    console.log(savedData);
    res.redirect("/");
    // res.status(200).send("URL created successfully");
  } catch (error) {
    // handle errors
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(3000, function () {
  console.log("Post is running in 3000");
});

function generateUrl() {
  var rndResult = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;

  for (var i = 0; i < 5; i++) {
    rndResult += characters.charAt(
      Math.floor(Math.random() * charactersLength)
    );
  }
  console.log(rndResult);
  return rndResult;
}
