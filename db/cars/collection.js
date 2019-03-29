import {Mongo} from "meteor/mongo";
import CarsSchema from './schema'

const Cars = new Mongo.Collection('cars');

Cars.attachSchema(CarsSchema);

export default Cars;