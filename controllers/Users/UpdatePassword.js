const User = require("../../models/User");
const joi = require("joi")
const bcrypt = require("bcrypt")
module.exports = updatePassword = async (req, res) => {
    try{
        const id = req.params.id
        const schema = joi.object({
            password:joi.string().min(8).max(16).required()
        })
        const { error } = schema.validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message.replaceAll('\"',"") });
        const hashedPassword = await bcrypt.hashSync(req.body.password,10)
        const user = await User.findByIdAndUpdate(id,{password:hashedPassword}).select(['name','email','admin'])
        res.status(200).json({user,message:"Password updated successfully"})
    }catch(err){
        res.status(400).json({error:err.message})
    }
  
};
