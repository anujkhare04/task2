const express=require('express')
const router=express.Router()
const authMiddleware=require("../middleware/authMiddleware")
const departmentMiddleware=require("../middleware/departmentMidlleware")
const {createPatientController,getPatient}=require("../controllers/patientController")





router.post(
  "/Createpatients",
  authMiddleware,
  departmentMiddleware(["Registration department"]),
  createPatientController
)
router.post(
  "/patients",
  authMiddleware,
  departmentMiddleware(["Registration department"]),
  createPatientController
)
router.get(
  "/viewpatients/:id",
  authMiddleware,
  departmentMiddleware([
    "Registration department",
    "Radiology department",
    "Billing department",
    "Reports department"
  ]),
  getPatient
)
router.get(
  "/patients/:id",
  authMiddleware,
  departmentMiddleware([
    "Registration department",
    "Radiology department",
    "Billing department",
    "Reports department"
  ]),
  getPatient
)


module.exports=router
