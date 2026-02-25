

const express=require('express')

const router=express.Router()
const {profileController,registerController,loginController,logoutController}=require('../controllers/authController')

router.post("/register",registerController)
router.post("/login",loginController)
router.post("/logout",logoutController)
router.post("/me",profileController)
 

module.exports = router;

      