import mongoose from "mongoose";
import { DbName } from "../constant.js";
// import dotenv from 'dotenv'
// dotenv.config()
const ConnectDb = async ()=>{
    try {
     const connectdb = await mongoose.connect(`${process.env.MONGOOSE_URI}/${DbName}`)
     console.log(`MongoDb is connected !! Db Host ${connectdb.connection.host}`);
    } catch (error) {
        console.log("database error" , error);
        // process.exit(1)
        console.log(`${process.env.MONGOOSE_URI}/${DbName}`);
        
    }
}
export default ConnectDb