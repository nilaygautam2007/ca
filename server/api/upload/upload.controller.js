'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadFile = uploadFile;

var _fastJsonPatch = require('fast-json-patch');

var _fastJsonPatch2 = _interopRequireDefault(_fastJsonPatch);

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

var _user = require('../user/user.model');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var saveWithName = "Noname";
var storage = _multer2.default.diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, 'client/assets/uploads');
  },
  filename: function filename(req, file, cb) {

    saveWithName = file.fieldname + '-' + Date.now() + "." + file.originalname.split('.').pop();
    cb(null, saveWithName);
  }
});

var upload = (0, _multer2.default)({ storage: storage }).single('uploadedFile');

function uploadFile(req, res) {
  var task = req.params.id;
  var user = req.user._id;
  upload(req, res, function (err) {

    if (err) {

      return res.json({ success: false, msg: "Error while uploading file", name: 'no file was uploaded' });
    }
    _user2.default.findOne({ _id: user }, function (err, user) {
      if (err) throw err;
      user.files.push({
        taskid: task,
        name: saveWithName
      });
      user.save(function (err) {
        if (err) throw err;
        res.json({ success: true, msg: "File Uploaded!", id: user._id });
      });
    });
  });
}
//# sourceMappingURL=upload.controller.js.map
