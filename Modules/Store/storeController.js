const User = require("../../Model/users");
const Product = require("../../Model/product");
const Store = require("../../Model/store");

const multer = require("multer");
const path = require("path");
const fs = require("fs");

const imageFileFilter = function (req, file, cb) {
  const allowedFileExtensions = [".jpg", ".jpeg", ".png"];

  // Check if the file extension is allowed
  const extname = path.extname(file.originalname).toLowerCase();
  if (allowedFileExtensions.includes(extname)) {
    cb(null, true);
  } else {
    cb(new Error("File must be either jpg, jpeg, or png"), false);
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../uploaded/images')); // provide the location where the image is stored
  },
  filename: function (req, file, cb) {
    const name = Date.now() + "-" + file.originalname;
    cb(null, name);
  },
});

const upload = multer({ storage: storage,
fileFilter:imageFileFilter,});


// creating the new store...
exports.uploadLogoImage = upload.single("logo");

exports.createStores = async (req, res) => {
  let storeCreated = null; 
  try {
    const { userId, store_name } = req.body;
    const existingStore = await Store.findOne({ store_name });
    if (existingStore) {
      return res.status(400).json({ message: 'Store with the same name already exists' });
    }
    if (!req.body.longitude || !req.body.latitude) {
      return res.status(400).json({ message: 'please enter longitude and latitude' });
    }
    const newStore = {
      store_name: store_name,
      product_type: req.body.product_type,
      user: userId,
      location: {
        type: 'Point',
        coordinates: [parseFloat(req.body.longitude), parseFloat(req.body.latitude)]
      },
      logo: req.file.filename
    }
    storeCreated = await Store.create(newStore);
    if (!storeCreated) { 
      throw new Error("Store creation failed");
    }
  } catch (error) {
    console.error("Error in addStore:", error);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    if (req.file && storeCreated === null) {
      fs.unlinkSync(path.join(__dirname, '../../uploaded/images/' + req.file.filename));
    }
  }
  if (storeCreated) {
    res.status(201).json({ storeCreated, message: "Store added successfully" });
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
