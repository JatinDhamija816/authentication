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
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const userModel_1 = __importDefault(require("../models/userModel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const sendEmail = (_a) => __awaiter(void 0, [_a], void 0, function* ({ email, emailType, userId }) {
    try {
        const hashedToken = yield bcryptjs_1.default.hash(userId.toString(), 10);
        if (emailType === 'VERIFY') {
            yield userModel_1.default.findByIdAndUpdate(userId, { verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000 });
        }
        else if (emailType === 'Reset') {
            yield userModel_1.default.findByIdAndUpdate(userId, { forgetPasswordToken: hashedToken, forgetPasswordTokenExpiry: Date.now() + 3600000 });
        }
        let transporter = nodemailer_1.default.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.GMAIL_ID,
                pass: process.env.GMAIL_PASSWORD
            }
        });
        const mailOptions = {
            from: 'jdhamija816@gmail.com',
            to: email,
            subject: emailType === 'VERIFY' ? 'Verify your email' : 'Reset Your Password',
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`
        };
        const mailResponse = yield transporter.sendMail(mailOptions);
        return mailResponse;
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.sendEmail = sendEmail;
//# sourceMappingURL=mailer.js.map