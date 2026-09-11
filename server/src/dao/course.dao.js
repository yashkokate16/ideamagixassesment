import courseModel from "../models/course.model.js";

export let createCourse = async ({name, level, description, image}) => {
    return await courseModel.create({
        name,
        level,
        description,
        image,
    })
}
export let findAllCourses = async () => {
    return await courseModel.find();
}


export let findCourseById = async (courseId) => {
    return await courseModel.findById(courseId);
}

export let updateCourseById = async (courseId, updateData) => {
    return await courseModel.findByIdAndUpdate(courseId, updateData, {new:true});
}

export let deleteCourseById = async (courseId) => {
    return await courseModel.findByIdAndDelete(courseId);
}



