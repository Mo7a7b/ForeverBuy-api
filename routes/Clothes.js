const express = require("express");
const addCloth = require("../controllers/Clothes/AddClothes");
const UpdateClothes = require("../controllers/Clothes/UpdateClothes");
const DeleteClothes = require("../controllers/Clothes/DeleteClothes");
const GetAllClothes = require("../controllers/Clothes/GetAllClothes");
const GetOneCloth = require("../controllers/Clothes/GetOneCloth");
const VerifyUser = require("../middlewares/VerifyUser");
const upload = require('../middlewares/Upload');
const router = express.Router();
/**
 * @swagger
 * tags:
 *   - name: Clothes
 *     description: Operations related to clothing items
 */

/**
 * @swagger
 * /clothes:
 *   get:
 *     summary: Retrieve a list of clothes
 *     tags:
 *       - Clothes  # Specify your custom group name here
 *     responses:
 *       200:
 *         description: A list of clothes.
 *       400:
 *         description: Specified Error
 *  
 */
router.get("/clothes", GetAllClothes);
/**
 * @swagger
 * /cloth/{id}:
 *   get:
 *     summary: Retrieve one specific cloth by id
 *     tags:
 *       - Clothes  # Specify your custom group name here
 *     parameters:
 *     - name: id 
 *       in: path
 *       required: true
 *       description: Id of the cloth.
 *     responses:
 *       200:
 *         description: A specific cloth.
 *       400:
 *         description: Specified Error
 */
router.get("/cloth/:id", GetOneCloth);
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
 * /new/cloth:
 *   post:
 *     summary: Create a new cloth
 *     tags:
 *       - Clothes  # Specify your custom group name here
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The name of the cloth
 *               desc:
 *                 type: string
 *                 description: A description of the cloth
 *               price:
 *                 type: number
 *                 description: The price of the cloth
 *               rating:
 *                 type: number
 *                 description: The rating of the cloth (1 to 5)
 *                 minimum: 1
 *                 maximum: 5
 *               category:
 *                 type: string
 *                 description: The category of the cloth
 *                 enum:
 *                   - Men
 *                   - Women
 *                   - Kids
 *               subCategory:
 *                 type: string
 *                 description: The subcategory of the cloth
 *                 enum:
 *                   - Topwear
 *                   - Bottomwear
 *                   - Winterwear
 *               bestSeller:
 *                 type: boolean
 *                 description: Is the cloth among the best sellers?
 *                 default: false
 *               images:
 *                 type: array
 *                 description: An array of files (image uploads)
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Cloth created successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Not Authenticated
 */

router.post("/new/cloth",upload.array('images', 5),VerifyUser, addCloth);
/**
 * @swagger
 * /upd/{id}:
 *   put:
 *     summary: Update a specific cloth by ID
 *     tags:
 *       - Clothes  # Specify your custom group name here
 *     security:
 *       - BearerAuth: []  # Specify that a Bearer token is required
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the cloth to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The updated name of the cloth
 *               desc:
 *                 type: string
 *                 description: An updated description of the cloth
 *               price:
 *                 type: number
 *                 description: The updated price of the cloth
 *               rating:
 *                 type: number
 *                 description: The updated rating of the cloth (1 to 5)
 *                 minimum: 1
 *                 maximum: 5
 *               category:
 *                 type: string
 *                 description: The updated category of the cloth
 *                 enum:
 *                   - Men
 *                   - Women
 *                   - Kids
 *               subCategory:
 *                 type: string
 *                 description: The updated subcategory of the cloth
 *                 enum:
 *                   - Topwear
 *                   - Bottomwear
 *                   - Winterwear
 *               bestSeller:
 *                 type: boolean
 *                 description: Is the cloth among the best sellers?
 *                 default: false
 *     responses:
 *       200:
 *         description: Cloth updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 updatedCloth:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     title:
 *                       type: string
 *                     desc:
 *                       type: string
 *                     price:
 *                       type: number
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Not Authenticated
 *       404:
 *         description: Cloth not found
 */

router.put("/upd/:id",VerifyUser, UpdateClothes);
/**
 * @swagger
 * /del/{id}:
 *   delete:
 *     summary: Delete a specific cloth by ID
 *     tags:
 *       - Clothes  # Specify your custom group name here
 *     security:
 *       - BearerAuth: []  # Specify that a Bearer token is required
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the cloth to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cloth deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Cloth deleted successfully"
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Not Authenticated
 *       404:
 *         description: Cloth not found
 */

router.delete("/del/:id",VerifyUser, DeleteClothes);
module.exports = router;
