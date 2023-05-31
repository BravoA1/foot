const router = require("express").Router();
const connection = require("../../database/index");

router.get("/fetchBetsList/:userId", async (req, res) => {
  const user_id = req.params.userId;
  console.log("user id:", user_id);
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

router.post("/insertBet", async (req, res) => {
  const bet1 = req.body.bet1;
  const bet2 = req.body.bet2;
  const bet3 = req.body.bet3;
  const bet4 = req.body.bet4;
  const user_id = req.body.user_id;
  const pool_id = req.body.pool_id;
  const insertStmt = `INSERT INTO bet 
  (user_id, pool_id, position1, position2, position3, position4) 
  VALUES (?, ?, ?, ?, ?, ?)`;
  connection.query(
    insertStmt,
    [user_id, pool_id, bet1, bet2, bet3, bet4],
    (error) => {
      if (error) {
        console.error("Error executing MySQL query:", error);
        res.status(500).json({ error: `Error insertBet: ${error}` });
      } else {
        const selectStmt = `SELECT bet.pool_id, bet.position1, bet.position2, bet.position3, bet.position4
                            FROM bet 
                            WHERE bet.user_id=? AND bet.pool_id=?`;
        connection.query(
          selectStmt,
          [user_id, pool_id],
          (selectError, selectResult) => {
            if (selectError) {
              console.error("Error executing MySQL query:", selectError);
              res
                .status(500)
                .json({ error: `Error insertBet: ${selectError}` });
            } else {
              const insertedData = selectResult[0];
              res.status(201).json(insertedData);
            }
          }
        );
      }
    }
  );
});

router.post("/updateBet", async (req, res) => {
  const bet1 = req.body.bet1;
  const bet2 = req.body.bet2;
  const bet3 = req.body.bet3;
  const bet4 = req.body.bet4;
  const user_id = req.body.user_id;
  const pool_id = req.body.pool_id;
  const updateStmt = `UPDATE bet SET
  position1=?, position2=?, position3=?, position4=? 
  WHERE user_id=? AND pool_id=?`;
  connection.query(
    updateStmt,
    [bet1, bet2, bet3, bet4, user_id, pool_id],
    (error) => {
      if (error) {
        console.error("Error executing MySQL query:", error);
        res.status(500).json({ error: `Error updateBet: ${error}` });
      } else {
        const selectStmt = `SELECT bet.pool_id, bet.position1, bet.position2, bet.position3, bet.position4
                            FROM bet 
                            WHERE bet.user_id=? AND bet.pool_id=?`;
        connection.query(
          selectStmt,
          [user_id, pool_id],
          (selectError, selectResult) => {
            if (selectError) {
              console.error("Error executing MySQL query:", selectError);
              res
                .status(500)
                .json({ error: `Error updateBet: ${selectError}` });
            } else {
              const updatedData = selectResult[0];
              res.status(200).json(updatedData);
            }
          }
        );
      }
    }
  );
});

module.exports = router;
