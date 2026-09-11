import * as instructorDao from "../dao/instructor.dao.js";
import * as userDao from "../dao/user.Dao.js";


export let createInstructorService = async ({
    name, email, password
}) => {
    if(!name || !email || !password) {
        throw new Error("All fields are required");
    }

    let isUserExist = await userDao.findUserByEmail(email);
    if(isUserExist) {
        throw new Error("User already exists");
    }
    let instructor = await instructorDao.createInstructor({
        name, email, password
    });

    return {
        id: instructor._id,
        name: instructor.name,
        email: instructor.email,
        role: instructor.role,
    }   
}

export let getAllInstructorsService = async () => {
    let instructors = await instructorDao.findAllInstructors();
    
    if(!instructors || instructors.length === 0) {
        throw new Error("No instructors found");
    }

    return instructors;
}


export let getInstructorByIdService = async (instructorId) => {
    let instructor = await instructorDao.findInstructorById(instructorId);

    if(!instructor) {
        throw new Error("Instructor not found");
    }

    return instructor;
}

export let updateInstructorService = async (instructorId, updateData) => {
    
    let instructor = await instructorDao.findInstructorById(instructorId);

    if(!instructor) {
        throw new Error("Instructor not found");
    }

    if(updateData.email) {
        let isUserExist = await userDao.findUserByEmail(updateData.email);
        if(isUserExist && isUserExist._id.toString() !== instructorId) {
            throw new Error("Email already in use");
        }
    }

    delete updateData.role;

    let updatedInstructor = await instructorDao.updateInstructorById(instructorId, updateData);

    return updatedInstructor;
}


export let deleteInstuctorService = async (instructorId) =>{

    let instructor = await instructorDao.findInstructorById(instructorId);

    if(!instructor) {
        throw new Error("Instructor not found");
    }

    await instructorDao.deleteInstructorById(instructorId);

    return {
        message: "Instructor deleted successfully"
    }
}


