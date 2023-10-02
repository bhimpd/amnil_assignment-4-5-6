const mongoose = require('mongoose')
const schema = mongoose.Schema;

const ProductSchema = new schema({
        name: String,
        price: Number,
        description: String,
        quantity: Number,
        product_type: String
})      

module.exports = mongoose.model('Product', ProductSchema);