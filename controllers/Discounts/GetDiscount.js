const nodemailer = require('nodemailer');
const Discount = require('../../models/Discount');
const User = require('../../models/User');
const transporter = require('../../nodemailer');

module.exports = GetDiscount = async (req, res) => {
    if(req.user.admin){
        const { code, percentage, expiresAt } = req.body;
    const discount = new Discount({ code, percentage, expiresAt });

    try {
        // Save the discount to the database
        await discount.save();

        // Fetch all subscribed users
        const subscribers = await User.find({ subscribed: true });
        // Prepare and send email to each subscriber
        const mailPromises = subscribers.map(async (subscriber) => {
            const mailOptions = {
                from: process.env.GMAIL,
                to: subscriber.email,
                subject: 'Exclusive Discount Just for You!',
                html: `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Special Discount Just for You!</title>
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
                            background-color: green;
                            background-size: cover;
                            border-radius: 8px 8px 0 0;
                            padding: 40px 20px;
                            text-align: center;
                            color: white;
                        }
                        .logo {
                            max-width: 150px; /* Adjust as needed */
                            margin-bottom: 15px;
                        }
                        h1 {
                            margin: 0;
                        }
                        p {
                            line-height: 1.6;
                            color: #555555;
                        }
                        .discount-code {
                            background-color: #ffcc00;
                            padding: 10px;
                            font-size: 24px;
                            font-weight: bold;
                            text-align: center;
                            border-radius: 5px;
                        }
                        .button {
                            display: inline-block;
                            background: #28a745;
                            color: white;
                            padding: 10px 20px;
                            text-decoration: none;
                            border-radius: 5px;
                            margin-top: 20px;
                        }
                        .button:hover {
                            background: #218838;
                        }
                        footer {
                            margin-top: 20px;
                            text-align: center;
                            font-size: 12px;
                            color: #888888;
                        }
                        .footer-link {
                            color: #28a745;
                            text-decoration: none;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <img src="https://d.top4top.io/p_32038yec21.png" alt="Logo" class="logo" /> <!-- Replace with your logo URL -->
                            <h1>Exclusive Discount Just for You!</h1>
                        </div>
                        <p>Dear Customer, ${subscriber.name}</p>
                        <p>As a token of our appreciation, we're excited to offer you a special discount on your next purchase!</p>
                        <div class="discount-code">USE CODE: ${discount.code}</div>
                        <p>This code will give you ${discount.percentage}% off your order. Hurry, it’s valid until <strong>${discount.expiresAt.toLocaleString()}</strong>.</p>
                        <p>Thank you for being a valued customer. We look forward to serving you again soon!</p>
                        <a href="${process.env.APP_MAIN_LINK}" class="button">Shop Now</a>
                    </div>
                    <footer>
                        <p>If you have any questions, feel free to <a href="${process.env.GMAIL}" class="footer-link">contact us</a>.</p>
                        <p>&copy; ${new Date().getFullYear()} ForeverBuy. All rights reserved.</p>
                    </footer>
                </body>
                </html>
                `,
            };

            return transporter.sendMail(mailOptions);
        });

        // Wait for all emails to be sent
        await Promise.all(mailPromises);

        res.status(201).json({ message: 'Discount created and emails sent!', discount });

        } catch (error) {
            console.error(error);
            res.status(400).json({ message: error.message });
        }
    }else{
        res.status(401).json({message:"Not Authenticated"})
    }
};
