import CoursesDao from "./dao.js";
import EnrollmentsDao from "../Enrollments/dao.js";

export default function CourseRoutes(app, db) {
  const dao = CoursesDao(db);
  const enrollmentsDao = EnrollmentsDao(); 

  // CREATE COURSE + auto-enroll creator
  const createCourse = async (req, res) => {
    const currentUser = req.session["currentUser"];
    const newCourse = await dao.createCourse(req.body);

    if (currentUser) {
      await enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);
    }

    res.json(newCourse);
  };
  app.post("/api/users/current/courses", createCourse);

  // FIND ALL
  const findAllCourses = async (req, res) => {
    res.json(await dao.findAllCourses());
  };

  // FIND COURSES FOR USER
  const findCoursesForEnrolledUser = async (req, res) => {
    let { userId } = req.params;

    if (userId === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) return res.sendStatus(401);
      userId = currentUser._id;
    }

    const courses = await enrollmentsDao.findCoursesForUser(userId);
    res.json(courses);
  };

  // DELETE COURSE (and unenroll everyone)
  const deleteCourse = async (req, res) => {
    const { courseId } = req.params;
    await enrollmentsDao.unenrollAllUsersFromCourse(courseId);
    res.send(await dao.deleteCourse(courseId));
  };

  // UPDATE COURSE
  const updateCourse = async (req, res) => {
    const { courseId } = req.params;
    res.send(await dao.updateCourse(courseId, req.body));
  };

  // ENROLL A USER
  const enrollUserInCourse = async (req, res) => {
    let { uid, cid } = req.params;

    if (uid === "current") {
      const currentUser = req.session["currentUser"];
      uid = currentUser._id;
    }

    res.send(await enrollmentsDao.enrollUserInCourse(uid, cid));
  };

  // UNENROLL A USER
  const unenrollUserFromCourse = async (req, res) => {
    let { uid, cid } = req.params;

    if (uid === "current") {
      const currentUser = req.session["currentUser"];
      uid = currentUser._id;
    }

    res.send(await enrollmentsDao.unenrollUserFromCourse(uid, cid));
  };

  /*  
    ⭐ NEW FEATURE REQUIRED BY ASSIGNMENT  
    Returns ONLY the users enrolled in a specific course.
    Does NOT affect any existing routes.
  */
  const findUsersForCourse = async (req, res) => {
    const { cid } = req.params;
    const users = await enrollmentsDao.findUsersForCourse(cid);
    res.json(users);
  };

  // ⭐ Register new route
  app.get("/api/courses/:cid/users", findUsersForCourse);

  // EXISTING ROUTES (unchanged)
  app.post("/api/users/:uid/courses/:cid", enrollUserInCourse);
  app.delete("/api/users/:uid/courses/:cid", unenrollUserFromCourse);

  app.get("/api/users/:userId/courses", findCoursesForEnrolledUser);
  app.get("/api/courses", findAllCourses);
  app.put("/api/courses/:courseId", updateCourse);
  app.delete("/api/courses/:courseId", deleteCourse);
}
