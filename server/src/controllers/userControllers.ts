import User from "../models/userModel"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const RegisterUser = async (req: any, res: any) => {
    try {
        const { username, email, password } = req.body

        if (!username || !email || !password) {
            return res.status(400).send({
                success: false, message: 'Please fill all details'
            })
        }
        const user = await User.findOne({ email })
        if (user) {
            return res.status(401).send({
                success: false, message: 'User already exists'
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({ username, email, password: hashedPassword })
        newUser.save()

        return res.status(201).send({
            success: true, message: 'New user Created', newUser
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message: "Error in Register", success: false,
        })
    }
}

export const LoginUser = async (req: any, res: any) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).send({
                success: false, message: 'Please fill all details'
            })
        }
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(401).send({
                success: false, message: 'Email is not Register'
            })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).send({
                success: false, message: 'Invalid Email or Password'
            })
        }
        const tokenData = {
            id: user._id, username: user.username, email: user.email
        }
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: '1d' })
        res.cookie('token', token, {
            httpOnly: true, domain: 'localhost:3000', secure: true,
        })
        return res.status(201).json({
            message: "Logged in successfully", success: true, user, token
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message: "Error in Login",
            success: false,
        })
    }
}

export const Logout = async (req: any, res: any) => {
    try {
        res.cookie.set('token', '', { httpOnly: true })
        return res.status(200).send({
            message: 'Logout Successfully',
            success: true
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message: "Error in logout",
            error
        })
    }
}