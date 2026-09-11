import express from "express";
import * as courseController from "../controller/course.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";



let courseRouter = express.Router();




courseRouter.post("/create", authMiddleware, adminMiddleware, courseController.createCourseController);
courseRouter.get("/all", authMiddleware, adminMiddleware, courseController.getAllCoursesController);
courseRouter.get("/:id", authMiddleware, adminMiddleware, courseController.getCourseByIdController);
courseRouter.patch("/:id", authMiddleware, adminMiddleware, courseController.updateCourseController);
courseRouter.delete("/:id", authMiddleware, adminMiddleware, courseController.deleteCourseController);



export default courseRouter;