import { Cars } from '/db';

export default {
	addCar(car) {
		Cars.insert(car);
	},
	bookCar(_id, data) {
		Cars.update(_id, { $set: data });
	},
	dropOffCars() {
		const cars = Cars.find({
			booked: true,
			bookedUntil: {
				$lte: new Date()
			}
		}).fetch();
		cars.forEach((car) => {
			Cars.update(
				{ _id: car._id },
				{
					$set: {
						booked: false,
						location: car.dropOff
					},
					$unset: {
						bookerId: '',
						dropOff: '',
						bookUntil: ''
					}
				}
			);
		});
	}
};
