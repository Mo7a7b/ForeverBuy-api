const Cloth = require("../../models/Clothes");

module.exports = deleteCloth = async (req, res) => {
  try{
    if(req.user.admin){
      const id = req.params.id;
      await Cloth.findByIdAndDelete(id)
      res.status(200).json({message:"Cloth Deleted Successfully."})
    }else{
      res.status(401).json({message:"Not Authenticated"})
    }
  }catch(err){
    res.status(400).json({err})
  }
};
