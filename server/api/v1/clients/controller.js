const Model = require('./model');

exports.id = async (req, res, next, id) => {
  try {
    const doc = await Model.findById(id).exec();
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

exports.create = async (req, res, next) => {
  const { body = {} } = req;
  const document = new Model(body);

  try {
    const doc = await document.save();
    res.status(201);
    res.json(doc);
  } catch (err) {
    next(new Error(err));
  }
};

exports.read = async (req, res, next) => {
  const { doc = {} } = req;

  res.json(doc);
};

exports.update = (req, res, next) => {
  const { doc = {}, body = {} } = req;

  Object.assign(doc, body);

  try {
    const updated = await.doc.save();
    res.json(updated);
  } catch (error) {
    next(new Error(err));
  }
};

exports.delete = (req, res, next) => {
  const { doc = {}, body = {} } = req;

  Object.assign(doc, body);

  try {
    const removed = await.doc.save();
    res.json(removed);
  } catch (err) {
    next(new Error(err));
  }
};
