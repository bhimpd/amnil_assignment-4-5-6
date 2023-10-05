const User = require("../../Model/users");
const Product = require("../../Model/product");
const Store = require("../../Model/store");


const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../helper/images')); // Specify the correct destination folder
  },
  filename: function (req, file, cb) {
    const name = Date.now() + "-" + file.originalname;
    cb(null, name);
  },
});

const upload = multer({ storage: storage });

// creating the new store...

exports.nearStores = upload.single("logo");

exports.createStores = async (req, res) => {
  try {
    const { store_name, userId, longitude, latitude, product_type } =
      req.body;

    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(400).json({ error: "User id not valid..." });
    }

    if (!latitude || !longitude) {
      return res
        .status(400)
        .json({ error: "Latitude and longitude are required..." });
    }


    const newStore = new Store({
      store_name: store_name,
      logo: req.file.filename,
      product_type: product_type,
      location: {
        type: "Point",
        coordinates: [parseFloat(longitude), parseFloat(latitude)],
      },
      user: userId,
    });

    const storeData = await newStore.save();

    res
      .status(200)
      .json({ message: "Store created successfully...", storeData });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// getting all the list of the stores...

exports.getAllStores = async (req, res) => {
  try {
    const allStores = await Store.find({}).populate("user");
    res.status(200).json({ message: "all lists of stores", allStores });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};


//getting single store details..

exports.getSingleStore = async (req, res) => {
  try {
    const storeid = req.params.storeid;
    const storeId = await Store.findById(storeid).populate("user");
    if (!storeId) {
      res.status(404).json({ message: "store id not found...." });
    }
    res.status(200).json({ message: "store detail", storeId });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//deleting the store...
exports.deleteStore = async(req,res)=>{
  try {
    const storeid = req.params.storeid;
    if(!storeid)
    {
      res.status(404).json({error:"store id not found..."})
    }
    const deletedStore = await Store.findByIdAndDelete(storeid);
    res.status(200).json({message:"store deleted...",deletedStore})
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });

  }
}






//updating the store details....

exports.updateStore = async (req, res) => {
  try {
    const storeid = req.params.storeid;
    const updateddata = await Store.findByIdAndUpdate(storeid, req.body, {
      new: true,
    });

    if (!updateddata) {
      res.status(404).json({ error: error.message });
    }
    const updatedStore = await Store.findById(storeid);
    res
      .status(200)
      .json({ message: "store updated successfully", updatedStore });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};



//geting the nearest store..

exports.getNearestStore = async (req, res) => {
  try {
    const { longitude, latitude, store_name } = req.body;

    if (!latitude || !longitude) {
      return res
        .status(400)
        .json({ error: "Latitude and longitude are required..." });
    }
    const nearbyStores = await Store.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [parseFloat(longitude), parseFloat(latitude)],
          },
          distanceField: "dist.calculated",
          maxDistance: 5000, // 5KM in meters
          spherical: true,
        },
      },
      {
        $match: {
          store_name: new RegExp(store_name, "i"), // Case-insensitive store name search
        },
      },
      // {
      //   $lookup: {
      //     from: "users", // Assuming the user model is named "users"
      //     localField: "user",
      //     foreignField: "_id",
      //     as: "userDetails",
      //   },
      // },
      // {
      //   $project: {
      //     store_name: 1,
      //     logo: 1,
      //     product_type: 1,
      //     location: 1,
      //     user: {
      //       $arrayElemAt: ["$userDetails", 0],
      //     },
      //     distance: 1,
      //   },
      // },
    ]);

    res
      .status(200)
      .json({ message: "Nearby stores within 5KM radius", nearbyStores });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
