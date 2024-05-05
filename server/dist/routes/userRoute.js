"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userControllers_1 = require("../controllers/userControllers");
const router = (0, express_1.default)();
router.post('/register', userControllers_1.RegisterUser);
router.post('/verifyEmail', userControllers_1.VerifyEmail);
router.post('/login', userControllers_1.LoginUser);
router.get('/logout', userControllers_1.Logout);
router.get('/userProfile', userControllers_1.userProfile);
router.get('/activity', userControllers_1.Activities);
exports.default = router;
//# sourceMappingURL=userRoute.js.map