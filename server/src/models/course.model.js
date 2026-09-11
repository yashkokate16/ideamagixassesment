import mongoose from "mongoose";

let courseSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    level:{
        type:String,
        default:"beginner",
    },
    description:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaKEwBgY4OjxcSTzf3MmPEAkL9ZghkypsmoCT6Ak2kNdYIByYfzzRP94s&s",
        required:true,
        trim:true,
    }

},{
    timestamps:true,
})

let courseModel = mongoose.model("Course", courseSchema);

export default courseModel;