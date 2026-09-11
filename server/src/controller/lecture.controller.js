import * as lectureService from '../services/lecture.service.js';

export let createLectureController = async (req, res) => {
    
    try{
        let lecture = await lectureService.createLectureService(req.body);
        return res.status(201).json({
            success:true,
            message:"Lecture created successfully",
            data:lecture
        })
    } catch(error){
        res.status(400).json({
            success:false,
            message:error.message
        })
    }
}


export let getLecturesByCourseController = async (req, res) => {                            // all lectures 

    try{
        let lectures = await lectureService.getLectureByCourseService(req.params.courseId);
        return res.status(200).json({
            success:true,
            message:"Lectures retrieved successfully",
            data:lectures
        })
    } catch(error){
        res.status(400).json({
            success:false,
            message:error.message
        })  
    }
}

export let getLectureByIdController = async (req, res) => {

    try{
        let lecture = await lectureService.getLectureByIdService(req.params.lectureId);

        return res.status(200).json({
            success:true,
            message:"Lecture retrieved successfully",
            data:lecture
        })
    } catch(error){
        res.status(400).json({
            success:false,
            message:error.message
        })  
    }
}



export let getInstructorLecturesController  = async (req, res) => {

    try{

        let lectures = await lectureService.getInstructorLecturesService(req.user._id);
        return res.status(200).json({
            success:true,
            message:"Lectures retrieved successfully",
            data:lectures
        })
    } catch(error){
        res.status(400).json({
            success:false,
            message:error.message
        })      
        
    }
}

export const deleteLectureController = async (req, res) => {
    try {
        const id = req.params.lectureId;

        console.log("Deleting lecture with ID:", id);

        const result =
            await lectureService.deleteLectureService(id);

        return res.status(200).json({
            success: true,
            message: result.message,
            data: null
        });

    } catch (error) {
        return res.status(404).json({
            success: false,
            message: error.message
        });
    }
};
