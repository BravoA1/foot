const router = require("express").Router();
const connection = require("../../database/index");

router.get("/fetchTournamentsList", async (req, res) => {
  const sql = `SELECT * from tournament`;
  connection.query(sql, (error, result) => {
    if (error) {
      console.error("Error executing MySQL query:", error);
      res.status(500).send("Error executing MySQL query");
    }
    res.status(200).send(result ? result : JSON.stringify(null));
  });
});

router.get("/tournamentLocked/:tournamentId", async (req, res) => {
  const tournament_id = req.params.tournamentId;
  const selectStmt = "SELECT locked FROM tournament WHERE id=?";
  connection.query(selectStmt, tournament_id, (error, result) => {
    if (error) {
      console.error("Error executing MySQL query:", error);
      res.status(500).send("Error executing MySQL query");
    }
    //console.log("result tournament locked:", result[0]);
    res.status(202).send(result[0] ? result[0] : JSON.stringify(null));
  });
});

router.put(
  "/updateTournamentLocked/:tournamentId-:tournamentLocked",
  async (req, res) => {
    const id = req.params.tournamentId;
    const locked = req.params.tournamentLocked;
    console.log("id=", id, "locked:", locked);
    const updateStmt = "UPDATE tournament SET locked=? WHERE id=?";
    connection.query(updateStmt, [locked, id], (error, result) => {
      if (error) {
        console.error("Error executing MySQL query:", error);
        res.status(500).send("Error executing MySQL query");
      } else {
        res.status(200).json(true);
      }
    });
  }
);

router.post("/insertTournament", async (req, res) => {
  const dateYear = req.body.dateYear;
  const sql = "INSERT INTO tournament (dateYear) VALUES (?)";
  connection.query(sql, dateYear, (error, result) => {
    if (error) {
      console.error("Error executing MySQL query:", error);
      res.status(500).send("Error executing MySQL query");
    } else {
      const select = "SELECT * FROM tournament WHERE id=?";
      connection.query(select, result.insertId, (selectErr, selectResult) => {
        if (selectErr) {
          console.log("Backend error insertTournament:", selectErr);
          res
            .status(500)
            .json({ error: `Error insertTournament: ${selectErr}` });
        } else {
          const insertedData = selectResult[0];
          res.status(201).json(insertedData);
        }
      });
    }
  });
});

router.post("/updateTournament", async (req, res) => {
  const dateYear = req.body.dateYear;
  const id = req.body.id;
  const updateStmt = "UPDATE tournament SET dateYear=? WHERE id=?";
  connection.query(updateStmt, [dateYear, id], (error, result) => {
    if (error) {
      console.error("Error executing MySQL query:", error);
      res.status(500).send("Error executing MySQL query");
    } else {
      const select = "SELECT * FROM tournament WHERE id=?";
      connection.query(select, id, (selectErr, selectResult) => {
        if (selectErr) {
          console.log("Backend error updateTournament:", selectErr);
          res
            .status(500)
            .json({ error: `Error updateTournament: ${selectErr}` });
        } else {
          const insertedData = selectResult[0];
          res.status(201).json(insertedData);
        }
      });
    }
  });
});

router.get("/tournamentClosed/:tournamentId", async (req, res) => {
  const tournament_id = req.params.tournamentId;
  const selectStmt = "SELECT closed FROM tournament WHERE id=?";
  connection.query(selectStmt, tournament_id, (error, result) => {
    if (error) {
      console.error("Error executing MySQL query:", error);
      res.status(500).send("Error executing MySQL query");
    }
    //console.log("result tournament locked:", result[0]);
    res.status(202).send(result[0] ? result[0] : JSON.stringify(null));
  });
});

router.put("/setTournamentClosed/:tournamentId", async (req, res) => {
  const id = req.params.tournamentId;
  const updateStmt = "UPDATE tournament SET closed='1', locked='1' WHERE id=?";
  connection.query(updateStmt, [id], (error, result) => {
    if (error) {
      console.error("Error executing MySQL query:", error);
      res.status(500).send("Error executing MySQL query");
    }
    res.status(204);
  });
});

module.exports = router;
