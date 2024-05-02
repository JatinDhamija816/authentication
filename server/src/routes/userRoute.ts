import express from "express";
import { LoginUser, Logout, RegisterUser } from "../controllers/userControllers";

const router = express()

router.post('/register', RegisterUser)
router.post('/login', LoginUser)

router.get('/logout', Logout)
export default router