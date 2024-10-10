const User = require("../../models/User");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
module.exports = Signup = async (req, res) => {
    try{
        //const hashedPassword = await bcrypt.hashSync(req.body.password,10)
        
        const existingUser = await User.findOne({ email: req.body.email });
        if (!existingUser) return res.status(401).json({ message: "Invalid Credentials" });
        const isPasswordTrue = await bcrypt.compare(req.body.password,existingUser.password)
        if (!isPasswordTrue) return res.status(401).json({ message: "Invalid Credentials" });
        const token = jwt.sign({id:existingUser.id,email:existingUser.email,admin:existingUser.admin},process.env.JWT_SECRET_WORD)
        res.status(200).json({name:existingUser.name,email:existingUser.email,password:req.body.password,message:`Welcome Back ${existingUser.name}`,token})
    }catch(err){
        res.status(400).json({error:err.message})
    }
  
};
