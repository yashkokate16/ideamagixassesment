import express from "express";
import * as instructorController from "../controller/instructor.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";
import { instructorMiddleware } from "../middlewares/instructor.middleware.js";





let instructorRouter = express.Router();




instructorRouter.post("/create", authMiddleware, adminMiddleware, instructorController.createInstructorController);
instructorRouter.get("/all", authMiddleware,adminMiddleware, instructorController.getAllInstructorsController);
instructorRouter.get("/:id", authMiddleware, adminMiddleware, instructorController.getInstructorByIdController);
instructorRouter.patch("/:id", authMiddleware, adminMiddleware, instructorController.updateInstructorController);
instructorRouter.delete("/:id", authMiddleware, adminMiddleware, instructorController.deleteInstructorController);



export default instructorRouter;