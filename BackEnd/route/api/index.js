const router = require("express").Router();

const apiUsers = require("./users");
const apiAuth = require("./auth");
const apiPools = require("./pools");
const apiTeams = require("./teams");
const apiBets = require("./bets");

router.use("/users", apiUsers);
router.use("/auth", apiAuth);
router.use("/pools", apiPools);
router.use("/teams", apiTeams);
router.use("/bets", apiBets);

module.exports = router;
