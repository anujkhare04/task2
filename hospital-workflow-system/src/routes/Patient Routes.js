const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const departmentMiddleware = require("../middleware/departmentMidlleware");
const {
  createPatientController,
  getPatient,
  viewAllPatient,
  getPatientById,
  updatePatientController,
  deletePatientController,
} = require("../controllers/patientController");

router.post(
  "/Createpatients",
  authMiddleware,
  departmentMiddleware(["Registration department"]),
  createPatientController,
);

router.get(
  "/viewpatients/phone/:phone",
  authMiddleware,
  departmentMiddleware(["Registration department"]),
  getPatient,
);

router.get(
  "/viewpatients",
  authMiddleware,
  departmentMiddleware(["Registration department"]),
  viewAllPatient,
);

router.get(
  "/viewpatients/id/:id",
  authMiddleware,
  departmentMiddleware(["Registration department"]),
  getPatientById,
);

router.patch(
  "/patients/:id",
  authMiddleware,
  departmentMiddleware(["Registration department"]),
  updatePatientController,
);

router.delete(
  "/patients/:id",
  authMiddleware,
  departmentMiddleware(["Registration department"]),
  deletePatientController,
);

module.exports = router;
