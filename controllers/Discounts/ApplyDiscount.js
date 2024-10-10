const User = require('../../models/User');
const Discount = require('../../models/Discount');

module.exports = applyDiscount = async (req, res) => {
    if(req.user){
        const { code } = req.body;
        const userId = req.user.id;

        try {
        // Find the discount code in the database
            const discount = await Discount.findOne({ code });

            if (!discount) {
                return res.status(404).json({ message: 'Discount code not found.' });
            }

            // Check if the discount is expired
            if (new Date(discount.expiresAt) < new Date()) {
                return res.status(400).json({ message: 'Discount code has expired.' });
            }

            // Check if the user has already used this discount code
            const user = await User.findById(userId);
            if (user.usedDiscountCodes.includes(discount.code)) {
                return res.status(400).json({ message: 'You have already used this discount code.' });
            }

            // If valid, apply the discount and record it
            user.usedDiscountCodes.push(discount.code);
            await user.save();

            res.status(200).json({ 
                message: 'Discount code applied successfully!', 
                discount: {
                    code: discount.code,
                    percentage: discount.percentage
                } 
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurred: ' + error.message });
        }
    }else{
        res.status(401).json({message:"Not Authenticated"})
    }
    
};
