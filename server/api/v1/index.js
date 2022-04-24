const router = require('express').Router();

router.route('/clients').get((req, res, next) => {
  res.json({
    message: 'GET all clients',
  });
});

module.exports = router;
