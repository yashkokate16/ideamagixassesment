import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/auth.route.js";
import instructorRouter from "./routes/instructor.route.js";
import courseRouter from "./routes/course.route.js";
import lectureRouter from "./routes/lecture.route.js";
import env from "./config/env.js";

let app = express();


app.use(
    cors({
        origin: "https://ideamagixassesment-h8po.vercel.app",
        credentials: true,
    })
);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());





app.get("/", (req, res) =>{
    res.status(200).json({
        success:true,
        message:"CodeRoom Server is running"
    })
})


app.use("/api/auth", authRouter);

app.use("/api/admin/instructors", instructorRouter);

app.use("/api/admin/courses", courseRouter);

app.use("/api/lectures", lectureRouter);


export default app;