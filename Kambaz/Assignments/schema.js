import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    course: { type: String, required: true }, // courseId as string
    description: String,
    points: Number,
    dueDate: String,
    availableFromDate: String,
    availableUntilDate: String,
  },
  { collection: "assignments" }
);

export default assignmentSchema;
