import QuestionModel from "./model.js";
import QuizModel from "../Quizzes/model.js";

// Recompute quiz stats from DB (source of truth)
async function syncQuizStats(quizId) {
  const quizObjId = QuizModel.castObjectId
    ? QuizModel.castObjectId(quizId)
    : quizId;

  const agg = await QuestionModel.aggregate([
    { $match: { quiz: QuizModel.db?.base?.Types?.ObjectId ? new QuizModel.db.base.Types.ObjectId(quizId) : quizObjId } },
    {
      $group: {
        _id: "$quiz",
        totalPoints: { $sum: "$points" },
        count: { $sum: 1 },
      },
    },
  ]);

  const totalPoints = agg?.[0]?.totalPoints ?? 0;
  const count = agg?.[0]?.count ?? 0;

  const updatedQuiz = await QuizModel.findByIdAndUpdate(
    quizId,
    { points: totalPoints, questionsCount: count },
    { new: true }
  );

  return updatedQuiz;
}

export default function QuestionsDao() {
  return {
    findQuestionsByQuiz: async (quizId) => {
      return await QuestionModel.find({ quiz: quizId });
    },

    createQuestionForQuiz: async (quizId, question) => {
      const newQuestion = await QuestionModel.create({
        ...question,
        quiz: quizId,
      });

      const updatedQuiz = await syncQuizStats(quizId);
      return { question: newQuestion, updatedQuiz };
    },

    updateQuestion: async (questionId, question) => {
      const updated = await QuestionModel.findByIdAndUpdate(
        questionId,
        question,
        { new: true }
      );

      if (!updated) return null;

      const updatedQuiz = await syncQuizStats(updated.quiz);
      return { question: updated, updatedQuiz };
    },

    deleteQuestion: async (questionId) => {
      const deleted = await QuestionModel.findByIdAndDelete(questionId);
      if (!deleted) return null;

      const updatedQuiz = await syncQuizStats(deleted.quiz);
      return { deleted, updatedQuiz };
    },
  };
}
