const router = require("express").Router();

const apiUsers = require("./users");
const apiAuth = require("./auth");
const apiPools = require("./pools");
const apiTeams = require("./teams");
const apiBets = require("./bets");
const apiTournaments = require("./tournaments");
const apiResults = require("./results");

router.use("/users", apiUsers);
router.use("/auth", apiAuth);
router.use("/pools", apiPools);
router.use("/teams", apiTeams);
router.use("/bets", apiBets);
router.use("/tournaments", apiTournaments);
router.use("/results", apiResults);

module.exports = router;
