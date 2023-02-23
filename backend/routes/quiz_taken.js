const router = require("express").Router();
const db = require("../database/db"); // this is our db connection

// table name that store quiz_Taken data
const table = 'Quiz_Taken';

/*
    @desc  : create a new quiz attempt.
    @input : (int, int) quizId, userId
    @return: (id) quiz attempt id
*/
router.post("/", (req, res) => {
    const quizId = req.body.quizId;
    const userId = req.body.userId;

    const now = new Date()
    
    const query = `INSERT INTO ${process.env.DB_SCHEMA}.${table} (quiz_id, user_id, start_time) VALUES (?, ?, ?);`;
    const data = [quizId, userId, now]

    db.query(query, data, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send(false);
        } else {
            res.status(200).send({quizTakenId: results.insertId});
        }
    });
});

/*
    @desc  : update endTime of quiz attempt.
    @input : (int) quizTakenId
    @return: (boolean) true/false
*/
router.put("/endTime", (req, res) => {

    const now = new Date();
    const quizTakenId = req.body.quizTakenId;
    
    const query = `UPDATE ${process.env.DB_SCHEMA}.${table} SET end_time = ? WHERE (idQuiz_Taken = ?);`
    const data = [now, quizTakenId]

    db.query(query, data, (err, results) => {
        const success = true;
        if (err) {
            console.log(err);
            res.status(500).send(!success);
        } else {
            res.status(200).send(success);
        }
    });

})

module.exports = router;
