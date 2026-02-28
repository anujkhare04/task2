const express=require('express')
const router=express.Router()
const {profileController,registerController,loginController,logoutController}=require('../controllers/authController')
const AuthMiddleware=require('../middleware/authMiddleware')
const Admin=require('../middleware/AdminMiddleware')


router.post("/register",Admin,registerController);
router.post("/login",loginController)
router.post("/logout",AuthMiddleware,logoutController)
router.get("/me",AuthMiddleware,profileController)
 

module.exports = router;

