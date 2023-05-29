const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = require("express").Router();
const connection = require("../../database/index");
const { key, keyPub } = require("../../keys");

router.post("/", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const sqlVerify = `SELECT * FROM user WHERE email = ?`;
  connection.query(sqlVerify, email, (err, result) => {
    try {
      if (result.length > 0) {
        const user = result[0];
        const userId = user.id;
        if (bcrypt.compareSync(password, user.password)) {
          const token = jsonwebtoken.sign({}, key, {
            subject: userId.toString(),
            expiresIn: 3600 * 24 * 30 * 6,
            algorithm: "RS256",
            //SameSite: None,
          });
          res.cookie("token", token);
          res.send(user);
        } else {
          res
            .status(400)
            .send(JSON.stringify("Email et/ou mot de passe incorrect"));
        }
      } else {
        res
          .status(400)
          .send(JSON.stringify("Email et/ou mot de passe incorrect"));
      }
    } catch (error) {
      res
        .status(400)
        .send(JSON.stringify("Email et/ou mot de passe incorrect"));
    }
  });
});

router.get("/fetchCurrentUser", async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    try {
      const decodedToken = jsonwebtoken.verify(token, keyPub, {
        algorithms: "RS256",
      });
      const sqlVerify = "SELECT * FROM user WHERE id=?";
      connection.query(sqlVerify, decodedToken.sub, (err, result) => {
        const currentUser = result[0];
        if (currentUser) {
          return res.send(currentUser);
        } else {
          res.send(JSON.stringify(null));
        }
      });
    } catch (error) {
      res.send(JSON.stringify(null));
    }
  } else {
    res.send(JSON.stringify(null));
  }
});

router.delete("/", (req, res) => {
  res.clearCookie("token");
  res.end();
});

module.exports = router;
