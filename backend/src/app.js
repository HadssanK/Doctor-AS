import express from 'express'
import { router } from './routes/User.routes.js';
import ConnectDb from './db/config.js';
import dotenv from 'dotenv'
import cookieParser from 'cookie-Parser'
import { DoctorRouter } from './routes/doctor.routes.js';


const app = express();
dotenv.config()
ConnectDb()
app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/api/v1/auth" , router)
app.use("/api/v1/doctor" , DoctorRouter)


export {app}