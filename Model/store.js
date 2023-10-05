const mongoose = require("mongoose");
const storeSchema = new mongoose.Schema({

    store_name :{
        type:String,
        required:true
    },
    logo :{
        type:String,
        required:true
    },
    product_type :{
        type:String,
        required:true,
        enum: ['Electronics', 'Grocery', 'Clothing', 'Stationery']
    },
    location :{
        type: {
            type: String,
            default: "Point"
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
   
})


storeSchema.index({ location: "2dsphere" });



const Store = mongoose.model("Store", storeSchema);
module.exports = Store;