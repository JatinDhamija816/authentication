import mongoose from "mongoose";
import User from "./userModel";
const activitySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
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
}, { timestamps: true })

const Activity = mongoose.model('Activity', activitySchema);

export default Activity