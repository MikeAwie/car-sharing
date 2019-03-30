import { Cars } from '/db';

export default {
	addCar(car) {
		Cars.insert(car);
	}
};
