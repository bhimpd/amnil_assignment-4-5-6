const Order = require("../../Model/order");
const Cart = require("../../Model/cart");
const express = require('express');
const fs = require('fs');
const path = require('path')

require('dotenv').config()

const nodemailer= require("nodemailer");
const mjml = require("mjml");


const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
      user: process.env.USER,
      pass: process.env.PASS
  }
});


exports.checkOut = async (req, res) => {
  try {
    const cartId = req.params.cartId;
    const cartToAdd = await Cart.findById(cartId).populate("userId")
    .populate("items.productId")
    if (cartToAdd.price >= 200) {
      const orderToAdd = {
        cartId,
        userId: cartToAdd.userId, 
        items: cartToAdd.items,
        price: cartToAdd.price,
      };
      await Cart.findByIdAndRemove(cartId);
      // const added = await Order.create(orderToAdd);

      const mjmlTemplate = fs.readFileSync(path.resolve(__dirname,"../../helpers/email.mjml"), "utf-8");
      const mjmlData = mjmlTemplate
        .replace("{{cartId}}", orderToAdd.cartId)
        .replace("{{price}}", orderToAdd.price);

      const { html } = mjml(mjmlData);

      const mailOptions = {
        from: "dreamypd73@gmail.com",
        to: "devidattalamichhane123@gmail.com", 
        subject: "Invoice for your recent purchase",
        html: html,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
          res.status(500).json({ error: "Failed to send invoice email" });
        } else {
          console.log("Email sent:", info.response);
          res.json({ cartToAdd, success: "Cart checked out successfully" });
        }
      });
      

    } else {
      res
        .status(400)
        .json({
          message:
            "There must  be minimum price of Rs 200 in shopping cart to checkout!!!!!",
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
    if (!singleOrder) throw new error("No order for the following id cart...");
    res.status(200).json({ success: "order items", singleOrder });
  } catch (error) {
    res.status(500).json({ error: "failed to checkout the cart item" });
  }
};

exports.getAllOrder = async (req, res) => {
  try {
    const allOrder = await Order.find({})
      .populate("userId")
      .populate("items.productId");
    res.status(200).json({ success: "all ordered carts...", allOrder });
  } catch (error) {
    res.status(500).json({ error: "failed to checkout the cart item" });
  }
};


exports.deleteOrder = async (req, res) => {
  try {
    const cartId = req.params.cartId;
    const deleteOrder = await Order.findByIdAndDelete(cartId);
    if (!deleteOrder) throw new error("No id found for the following order...");
    res.status(200).json("order deleted...");
  } catch (error) {
    res.status(500).json({ error: "failed to checkout the cart item" });
  }
};
