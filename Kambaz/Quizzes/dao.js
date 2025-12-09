import QuizModel from "./model.js";

export default function QuizzesDao() {
  return {
    findQuizzesByCourse: async (courseId) => {
      return await QuizModel.find({ course: courseId });
    },

    findQuizById: async (quizId) => {
      return await QuizModel.findById(quizId);
    },

    createQuizForCourse: async (courseId, quiz) => {
      const newQuiz = { ...quiz, course: courseId };
      return await QuizModel.create(newQuiz);
    },

    updateQuiz: async (quizId, quiz) => {
      return await QuizModel.findByIdAndUpdate(quizId, quiz, { new: true });
    },

    deleteQuiz: async (quizId) => {
      return await QuizModel.findByIdAndDelete(quizId);
    },

    setPublishState: async (quizId, published) => {
      return await QuizModel.findByIdAndUpdate(
        quizId,
        { published },
        { new: true }
      );
    },
  };
}
