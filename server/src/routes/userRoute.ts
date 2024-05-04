import express from "express";
import { LoginUser, Logout, RegisterUser, userProfile, VerifyEmail, Activities } from "../controllers/userControllers";

const router = express()

router.post('/register', RegisterUser)
router.post('/verifyEmail', VerifyEmail)
router.post('/login', LoginUser)

router.get('/logout', Logout)
router.get('/userProfile', userProfile)
router.get('/activity', Activities)


export default router