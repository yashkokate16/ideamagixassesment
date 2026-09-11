import express from "express";
import * as authController from "../controller/auth.controller.js"
import { authMiddleware } from "../middlewares/auth.middleware.js";





let authRouter = express.Router();


authRouter.post("/register", authController.registerController);
authRouter.post("/login", authController.loginController);

authRouter.post("/refresh-token", authController.refreshTokenController);
authRouter.get("/me", authMiddleware, authController.getCurrentuserController);



export default authRouter;



