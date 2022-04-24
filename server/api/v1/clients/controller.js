exports.create = (req, res, next) => {
  const { body = {} } = req;
  res.json(body);
};

exports.read = (req, res, next) => {
  const { params = {} } = req;
  const { id } = params;
  res.json({
    id,
  });
};

exports.update = (req, res, next) => {
  res.json({});
};

exports.delete = (req, res, next) => {
  res.json({});
};
