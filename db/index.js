const db = require("./db");
const Passenger = require("./passenger");
const Driver = require("./driver");
const Car = require("./car");
const Ride = require("./ride");

// car - driver: one to one
Car.belongsTo(Driver);
Driver.hasOne(Car);

// ride - driver: many to one
Ride.belongsTo(Driver);
Driver.hasMany(Ride);

// ride - passenger: many to one
Ride.belongsTo(Passenger);
Passenger.hasMany(Ride);

// car - ride: test many to many
// both *need* the same through table for it to work as intended
Car.belongsToMany(Ride, { through: "car_ride" });
Ride.belongsToMany(Car, { through: "car_ride" });

module.exports = {
	db,
	Passenger,
	Driver,
	Car,
	Ride,
};
