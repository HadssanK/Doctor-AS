import express from "express"
import { Register } from "../controllers/User.controller.js";

const router = express.Router();

router.route("/registered").post(Register)



export {router}