const Order = require("../../models/Order");

module.exports = updateOrder = async (req, res) => {
  try{
    if(req.user.admin){
        const id = req.params.id
        const statusEnum = ["Order Placed","Packing","Shipped","Out for Delivery","Delivered"]
        if (!statusEnum.includes(req.body.status)) {
            return res.status(400).json({ error: `Status must be in this enum: ${statusEnum.join(', ')}` });
        } else {
            req.body.payment = req.body.status === "Delivered";
            const updatedOrder = await Order.findByIdAndUpdate(id, req.body, { new: true }).populate([
                { path: 'user', select: ['name'] },
                { path: 'clothes', select: ['title', 'price'] }
            ]);
            return res.status(200).json({ updatedOrder });
        }
    }else{
      res.status(401).json({message:"Not Authenticated"})
    }
  }catch(err){
    res.status(400).json({error:err.message})
  }
  
};