import { Cars } from '/db';

export default {
	addCar(car) {
		Cars.insert(car);
	},
	bookCar(_id, data) {
		Cars.update(_id, { $set: data });
	}
};
