const moduleObj = {
  id: "M101",
  name: "Intro to Web Dev",
  description: "Learn basics of React and Node.js",
  course: "CS5610",
};

export default function WorkingWithModules(app) {
  // GET whole module
  const getModule = (req, res) => {
    res.json(moduleObj);
  };

  // GET only module name
  const getModuleName = (req, res) => {
    res.json(moduleObj.name);
  };

  // UPDATE module name
  const setModuleName = (req, res) => {
    const { newName } = req.params;
    moduleObj.name = newName;
    res.json(moduleObj);
  };

  // UPDATE module description
  const setModuleDescription = (req, res) => {
    const { newDescription } = req.params;
    moduleObj.description = newDescription;
    res.json(moduleObj);
  };

  app.get("/lab5/module", getModule);
  app.get("/lab5/module/name", getModuleName);
  app.get("/lab5/module/name/:newName", setModuleName);
  app.get("/lab5/module/description/:newDescription", setModuleDescription);
}
