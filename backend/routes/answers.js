const router = require("express").Router();
const db = require("../database/db"); // this is our db connection
const { formatData } = require("../Utils/helpers");

// table name that store quiz_Taken data
const table = 'Answers';

/*
    @desc  : log answers for a quiz attempt.
    @input : (int, list[int: str], int) quizTakenId, questionAnswers, userId
    @return: (list[questions]) true/false
*/
router.post("/", (req, res) => {
    const questionAnswers = req.body.questionAnswers;
    const quizTakenId = req.body.quizTakenId;
    const userId = req.body.userId;

    const query = `INSERT INTO ${process.env.DB_SCHEMA}.${table} (quiz_taken_id, question_id, user_id, answer) VALUES ?`;
    const data = formatData(quizTakenId, userId, questionAnswers)

    db.query(query, [data], (err, results) => {
        const success = true
        if (err) {
            console.log(err);
            res.status(500).send(!success);
        } else {
            res.status(200).send(success);
        }
    });
});

module.exports = router;
