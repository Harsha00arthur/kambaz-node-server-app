export default function AssignmentRoutes(app, dao) {
  // CREATE
  app.post("/api/courses/:cid/assignments", async (req, res) => {
    const assignment = await dao.createAssignment(req.params.cid, req.body);
    res.json(assignment);
  });

  // READ ALL (BY COURSE)
  app.get("/api/courses/:cid/assignments", async (req, res) => {
    const assignments = await dao.findAssignmentsByCourse(req.params.cid);
    res.json(assignments);
  });

  // READ ONE
  app.get("/api/assignments/:aid", async (req, res) => {
    const assignment = await dao.findAssignmentById(req.params.aid);
    res.json(assignment);
  });

  // UPDATE
  app.put("/api/assignments/:aid", async (req, res) => {
    const updated = await dao.updateAssignment(req.params.aid, req.body);
    res.json(updated);
  });

  // DELETE
  app.delete("/api/assignments/:aid", async (req, res) => {
    const success = await dao.deleteAssignment(req.params.aid);
    res.json({ success });
  });
}
