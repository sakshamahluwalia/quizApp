const router = require("express").Router();
const db = require("../database/db"); // this is our db connection

// table name that store user data
const table = 'Users';

/*
    @desc  : handles the creation of a user.
    @input : (str, str) username, password
    @return: (id) new user id
*/
router.post('/', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const query = `INSERT INTO ${process.env.DB_SCHEMA}.${table} (username, password) VALUES (?, ?);`
  const data = [username, password]

  db.query(query, data, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send(false);
    } else {
      res.status(200).send({userId: results.insertId});
    }
  });
});




module.exports = router;
