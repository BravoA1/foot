const router = require("express").Router();
const connection = require("../../database/index");

router.get("/fetchPoolsList", async (req, res) => {
  const sql = `SELECT pool.id, pool.team_1_id, pool.team_2_id, pool.team_3_id, 
  pool.team_4_id, team1.name AS name1, team2.name AS name2, 
  team3.name AS name3, team4.name AS name4, pool.score1, pool.score2, 
  pool.score3, pool.score4 
  FROM pool 
  LEFT JOIN team AS team1 ON pool.team_1_id=team1.id 
  LEFT JOIN team AS team2 ON pool.team_2_id=team2.id 
  LEFT JOIN team AS team3 ON pool.team_3_id=team3.id 
  LEFT JOIN team AS team4 ON pool.team_4_id=team4.id 
  WHERE pool.tournament_id=?`;
  const tournament_id = 1;
  connection.query(sql, tournament_id, (error, result) => {
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

router.post("/insertPool", async (req, res) => {
  const team_1_id = req.body.team_1_id;
  const team_2_id = req.body.team_2_id;
  const team_3_id = req.body.team_3_id;
  const team_4_id = req.body.team_4_id;
  const score1 = req.body.score1;
  const score2 = req.body.score2;
  const score3 = req.body.score3;
  const score4 = req.body.score4;
  const tournament_id = 1;
  const values = [
    team_1_id,
    team_2_id,
    team_3_id,
    team_4_id,
    tournament_id,
    score1,
    score2,
    score3,
    score4,
  ];
  const sql = `INSERT INTO pool 
    (team_1_id, team_2_id, team_3_id, team_4_id, tournament_id, score1, score2, score3, score4) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  connection.query(sql, values, (err, result) => {
    if (err) throw err;
  });
});

router.post("/updatePool", async (req, res) => {
  const team_1_id = req.body.team_1_id;
  const team_2_id = req.body.team_2_id;
  const team_3_id = req.body.team_3_id;
  const team_4_id = req.body.team_4_id;
  const tournament_id = 1;
  const pool_id = req.body.id;
  const score1 = req.body.score1;
  const score2 = req.body.score2;
  const score3 = req.body.score3;
  const score4 = req.body.score4;
  const values = [
    team_1_id,
    team_2_id,
    team_3_id,
    team_4_id,
    tournament_id,
    score1,
    score2,
    score3,
    score4,
    pool_id,
  ];
  const sql = `UPDATE pool SET 
    team_1_id=?, team_2_id=?, team_3_id=?, team_4_id=?, tournament_id=?, score1=?, score2=?, score3=?, score4=? 
    WHERE id=?`;
  connection.query(sql, values, (err, result) => {
    if (err) throw err;
  });
});

router.post("/deletePool", async (req, res) => {
  const pool_id = req.body.id;
  const sql = "DELETE FROM pool WHERE id=?";
  console.log("deletePool: ", pool_id);
  connection.query(sql, pool_id, (err, result) => {
    if (err) throw err;
  });
});

module.exports = router;
