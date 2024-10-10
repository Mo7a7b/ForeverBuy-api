const express = require("express");
const Signup = require("../controllers/Users/Signup");
const Login = require("../controllers/Users/Login");
const forgetPass = require("../controllers/Users/forgetPass");
const UpdatePassword = require("../controllers/Users/UpdatePassword");
const GetDiscount = require("../controllers/Discounts/GetDiscount");
const VerifyUser = require("../middlewares/VerifyUser");
const ApplyDiscount = require("../controllers/Discounts/ApplyDiscount");
const Subscribtion = require("../controllers/Users/Subscribtion");
const router = express.Router();
/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: Operations related to Users Auth
 */
/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Create a new user account
 *     tags:
 *       - Users  # Specify your custom group name here
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The username for the new account
 *               email:
 *                 type: string
 *                 description: The email address for the new account
 *               password:
 *                 type: string
 *                 description: The password for the new account
 *                 format: password
 *                 minimum: 8
 *                 maximum: 16
 *               admin:
 *                 type: boolean
 *                 description: Is the user an admin?
 *                 default: false
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: "User's username"
 *                 email:
 *                   type: string
 *                   example: "User's email"
 *                 password:
 *                   type: string
 *                   example: "User's password"
 *                 message:
 *                   type: string
 *                   example: "User created successfully"
 *                 _id:
 *                   type: string
 *                   description: The ID of the newly created user
 *                 token:
 *                   type: string
 *                   description: User's Authorized Token
 *       400:
 *         description: Validation Error
 *       409:
 *         description: User already exists
 */

router.post("/signup", Signup);
/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login to your account
 *     tags:
 *       - Users  # Specify your custom group name here
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email address for the new account
 *               password:
 *                 type: string
 *                 description: The password for the new account
 *                 format: password
 *                 minimum: 8
 *                 maximum: 16
 *     responses:
 *       201:
 *         description: Logined Successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: "User's username"
 *                 email:
 *                   type: string
 *                   example: "User's email"
 *                 password:
 *                   type: string
 *                   example: "User's password"
 *                 message:
 *                   type: string
 *                   example: "Welcome Back your_name"
 *                 _id:
 *                   type: string
 *                   description: The ID of the user
 *                 token:
 *                   type: string
 *                   description: User's Authorized Token
 *       400:
 *         description: Speciefied Error
 *       401:
 *         description: Invalid Credentials
 */

router.post("/login", Login);
/**
 * @swagger
 * /forgetPassword:
 *   post:
 *     summary: Initiate password reset for a user
 *     tags:
 *       - Users  # Specify your custom group name here
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address associated with the account
 *     responses:
 *       200:
 *         description: Password reset email sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "We have sent you the reset link to your gmail."
 *       400:
 *         description: Invalid email address
 *       404:
 *         description: User not found
 */

router.post("/forgetPassword", forgetPass);
/**
 * @swagger
 * /upd/password/{id}:
 *   put:
 *     summary: Update the password for a specific user
 *     tags:
 *       - Users  # Specify your custom group name here
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user whose password is to be updated
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 description: The new password for the user
 *                 format: password
 *     responses:
 *       200:
 *         description: Password updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Password updated successfully"
 *                 name:
 *                   type: string
 *                   example: "User's username"
 *                 email:
 *                   type: string
 *                   example: "User's email"
 *                 _id:
 *                   type: string
 *                   description: The ID of the user
 *       400:
 *         description: Invalid input
 */

router.put("/upd/password/:id", UpdatePassword);
/**
 * @swagger
 * /make/discount:
 *   post:
 *     summary: Create a new discount and notify subscribers
 *     security:
 *       - BearerAuth: []
 *     tags: [Discounts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 example: DISCOUNT20
 *               percentage:
 *                 type: number
 *                 example: 20
 *               expiresAt:
 *                 type: string
 *                 format: date-time
 *                 example: 2024-10-31T23:59:59.999Z
 *     responses:
 *       201:
 *         description: Discount created and emails sent
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Discount created and emails sent!
 *                 discount:
 *                   type: object
 *                   properties:
 *                     code:
 *                       type: string
 *                       example: DISCOUNT20
 *                     percentage:
 *                       type: number
 *                       example: 20
 *                     expiresAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2024-10-31T23:59:59.999Z
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Validation error or other issue
 */
router.post("/make/discount",VerifyUser, GetDiscount);
/**
 * @swagger
 * /apply/discount:
 *   post:
 *     summary: Apply a discount code
 *     security:
 *       - BearerAuth: []
 *     description: Validate a discount code and check if the user has used it before.
 *     tags: [Discounts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 description: The discount code to apply.
 *                 example: SAVE10
 *     responses:
 *       200:
 *         description: Discount code applied successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Discount code applied successfully!
 *                 discount:
 *                   type: object
 *                   properties:
 *                     code:
 *                       type: string
 *                       example: SAVE10
 *                     percentage:
 *                       type: integer
 *                       example: 10
 *       400:
 *         description: Invalid request or discount code.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: You have already used this discount code.
 *       404:
 *         description: Discount code not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Discount code not found.
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: An error occurred error details.
 */

router.post("/apply/discount",VerifyUser, ApplyDiscount);
/**
 * @swagger
 * /subscription:
 *   post:
 *     summary: Subscribe or unsubscribe a user
 *     security:
 *       - BearerAuth: []
 *     description: Allows a user to subscribe or unsubscribe from notifications.
 *     tags: [Subscription]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               action:
 *                 type: string
 *                 enum: [subscribe, unsubscribe]
 *                 description: Action to perform on subscription status.
 *                 example: subscribe
 *     responses:
 *       200:
 *         description: Subscription status updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Subscription status updated.
 *                 subscribed:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Invalid request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid action specified.
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User not found.
 */
router.post("/subscription",VerifyUser, Subscribtion);
module.exports = router;
