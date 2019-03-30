import { Mongo } from 'meteor/mongo';
import CarsSchema from './schema';

const Cars = new Mongo.Collection('cars');

Cars.attachSchema(CarsSchema);

if (Meteor.isServer) {
	Cars._ensureIndex({ 'location.coordinates': '2dsphere' });
}

export default Cars;
