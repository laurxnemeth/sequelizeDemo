const Sequelize = require("sequelize");
const db = require("./db");

const Ride = db.define("ride", {
	start: {
		type: Sequelize.STRING,
	},
	end: {
		type: Sequelize.STRING,
	},
});

// class method ahead!
// method for returning all locations that match query
Ride.endLocations = function (end) {
	return this.findAll({
		where: {
			end: {
				// comparison to the end value of all Rides
				// NOT specific

				//to do?? potentially: support different casing
				// regex
				// toLowerCase
				// other options????
				[Sequelize.Op.like]: `%${end}%`,
			},
		},
	});
};

module.exports = Ride;
