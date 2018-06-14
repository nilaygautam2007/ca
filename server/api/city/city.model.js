'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _city = require('./city.events');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CitySchema = new _mongoose2.default.Schema({
  name: String,
  workshops: [{
    name: String,
    count: {
      type: Number,
      default: 0
    }
  }],
  suggestions: [{
    type: String, default: " " }]
});

(0, _city.registerEvents)(CitySchema);
exports.default = _mongoose2.default.model('City', CitySchema);
//# sourceMappingURL=city.model.js.map
