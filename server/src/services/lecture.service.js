import * as lectureDao from '../dao/lecture.Dao.js';
import * as courseDao from '../dao/course.dao.js';
import * as userDao from "../dao/user.Dao.js";


export let createLectureService = async ({course, instructor, date}) => {
    if(!course || !instructor || !date) {
        throw new Error("All fields are required");
    }

    let isExistCourse = await courseDao.findCourseById(course);

    if(!isExistCourse) {
        throw new Error("Course not found");
    }

    let isExistInstructor = await userDao.findUserById(instructor);

    if(!isExistInstructor) {
        throw new Error("Instructor not found");
    }

    if(isExistInstructor.role !== "instructor") {
        throw new Error("User is not an instructor");
    }

    let existingLecture = await lectureDao.findLectureByInstructorAndDate(instructor, date);

    if(existingLecture) {   
        throw new Error("Lecture already exists for this course and instructor");
    }

    let lecture = await lectureDao.createLecture({
        course,
        instructor,
        date
    });

    return lecture;

}

export let getLectureByCourseService = async (courseId) => {
    
    console.log("COURSE ID RECEIVED:", courseId);
    
let isExistCourse = await courseDao.findCourseById(courseId);

    if(!isExistCourse) {
        throw new Error("Course not found");
    }

    let courses =  await lectureDao.findLectureByCourse(courseId);

    return courses;

}

export let getLectureByIdService = async (lectureId) => {
    
    let lecture = await lectureDao.findLectureById(lectureId);

    if(!lecture) {
        throw new Error("Lecture not found");
    }
    return lecture;
}

export let getInstructorLecturesService  = async (instructorId) => {

    return await lectureDao.findLectureByInstructor(instructorId);


}

export let deleteLectureService = async (lectureId) => {


    let lecture = await lectureDao.findLectureById(lectureId);

    if(!lecture) {
        throw new Error("Lecture not found");
    }

    await lectureDao.deleteLectureById(lectureId);

    return {
        message: "Lecture deleted successfully",
        id: lectureId
    }
}

