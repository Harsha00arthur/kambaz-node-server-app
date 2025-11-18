import { v4 as uuidv4 } from "uuid";

export default function AssignmentsDao(db) {
  return {
    findAssignmentsByCourse: (courseId) =>
      db.assignments.filter((a) => a.course === courseId),

    findAssignmentById: (id) =>
      db.assignments.find((a) => a._id === id),

    createAssignment: (courseId, assignment) => {
      const newAssignment = {
        ...assignment,
        _id: uuidv4(),
        course: courseId,
      };
      db.assignments.push(newAssignment);
      return newAssignment;
    },

    updateAssignment: (id, assignment) => {
      db.assignments = db.assignments.map((a) =>
        a._id === id ? { ...a, ...assignment } : a
      );
      return db.assignments.find((a) => a._id === id);
    },

    deleteAssignment: (id) => {
      const before = db.assignments.length;
      db.assignments = db.assignments.filter((a) => a._id !== id);
      return db.assignments.length < before;
    },
  };
}
