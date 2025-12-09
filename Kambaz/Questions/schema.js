import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    quiz: { type: String, required: true },

    type: {
      type: String,
      enum: ["MCQ", "TRUE_FALSE", "FILL_BLANK"],
      default: "MCQ",
    },

    title: String,
    points: { type: Number, default: 1 },
    question: String, // WYSIWYG HTML

    // MCQ
    choices: [String],
    correctChoice: Number,

    // TRUE/FALSE
    trueFalseAnswer: Boolean,

    // FILL BLANK
    blanks: [String],
  },
  { collection: "questions" }
);

export default questionSchema;
