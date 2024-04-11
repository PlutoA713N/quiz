const dbConfig = require('../config/db.config.js')

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.quizzes = require("./Quiz.model.js")(mongoose);
db.solutions = require("./Solutions.model.js")(mongoose);
db.quizResults = require("./QuizResults.model.js")(mongoose)

module.exports = db;