import express from "express";
import { LoginUser, RegisterUser } from "../controllers/userControllers";

const router = express()

router.post('/register', RegisterUser)
router.post('/login', LoginUser)

export default router