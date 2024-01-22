const express = require("express");
const router = express.Router();
const { registerUser } = require("../../userSide/controllers/userController");
const { protect } = require("../middlewares/authMiddleware");

const {
  postAdminLogin,
  getUsersList,
  searchUser,
  editUser,
  deleteUser,
  userBlock,
  userUnBlock,
} = require("../controllers/adminController");

router.route("/login").post(postAdminLogin);
router.route("/").get(protect, getUsersList);
router.route("/addUser").post(protect, registerUser);
router
  .route("/:userId")
  .delete(protect, deleteUser)
  .put(protect, editUser);
router.route("/search").post(protect, searchUser);
router.post('/block', protect,  userBlock)
router.post('/unblock', protect, userUnBlock)
module.exports = router;
