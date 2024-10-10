const User = require("../../models/User");
const joi = require("joi")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
module.exports = Signup = async (req, res) => {
    try{
        const newUser = new User()
        const schema = joi.object({
            name:joi.string().min(3).required(),
            email:joi.string().email().required(),
            password:joi.string().min(8).max(16).required(),
            admin:joi.boolean().default(false)
        })
        const { error } = schema.validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message.replaceAll('\"',"") });
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) return res.status(409).json({ message: "Email is already used!" });
        const hashedPassword = await bcrypt.hashSync(req.body.password,10)
        newUser.name = req.body.name
        newUser.email = req.body.email
        newUser.password = hashedPassword
        newUser.admin = req.body.admin
        const token = jwt.sign({id:newUser.id,email:newUser.email,admin:newUser.admin},process.env.JWT_SECRET_WORD)
        await newUser.save()
        res.status(200).json({name:newUser.name,email:newUser.email,password:req.body.password,message:"User Created Successfully",token})
    }catch(err){
        res.status(500).json({error:err.message})
    }
  
};
