const express = require ("express");
const router =express.Router();



const {addToCart,getAllCart,getCartById} = require("../Controller/cartController")


// creating routes for the cart
router.route("/addtocart").post(addToCart);
router.route("/getallcart").get(getAllCart)
router.route("/getbyid/:id").get(getCartById);

module.exports = router;