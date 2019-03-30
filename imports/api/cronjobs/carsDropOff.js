import { SyncedCron } from 'meteor/littledata:synced-cron';
import CarsService from '/imports/api/cars/server/service';

SyncedCron.add({
	name: 'Cars Drop Off',
	schedule: function(parser) {
		// parser is a later.parse object
		return parser.text('every 1 minute');
	},
	job: function() {
		CarsService.dropOffCars();
	}
});
