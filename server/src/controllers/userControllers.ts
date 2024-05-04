import User from "../models/userModel"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { Request, Response } from "express"
import { sendEmail } from '../helper/mailer'

export const RegisterUser = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body
        if (!username || !email || !password) {
            return res.status(400).json({
                success: false, message: 'Please fill all details'
            })
        }
        const user = await User.findOne({ email })
        if (user) {
            return res.status(401).json({
                success: false, message: 'User already exists'
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({ username, email, password: hashedPassword })
        newUser.save()
        await sendEmail({ email, emailType: "VERIFY", userId: newUser._id })
        return res.status(201).json({
            success: true, message: 'New user Created', newUser
        })
    } catch (error) {
        return res.status(500).json({
            message: "Error in Register", success: false,
        })
    }
}

export const LoginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({
                success: false, message: 'Please fill all details'
            })
        }
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(401).json({
                success: false, message: 'Email is not Register'
            })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({
                success: false, message: 'Invalid Email or Password'
            })
        }
        const tokenData = {
            id: user._id, username: user.username, email: user.email
        }
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: '1d' })
        res.cookie('token', token, {
            domain: 'localhost:3000', secure: true,
        })
        return res.status(201).json({
            message: "Logged in successfully", success: true, user, token
        })
    } catch (error) {
        return res.status(500).json({
            message: "Error in Login",
            success: false,
        })
    }
}

export const Logout = async (req: Request, res: Response) => {
    try {
        return res.status(200).json({
            message: 'Logout Successfully',
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: "Error in logout",
            error
        })
    }
}

function getDataFromToken(req: Request) {
    try {
        const token = req.cookies.token
        const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);
        return decodedToken.id;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const userProfile = async (req: Request, res: Response) => {
    try {
        const userId = await getDataFromToken(req);
        const user = await User.findOne({ _id: userId }).select("-password");
        return res.json({
            message: "User found",
            data: user
        })
    } catch (error: any) {
        return res.json({ error: error.message, status: 400 });
    }
}

export const VerifyEmail = async (req: Request, res: Response) => {
    try {
        const { token } = req.body
        const user = await User.findOne({ verifyToken: token, verifyTokenExpiry: { $gt: Date.now } })
        if (!user) {
            return res.status(400).json({
                message: 'Invalid token', success: false
            })
        }
        user.isVerfied = true
        user.verifyToken = undefined
        user.verifyTokenExpiry = undefined
        console.log(user)
        await user.save()
        return res.json({
            message: 'Email Verified successfully', success: true
        })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}