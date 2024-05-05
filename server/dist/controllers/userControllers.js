"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Activities = exports.VerifyEmail = exports.userProfile = exports.Logout = exports.LoginUser = exports.RegisterUser = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const ActivityModel_1 = __importDefault(require("../models/ActivityModel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mailer_1 = require("../helper/mailer");
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const indianTime = (0, moment_timezone_1.default)().tz('Asia/Kolkata').format();
const RegisterUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({
                success: false, message: 'Please fill all details'
            });
        }
        const user = yield userModel_1.default.findOne({ email });
        if (user) {
            return res.status(401).json({
                success: false, message: 'User already exists'
            });
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const newUser = new userModel_1.default({ username, email, password: hashedPassword });
        newUser.save();
        const responnse = yield (0, mailer_1.sendEmail)({ email, emailType: "VERIFY", userId: newUser._id });
        return res.status(201).json({
            success: true, message: 'New user Created', newUser
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Error in Register", success: false,
        });
    }
});
exports.RegisterUser = RegisterUser;
const LoginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false, message: 'Please fill all details'
            });
        }
        const user = yield userModel_1.default.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false, message: 'Email is not Register'
            });
        }
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false, message: 'Invalid Email or Password'
            });
        }
        const tokenData = {
            id: user._id, username: user.username, email: user.email
        };
        const token = jsonwebtoken_1.default.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: '1d' });
        res.cookie('token', token, {
            domain: 'localhost:3000', secure: true,
        });
        const userAgent = req.headers['user-agent'];
        let deviceType = '';
        if (userAgent.includes('Windows')) {
            deviceType = 'PC Chrome Web Browser';
        }
        else if (userAgent.includes('Android')) {
            deviceType = 'Android Phone';
        }
        else {
            deviceType = 'iPhone Safari-Mobile Browser';
        }
        const activity = new ActivityModel_1.default({
            userId: user._id,
            activityType: 'login',
            deviceInfo: deviceType,
            time: indianTime
        });
        yield activity.save();
        return res.status(201).json({
            message: "Logged in successfully", success: true, user, token
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Error in Login",
            success: false,
        });
    }
});
exports.LoginUser = LoginUser;
function getDataFromToken(req) {
    try {
        const token = req.cookies.token;
        const decodedToken = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
        return decodedToken.id;
    }
    catch (error) {
        throw new Error(error.message);
    }
}
const Logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = yield getDataFromToken(req);
        const user = yield userModel_1.default.findOne({ _id: userId }).select("-password");
        const userAgent = req.headers['user-agent'];
        let deviceType = '';
        if (userAgent.includes('Windows')) {
            deviceType = 'PC Chrome Web Browser';
        }
        else if (userAgent.includes('Android')) {
            deviceType = 'Android Phone';
        }
        else {
            deviceType = 'iPhone Safari-Mobile Browser';
        }
        const activity = new ActivityModel_1.default({
            userId: user._id,
            activityType: 'logout',
            deviceInfo: deviceType,
            time: indianTime
        });
        yield activity.save();
        return res.status(200).json({
            message: 'Logout Successfully', success: true
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Error in logout", error
        });
    }
});
exports.Logout = Logout;
const userProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = yield getDataFromToken(req);
        const user = yield userModel_1.default.findOne({ _id: userId }).select("-password");
        return res.json({
            message: "User found", data: user
        });
    }
    catch (error) {
        return res.json({ error: error.message, status: 400 });
    }
});
exports.userProfile = userProfile;
const VerifyEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token } = req.body;
        const user = yield userModel_1.default.findOne({ verifyToken: token, verifyTokenExpiry: { $gt: Date.now() } });
        if (!user) {
            return res.status(400).json({ error: "Invalid token" });
        }
        user.isVerfied = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        yield user.save();
        return res.json({
            message: "Email verified successfully", success: true
        });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.VerifyEmail = VerifyEmail;
const Activities = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = yield getDataFromToken(req);
    const activity = yield ActivityModel_1.default.find({ userId });
    return res.send({
        message: "User found", activity
    });
});
exports.Activities = Activities;
//# sourceMappingURL=userControllers.js.map