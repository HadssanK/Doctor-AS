import express from 'express'
import { router } from './routes/User.routes.js';
import ConnectDb from './db/config.js';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import { DoctorRouter } from './routes/doctor.routes.js';
import cors from "cors";


const app = express();
dotenv.config()
ConnectDb()
app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors({
  origin: "http://localhost:5173", // your frontend origin
  credentials: true, // allow cookies if you're using them
}));

app.use("/api/v1/auth" , router)
app.use("/api/v1/doctor" , DoctorRouter)


export {app}