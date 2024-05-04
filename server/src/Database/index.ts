import mongoose from 'mongoose'

const ConnectDb = async () => {
    try {
        const URL: string = process.env.MONGODB_URI!
        await mongoose.connect(URL)
        console.log("MongoDB Connected")
    } catch (error) {
        console.log("MongoDB Connection Error", error)
    }
}

export default ConnectDb