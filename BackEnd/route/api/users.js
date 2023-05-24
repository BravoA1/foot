const bcrypt = require("bcrypt");
const router = require("express").Router();
const connection = require("../../database/index");

router.post("/", async (req, res) => {
  const email = req.body.email;
  const username = req.body.name;
  const password = req.body.password;
  const passwordCrypt = await bcrypt.hash(password, 8);
  const values = [username, passwordCrypt, email];

  const sql_verif = `SELECT 1 FROM user WHERE email = ?`;
  connection.query(sql_verif, email, (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      res
        .status(400)
        .send(JSON.stringify("L'e-mail est déjà en base de données"));
    } else {
      const sql = `INSERT INTO user (username, password, email) VALUES (?, ?, ?)`;
      connection.query(sql, values, (err, result) => {
        if (err) throw err;
        res.send(JSON.stringify(result));
      });
    }
  });
});

module.exports = router;
