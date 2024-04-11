const db = require("../models");
const Quiz = db.quizzes;
const Solution = db.solutions;
const QuizResult = db.quizResults;
const calculateScore = require('./../utils/calculateScore')

exports.createQuiz = (req, res) => {
    const quizData = req.body; 

    if (!quizData) {
        res.status(400).json('Quiz data is empty'); 
    } else {
        const newQuiz = new Quiz(quizData);
        newQuiz.save()
            .then(savedQuiz => {
                res.status(201).json(savedQuiz); 
            })
            .catch(err => {
                res.status(500).json({ error: err.message }); 
            });
    }
}

exports.findQuizByID = (req, res) => {
    const { id } = req.params;

    Quiz.findById({_id: id})
        .then(foundData => {
            if (!foundData) {
                res.status(404).json("Data for the id not found");
            } else {
                res.json(foundData); 
            }
        })
        .catch(err => {
            res.status(500).json({ error: err.message }); 
        });
}

exports.findAll = (req, res) => {
    Quiz.find()
        .then(data => {
            if (!data || data.length === 0) {
                res.status(404).json("Data not found"); 
            } else {
                res.json(data); 
            }
        })
        .catch(err => {
            res.status(500).json({ error: err.message }); 
        });
}

exports.addSolutions = async (req, res) => {
    try {
        const { quizId, userName, questions } = req.body;

        const quiz = await Quiz.findOne({ quizId: quizId });

        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }

        const score = calculateScore(quiz, { userName, quizId, questions });

        const obtainedScore = new QuizResult({
            userName,
            score,
            quizId: quiz._id
        });

        await obtainedScore.save();

        console.log("Obtained score saved successfully:", obtainedScore);

        res.status(200).json({ message: 'Solution added successfully',  userName,  score });
    } catch (error) {
        console.error("Error adding solution:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
};




exports.getResults = (req, res) => {
   
        QuizResult.find()
        .then((results) =>  {
            res.status(200).json(results);
        })
        .catch((err) => {
            res.status(500).json({ error: err.message }); 
        });
};

