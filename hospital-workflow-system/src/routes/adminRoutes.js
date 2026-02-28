const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/roleMiddleware");
const {
  listUsersController,
  updateUserController,
  deleteUserController,
} = require("../controllers/adminController");
const AdminMiddleware = require("../middleware/AdminMiddleware");

router.use(authMiddleware, adminOnly);

router.get("/users",AdminMiddleware, listUsersController);
router.patch("/users/:id",AdminMiddleware, updateUserController);
router.delete("/users/:id",AdminMiddleware, deleteUserController);

module.exports = router;
