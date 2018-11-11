import Immutable from 'immutable';

import LorumPicsumModule from './lorumPicsumModule';

/**
 * Immutable Map of modules available
 *
 * @type {Immutable.Map<string, Module>}
 */
const modules = Immutable.fromJS({
  lorumPicsumOne: {
    module: new LorumPicsumModule(),
    name: 'Test Module',
  },
  lorumPicsumTwo: {
    module: new LorumPicsumModule(),
    name: 'Test Module Two',
  },
});

export default modules;
