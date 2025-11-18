import { v4 as uuidv4 } from "uuid";

export default function EnrollmentsDao(db) {
  function findAllEnrollments() {
    return db.enrollments;
  }

  function enrollUserInCourse(userId, courseId) {
    const exists = db.enrollments.some(
      (e) => e.user === userId && e.course === courseId
    );

    if (!exists) {
      db.enrollments.push({
        _id: uuidv4(),
        user: userId,
        course: courseId,
      });
    }

    return db.enrollments;
  }

  function unenrollUserFromCourse(userId, courseId) {
    db.enrollments = db.enrollments.filter(
      (e) => !(e.user === userId && e.course === courseId)
    );

    return db.enrollments;
  }

  return {
    findAllEnrollments,
    enrollUserInCourse,
    unenrollUserFromCourse,
  };
}
