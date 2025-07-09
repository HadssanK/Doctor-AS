import express from 'express'
import { router } from './routes/User.routes.js';
import ConnectDb from './db/config.js';
import dotenv from 'dotenv'
const app = express();
dotenv.config()
ConnectDb()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/api/v1/users" , router)

export {app}