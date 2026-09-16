import app from "../src/app.js";
import connectDb from "../src/config/db.js";

await connectDb();

export default app;