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

const allowedOrigins = [
  "http://localhost:5173",
  "https://ideamagixassesment-h8po.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
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


app.use("/auth", authRouter);
app.use("/admin/instructors", instructorRouter);
app.use("/admin/courses", courseRouter);
app.use("/lectures", lectureRouter);


export default app;