const router = require("express").Router();
const connection = require("../../database/index");

router.post("/fetchBetsList", async (req, res) => {
  const user_id = req.body.user_id;
  const sql = `SELECT bet.pool_id, bet.position1, bet.position2, bet.position3, bet.position4
  FROM bet 
  WHERE bet.user_id=?`;
  connection.query(sql, user_id, (error, result) => {
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

module.exports = router;
