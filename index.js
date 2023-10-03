const express = require("express");
// const bodyParser = require("body-parser");
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

//to create the data and post it...
// app.post("/users", async (req, res) => {
//   try {
//     const user = await User.create(req.body);
//     res.status(200).json(user);

//     return res.status(200).json({ message: "user created sucessfully..." });
//   } catch (error) {
//     res.status(404).json({ error: error.message });
//   }
// });

// to fetch all the data

// app.get("/users", async (req, res) => {
//   try {
//     const user = await User.find({});
//     res.status(200).json(user);
//   } catch (error) {
//     res.status(404).json({ error: error.message });
//   }
// });

//to fetch the specific data by id..
// app.get("/users/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const userid = await User.findById(id);
//     if (!userid) {
//       return res.status(404).json({ error: "user id not found..." });
//     }
//     res.status(200).json(userid);
//   } catch (error) {
//     res.status(404).json({ error: error.message });
//   }
// });

//to update the product..
// app.put("/users/:id", async (req, res) => {
//   // try {
//   //   const { id } = req.params;
//   //   const userid = await User.findByIdAndUpdate(id, req.body, { new: true });
//   //   if (!userid) {
//   //     return res.status(404).json({ error: "user id not found..." });
//   //   }
//   //   const userupdated = await User.findById(id);
//   //   res.status(200).json(userupdated);
//   // } catch (error) {
//   //   console.log(error.message);
//   //   res.status(404).json({ error: error.message });
//   // }
// });

//find the user by id and delete..
// app.delete("/users/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const userid = await User.findByIdAndDelete(id);
//     if (!userid) {
//        res.status(404).json({ error: "user id not found.." });
//     }
//     res.status(200).json(userid);
//   } catch (error) {
//     res.status(404).json({ error: error.message });
//   }
// });
