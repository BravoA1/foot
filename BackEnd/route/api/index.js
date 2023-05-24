const router = require("express").Router();

const apiUsers = require("./users");
const apiAuth = require("./auth");
const apiPools = require("./pools");

router.use("/users", apiUsers);
router.use("/auth", apiAuth);
router.use("/pools", apiPools);

module.exports = router;
