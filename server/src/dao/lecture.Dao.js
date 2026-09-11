import lectureModel from '../models/lecture.model.js';

export let createLecture = async ({ course, instructor, date }) => {
    return await lectureModel.create({
        course,
        instructor,
        date,
    });
};

export let findLectureByInstructor = async (instructor) => {
    return await lectureModel
        .find({ instructor })
        .populate("course", "name level");
};

export let findLectureById = async (lectureId) => {
    return await lectureModel
        .findById(lectureId)
        .populate("course", "name level")
        .populate("instructor", "name email");
};

export let findLectureByInstructorAndDate = async (instructor, date) => {
    return await lectureModel.findOne({
        instructor,
        date
    });
};

export let findLectureByCourse = async (courseId) => {
    return await lectureModel
        .find({ course: courseId })
        .populate("course", "name level")
        .populate("instructor", "name email");
};

export let deleteLectureById = async (lectureId) => {
    return await lectureModel.findByIdAndDelete(lectureId);
};