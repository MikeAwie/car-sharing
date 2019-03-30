import SimpleSchema from 'simpl-schema';

const GeoJson = new SimpleSchema({
	type: {
		type: String,
		defaultValue: 'Point'
	},
	coordinates: {
		type: Array,
		minCount: 2,
		maxCount: 2
	},
	'coordinates.$': {
		type: Number,
		minCount: 2,
		maxCount: 2
	}
});

export default new SimpleSchema({
	make: String,
	model: String,
	year: Number,
	ownerId: String,
	fueled: Boolean,
	location: {
		type: GeoJson
	},
	booked: Boolean,
	bookerId: { type: String, optional: true },
	dropOff: { type: GeoJson, optional: true },
	bookedUntil: { type: Date, optional: true }
});
