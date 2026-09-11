import env from "../src/config/env.js"
import userModel from "../src/models/user.model.js";
import connectDb from "../src/config/db.js";


let seedAdmin = async () =>{
    try{
        await connectDb();

        let adminEmail = env.ADMIN_EMAIL;
        let adminPassword = env.ADMIN_PASSWORD;

        let existingAdmin = await userModel.findOne({email:adminEmail});

        if(existingAdmin){
            console.log("Admin user already exists");
            process.exit(0);
        }

        let admin = await userModel.create({
            name:"Admin",
            email:adminEmail,
            password:adminPassword,
            role:"admin",
        });

        console.log("Admin created successfully");
        console.log({
            name:admin.name,
            email:admin.email,
            role:admin.role,
        })
         
        process.exit(0);


    } catch(error){
        console.error("failed to create admin:", error);
        process.exit(1);
    }
}

seedAdmin();

