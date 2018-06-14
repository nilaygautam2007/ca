/**
 * City model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerEvents = undefined;

var _events = require('events');

var CityEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
CityEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(City) {
  for (var e in events) {
    var event = events[e];
    City.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function (doc) {
    CityEvents.emit(event + ':' + doc._id, doc);
    CityEvents.emit(event, doc);
  };
}

exports.registerEvents = registerEvents;
exports.default = CityEvents;
//# sourceMappingURL=city.events.js.map
