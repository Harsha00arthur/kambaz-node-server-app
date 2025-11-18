import { v4 as uuidv4 } from "uuid";

export default function ModulesDao(db) {
  const modules = db.modules; // Keep reference to actual array

  function updateModule(moduleId, moduleUpdates) {
    const module = modules.find((m) => m._id === moduleId);
    if (module) {
      Object.assign(module, moduleUpdates);
    }
    return module;
  }

  function createModule(module) {
    const newModule = {
      ...module,
      _id: uuidv4(),
      lessons: module.lessons || []
    };
    modules.push(newModule);       // IMPORTANT: mutate db.modules
    return newModule;
  }

  function deleteModule(moduleId) {
    const index = modules.findIndex((m) => m._id === moduleId);
    if (index !== -1) {
      modules.splice(index, 1);   // remove from array
    }
    return { status: "ok" };
  }

  function findModulesForCourse(courseId) {
    return modules.filter((module) => module.course === courseId);
  }

  return {
    findModulesForCourse,
    createModule,     // IMPORTANT export
    deleteModule,     // IMPORTANT export
    updateModule,     // IMPORTANT export
  };
}
