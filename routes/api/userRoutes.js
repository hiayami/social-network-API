const router = require('express').Router();
const userController = require('../../controllers/userController')

router.route('/').get(userController.getAllUsers)
// TODO: get user id to populate thought and friend data only
router.route('/:id').get(userController.getUserById)
router.route('/').post(userController.createUser)
router.route('/:id').put(userController.updateUser)
router.route('/:id').delete(userController.deleteUser)

module.exports = router;