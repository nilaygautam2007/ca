/**
 * Upload model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerEvents = undefined;

var _events = require('events');

var UploadEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
UploadEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Upload) {
  for (var e in events) {
    var event = events[e];
    Upload.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function (doc) {
    UploadEvents.emit(event + ':' + doc._id, doc);
    UploadEvents.emit(event, doc);
  };
}

exports.registerEvents = registerEvents;
exports.default = UploadEvents;
//# sourceMappingURL=upload.events.js.map
