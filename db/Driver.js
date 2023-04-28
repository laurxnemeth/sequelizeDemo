const Sequelize = require("sequelize");
const db = require("./db");

const Driver = db.define("driver", {
	name: {
		type: Sequelize.STRING,
	},
	rating: {
		type: Sequelize.ARRAY(Sequelize.INTEGER),
		allowNull: true,
	},
});

// instance method ahead!
// method for detecting if driver is a > 4 star driver
Driver.prototype.isApproved = function () {
	let sum = 0;

	//loop through THIS specific instance's rating array
	for (let i = 0; i < this.rating.length; i++) {
		// adding it up in sum
		sum += this.rating[i];
	}
	//checking if function is right
	console.log(sum / this.rating.length >= 4);

	// return true if average rating is above or at 4
	// return false if average rating is below 4 (3, 2, 1, etc)
	return sum / this.rating.length >= 4;
};

module.exports = Driver;
