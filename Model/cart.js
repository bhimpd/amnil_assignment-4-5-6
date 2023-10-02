const mongoose = require("mongoose")

const cartSchema = mongoose.Schema({

    // userId: {
    //     type: mongoose.Types.ObjectId,
    //     required: true,
    //   },
      items: [
        {
          productId: {
            type: mongoose.Types.ObjectId,
            required: true,
          },
          name: {
            type: String,
            required: true,
          },
          quantity: {
            type: Number,
            required: true,
          },
          product_type: {
            type: String,
            required: true,
          },
        },
      ],
      price: {
        type: Number,
        default: 0,
      }



});


const Cart = mongoose.model("Cart",cartSchema);
module.exports = Cart;