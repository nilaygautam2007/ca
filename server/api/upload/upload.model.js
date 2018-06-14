'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _upload = require('./upload.events');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UploadSchema = new _mongoose2.default.Schema({
  name: String,
  info: String,
  active: Boolean
});

(0, _upload.registerEvents)(UploadSchema);
exports.default = _mongoose2.default.model('Upload', UploadSchema);
//# sourceMappingURL=upload.model.js.map
