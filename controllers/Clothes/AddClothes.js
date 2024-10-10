const Cloth = require("../../models/Clothes");

module.exports = addCloth = async (req, res) => {
  try{
    if(req.user.admin){
      const newCloth = new Cloth();
      newCloth.title = req.body.title;
      newCloth.desc = req.body.desc;
      newCloth.price = req.body.price;
      newCloth.rating = req.body.rating;
      newCloth.category = req.body.category;
      newCloth.subCategory = req.body.subCategory;
      newCloth.bestSeller = req.body.bestSeller;
      const imageUrls = req.files.map(file => file.path);
      newCloth.photos = imageUrls
      await newCloth.save();
      res.status(200).json(newCloth)
    }else{
      res.status(401).json({message:"Not Authenticated"})
    }
  }catch(err){
    res.status(400).json({error:err.message})
  }
  
};
