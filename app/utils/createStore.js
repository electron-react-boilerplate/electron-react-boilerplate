import assign from 'object-assign';
import { EventEmitter } from 'events';


var CHANGE_EVENT = 'change';


export default function(attributes) {
  return assign({}, EventEmitter.prototype, {

    emitChange() {
      this.emit(CHANGE_EVENT);
    },

    addChangeListener(callback) {
      this.on(CHANGE_EVENT, callback);
    },

    onChange(callback) {
      this.addChangeListener(callback);
    },

    removeChangeListener(callback) {
      this.removeListener(CHANGE_EVENT, callback);
    }

  }, attributes);
}
