const router = require("express").Router();
const db = require("../database/db"); // this is our db connection

// table name that store question data
const table = 'Questions';

/*
    @desc  : get all questions for a quiz.
    @input : (int) quizId
    @return: (list[questions]) quiz questions
*/
router.get("/:quizId", (req, res) => {
    const quizId = req.params.quizId;
    
    const query = `SELECT idQuestions, question FROM ${process.env.DB_SCHEMA}.${table} WHERE quiz_id = ?;`;
    const data = [quizId]

    db.query(query, data, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send(false);
        } else {
            res.status(200).send({questions: results});
        }
    });
});

module.exports = router;
