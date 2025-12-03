export default function EnrollmentRoutes(app, dao) {

  // Get ALL enrollment documents
  app.get("/api/enrollments", async (req, res) => {
    try {
      const enrollments = await dao.findAllEnrollments();
      res.json(enrollments);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

  // Enroll a user in a course
  app.post("/api/enrollments", async (req, res) => {
    try {
      const { user, course } = req.body;
      const status = await dao.enrollUserInCourse(user, course);
      res.json(status);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

  // Unenroll a user from a course
  app.delete("/api/enrollments/:user/:course", async (req, res) => {
    try {
      const { user, course } = req.params;
      const status = await dao.unenrollUserFromCourse(user, course);
      res.json(status);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });
}
