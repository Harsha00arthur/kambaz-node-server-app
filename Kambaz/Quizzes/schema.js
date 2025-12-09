import mongoose from "mongoose";

const quizSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    course: { type: String, required: true },

    description: String,
    points: { type: Number, default: 0 },

    availableFromDate: String,
    availableUntilDate: String,
    dueDate: String,

    published: { type: Boolean, default: false },
    questionsCount: { type: Number, default: 0 },

    quizType: {
  type: String,
  enum: ["Graded Quiz", "Practice Quiz", "Graded Survey", "Ungraded Survey"],
  default: "Graded Quiz",
},

    // Optional: last score per student would normally be another collection;
    // here we keep a single field for simplicity
    score: Number,
  },
  { collection: "quizzes" }
);


export default quizSchema;
