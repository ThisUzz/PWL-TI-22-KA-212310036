const express = require("express");
const router = express.Router();
const userController = require("../controllers/UsersController");

router.get("/", userController.index);
router.post("/create", userController.createData);
router.get("/fetch-all", userController.getAll);
router.get("/:id", userController.getByID);
router.put("/update", userController.updatedData);
router.delete("/delete", userController.deleteData);
router.post("/signin", userController.signIn);
module.exports = router;
