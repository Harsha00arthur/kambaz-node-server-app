import model from "./model.js";

export default function EnrollmentsDao() {

  // Returns all courses the user is enrolled in
  async function findCoursesForUser(userId) {
    const enrollments = await model.find({ user: userId }).populate("course");
    return enrollments.map((e) => e.course);
  }

  // ⭐ REQUIRED: Returns all users enrolled in a course
  async function findUsersForCourse(courseId) {
    const enrollments = await model.find({ course: courseId }).populate("user");
    return enrollments.map((e) => e.user);
  }

  // Enroll a user
  async function enrollUserInCourse(userId, courseId) {
    return model.create({
      user: userId,
      course: courseId,
      _id: `${userId}-${courseId}`,
    });
  }

  // Unenroll a user
  async function unenrollUserFromCourse(user, course) {
    return model.deleteOne({ user, course });
  }

  // Unenroll all users from a course
  async function unenrollAllUsersFromCourse(courseId) {
    return model.deleteMany({ course: courseId });
  }

  async function findAllEnrollments() {
    return model.find().populate("user").populate("course");
  }

  return {
    findCoursesForUser,
    findUsersForCourse,
    enrollUserInCourse,
    unenrollUserFromCourse,
    unenrollAllUsersFromCourse,
    findAllEnrollments,
  };
}
