const router = require('express').Router();
const thoughtController = require('../../controllers/thoughtController')

router.route('/').get(thoughtController.getAllThoughts)
router.route('/:id').get(thoughtController.getThoughtsById)
router.route('/').post(thoughtController.createThought)
router.route('/:id').put(thoughtController.updateThought)
router.route('/:id').delete(thoughtController.deleteThought)

module.exports = router;