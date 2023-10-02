const Cart = require("../Model/cart");
const Product = require("../Model/product");

exports.addToCart = async (req, res) => {
  const { userId, items } = req.body;

  try {
    //checking if the cart already exist or not....
    const existingCart = await Cart.findOne({ userId });

    // if exist, then update the items inside Cart.....
    if (existingCart) {
      let updatedCartItems = [...existingCart.items];

      for (let newItems of items) {
        const exisitingItems = updatedCartItems.find((item) => {
          item.productId = newItems.productId;
        });

        //if items aleady presents then increase the quantity...
        if (exisitingItems) {
          exisitingItems.quantity += newItems.quantity;
        }

        //if not,then add the newitem to the updated cart...
        else {
          updatedCartItems.push(newItems);
        }
      }

      // calculating the price
      let totalAmount = 0;
      for (const item of updatedCartItems) {
        const product = await Product.findById(item.productId);
        if (!product) {
          return res.status(404).json({ error: "product not found.." });
        }
        totalAmount += items.quantity * product.price;
      }

      //updating the cart with new items and price...
      await Cart.updateOne(
        { userId },
        {
          $set: {
            items: updatedCartItems,
            price: totalAmount.toFixed(2),
          },
        }
      );

      res.status(200).json({ success: "Cart updated successfully" });
    } else {
      //if there is no existing cart, then create new cart for new user....
      let totalAmount = 0;
      for (const item of items) {
        const product = await Product.findById(item.productId);
        if (!product) {
          res.status(404).json({ error: "Product not found" });
        }
        totalAmount += product.price * item.quantity;
      }
      const cartData = {
        userId,
        items,
        price: totalAmount.toFixed(2),
      };
      await Cart.create(cartData);
      res.status(200).json({ success: "Cart created successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllCart = async (req, res) => {
  try {
    const allCarts = await Cart.find({});
    if (allCarts.length > 0) {
      res
        .status(200)
        .json({ allCarts, message: "All cart data fetched successfully" });
    } else {
      res.status(404).json({ message: "No carts found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCartById = async (req, res) => {
  try {
    const cardId = req.params.id;
    const singleCart = await Cart.findById(cardId);
    if (singleCart) {
      res.status(200).json({ singleCart, success: "single cart fetched.." });
    } else {
      res.status(404).json({ error: "no cart item found.. " });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
