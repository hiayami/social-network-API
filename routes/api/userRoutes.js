const router = require('express').Router();
const userController = require('../../controllers/userController')

router.route('/').get(userController.getAllUsers)
// TODO: get user id to populate thought and friend data only
router.route('/:id').get(userController.getUserById)
router.route('/').post(userController.createUser)
router.route('/:id').put(userController.updateUser)
router.route('/:id').delete(userController.deleteUser)
router.route('/:id/friends/:friendId').post(userController.addFriend)
router.route('/:id/friends/:friendId').delete(userController.removeFriend)

module.exports = router;