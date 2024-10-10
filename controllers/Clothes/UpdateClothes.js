const Cloth = require("../../models/Clothes");

module.exports = updateCloth = async (req, res) => {
  try{
    if(req.user.admin){
      const id = req.params.id
      const cloth = await Cloth.findByIdAndUpdate(id,req.body,{new:true})
      await res.status(200).json({updatedCloth:cloth})
    }else{
      res.status(401).json({message:"Not Authenticated"})
    }
  }catch(err){
    res.status(400).json({err})
  }
};
