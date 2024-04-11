module.exports = app => {
    const quizzes = require("../controllers/quizzes.controller.js");
  
    const router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/quiz", quizzes.createQuiz);
  
    // Retrieve all Tutorials
    // router.get("result", quizzes.findAll);
  
    // Retrieve all published Tutorials
    // router.get("/published", tutorials.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/quiz/:id", quizzes.findQuizByID);

    router.get("/quizzes", quizzes.findAll);

  
    // Update a Tutorial with id
    // router.put("/:id", tutorials.update);
  
    // Delete a Tutorial with id
    router.post("/submit", quizzes.addSolutions);
    router.get("/results", quizzes.getResults);

    // Delete all Tutorials
    // router.delete("/", tutorials.deleteAll);
  
    app.use('/', router);
  };