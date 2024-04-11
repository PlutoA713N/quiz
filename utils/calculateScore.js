function calculateScore(quizDocument, userSolution) {
    let score = 0;

    quizDocument.questions.forEach((quizQuestion, index) => {
        const correctAnswers = quizQuestion.answers.filter(answer => answer.isChecked);
        const userAnswers = userSolution.questions[index].answers;

        const isCorrect = correctAnswers.every(correctAnswer =>
            userAnswers.some(userAnswer => userAnswer.optionName === correctAnswer.optionName && userAnswer.isChecked)
        );

        if (isCorrect) {
            score++;
        }
    });

    return score;
}

module.exports = calculateScore;
