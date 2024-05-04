import express from "express";
import { LoginUser, Logout, RegisterUser, userProfile, VerifyEmail } from "../controllers/userControllers";

const router = express()

router.post('/register', RegisterUser)
router.post('/verifyemail', VerifyEmail)
router.post('/login', LoginUser)

router.get('/logout', Logout)
router.get('/userProfile', userProfile)

export default router