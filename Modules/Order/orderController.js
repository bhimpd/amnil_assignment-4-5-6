const Order = require("../../Model/order");
const Cart = require("../../Model/cart");

exports.addOrder = async (req, res) => {
  try {
    const cartId = req.params.cartId;
    const cartToAdd = await Cart.findById(cartId);
    if (cartToAdd.price >= 200) {
      const orderToAdd = {
        cartId,
        userId: cartToAdd.userId,
        items: cartToAdd.items,
        price: cartToAdd.price,
      };
      await Cart.findByIdAndRemove(cartId);
      const added = await Order.create(orderToAdd);
      res.json({ added, success: "cart checkout successfully" });
    } else {
      res
        .status(400)
        .json({
          message: "Minimum price must be 200 in shopping cart to get order...",
        });
    }
  } catch (error) {
    res.status(500).json({ error: "failed to checkout the cart item" });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const cartId = req.params.cartId;
    const singleOrder = await Order.findById(cartId);
    if (!singleOrder) throw new error("No order for the following id cart...")
    res.status(200).json({success:"order items",singleOrder})
  } catch (error) {
    res.status(500).json({ error: "failed to checkout the cart item" });
  }
};


exports.getAllOrder = async (req,res)=>{
    try {
        const allOrder = await Order.find({}).populate('userId').populate('items.productId');
        res.status(200).json({success :"all ordered carts...", allOrder})
    } catch (error) {
        res.status(500).json({ error: "failed to checkout the cart item" });

    }
}

exports.deleteOrder = async (req,res)=>{
    try {

        const cartId = req.params.cartId;
        const deleteOrder = await Order.findByIdAndDelete(cartId);
        if (!deleteOrder) throw new error ("No id found for the following order...")
        res.status(200).json("order deleted...")
    } catch (error) {
        res.status(500).json({ error: "failed to checkout the cart item" });

    }
}