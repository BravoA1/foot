const router = require("express").Router();
const connection = require("../../database/index");

router.get("/fetchTournamentsList", async (req, res) => {
  const sql = `SELECT * from tournament`;
  connection.query(sql, (error, result) => {
    if (error) {
      console.error("Error executing MySQL query:", error);
      res.status(500).send("Error executing MySQL query");
    }
    if (result) {
      return res.send(result);
    } else {
      res.send(JSON.stringify(null));
    }
  });
});

router.post("/insertTournament", async (req, res) => {
  const name = req.body.name;
  const sql = "INSERT INTO tournament (dateYear) VALUES (?)";
  connection.query(sql, name, (error, result) => {
    if (error) {
      console.error("Error executing MySQL query:", error);
      res.status(500).send("Error executing MySQL query");
    }
  });
});

module.exports = router;
