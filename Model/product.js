const mongoose = require("mongoose");
const schema = mongoose.Schema;

const ProductSchema = new schema({
  name: String,
  price: Number,
  description: String,
  quantity: Number,
  product_type: String,
  image: {
    type: String,
  },
  store: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Store",
    required: true,
  },
});

module.exports = mongoose.model("Product", ProductSchema);
