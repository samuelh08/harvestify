const router = require('express').Router();
const locationsRouter = require('../locations/routes');
const productsRouter = require('../products/routes');
const controller = require('./controller');

/*
 * /api/producers/signup POST - CREATE
 * /api/producers/ GET - READ ALL
 * /api/producers/login POST - LOGIN
 * /api/producers/:id GET - READ ONE
 * /api/producers/:id PUT - UPDATE
 * /api/producers/:id DELETE - DELETE
 */

router.param('id', controller.id);

/**
 * @swagger
 * definitions:
 *  NewProducer:
 *    type: object
 *    required:
 *    - email
 *    - password
 *    - firstname
 *    - lastname
 *    - tel
 *    properties:
 *      email:
 *        type: string
 *      password:
 *        type: string
 *      firstname:
 *        type: string
 *      lastname:
 *        type: string
 *      tel:
 *        type: string
 *  Producer:
 *    allOf:
 *      - $ref: '#/definitions/NewProducer'
 *      - properties:
 *          id:
 *            type: string
 *          created_at:
 *            type: string
 *            format: date-time
 *          update_at:
 *            type: string
 *            format: date-time
 */

/**
 * @swagger
 * /producers/:
 *  get:
 *    tags:
 *      - Producers
 *    description: Get all producers
 *    parameters:
 *      - name: limit
 *        description: Limit number of items
 *        in: query
 *        schema:
 *          type: integer
 *      - name: skip
 *        description: Number of items to skip
 *        in: query
 *        schema:
 *          type: integer
 *      - name: page
 *        description: Number of the page
 *        in: query
 *        schema:
 *          type: integer
 *      - name: sortBy
 *        description: Sort by field name
 *        in: query
 *        schema:
 *          type: string
 *      - name: direction
 *        description: Sort order
 *        in: query
 *        schema:
 *          type: string
 *          enum: [asc, desc]
 *    produces:
 *      - application.json
 *    responses:
 *      200:
 *        description: Producer
 *        schema:
 *          type: object
 *          properties:
 *            success:
 *              type: boolean
 *            data:
 *              type: array
 *              items:
 *                $ref: '#/definitions/Producer'
 *            meta:
 *              type: object
 *              properties:
 *                limit:
 *                  type: integer
 *                  example: 10
 *                skip:
 *                  type: integer
 *                  example: 0
 *                total:
 *                  type: integer
 *                  example: 1
 *                page:
 *                  type: integer
 *                  example: 1
 *                sortBy:
 *                  type: string
 *                  example: created_at
 *                direction:
 *                  type: string
 *                  example: desc
 */
router.route('/').get(controller.all);

/**
 * @swagger
 * /producers/signup:
 *  post:
 *    tags:
 *      - Producers
 *    description: New producer
 *    parameters:
 *      - name: producer
 *        description: Producer object
 *        in: body
 *        required: true
 *        schema:
 *          $ref: '#/definitions/NewProducer'
 *    consumes:
 *      - application/json
 *    produces:
 *      - application.json
 *    responses:
 *      200:
 *        description: Producer
 *        schema:
 *          $ref: '#/definitions/Producer'
 */
router.route('/signup').post(controller.signup);

/**
 * @swagger
 * /producers/login:
 *  post:
 *    tags:
 *      - Producers
 *    description: Log in
 *    parameters:
 *      - name: producer
 *        description: Producer object
 *        in: body
 *        required: true
 *        schema:
 *          $ref: '#/definitions/NewProducer'
 *    consumes:
 *      - application/json
 *    produces:
 *      - application.json
 *    responses:
 *      200:
 *        description: Producer
 *        schema:
 *          $ref: '#/definitions/Producer'
 */
router.route('/login').post(controller.login);

router
  .route('/:id')
  /**
   * @swagger
   *
   * /producers/(id):
   *  get:
   *    tags:
   *      - Producers
   *    description: Get a producer
   *    parameters:
   *    - name: id
   *      in: path
   *      description: Producer id
   *      required: true
   *      type: string
   *    produces:
   *      - application/json
   *    responses:
   *      200:
   *        description: Producer
   *        schema:
   *          $ref: '#/definitions/Producer'
   */
  .get(controller.read)
  /**
   * @swagger
   *
   * /producers/(id):
   *  put:
   *    tags:
   *      - Producers
   *    description: Update a producer
   *    parameters:
   *    - name: id
   *      in: path
   *      description: Producer id
   *      required: true
   *      type: string
   *    - name: producer
   *      description: Post object
   *      in: body
   *      required: true
   *      schema:
   *        $ref: '#/definitions/NewProducer'
   *    consumes:
   *      - application/json
   *    produces:
   *      - application/json
   *    responses:
   *      200:
   *        description: Producer
   *        schema:
   *          $ref: '#/definitions/Producer'
   */
  .put(controller.update)
  /**
   * @swagger
   *
   * /producers/(id):
   *  delete:
   *    tags:
   *      - Producers
   *    description: Delete a producer
   *    parameters:
   *    - name: id
   *      in: path
   *      description: Producer id
   *      required: true
   *      type: string
   *    produces:
   *      - application/json
   *    responses:
   *      200:
   *        description: Producer
   *        schema:
   *          $ref: '#/definitions/Producer'
   */
  .delete(controller.delete);

router.use('/:producerId/locations', locationsRouter);
router.use('/:producerId/products', productsRouter);

module.exports = router;
