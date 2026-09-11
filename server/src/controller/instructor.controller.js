import * as instructorService from "../services/instructor.service.js";

export let createInstructorController = async (req, res) =>{
    try{
        let instructor = await instructorService.createInstructorService(req.body);

        return res.status(201).json({
            success:true,
            message:"Instructor created successfully",
            data:instructor
        })
    } catch(error){
        res.status(400).json({
            success:false,
            message:error.message
        })
    }
}


export let getAllInstructorsController = async (req, res) =>{
    try{
        let instructors = await instructorService.getAllInstructorsService();

        return res.status(200).json({
            success:true,
            message:"Instructors fetched successfully",
            data:instructors
        })
    } catch(error){
        res.status(400).json({
            success:false,
            message:error.message
        })
    }
}

export let  getInstructorByIdController = async (req, res) =>{
    try{
        let instructorId = req.params.id;
        let instructor = await instructorService.getInstructorByIdService(instructorId);

        return res.status(200).json({
            success:true,
            message:"Instructor fetched successfully",
            data:instructor
        })
    }  catch(error){
        res.status(400).json({
            success:false,
            message:error.message
        })
    } q
}

export let updateInstructorController = async (req, res) =>{
    try{
        let instructorId = req.params.id;
        await instructorService.updateInstructorService(instructorId, req.body);
        return res.status(200).json({
            success:true,
            message:"Instructor updated successfully",
            data:null
        })
    } catch(error) {
        return res.status(400).json({
            success:false,
            message:error.message
        })
    }
}

export let deleteInstructorController = async (req, res) =>{
    try{
        let instructorId = req.params.id;
        await instructorService.deleteInstuctorService(instructorId);
        return res.status(200).json({
            success:true,
            message:"Instructor deleted successfully",
            data:null
        })
    } catch(error) {
        return res.status(404).json({
            success:false,
            message:error.message
        })
    }
}


