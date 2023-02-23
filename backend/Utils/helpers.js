module.exports = {
    formatData(quizTakenId, userId, questionAnswers) {
        let finalInput = []
        questionAnswers.map(item => {
            finalInput.push([quizTakenId, item.questionId, userId, item.answer])
        })
        return finalInput
    }
}