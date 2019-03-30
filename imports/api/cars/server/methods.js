import { Meteor } from 'meteor/meteor';
import CarsService from './service.js';
import Security from '/imports/api/security';

Meteor.methods({
	'car.add'(data) {
		Security.checkLoggedIn(this.userId);
		data.ownerId = this.userId;
		return CarsService.addCar(data);
	}
});
