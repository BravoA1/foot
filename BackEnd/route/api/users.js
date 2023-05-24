const bcrypt = require("bcrypt");
const router = require("express").Router();
const connection = require("../../database/index");

router.post("/", async (req, res) => {
	const user_mail = req.body.user_mail;
	const user_name = req.body.user_name;
	const user_firstname = req.body.user_firstname;
	const user_password = req.body.user_password;
	const passwordCrypt = await bcrypt.hash(user_password, 8);
	const values = [user_name, user_firstname, passwordCrypt, user_mail];

	const sql_verif = `SELECT * FROM user WHERE user_mail = ?`;
	connection.query(sql_verif, [user_mail], (err, result) => {
		if (err) throw err;
		if (result.length > 0) {
			res
				.status(400)
				.send(JSON.stringify("Le mail est déjà en base de données"));
		} else {
			const sql = `INSERT INTO user (user_name, user_firstname, user_password, user_mail) VALUES (?, ?, ?, ?)`;
			connection.query(sql, values, (err, result) => {
				if (err) throw err;
				res.send(JSON.stringify(result));
			});
		}
	});
});

module.exports = router;
