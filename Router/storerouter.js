const express = require("express");
const router = express.Router();


const {
  nearStores,
  createStores,
  getAllStores,
  getSingleStore,
  updateStore,
  getNearestStore,
  deleteStore
} = require("../Modules/Store/storeController");


// adding router to the store....
router.route("/poststore").post(nearStores,createStores);
router.route("/getallstores").get(getAllStores);
router.route("/getsinglestore/:storeid").get(getSingleStore);
router.route("/deletestore/:storeid").delete(deleteStore)
router.route("/updatestore/:storeid").put(updateStore);
router.route("/neareststore").post(getNearestStore);

module.exports = router;
