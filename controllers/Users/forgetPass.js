const User = require("../../models/User");
const transporter = require("../../nodemailer");
require("dotenv").config()
module.exports = forgetPass = async (req, res) => {
    try{
        const existingUser = await User.findOne({ email: req.body.email });
        if (!existingUser) return res.status(400).json({ message: "Invalid Credentials" });
        const mailOptions = {
            from:process.env.GMAIL,
            to:existingUser.email,
            subject:"Forgotten Password",
            html:`
            <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Your Password</title>
    <style>
        body {
            font-family: Arial, sans-serif; 
            margin: 0; 
            padding: 0; 
            background-color: #f4f4f4;
        }
        .container {
            max-width: 600px; 
            margin: auto; 
            background: white; 
            border-radius: 8px; 
            overflow: hidden; 
            padding: 20px; 
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .header {
            background: #28a745; 
            color: white; 
            padding: 20px; 
            text-align: center;
        }
        .content {
            padding: 20px;
        }
        .button {
            display: inline-block; 
            padding: 10px 20px; 
            background-color: #28a745; 
            color: white; 
            text-decoration: none; 
      		transition:.2s;
            border-radius: 5px;
        }
        .footer {
            text-align: center; 
            padding: 10px; 
            font-size: 12px; 
            color: #777;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Reset Your Password</h1>
            <img src="https://d.top4top.io/p_32038yec21.png" width="150px" />
        </div>
        <div class="content">
            <p>Dear ${existingUser.name},</p>
            <p>We received a request to reset your password. Click the button below to set a new password:</p>
            <p><a href="${process.env.FORGET_PASS_LINK}" class="button">Reset Your Password</a></p>
            <p>If you didn't request this, please ignore this email.</p>
            <p>For any questions or support, feel free to <a href="[Support Link]">contact us</a>.</p>
        </div>
        <div class="footer">
            <p>Follow us on:</p>
            <p>
                <a href="[Facebook Link]" style="margin-right: 10px;">Facebook</a> |
                <a href="[Twitter Link]" style="margin-right: 10px;">Twitter</a> |
                <a href="[Instagram Link]">Instagram</a>
            </p>
            <p>If you no longer wish to receive emails, you can <a href="[Unsubscribe Link]" style="color: #28a745;">unsubscribe here</a>.</p>
            <p>&copy; ${new Date().getFullYear()} ForeverBuy. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
        `
        }
        await transporter.sendMail(mailOptions,(err,success)=>{
            if(err){
                throw Error(err)
            }else{
                res.status(200).json({message:"We have sent you the reset link to your gmail."})
            }
        })
    }catch(err){
        res.status(400).json({error:err.message})
    }
  
};
