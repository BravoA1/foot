const router = require("express").Router();
const connection = require("../../database/index");

router.get("/fetchResult/:tournamentId", async (req, res) => {
  const tournament_id = req.params.tournamentId;
  const selectStmt = "SELECT * FROM result WHERE tournament_id=?";
  connection.query(selectStmt, tournament_id, (error, result) => {
    if (error) {
      console.error("Error executing MySQL query:", error);
      res.status(500).send("Error executing MySQL query");
    }
    //console.log("result tournament locked:", result[0]);
    res.status(202).send(result[0] ? result[0] : JSON.stringify(null));
  });
});

router.post("/insertResult", async (req, res) => {
  const tournament_id = req.body.tournament_id;
  const user_id = req.body.user_id;
  const resultTournament = req.body.resultTournament;
  const sql =
    "INSERT INTO result (tournament_id, user_id, resultTournament) VALUES (?, ?, ?)";
  connection.query(
    sql,
    [tournament_id, user_id, resultTournament],
    (error, result) => {
      if (error) {
        console.error("Error executing MySQL query:", error);
        res.status(500).send("Error executing MySQL query");
      }
      res.status(201).send(true);
      // } else {
      //   const select = "SELECT * FROM tournament WHERE id=?";
      //   connection.query(select, result.insertId, (selectErr, selectResult) => {
      //     if (selectErr) {
      //       console.log("Backend error insertTournament:", selectErr);
      //       res
      //         .status(500)
      //         .json({ error: `Error insertTournament: ${selectErr}` });
      //     } else {
      //       const insertedData = selectResult[0];
      //       res.status(201).json(insertedData);
      //     }
      //   });
      // }
    }
  );
});

module.exports = router;
