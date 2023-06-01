const router = require("express").Router();
const connection = require("../../database/index");

router.get("/fetchTeamsList", async (req, res) => {
  const sql = `SELECT * from team`;
  connection.query(sql, (error, result) => {
    if (error) {
      console.error("Error executing MySQL query:", error);
      res.status(500).send("Error executing MySQL query");
    }
    res.send(result ? result : JSON.stringify(null));
  });
});

router.post("/", async (req, res) => {
  const name = req.body.name;
  const sql = "INSERT INTO team (name) VALUES (?)";
  connection.query(sql, name, (error, result) => {
    if (error) {
      console.error("Error executing MySQL query:", error);
      res.status(500).send("Error executing MySQL query");
    }
  });
});

module.exports = router;
