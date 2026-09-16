import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/auth.route.js";
import instructorRouter from "./routes/instructor.route.js";
import courseRouter from "./routes/course.route.js";
import lectureRouter from "./routes/lecture.route.js";
import connectDb from "./config/db.js";

let app = express();

await connectDb();

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