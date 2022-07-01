const router = require('express').Router();
const thoughtController = require('../../controllers/thoughtController')

router.route('/').get(thoughtController.getAllThoughts)

module.exports = router;