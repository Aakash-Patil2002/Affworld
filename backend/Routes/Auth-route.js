const express=require("express");
const { forgotPass, UpdatePass } = require("../Controller/AuthController");
const router=express.Router();
const Login=require('../Controller/AuthController').Login;
const Register=require('../Controller/AuthController').Register;

router.post("/login",Login);
router.post("/register",Register);
router.post("/forgot-password",forgotPass)
router.post("/update-password",UpdatePass);
module.exports=router
