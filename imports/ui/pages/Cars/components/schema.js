import SimpleSchema from 'simpl-schema';

export default new SimpleSchema({
	make: String,
	model: String,
	year: Number,
	fueled: Boolean
});
