const express=require('express')
const router=express.Router()
const {profileController,registerController,loginController,logoutController}=require('../controllers/authController')
const AuthMiddleware=require('../middleware/authMiddleware')
const adminOnly=require('../middleware/roleMiddleware')


router.post("/register",AuthMiddleware,adminOnly,registerController);
router.post("/login",loginController)
router.post("/logout",AuthMiddleware,logoutController)
router.get("/me",AuthMiddleware,profileController)
 

module.exports = router;

      