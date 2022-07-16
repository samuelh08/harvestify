const router = require('express').Router();
const controller = require('./controller');
const { auth, owner } = require('../auth');

/*
 * /api/locations/ POST - CREATE
 * /api/locations/ GET - READ ALL
 * /api/locations/:id GET - READ ONE
 * /api/locations/:id PUT - UPDATE
 * /api/locations/:id DELETE - DELETE
 */

/**
 * @swagger
 * definitions:
 *  NewLocation:
 *    type: object
 *    required:
 *    - address
 *    - department
 *    - city
 *    properties:
 *      address:
 *        type: string
 *      department:
 *        type: integer
 *      city:
 *        type: integer
 *  Location:
 *    allOf:
 *      - $ref: '#/definitions/NewLocation'
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

router.param('id', controller.id);

router
  .route('/')
  /**
   * @swagger
   * /locations/:
   *  post:
   *    tags:
   *      - Locations
   *    description: New location
   *    parameters:
   *      - name: location
   *        description: Location object
   *        in: body
   *        required: true
   *        schema:
   *          $ref: '#/definitions/NewLocation'
   *    consumes:
   *      - application/json
   *    produces:
   *      - application.json
   *    responses:
   *      200:
   *        description: Location
   *        schema:
   *          $ref: '#/definitions/Location'
   */
  .post(controller.create)
  /**
   * @swagger
   * /locations/:
   *  get:
   *    tags:
   *      - Locations
   *    description: Get all locations
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
   *        description: Location
   *        schema:
   *          type: object
   *          properties:
   *            success:
   *              type: boolean
   *            data:
   *              type: array
   *              items:
   *                $ref: '#/definitions/Location'
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
  .get(controller.all);

router
  .route('/:id')
  /**
   * @swagger
   *
   * /locations/(id):
   *  get:
   *    tags:
   *      - Locations
   *    description: Get a location
   *    parameters:
   *    - name: id
   *      in: path
   *      description: Location id
   *      required: true
   *      type: string
   *    produces:
   *      - application/json
   *    responses:
   *      200:
   *        description: Location
   *        schema:
   *          $ref: '#/definitions/Location'
   */
  .get(auth, owner, controller.read)
  /**
   * @swagger
   *
   * /locations/(id):
   *  put:
   *    tags:
   *      - Locations
   *    description: Update a location
   *    parameters:
   *    - name: id
   *      in: path
   *      description: Location id
   *      required: true
   *      type: string
   *    - name: cart
   *      description: Post object
   *      in: body
   *      required: true
   *      schema:
   *        $ref: '#/definitions/NewLocation'
   *    consumes:
   *      - application/json
   *    produces:
   *      - application/json
   *    responses:
   *      200:
   *        description: Location
   *        schema:
   *          $ref: '#/definitions/Location'
   */
  .put(auth, owner, controller.update)
  /**
   * @swagger
   *
   * /locations/(id):
   *  delete:
   *    tags:
   *      - Locations
   *    description: Delete a location
   *    parameters:
   *    - name: id
   *      in: path
   *      description: Location id
   *      required: true
   *      type: string
   *    produces:
   *      - application/json
   *    responses:
   *      200:
   *        description: Location
   *        schema:
   *          $ref: '#/definitions/Location'
   */
  .delete(auth, owner, controller.delete);

module.exports = router;
