const router = require('express').Router();
const thoughtController = require('../../controllers/thoughtController')

router.route('/').get(thoughtController.getAllThoughts)
router.route('/:id').get(thoughtController.getThoughtsById)
router.route('/').post(thoughtController.createThought)
router.route('/:id').put(thoughtController.updateThought)
router.route('/:id').delete(thoughtController.deleteThought)
router.route('/:id/reactions').post(thoughtController.createReaction)
router.route('/:id/reactions/:reactionId').delete(thoughtController.deleteReaction)

module.exports = router;