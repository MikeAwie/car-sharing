import {Cars} from '../index';

Meteor.users.addLinks({
    'cars': {
        collection: Cars,
        inversedBy: 'owner'
    }
})