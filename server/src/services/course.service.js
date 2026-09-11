import * as courseDao from "../dao/course.dao.js";

export let createCourseService = async ({name, description,level, image}) => {
    console.log(name, description, level, image);

    if(!name || !description || !level || !image){ 
        throw new Error("All fields are required");
    }

    let course = await courseDao.createCourse({
        name,
        description,
        level,
        image   
    });

    return course;


}


export let getAllCoursesService = async () => {

    return await courseDao.findAllCourses();
}

export let getCourseByIdService = async (courseId) => {

    let course = await courseDao.findCourseById(courseId);

    if(!course) {
        throw new Error("Course not found");
    }

    return course;
}

export let updateCourseService = async (courseId, updateData) =>{

    let course = await courseDao.findCourseById(courseId);

    if(!course) {
        throw new Error("Course not found");
    }

    let updatedCourse = await courseDao.updateCourseById(courseId, updateData);

    return updatedCourse;
}

export let deleteCourseService = async (courseId) => {

    let course = await courseDao.findCourseById(courseId);

    if(!course) {
        throw new Error("Course not found");
    }

    await courseDao.deleteCourseById(courseId);

    return {
        message: "Course deleted successfully",
        id: courseId
    }

}





