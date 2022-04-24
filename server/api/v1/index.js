const router = require('express').Router();

const clients = require('./clients/routes');

router.use('/clients', clients);

module.exports = router;
