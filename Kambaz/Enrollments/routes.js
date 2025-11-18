export default function EnrollmentRoutes(app, dao) {
  // Get all enrollments
  app.get("/api/enrollments", (req, res) => {
    res.json(dao.findAllEnrollments());
  });

  // Enroll a user
  app.post("/api/enrollments", (req, res) => {
    const { user, course } = req.body;
    const updated = dao.enrollUserInCourse(user, course);
    res.json(updated);
  });

  // Unenroll a user
  app.delete("/api/enrollments/:user/:course", (req, res) => {
    const { user, course } = req.params;
    const updated = dao.unenrollUserFromCourse(user, course);
    res.json(updated);
  });
}
