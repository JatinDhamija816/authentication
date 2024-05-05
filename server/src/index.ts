import ConnectDb from './Database/index'
import app from './app'
import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT || 5000

ConnectDb()
    .then(() => {
        app.listen((PORT), () => {
            console.log("Server Start ")
        })
    })
    .catch(() => {
        console.log("Error in index.ts file")
    })
