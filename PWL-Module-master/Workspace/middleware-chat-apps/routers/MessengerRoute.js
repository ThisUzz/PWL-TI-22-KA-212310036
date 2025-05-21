const express = require("express");
const router = express.Router();
const messegersController = require("../controllers/MessengersController");

router.get("/", messegersController.index);
router.post("/create", messegersController.createData);
router.get("/fetch-all", messegersController.getAll);
router.get("/:id", messegersController.getByID);
//router.get("/user/:id", messegersController.getByUserID);
router.put("/update", messegersController.updatedData);
router.delete("/delete", messegersController.deleteData);
router.post("/selected-chat", messegersController.getSelectedChat);

module.exports = router;
