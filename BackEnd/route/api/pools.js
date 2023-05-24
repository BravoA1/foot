const router = require("express").Router();
const connection = require("../../database/index");

router.get("/getPoolsList", async (req, res) => {
  const sql = `SELECT team1.name AS name1, team2.name AS name2, team3.name AS name3, team4.name AS name4, pool.score1, pool.score2, pool.score3, pool.score4 
  FROM pool 
  LEFT JOIN team AS team1 ON pool.team_1_id=team1.id 
  LEFT JOIN team AS team2 ON pool.team_2_id=team2.id 
  LEFT JOIN team AS team3 ON pool.team_3_id=team3.id 
  LEFT JOIN team AS team4 ON pool.team_4_id=team4.id `;
  connection.query(sql, (err, result) => {
    if (result) {
      return res.send(result);
    } else {
      res.send(JSON.stringify(null));
    }
  });
});

module.exports = router;
