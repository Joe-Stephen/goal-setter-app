const express = require("express");
const router = express.Router();
const { registerUser } = require("../../userSide/controllers/userController");
const { protect } = require("../middlewares/authMiddleware");

const {
  postAdminLogin,
  getUsersList,
  searchUser,
  updateUserDetails,
  deleteUser,
  toggleStatus,
} = require("../controllers/adminController");

router.route("/login").post(postAdminLogin);
router.route("/").get(protect, getUsersList);
router.route("/addUser").post(protect, registerUser);
router
  .route("/:userId")
  .delete(protect, deleteUser)
  .put(protect, updateUserDetails);
router.route("/search").post(protect, searchUser);
router.route("/toggleStatus/:userId").put(protect, toggleStatus);

module.exports = router;
