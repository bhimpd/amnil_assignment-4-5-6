const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
    {
        
        
        name:{
            type:String,
            required:[true,"please enter the username..."],
        },
        password:{
            type:String,
            required:[true,"please enter the password..."]
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
           
            timestamp:true            
        }
    
)

const User = mongoose.model("User",userSchema);
module.exports = User;