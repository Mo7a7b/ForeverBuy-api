const mongoose = require("mongoose");

const ClothSchema = new mongoose.Schema({
  photos: {
    type: Array,
    required: true,
  },
  title: {
    type: String,
    required: true,
    min: 5,
    max: 50,
  },
  desc: {
    type: String,
    default:""
  },
  price: {
    type: Number,
    min: 20,
    required: true,
  },
  rating: {
    type: Number,
    enum: [1, 2, 3, 4, 5],
    required: true,
  },
  sizes: {
    type: Array,
    default: ["S", "M", "L", "XL", "XXL"]
  },
  bestSeller:{
    type:Boolean,
    default:false
  },
  category:{
    type:String,
    enum:['Men','Women','Kids'],
    required:true
  },
  subCategory:{
    type:String,
    enum:['Topwear','Bottomwear','Winterwear'],
    required:true
  }
});

const Cloth = mongoose.model("Clothes", ClothSchema);
module.exports = Cloth;
