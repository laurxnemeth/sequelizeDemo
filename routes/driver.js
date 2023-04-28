const express = require("express");
// added car for include
const { Driver, Car } = require("../db");

const driverRouter = express.Router();

driverRouter.get("/", async (req, res, next) => {
	try {
		const data = await Driver.findAll({
			//added include for all drivers route
			include: [Car],
		});
		res.send(data);
	} catch (err) {
		next(err);
	}
});

driverRouter.get("/:id", async (req, res, next) => {
	const { id } = req.params;
	try {
		const data = await Driver.findByPk(id);
		res.send(data);
	} catch (err) {
		next(err);
	}
});

driverRouter.get("/:id/approved", async (req, res, next) => {
	const { id } = req.params;
	try {
		const driver = await Driver.findByPk(id);

		if (driver.isApproved()) {
			res.send(true);
		} else {
			res.status(401);
		}
	} catch (err) {
		next(err);
	}
});

module.exports = driverRouter;
