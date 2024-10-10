const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        min:3
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        min:8,
        max:16,
        required:true
    },
    admin:{
        type:Boolean,
        require:true,
        default:false
    },
    subscribed:{
        type:Boolean,
        default:false
    },
    usedDiscountCodes:{
        type:[String],
        default:[]
    }
});

const User = mongoose.model("Users", UserSchema);
module.exports = User;
