const router = require('express').Router();
const cartsRouter = require('../carts/routes');
const controller = require('./controller');
const { auth, me } = require('../auth');
const { sanitizers } = require('./model');

/*
 * /api/clients/signup POST - CREATE
 * /api/clients/ GET - READ ALL
 * /api/clients/login POST - LOGIN
 * /api/clients/:id GET - READ ONE
 * /api/clients/:id PUT - UPDATE
 * /api/clients/:id DELETE - DELETE
 */

router.param('id', controller.id);

/**
 * @swagger
 * definitions:
 *  NewClient:
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
 *  Client:
 *    allOf:
 *      - $ref: '#/definitions/NewClient'
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
 * /clients/signup:
 *  post:
 *    tags:
 *      - Clients
 *    description: New client
 *    parameters:
 *      - name: client
 *        description: Client object
 *        in: body
 *        required: true
 *        schema:
 *          $ref: '#/definitions/NewClient'
 *    consumes:
 *      - application/json
 *    produces:
 *      - application.json
 *    responses:
 *      200:
 *        description: Client
 *        schema:
 *          $ref: '#/definitions/Client'
 */

router.route('/signup').post(sanitizers, controller.signup);

/**
 * @swagger
 * /clients/login:
 *  post:
 *    tags:
 *      - Clients
 *    description: Log in
 *    parameters:
 *      - name: client
 *        description: Client object
 *        in: body
 *        required: true
 *        schema:
 *          $ref: '#/definitions/NewClient'
 *    consumes:
 *      - application/json
 *    produces:
 *      - application.json
 *    responses:
 *      200:
 *        description: Client
 *        schema:
 *          $ref: '#/definitions/Client'
 */

router.route('/login').post(sanitizers, controller.login);

/**
 * @swagger
 * /clients/:
 *  get:
 *    tags:
 *      - Clients
 *    description: Get all clients
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
 *        description: Client
 *        schema:
 *          type: object
 *          properties:
 *            success:
 *              type: boolean
 *            data:
 *              type: array
 *              items:
 *                $ref: '#/definitions/Client'
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

router.route('/').get(auth, controller.all);

router
  .route('/:id')
  /**
   * @swagger
   *
   * /clients/(id):
   *  get:
   *    tags:
   *      - Clients
   *    description: Get a client
   *    parameters:
   *    - name: id
   *      in: path
   *      description: Client id
   *      required: true
   *      type: string
   *    produces:
   *      - application/json
   *    responses:
   *      200:
   *        description: Client
   *        schema:
   *          $ref: '#/definitions/Client'
   */
  .get(auth, me, controller.read)
  /**
   * @swagger
   *
   * /clients/(id):
   *  put:
   *    tags:
   *      - Clients
   *    description: Update a client
   *    parameters:
   *    - name: id
   *      in: path
   *      description: Client id
   *      required: true
   *      type: string
   *    - name: client
   *      description: Post object
   *      in: body
   *      required: true
   *      schema:
   *        $ref: '#/definitions/NewClient'
   *    consumes:
   *      - application/json
   *    produces:
   *      - application/json
   *    responses:
   *      200:
   *        description: Client
   *        schema:
   *          $ref: '#/definitions/Client'
   */
  .put(auth, me, sanitizers, controller.update)
  /**
   * @swagger
   *
   * /clients/(id):
   *  delete:
   *    tags:
   *      - Clients
   *    description: Delete a client
   *    parameters:
   *    - name: id
   *      in: path
   *      description: Client id
   *      required: true
   *      type: string
   *    produces:
   *      - application/json
   *    responses:
   *      200:
   *        description: Client
   *        schema:
   *          $ref: '#/definitions/Client'
   */
  .delete(auth, me, controller.delete);

router.use('/:clientId/carts', cartsRouter);

module.exports = router;
