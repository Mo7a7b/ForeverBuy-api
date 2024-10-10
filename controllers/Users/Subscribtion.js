const User = require("../../models/User");
const joi = require("joi")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
const transporter = require("../../nodemailer");
module.exports = Subscription = async (req, res) => {
    const { action } = req.body;
    const userId = req.user.id; // Assuming user ID is available in the request

    if (!['subscribe', 'unsubscribe'].includes(action)) {
        return res.status(400).json({ message: 'Invalid action specified.' });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        user.subscribed = action === 'subscribe';
        await user.save();
        const mailOptions = {
            from: process.env.GMAIL,
            to: user.email,
            subject: action === 'subscribe' ? 'Subscription Confirmed' : 'Unsubscription Confirmed',
            html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${action === 'subscribe' ? 'Welcome!' : 'Goodbye!'}</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                        margin: 0;
                        padding: 20px;
                    }
                    .container {
                        max-width: 600px;
                        margin: auto;
                        background: #ffffff;
                        padding: 20px;
                        border-radius: 8px;
                        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                    }
                    .header {
                        background-color: #28a745;
                        color: white;
                        padding: 20px;
                        text-align: center;
                        border-radius: 8px 8px 0 0;
                    }
                    h1 {
                        margin: 0;
                    }
                    p {
                        line-height: 1.6;
                        color: #555555;
                    }
                    footer {
                        margin-top: 20px;
                        text-align: center;
                        font-size: 12px;
                        color: #888888;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>${action === 'subscribe' ? 'Thank You for Subscribing!' : 'You Have Unsubscribed'}</h1>
                        <img src="https://d.top4top.io/p_32038yec21.png" width="150px"/>
                    </div>
                    <p>Dear ${user.name},</p>
                    <p>${action === 'subscribe' ? 'Thank you for subscribing to our newsletter! We’re excited to have you with us.' : 'You have successfully unsubscribed from our newsletter. We’re sorry to see you go!'}</p>
                    <p>If you have any questions or concerns, feel free to <a href="${process.env.APP_MAIN_LINK}" style="color: #28a745;">contact us</a>.</p>
                </div>
                <footer>
                    <p>&copy; ${new Date().getFullYear()} ForeverBuy. All rights reserved.</p>
                </footer>
            </body>
            </html>
            `
        }
        transporter.sendMail(mailOptions,(err,success)=>{
            if(err){
                res.status(500).json({error:err.message})
            }else{
                res.status(200).json({ 
                    message: 'Subscription status updated.', 
                    subscribed: user.subscribed 
                });
            }
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred: ' + error.message });
    }
  
};
