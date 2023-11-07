const express =  require("express");
const router = express.Router();


const {checkOut,getOrderById,getAllOrder,deleteOrder} = require("../Modules/Order/orderController")

// creating routes for the order...
router.route("/checkout/:cartId").post(checkOut);

router.route("/getsingleorder/:cartId").get(getOrderById);

router.route("/getallorder").get(getAllOrder);

router.route("/deleteorder/:cartId").delete(deleteOrder);

module.exports = router;