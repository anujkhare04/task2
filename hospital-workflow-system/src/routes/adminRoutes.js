const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/roleMiddleware");
const {
  listUsersController,
  updateUserController,
  deleteUserController,
  getBillController,
  updateBillController,
  deleteBillController,
  listPatientsController,
  getPatientController,
  updatePatientController,
  deletePatientController, 
} = require("../controllers/adminController");
const { assignRoleController } = require("../controllers/roleController");
const AdminMiddleware = require("../middleware/AdminMiddleware");

router.use(authMiddleware, adminOnly);

router.get("/users",AdminMiddleware, listUsersController);
router.patch("/users/:id",AdminMiddleware, updateUserController);
router.patch("/users/:id/role", AdminMiddleware, assignRoleController);
router.delete("/users/:id",AdminMiddleware, deleteUserController);
router.get("/bills/:id", AdminMiddleware, getBillController);
router.patch("/bills/:id", AdminMiddleware, updateBillController);
router.delete("/bills/:id", AdminMiddleware, deleteBillController);
router.get("/patients", AdminMiddleware, listPatientsController);
router.get("/patients/:id", AdminMiddleware, getPatientController);
router.patch("/patients/:id", AdminMiddleware, updatePatientController);
router.delete("/patients/:id", AdminMiddleware, deletePatientController);

module.exports = router;
