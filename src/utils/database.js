import mongoose from "mongoose"

let isConnected = false

export const connectToDB = async () => {

    mongoose.set("strictQuery", true)
    
    if(isConnected) {
        console.log("Already Connected To MongoDB Database!")
        return;
    }

    try {
        
        await mongoose.connect(process.env.MONGODB_URI)

        isConnected = true
        console.log("Connected To MongoDB Database!")

    } catch (error) {
        console.log(error)
        throw new error;
    }
}