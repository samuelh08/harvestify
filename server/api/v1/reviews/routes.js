const router = require('express').Router({
  mergeParams: true,
});
const controller = require('./controller');
const { auth, owner } = require('../auth');
const { sanitizers } = require('./model');

/*
 * /api/reviews/ POST - CREATE
 * /api/reviews/ GET - READ ALL
 * /api/reviews/:id GET - READ ONE
 * /api/reviews/:id PUT - UPDATE
 * /api/reviews/:id DELETE - DELETE
 */

router.param('id', controller.id);

/**
 * @swagger
 * definitions:
 *  NewReview:
 *    type: object
 *    required:
 *    - score
 *    properties:
 *      score:
 *        type: integer
 *        min: 1
 *        max: 5
 *      commet:
 *        type: string
 *  Review:
 *    allOf:
 *      - $ref: '#/definitions/NewReview'
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

router
  .route('/')
  /**
   * @swagger
   * /reviews/:
   *  post:
   *    tags:
   *      - Reviews
   *    description: New review
   *    parameters:
   *      - name: review
   *        description: Review object
   *        in: body
   *        required: true
   *        schema:
   *          $ref: '#/definitions/NewReview'
   *    consumes:
   *      - application/json
   *    produces:
   *      - application.json
   *    responses:
   *      200:
   *        description: Review
   *        schema:
   *          $ref: '#/definitions/Review'
   */
  .post(auth, controller.parentId, sanitizers, controller.create)
  /**
   * @swagger
   * /reviews/:
   *  get:
   *    tags:
   *      - Reviews
   *    description: Get all reviews
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
   *        description: Review
   *        schema:
   *          type: object
   *          properties:
   *            success:
   *              type: boolean
   *            data:
   *              type: array
   *              items:
   *                $ref: '#/definitions/Review'
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
  .get(auth, controller.parentId, controller.all);

router
  .route('/:id')
  /**
   * @swagger
   *
   * /reviews/(id):
   *  get:
   *    tags:
   *      - Reviews
   *    description: Get a review
   *    parameters:
   *    - name: id
   *      in: path
   *      description: Review id
   *      required: true
   *      type: string
   *    produces:
   *      - application/json
   *    responses:
   *      200:
   *        description: Review
   *        schema:
   *          $ref: '#/definitions/Review'
   */
  .get(auth, controller.parentId, controller.read)
  /**
   * @swagger
   *
   * /reviews/(id):
   *  put:
   *    tags:
   *      - Reviews
   *    description: Update a review
   *    parameters:
   *    - name: id
   *      in: path
   *      description: Review id
   *      required: true
   *      type: string
   *    - name: cart
   *      description: Post object
   *      in: body
   *      required: true
   *      schema:
   *        $ref: '#/definitions/NewReview'
   *    consumes:
   *      - application/json
   *    produces:
   *      - application/json
   *    responses:
   *      200:
   *        description: Review
   *        schema:
   *          $ref: '#/definitions/Review'
   */
  .put(auth, owner, controller.parentId, controller.update)
  /**
   * @swagger
   *
   * /reviews/(id):
   *  delete:
   *    tags:
   *      - Reviews
   *    description: Delete a review
   *    parameters:
   *    - name: id
   *      in: path
   *      description: Review id
   *      required: true
   *      type: string
   *    produces:
   *      - application/json
   *    responses:
   *      200:
   *        description: Review
   *        schema:
   *          $ref: '#/definitions/Review'
   */
  .delete(auth, owner, controller.parentId, controller.delete);

module.exports = router;
