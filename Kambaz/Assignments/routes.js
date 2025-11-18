export default function AssignmentRoutes(app, dao) {
  // CREATE
  app.post("/api/courses/:cid/assignments", (req, res) => {
    const assignment = dao.createAssignment(req.params.cid, req.body);
    res.json(assignment);
  });

  // READ ALL (BY COURSE)
  app.get("/api/courses/:cid/assignments", (req, res) => {
    res.json(dao.findAssignmentsByCourse(req.params.cid));
  });

  // READ ONE
  app.get("/api/assignments/:aid", (req, res) => {
    res.json(dao.findAssignmentById(req.params.aid));
  });

  // UPDATE
  app.put("/api/assignments/:aid", (req, res) => {
    res.json(dao.updateAssignment(req.params.aid, req.body));
  });

  // DELETE
  app.delete("/api/assignments/:aid", (req, res) => {
    const success = dao.deleteAssignment(req.params.aid);
    res.json({ success });
  });
}
