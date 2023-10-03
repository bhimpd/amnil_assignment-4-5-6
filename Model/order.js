const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref:'User'
  },
  cartId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  items: [
    {
      productId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref:'Product'
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  price: {
    type: Number,
    default: 0,
  }
}, {
  timestamps: true 
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;