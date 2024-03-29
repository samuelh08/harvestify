const { Model, fields, references } = require('./model');
const {
  paginationParseParams,
  sortParseParams,
  sortCompactToStr,
  populateToObject,
} = require('../../../utils');
const { Model: Producer } = require('../producers/model');

const referencesNames = [...Object.getOwnPropertyNames(references)];

exports.parentId = async (req, res, next) => {
  const { params = {} } = req;
  const { userId = null } = params;
  if (userId) {
    try {
      const doc = await Producer.findById(userId).exec();
      if (doc) {
        next();
      } else {
        const message = 'Producer not found';

        next({
          success: false,
          message,
          statusCode: 404,
          level: 'warn',
        });
      }
    } catch (err) {
      next(new Error(err));
    }
  } else {
    next();
  }
};

exports.id = async (req, res, next, id) => {
  const populate = referencesNames.join(' ');
  try {
    const doc = await Model.findById(id).populate(populate).exec();
    if (!doc) {
      const message = `${Model.modelName} not found`;
      next({
        message,
        statusCode: 404,
        level: 'warn',
      });
    } else {
      req.doc = doc;
      next();
    }
  } catch (err) {
    next(new Error(err));
  }
};

exports.all = async (req, res, next) => {
  const { query = {} } = req;
  const { limit, page, skip } = paginationParseParams(query);
  const { sortBy, direction } = sortParseParams(query, fields);
  const populate = populateToObject(referencesNames);

  const all = Model.find({})
    .sort(sortCompactToStr(sortBy, direction))
    .skip(skip)
    .limit(limit)
    .populate(populate);
  const count = Model.countDocuments();

  try {
    const data = await Promise.all([all.exec(), count.exec()]);
    const [docs, total] = data;
    const pages = Math.ceil(total / limit);

    res.json({
      success: true,
      data: docs,
      meta: {
        limit,
        skip,
        total,
        page,
        pages,
        sortBy,
        direction,
      },
    });
  } catch (err) {
    next(new Error(err));
  }
};

exports.create = async (req, res, next) => {
  const { body = {}, params = {}, decoded = {}, file = {} } = req;
  const { _id = null } = decoded;
  if (_id) {
    body.userId = _id;
  }

  Object.assign(body, params, { picture: file });

  const document = new Model(body);

  try {
    const doc = await document.save();
    res.status(201);
    res.json({
      success: true,
      data: doc,
    });
  } catch (err) {
    next(new Error(err));
  }
};

exports.read = async (req, res, next) => {
  const { doc = {} } = req;

  res.json({
    success: true,
    data: doc,
  });
};

exports.update = async (req, res, next) => {
  const { doc = {}, body = {}, params = {} } = req;

  Object.assign(doc, body, params);

  try {
    const updated = await doc.save();
    res.json({
      success: true,
      data: updated,
    });
  } catch (err) {
    next(new Error(err));
  }
};

exports.delete = async (req, res, next) => {
  const { doc = {}, body = {} } = req;

  Object.assign(doc, body);

  try {
    const removed = await doc.remove();
    res.json({
      success: true,
      data: removed,
    });
  } catch (err) {
    next(new Error(err));
  }
};
