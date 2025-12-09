import QuizzesDao from "./dao.js";

export default function QuizzesRoutes(app) {
  const dao = QuizzesDao();

  // GET all quizzes for a course
  const findQuizzesByCourse = async (req, res) => {
    const { cid } = req.params;
    const quizzes = await dao.findQuizzesByCourse(cid);
    res.json(quizzes);
  };
  app.get("/api/courses/:cid/quizzes", findQuizzesByCourse);

  // GET one quiz by id
  const findQuizById = async (req, res) => {
    const { qid } = req.params;
    const quiz = await dao.findQuizById(qid);
    if (!quiz) {
      res.sendStatus(404);
      return;
    }
    res.json(quiz);
  };
  app.get("/api/quizzes/:qid", findQuizById);

  // CREATE quiz for course
  const createQuizForCourse = async (req, res) => {
    const { cid } = req.params;
    const quiz = req.body;
    const newQuiz = await dao.createQuizForCourse(cid, quiz);
    res.json(newQuiz);
  };
  app.post("/api/courses/:cid/quizzes", createQuizForCourse);

  // UPDATE quiz
  const updateQuiz = async (req, res) => {
    const { qid } = req.params;
    const quiz = req.body;
    const updated = await dao.updateQuiz(qid, quiz);
    res.json(updated);
  };
  app.put("/api/quizzes/:qid", updateQuiz);

  // DELETE quiz
  const deleteQuiz = async (req, res) => {
    const { qid } = req.params;
    await dao.deleteQuiz(qid);
    res.sendStatus(200);
  };
  app.delete("/api/quizzes/:qid", deleteQuiz);

  // PUBLISH / UNPUBLISH
  const setPublishState = async (req, res) => {
    const { qid } = req.params;
    const { published } = req.body;
    const updated = await dao.setPublishState(qid, !!published);
    res.json(updated);
  };
  app.put("/api/quizzes/:qid/publish", setPublishState);
}
