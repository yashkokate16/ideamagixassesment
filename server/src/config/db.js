import mongoose from "mongoose";
import env from "./env.js";


let connectDb = async () => {
    try{

        await mongoose.connect(env.MONGO_URL);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}


export default connectDb;