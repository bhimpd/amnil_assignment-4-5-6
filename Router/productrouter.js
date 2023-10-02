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
} = require("../Modules/Product/productController");

// creating routes for the prodducts..

router.route("/").get(productsList);
router.route("/:id").get(singleProduct);
router.route("/").post(createProduct);
router.route("/:id").delete(deleteProduct);
router.route("/:id").put(updateProduct);
router.route("/type/:product_type").get(filterProducts);
router.route("/out/outofstock").get(outOfStock);
router.route("/sort/sorting").get(sorting);
router.route("/search/searching").get(search);

module.exports = router;
