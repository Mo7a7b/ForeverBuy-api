const Cloth = require("../../models/Clothes");

module.exports = GetAllClothes = async (req, res) => {
  try{
    const cloth = await Cloth.findById(req.params.id)
    res.status(200).json({cloth})
  }catch(err){
    res.status(400).json({err})
  }
};
