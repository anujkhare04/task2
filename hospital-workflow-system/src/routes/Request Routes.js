
const express=require('express')
const router=express.Router()
const authMiddleware=require("../middleware/authMiddleware")
const departmentMiddleware=require("../middleware/departmentMidlleware")
const {
   createRequestController,
  getAllRequestsController,
  getRequestByIdController,
  updateRequestController,
} = require("../controllers/requestController");

router.post(
  "/requests",
  authMiddleware,
  departmentMiddleware(["Registration department"]),
  createRequestController
)
router.get("/viewrequest",authMiddleware,getAllRequestsController)


router.get("/viewrequest/:id",authMiddleware,getRequestByIdController)


router.patch(
  "/updaterequest/:id",
  authMiddleware,
  departmentMiddleware(["Registration department"]),
  updateRequestController
)



module.exports=router

