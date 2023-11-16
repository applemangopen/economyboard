const express = require("express");
const router = express.Router();
const userController = require("./user.controller");

router.get("/:userId", userController.getUserDetails);
router.put("/:userId", userController.updateUserDetails);
router.delete("/:userId", userController.deleteUserDetails);

module.exports = router;
