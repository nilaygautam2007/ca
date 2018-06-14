/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/citys              ->  index
 * POST    /api/citys              ->  create
 * GET     /api/citys/:id          ->  show
 * PUT     /api/citys/:id          ->  upsert
 * PATCH   /api/citys/:id          ->  patch
 * DELETE  /api/citys/:id          ->  destroy
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.index = index;
exports.show = show;
exports.create = create;
exports.upsert = upsert;
exports.patch = patch;
exports.destroy = destroy;

var _fastJsonPatch = require('fast-json-patch');

var _fastJsonPatch2 = _interopRequireDefault(_fastJsonPatch);

var _city = require('./city.model');

var _city2 = _interopRequireDefault(_city);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function (entity) {
    if (entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(patches) {
  return function (entity) {
    try {
      _fastJsonPatch2.default.apply(entity, patches, /*validate*/true);
    } catch (err) {
      return _promise2.default.reject(err);
    }

    return entity.save();
  };
}

function removeEntity(res) {
  return function (entity) {
    if (entity) {
      return entity.remove().then(function () {
        res.status(204).end();
      });
    }
  };
}

function handleEntityNotFound(res) {
  return function (entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Citys
function index(req, res) {
  return _city2.default.find().exec().then(respondWithResult(res)).catch(handleError(res));
}

// Gets a single City from the DB
function show(req, res) {
  return _city2.default.findById(req.params.id).exec().then(handleEntityNotFound(res)).then(respondWithResult(res)).catch(handleError(res));
}

// Creates a new City in the DB
function create(req, res) {
  return _city2.default.create(req.body).then(respondWithResult(res, 201)).catch(handleError(res));
}

// Upserts the given City in the DB at the specified ID
function upsert(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }

  if (req.body.workshops.length == 1) {
    req.body.workshops[0].count = req.body.workshops[0].count + 1;
  } else if (req.body.workshops.length == 2) {
    req.body.workshops[0].count = req.body.workshops[0].count + 1;
    req.body.workshops[1].count = req.body.workshops[1].count + 1;
  } else if (req.body.workshops.length == 3) {
    req.body.workshops[0].count = req.body.workshops[0].count + 1;
    req.body.workshops[1].count = req.body.workshops[1].count + 1;
    req.body.workshops[2].count = req.body.workshops[2].count + 1;
  }

  return _city2.default.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true }).exec().then(respondWithResult(res)).catch(handleError(res));
}

// Updates an existing City in the DB
function patch(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return _city2.default.findById(req.params.id).exec().then(handleEntityNotFound(res)).then(patchUpdates(req.body)).then(respondWithResult(res)).catch(handleError(res));
}

// Deletes a City from the DB
function destroy(req, res) {
  return _city2.default.findById(req.params.id).exec().then(handleEntityNotFound(res)).then(removeEntity(res)).catch(handleError(res));
}
//# sourceMappingURL=city.controller.js.map
