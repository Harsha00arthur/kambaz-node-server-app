import QuestionModel from "./model.js";

export default function QuestionsDao() {
  return {
    findQuestionsByQuiz: (quizId) =>
      QuestionModel.find({ quiz: quizId }),

    findQuestionById: (qid) =>
      QuestionModel.findById(qid),

    createQuestion: (quizId, question) =>
      QuestionModel.create({ ...question, quiz: quizId }),

    updateQuestion: (qid, question) =>
      QuestionModel.findByIdAndUpdate(qid, question, { new: true }),

    deleteQuestion: (qid) =>
      QuestionModel.findByIdAndDelete(qid),
  };
}
