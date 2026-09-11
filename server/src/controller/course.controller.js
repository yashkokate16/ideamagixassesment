import * as courseService from "../services/course.service.js";

export let createCourseController = async (req, res) =>{
    try{
        let course = await courseService.createCourseService(req.body);

        return res.status(201).json({
            success:true,
            message:"Course created successfully",
            data:course
        })
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:error.message
        })
    }
}

export let getAllCoursesController = async (req, res) => {

    try{

        let courses = await courseService.getAllCoursesService();

        return res.status(200).json({
            success:true,
            message:"Courses fetched successfully",
            data:courses
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

export let getCourseByIdController = async (req, res) =>{
    try{
        let courseId = req.params.id;
        let course = await courseService.getCourseByIdService(courseId);

        return res.status(200).json({
            success:true,
            message:"Course fetched successfully",
            data:course
        })
    } catch (error) {
        return res.status(404).json({
            success:false,
            message:error.message
        })
    }
}

export let updateCourseController = async (req, res) => {
    
    try{

        let courseId = req.params.id;
        let course = await courseService.updateCourseService(courseId, req.body);

        return res.status(200).json({
            success:true,
            message:"Course updated successfully",
            data:course
        })
    } catch(error) {
        return res.status(400).json({
            success:false,
            message:error.message
        })
    }
}

export let deleteCourseController = async (req, res) => {
    try{
        let courseId = req.params.id;
        let result = await courseService.deleteCourseService(courseId);

        return res.status(200).json({
            success:true,
            message:"Course deleted successfully",
            data:result
        })
    } catch(error) {
        return res.status(400).json({
            success:false,
            message:error.message
        })
    }
}
