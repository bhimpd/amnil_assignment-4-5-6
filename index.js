require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

port = 5050;
const app = express();

//use as middleleware to access json data
app.use(express.json());

const ejs = require("ejs");
// Set 'views' directory for EJS files
app.set("views", path.join(__dirname, "frontend"));
app.set("view engine", "ejs");

// Serve static files (CSS, JS, etc.) from the 'forntend' directory
app.use(express.static(path.join(__dirname, "frontend")));

const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:5050",
    credentials: true,
  })
);

// Render home.ejs when accessing the root URL
app.get("/home", (req, res) => {
  res.render("home"); // Renders 'home.ejs' inside the 'forntend' directory
});

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

const authrouter = require("./Router/authrouter");
app.use("/auth", authrouter);

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("uploaded"));

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Amnil Assignment Task 6",
      version: "1.0.0",
      description: "Simple CRUD Operations",
    },
    servers: [
      {
        url: "http://localhost:5050/api-docs",
        description: "API Development server",
      },
    ],
    tags: [
      {
        name: "User",
        description: "API for managing users",
      },
      {
        name: "Product",
        description: "API for managing products",
      },
      {
        name: "Order",
        description: "API for managing orders",
      },
      {
        name: "Store",
        description: "API for managing store",
      },
    ],
  },
  apis: ["./Router/*.js"],
};
const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
