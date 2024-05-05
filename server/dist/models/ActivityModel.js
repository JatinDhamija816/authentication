"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userModel_1 = __importDefault(require("./userModel"));
const activitySchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: userModel_1.default
    },
    activityType: {
        type: String
    },
    deviceInfo: {
        type: String
    },
    time: {
        type: String,
    }
}, { timestamps: true });
const Activity = mongoose_1.default.model('Activity', activitySchema);
exports.default = Activity;
//# sourceMappingURL=ActivityModel.js.map