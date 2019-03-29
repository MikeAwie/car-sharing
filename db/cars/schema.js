import SimpleSchema from 'simpl-schema';

export default new SimpleSchema({
	brand: String,
	model: String,
    year: Number,
    ownerId: String,
	fueled: Boolean,
	booked: Boolean,
	bookerId: String,
	location: { type: Object, blackbox: true },
	dropOff: { type: Object, blackbox: true, optional: true },
	bookedUntil: { type: Date, optional: true }
});
