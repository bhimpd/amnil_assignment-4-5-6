const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
    {
        
          
    //     id:{
    //         type:Number,
    //         required:[true,"please enter the userid..."],
    //         unique:[true,"please enter unique value"]

    //     },
        name:{
            type:String,
            required:[true,"please enter the username..."],
        },
        gmail:{
            type:String,
            required:[true,"please enter the gmail.."],
            unique:[true,"this gmail already exist.."]


        },
        phone:{
            type:String,
            required:[true,"please enter the phone number..."],
        }
    },
        {
            //timestamp: used to create 2 field ,which are created at and updated at... 
            // it means when  the data are saved to db and modified to db
            timestamp:true            
        }
    
)

const User = mongoose.model("User",userSchema);
module.exports = User;