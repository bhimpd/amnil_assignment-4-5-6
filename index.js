const port = 5051;
const express = require("express");
const { default: mongoose } = require("mongoose");
const cors = require('cors');
const bodyParser = require("body-parser")
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const path = require("path");


const app = express();
app.use(express.json());
app.use(cors())

//use as middleleware to access json data
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5051",
    credentials: true,
  })
);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


const ejs = require("ejs");
// Set 'views' directory for EJS files
app.set("views", path.join(__dirname, "frontend"));
app.set("view engine", "ejs");

// Serve static files (CSS, JS, etc.) from the 'forntend' directory
app.use(express.static(path.join(__dirname, "frontend")));


// Render home.ejs when accessing the root URL
app.get("/home", (req, res) => {
  res.render("home"); // Renders 'home.ejs' inside the 'forntend' directory
});

const connectDB = async() =>{
  const connect = mongoose.connect("mongodb+srv://dreamypd73:bhimpd28913@cluster0.bldcxmp.mongodb.net/Users?retryWrites=true&w=majority");

  await connect.then(
    (db)=>{
      console.log('moongoosedb connected successfully')
    },
    (err) =>{
      console.log('failed to connect the mongoose')
  })
}

connectDB();   
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



  
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'This is Node express api for Ecommerce',
      version: '1.0.0',
      description:'this is a api for ecommerce web application'
    },
    servers: [
      {
        url: `http://localhost:${port}/api-docs`
      }
    ]
  },
  apis: ["./Router/*.js"],
  produces: ['application/json'],
};

const specs = swaggerJSDoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
