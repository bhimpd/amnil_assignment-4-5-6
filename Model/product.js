const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
    // name:{
    //     type:String,
    //     require:[true,"plz enter the product name"]
    // },
    // price:{
    //     type:Number,
    //     required:[true,"pls enter the price"]
    // },
    // description:{
    //     type:String
    // },
    // quantity:{
    //     type:Number,
    //     required:true
        
    // },
    // product_type:{
    //     type:String
    // }
    name:String,
    price:Number,
    description:String,
    quantity:Number,
    product_type:String

})

const Product = mongoose.model("Product",productSchema)
module.exports = Product;