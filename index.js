const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");

port = 5050;
const app = express();

//use as middleleware to access json data
app.use(express.json());

// var user = require("./Controller/users");

mongoose.set("strictQuery", false);
const db =
  "mongodb+srv://dreamypd73:bhimpd28913@cluster0.bldcxmp.mongodb.net/Users?retryWrites=true&w=majority";
mongoose
  .connect(db)
  .then(() => {
    console.log("mongodb connected...");
    app.listen(port, () => {
      console.log(`server is running at ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

const userroutes = require("./Router/userrouter");
app.use("/users", userroutes);

const productrouter = require("./Router/productrouter");
app.use("/products", productrouter);

const cartrouter = require("./Router/cartrouter");
app.use("/cart", cartrouter);

const orderrouter = require("./Router/orderrouter");
app.use("/order", orderrouter);

const storerouter = require("./Router/storerouter");
app.use("/store", storerouter);

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("uploaded"));

