const { User } = require('../models');

module.exports = {
    getAllUsers(req, res) {
        User.find()
        .then((users) => res.json(users))
        .catch((err) => {
            console.error(err)
            res.status(500).json(err)
        })
    }
}