import userModel from "../models/user.model.js"



export let createInstructor = async ({name, email, password}) => {
    return await userModel.create({
        name,
        email,
        password,
        role:"instructor"
    })
}


export let findAllInstructors = async () =>{
    return await userModel.find({role:"instructor"})
    .select("-password")
}


export let findInstructorById = async (instructorId) =>{
    return await userModel.findOne({ _id: instructorId, role:"instructor" })
    .select("-password")
}

export let updateInstructorById = async (instructorId, updateData) =>{
    return await userModel.findOneAndUpdate(
        {_id: instructorId, role:"instructor"},
        updateData,
        {new:true}
    )
    .select("-password")    
}

export let deleteInstructorById = async (instructorId) =>{
    return await userModel.findOneAndDelete({_id: instructorId, role:"instructor"})
    .select("-password")
}