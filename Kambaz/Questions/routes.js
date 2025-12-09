import QuestionsDao from "./dao.js";

export default function QuestionRoutes(app) {
  const dao = QuestionsDao();

  app.get("/api/quizzes/:qid/questions", async (req, res) => {
    const data = await dao.findQuestionsByQuiz(req.params.qid);
    res.json(data);
  });

  app.post("/api/quizzes/:qid/questions", async (req, res) => {
    const q = await dao.createQuestion(req.params.qid, req.body);
    res.json(q);
  });

  app.put("/api/questions/:qid", async (req, res) => {
    const q = await dao.updateQuestion(req.params.qid, req.body);
    res.json(q);
  });

  app.delete("/api/questions/:qid", async (req, res) => {
    await dao.deleteQuestion(req.params.qid);
    res.sendStatus(200);
  });
}
