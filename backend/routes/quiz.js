const router = require("express").Router();
const db = require("../database/db"); // this is our db connection

// table name that store quiz data
const table = 'Quizzes';

/*
    @desc  : create a new quiz given `title, description, user`.
    @input : (str, str, int) title, description, id
    @return: (boolean) true/false
*/
router.post("/", (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const user = req.body.user;
    
    const query = `INSERT INTO ${process.env.DB_SCHEMA}.${table} (title, description, created_by) VALUES (?, ?, ?);`;
    const data = [title, description, user]

    db.query(query, data, (err, result) => {
        const success = true;
        if (err) {
            console.log(err);
            res.status(500).send(!success);
        } else {
            res.status(200).send(!success);
        }
    });
});

/*
    @desc  : get title, description for a quiz.
    @input : (int) quizId
    @return: (list[quiz]) quiz info
*/
router.get("/:quizId", (req, res) => {
    const quizId = req.params.quizId;
    
    const query = `SELECT title, description FROM ${process.env.DB_SCHEMA}.${table} WHERE idQuizzes = ?;`;
    const data = [quizId]

    db.query(query, data, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send(false);
        } else {
            res.status(200).send({quiz: results[0]});
        }
    });
});



module.exports = router;
