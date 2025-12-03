import AssignmentModel from "./model.js";

export default function AssignmentsDao() {
  return {
    // GET all assignments for a given course
    findAssignmentsByCourse: async (courseId) => {
      return await AssignmentModel.find({ course: courseId });
    },

    // GET one assignment by id
    findAssignmentById: async (id) => {
      return await AssignmentModel.findById(id);
    },

    // CREATE assignment for a course
    createAssignment: async (courseId, assignment) => {
      const newAssignment = { ...assignment, course: courseId };
      return await AssignmentModel.create(newAssignment);
    },

    // UPDATE an assignment
    updateAssignment: async (id, assignment) => {
      await AssignmentModel.updateOne({ _id: id }, assignment);
      // return the updated document
      return await AssignmentModel.findById(id);
    },

    // DELETE assignment
    deleteAssignment: async (id) => {
      const result = await AssignmentModel.deleteOne({ _id: id });
      return result.deletedCount > 0;
    },
  };
}
