import app from "./src/app.js";
import connectDb from "./src/config/db.js";
import env from "./src/config/env.js";



const startServer = async () => {
    try{
        await connectDb();
        const PORT = env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start the server:", error);
    }
}


startServer()