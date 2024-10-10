const Cloth = require("../../models/Clothes");

module.exports = GetAllClothes = async (req, res) => {
  try{
    const clothes = await Cloth.find()
    res.status(200).json({clothes:clothes})
  }catch(err){
    res.status(400).json({err})
  }
};
