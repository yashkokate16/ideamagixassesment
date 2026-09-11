import mongoose from "mongoose";

let lectureSchema = new mongoose.Schema({
    course:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course",
        required:true,
    },
    instructor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    date:{
       type:Date,
         required:true,
    }
},{
    timestamps:true,
})


let lectureModel = mongoose.model("Lecture", lectureSchema);  

export default lectureModel;