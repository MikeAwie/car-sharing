import { Cars } from '/db';
import { Meteor } from 'meteor/meteor';

Meteor.publish('cars', function() {
	return Cars.find();
});
