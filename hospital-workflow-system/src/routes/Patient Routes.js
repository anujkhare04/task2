const express=require('express')
const router=express.Router()
const authMiddleware=require("../middleware/authMiddleware")
const departmentMiddleware=require("../middleware/departmentMidlleware")
const {createPatientController,getPatient,viewAllPatient}=require("../controllers/patientController")





router.post(
  "/Createpatients",
  authMiddleware,
  departmentMiddleware(["Registration department"]),
  createPatientController
)

router.get(
  "/viewpatients/phone/:phone",
  authMiddleware,
  departmentMiddleware(["Registration department"]),
  getPatient
);



router.get(
  "/viewpatients",
  authMiddleware,
  departmentMiddleware([
    "Registration department",
  ]),
  viewAllPatient
)

module.exports=router
