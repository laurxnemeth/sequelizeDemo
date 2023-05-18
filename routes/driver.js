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
		// const data = await Driver.findByPk(id);
		const data = await Driver.findOne({
			where: { id: id },
			include: [Car],
		});
		res.send(data);
	} catch (err) {
		next(err);
	}
});

// {
// name: Adam,
// licence: 9137294
// car: {
//  id: 1,
//
//  }
// }

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
