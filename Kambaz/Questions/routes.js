import QuestionsDao from "./dao.js";

export default function QuestionsRoutes(app) {
  const dao = QuestionsDao();

  // GET all questions for a quiz
  const findQuestionsByQuiz = async (req, res) => {
    const { qid } = req.params;
    const questions = await dao.findQuestionsByQuiz(qid);
    res.json(questions);
  };
  app.get("/api/quizzes/:qid/questions", findQuestionsByQuiz);

  // CREATE question for quiz
  const createQuestionForQuiz = async (req, res) => {
    const { qid } = req.params;
    const payload = req.body;

    const result = await dao.createQuestionForQuiz(qid, payload);

    // return the created question (frontend expects a Question object)
    res.json(result.question);
  };
  app.post("/api/quizzes/:qid/questions", createQuestionForQuiz);

  // UPDATE question
  const updateQuestion = async (req, res) => {
    const { questionId } = req.params;
    const payload = req.body;

    const result = await dao.updateQuestion(questionId, payload);
    if (!result) {
      res.sendStatus(404);
      return;
    }
    res.json(result.question);
  };
  app.put("/api/questions/:questionId", updateQuestion);

  // DELETE question
  const deleteQuestion = async (req, res) => {
    const { questionId } = req.params;

    const result = await dao.deleteQuestion(questionId);
    if (!result) {
      res.sendStatus(404);
      return;
    }
    res.sendStatus(200);
  };
  app.delete("/api/questions/:questionId", deleteQuestion);
}
