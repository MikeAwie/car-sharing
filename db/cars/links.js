import Cars from './collection';
import { Users } from '../index';

Cars.addLinks({
  // Add here the links to other collection
  // Documentation: https://github.com/cult-of-coders/grapher/blob/master/docs/linking_collections.md
  owner: {
    type: 'one',
    field: 'ownerId',
    collection: Users,
  }
});
