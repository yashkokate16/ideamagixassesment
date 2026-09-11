import express from "express";
import * as lectureController from "../controller/lecture.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { instructorMiddleware } from "../middlewares/instructor.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";



let lectureRouter = express.Router();

// create lecture // 
lectureRouter.post("/create", authMiddleware, adminMiddleware, lectureController.createLectureController);

lectureRouter.get("/course/:courseId", authMiddleware, lectureController.getLecturesByCourseController);

lectureRouter.get("/my-lectures", authMiddleware, instructorMiddleware, lectureController.getInstructorLecturesController);

lectureRouter.delete("/delete/:lectureId", authMiddleware, adminMiddleware, lectureController.deleteLectureController);


lectureRouter.get("/:id", authMiddleware, adminMiddleware, lectureController.getLectureByIdController);

// 


// this is an instructor route to get all lectures of the instructor //
// lectureRouter.get("/my-lectures", authMiddleware, instructorMiddleware, lectureController.getInstructorLecturesController);


export default lectureRouter;

