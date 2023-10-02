const Product = require("../../Model/product");
const mongoose = require("mongoose");

//creating and adding the product...
exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res
      .status(200)
      .json({ message: "product created successfully...", product: product });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

//geting all the product list...
exports.productsList = async (req, res) => {
  try {
    const product = await Product.find({});
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

//fetching the single product..
exports.singleProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const productid = await Product.findById(id);

    if (!productid) {
      res.status(404).json({ error: "product id not found.." });
    } else {
      res.status(200).json(productid);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//deleting the single product..
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const productid = await Product.findByIdAndDelete(id);
    res.status(200).json({ message: "deleted successfully", productid });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//updating the product...
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const productid = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!productid) {
      return res.status(404).json({ error: "product id not found..." });
    }
    const productupdate = await Product.findById(id);
    res
      .status(200)
      .json({ message: "product updated successfully", productupdate });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//filter by product_type
exports.filterProducts = async (req, res) => {
  try {
    const { product_type } = req.params;

    if (!product_type) {
      res.status(404).json({ message: "No product type products found..." });
    }

    const searchByProductType = await Product.find({
      product_type: product_type,
    });

    res.status(200).json(searchByProductType);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

///outof stockk

exports.outOfStock = async (req, res) => {
  try {
    const quant = req.query.quantity;
    const data = await Product.find({ 'quantity': { $lt: quant } });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'error' });
  }
};

//sort by ascending or desscending...
exports.sorting = async (req, res) => {
  try {
    const { price } = req.query;
    let sorting;

    if (price === "asc") {
      sorting = await Product.find().sort({ price: 1 }); // 1 for ascending
    } else if (price === "desc") {
      sorting = await Product.find().sort({ price: -1 }); // -1 for descending
    } else {
      sorting = await Product.find();
    }

    res.status(200).json(sorting);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


//searching either by name or description....

exports.search = async (req,res)=>{
  try {
    const query = req.query.name;
    const data = await Product.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ],
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });

  }
}