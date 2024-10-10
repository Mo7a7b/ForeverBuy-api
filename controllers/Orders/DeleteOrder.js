const Order = require("../../models/Order");

module.exports = deleteOrder = async (req, res) => {
  try{
    if(req.user){
      const id = req.params.id;
      const result = await Order.deleteOne({_id:id,user:req.user.id})
      if(result.deletedCount === 0){
        res.status(400).json({error:"The Order is not deleted!"})
      }
      res.status(200).json({message:"Order Deleted Successfully."})
    }else{
      res.status(401).json({message:"Not Authenticated"})
    }
  }catch(err){
    res.status(400).json({err})
  }
};
