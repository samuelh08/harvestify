const router = require('express').Router();

const clients = require('./clients/routes');
const carts = require('./carts/routes');
const cartItems = require('./cartItems/routes');
const reviews = require('./reviews/routes');
const producers = require('./producers/routes');
const products = require('./products/routes');
const locations = require('./locations/routes');

router.use('/clients', clients);
router.use('/carts', carts);
router.use('/cartItems', cartItems);
router.use('/reviews', reviews);
router.use('/producers', producers);
router.use('/products', products);
router.use('/locations', locations);

module.exports = router;
