const { db, Driver, Car, Passenger, Ride } = require("./db");

async function syncDB() {
	try {
		await db.sync({ force: true });

		const firstDriver = await Driver.create(
			{
				name: "Leorio",
				rating: [4, 5, 2, 4, 5, 3],
				//added car info
				car: {
					make: "Subaru",
					model: "Forrester",
					license_plate: "123awe",
				},
			},
			// now... it's included!
			{ include: [Car] }
		);

		const secondDriver = await Driver.create(
			{
				name: "Hisoka",
				rating: [5, 5, 5, 5, 5],
				car: {
					make: "Ford",
					model: "Focus",
					license_plate: "999ooo",
				},
			},
			{ include: [Car] }
		);

		await Driver.create(
			{
				name: "Melody",
				rating: [1, 1, 1],
				car: {
					make: "Toyota",
					model: "Tacoma",
					license_plate: "876lak",
				},
			},
			{ include: [Car] }
		);

		const firstPassenger = await Passenger.create({
			name: "Kurapika",
		});

		const secondPassenger = await Passenger.create({
			name: "Gon",
		});

		await Passenger.create({
			name: "Killua",
		});

		await Ride.create({
			start: "1292 Rodeo Parkway, Washington DC",
			end: "100 Lucky Road, Boston",
			passengerId: secondPassenger.id,
			driverId: firstDriver.id,
		});

		await Ride.create({
			start: "99 Maple Way, Vermont",
			end: "4 Rocky Road, Vermont",
			passengerId: firstPassenger.id,
			driverId: secondDriver.id,
		});
	} catch (err) {
		console.error(err);
	}
}
syncDB();
