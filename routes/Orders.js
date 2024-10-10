const express = require("express");
const CreateOrder = require("../controllers/Orders/CreateOrder");
const VerifyUser = require("../middlewares/VerifyUser");
const UpdateOrder = require("../controllers/Orders/UpdateOrder");
const DeleteOrder = require("../controllers/Orders/DeleteOrder");
const GetAllOrders = require("../controllers/Orders/GetAllOrders");
const GetUserOrders = require("../controllers/Orders/GetUserOrders");
const router = express.Router();
/**
 * @swagger
 * tags:
 *   - name: Orders
 *     description: Operations related to Ordering
 */
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *       description: 'Provide your Bearer token in the Authorization header. Example: "your_token"'
 */
/**
 * @swagger
 * /new/order:
 *   post:
 *     summary: Create a new order
 *     tags: 
 *       - Orders
 *     security:
 *       - BearerAuth: []  # Assuming you're using bearer token authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               clothes:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of clothing items ids
 *                 example: ["67060e9b0c6827a40dd5020e"]
 *               location:
 *                 type: string
 *                 description: Shipping address for the order
 *                 example: "123 Main St, Cityville"
 *               method:
 *                 type: string
 *                 description: Payment method for the order (cash on delivery)
 *                 example: "COD"
 *               price:
 *                 type: number
 *                 format: float
 *                 description: Total price of the order
 *                 example: 59.99
 *               quantities:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 description: Array of quantities for each cloth
 *                 example: [1, 2, 1]  # Quantity for each item in 'clothes'
 *     responses:
 *       201:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 orderId:
 *                   type: string
 *                   description: The ID of the created order
 *                   example: "order6789"
 *                 user:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       description: The name of the user who placed the order
 *                       example: "John Doe"
 *                 clothes:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                         description: The title of the clothing item
 *                         example: "Stylish Shirt"
 *                       price:
 *                         type: number
 *                         format: float
 *                         description: The price of the clothing item
 *                         example: 29.99
 *                 message:
 *                   type: string
 *                   example: "Order created successfully"
 *       400:
 *         description: Bad request (e.g., validation errors)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid input data"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized access"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */

router.post("/new/order",VerifyUser, CreateOrder);
/**
 * @swagger
 * /upd/order/{id}:
 *   put:
 *     summary: Update an existing order
 *     tags: [Orders]
 *     security:
 *       - BearerAuth: []  # Assuming you're using bearer token authentication
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the order to update
 *         schema:
 *           type: string
 *           example: "order6789"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               clothes:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Updated list of clothing items
 *                 example: ["67060e9b0c6827a40dd5020e"]
 *               location:
 *                 type: string
 *                 description: Updated shipping address
 *                 example: "456 Another St, Cityville"
 *               price:
 *                 type: number
 *                 format: float
 *                 description: Updated total price of the order
 *                 example: 75.00
 *               quantities:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 description: Updated quantities for each clothing item
 *                 example: [2, 1]  # Quantity for each item in 'clothes'
 *     responses:
 *       200:
 *         description: Order updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 orderId:
 *                   type: string
 *                   description: The ID of the updated order
 *                   example: "order6789"
 *                 message:
 *                   type: string
 *                   example: "Order updated successfully"
 *       400:
 *         description: Bad request (e.g., validation errors)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid input data"
 *       401:
 *         description: Unauthorized (if VerifyUser fails)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized access"
 *       404:
 *         description: Order not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Order not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */
router.put("/upd/order/:id",VerifyUser, UpdateOrder);
/**
 * @swagger
 * /del/order/{id}:
 *   delete:
 *     summary: Delete an existing order
 *     tags: [Orders]
 *     security:
 *       - BearerAuth: []  # Assuming you're using bearer token authentication
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the order to delete
 *         schema:
 *           type: string
 *           example: "order6789"
 *     responses:
 *       200:
 *         description: Order deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Order deleted successfully"
 *       400:
 *         description: Bad request (e.g., invalid order ID)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid order ID"
 *       401:
 *         description: Unauthorized (if VerifyUser fails)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized access"
 *       404:
 *         description: Order not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Order not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */
router.delete("/del/order/:id", VerifyUser,DeleteOrder);
/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Retrieve all orders
 *     tags: [Orders]
 *     security:
 *       - BearerAuth: []  # Assuming you're using bearer token authentication
 *     responses:
 *       200:
 *         description: Successfully retrieved all orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   orderId:
 *                     type: string
 *                     description: The ID of the order
 *                     example: "order6789"
 *                   user:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         description: The name of the user who placed the order
 *                         example: "John Doe"
 *                   clothes:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         title:
 *                           type: string
 *                           description: The title of the clothing item
 *                           example: "Stylish Shirt"
 *                         price:
 *                           type: number
 *                           format: float
 *                           description: The price of the clothing item
 *                           example: 29.99
 *                   location:
 *                     type: string
 *                     description: Shipping address for the order
 *                     example: "123 Main St, Cityville"
 *                   date:
 *                     type: string
 *                     description: The date the order was placed
 *                     example: "10/10/2024"
 *                   price:
 *                     type: number
 *                     format: float
 *                     description: Total price of the order
 *                     example: 59.99
 *                   quantities:
 *                     type: array
 *                     items:
 *                       type: integer
 *                     description: Quantities of items in the order
 *                     example: [1, 2]
 *       401:
 *         description: Unauthorized (if VerifyUser fails)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized access"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */
router.get("/orders",VerifyUser,  GetAllOrders);
/**
 * @swagger
 * /user/orders:
 *   get:
 *     summary: Retrieve orders for the authenticated user
 *     tags: [Orders]
 *     security:
 *       - BearerAuth: []  # Assuming you're using bearer token authentication
 *     responses:
 *       200:
 *         description: Successfully retrieved user orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   orderId:
 *                     type: string
 *                     description: The ID of the order
 *                     example: "order6789"
 *                   user:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         description: The name of the user who placed the order
 *                         example: "John Doe"
 *                   clothes:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         title:
 *                           type: string
 *                           description: The title of the clothing item
 *                           example: "Stylish Shirt"
 *                         price:
 *                           type: number
 *                           format: float
 *                           description: The price of the clothing item
 *                           example: 29.99
 *                   location:
 *                     type: string
 *                     description: Shipping address for the order
 *                     example: "123 Main St, Cityville"
 *                   date:
 *                     type: string
 *                     description: The date the order was placed
 *                     example: "10/10/2024"
 *                   price:
 *                     type: number
 *                     format: float
 *                     description: Total price of the order
 *                     example: 59.99
 *                   quantities:
 *                     type: array
 *                     items:
 *                       type: integer
 *                     description: Quantities of items in the order
 *                     example: [1, 2]
 *       401:
 *         description: Unauthorized (if VerifyUser fails)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized access"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */
router.get("/user/orders", VerifyUser,GetUserOrders);
module.exports = router;