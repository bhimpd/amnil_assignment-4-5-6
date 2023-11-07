const express = require("express");
const router = express.Router();

const {
  createProduct,
  productsList,
  singleProduct,
  deleteProduct,
  updateProduct,
  filterProducts,
  outOfStock,
  sorting,
  search,
  aggregatePrice
} = require("../Modules/Product/productController");


// swagger api documentatiion...



/**
 * @swagger
 * components:
 *   schemas:
 *     products:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated product ID
 *         name:
 *           type: string
 *           description: Product name
 *         price:
 *           type: number
 *           description: Product price
 *         description:
 *           type: string
 *           description: Product description
 *         quantity:
 *           type: number
 *           description: Product quantity
 *         product_type:
 *           type: string
 *           description: Product type
 *         image:
 *           type: string
 *           description: Product image URL
 *       required:
 *         - name
 *         - price
 *         - description
 *         - quantity
 *         - product_type
 *         - image
 *       example:
 *         _id: abc123
 *         name: Product Name
 *         price: 19.99
 *         description: Product Description
 *         quantity: 100
 *         product_type: Type
 *         image: https://example.com/product-image.jpg
 */

/**
 * @swagger
 * tags:
 *   - name: Product
 *     description: Product all APIs
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     tags:
 *       - Product
 *     responses:
 *       '200':
 *         description: Product list retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/products'
 *       '500':
 *         description: Internal server error

 * /products/add:
 *   post:
 *     summary: Add a new product
 *     tags:
 *       - Product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/products'
 *     responses:
 *       '200':
 *         description: Product added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/products'
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags:
 *       - Product
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Product retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/products'
 *       '500':
 *         description: Internal server error

 * /products/edit/{id}:
 *   put:
 *     summary: Update a product by ID
 *     tags:
 *       - Product
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/products'
 *     responses:
 *       '200':
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/products'
 *       '500':
 *         description: Internal server error

 * /products/delete/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags:
 *       - Product
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Product deleted successfully
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /products/outofstock:
 *   get:
 *     summary: Get out of stock products
 *     tags:
 *       - Product
 *     parameters:
 *       - in: query
 *         name: quantity
 *         schema:
 *           type: integer
 *         required: true
 *         description: The quantity threshold for out of stock products
 *     responses:
 *       '200':
 *         description: Out of stock products retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/products'
 *       '500':
 *         description: Internal server error

 */

/**
* @swagger
 * /products/filter/:product_type:
 *   get:
 *     summary: Filter products
 *     tags:
 *       - Product
 *     parameters:
 *       - in: query
 *         name: product_type
 *         schema:
 *           type: string
 *         required: true
 *         description: The product type to filter by
 *     responses:
 *       '200':
 *         description: Products filtered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/products'
 *       '500':
 *         description: Internal server error

 */

/**
 * @swagger
 * /products/sort:
 *   get:
 *     summary: Sort products
 *     tags:
 *       - Product
 *     responses:
 *       '200':
 *         description: Products sorted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/products'
 *       '500':
 *         description: Internal server error
 */

/**
* @swagger
 * /products/search:
 *   get:
 *     summary: Search products
 *     tags:
 *       - Product
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: The name of the product to search for
 *     responses:
 *       '200':
 *         description: Products searched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/products'
 *       '500':
 *         description: Internal server error 
 */



// creating routes for the prodducts..

router.route("/").get(productsList);
router.route("/:id").get(singleProduct);
router.route("/add").post(createProduct);
router.route("/delete/:id").delete(deleteProduct);
router.route("/edit/:id").put(updateProduct);
router.route("/filter/:product_type").get(filterProducts);
router.route("/outofstock").get(outOfStock);
router.route("/sort").get(sorting);
router.route("/search").get(search);
router.route("/aggregate/totalprice").get(aggregatePrice);

module.exports = router;
