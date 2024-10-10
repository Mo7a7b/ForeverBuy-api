const Order = require("../../models/Order");
const User = require("../../models/User");

module.exports = createOrder = async (req, res) => {
  try{
    if(req.user){
      const newOrder = new Order();
      newOrder.clothes = req.body.clothes;
      newOrder.user = req.user.id;
      newOrder.location = req.body.location;
      newOrder.method = req.body.method;
      const date = new Date();
      newOrder.date = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
      newOrder.price = req.body.price;
      newOrder.items = req.body.quantities.reduce((acc,num)=>acc+num);
      newOrder.quantities = req.body.quantities
      await newOrder.save();
      const populatedOrder = await newOrder.populate([
        { path: 'user', select: ['name'] },
        { path: 'clothes', select: ['title', 'price'] }
      ])
      res.status(200).json({newOrder:populatedOrder})
    }else{
      res.status(401).json({message:"Not Authenticated"})
    }
  }catch(err){
    res.status(400).json({error:err.message})
  }
  
};