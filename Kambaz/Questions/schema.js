import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: "QuizModel", required: true },

    type: {
      type: String,
      enum: ["MCQ", "TRUE_FALSE", "FILL_BLANK"],
      required: true,
      default: "MCQ",
    },

    title: { type: String, required: true, default: "New Question" },
    points: { type: Number, default: 1 },

    // HTML string from Quill editor
    question: { type: String, default: "" },

    // MCQ
    choices: [{ type: String }],
    correctChoice: { type: Number, default: 0 },

    // TRUE_FALSE
    trueFalseAnswer: { type: Boolean },

    // FILL_BLANK
    blanks: [{ type: String }],
  },
  { collection: "questions", timestamps: true }
);

export default questionSchema;
