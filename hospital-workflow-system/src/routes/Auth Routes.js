// POST /auth/login

// POST /auth/register (admin creates staff)

// GET /auth/me

const express=require('express')
const router=express.Router()
const {profilecontroller,registerController,loginController,logoutcontroller}=require('../controllers/authController')

router.post("/register",registerController)
router.post("/login",loginController)
router.post("/logout",logoutcontroller)
router.post("/me",profilecontroller)
 

      