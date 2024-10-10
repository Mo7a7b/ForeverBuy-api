const { required } = require("joi");
const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    clothes:{
        type:[mongoose.Types.ObjectId],
        required:true,
        ref:"Clothes"
    },
    quantities:{
        type:Array,
        required:true
    },
    user:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:"Users"
    },
    location:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    method:{
        type:String,
        default:"COD"
    },
    payment:{
        type:Boolean,
        default:false
    },
    date:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:["Order Placed","Packing","Shipped","Out for Delivery","Delivered"],
        default:"Order Placed"
    },
    items:{
        type:Number,
        required:true
    }
});

const Order = mongoose.model("Orders", OrderSchema);
module.exports = Order;
