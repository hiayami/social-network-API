const { User, Thought } = require("../models");

module.exports = {
  getAllUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => {
        console.error(err);
        res.status(500).json(err);
      });
  },
  // TODO: get user id to populate thought and friend data only
  async getUserById(req, res) {
    try {
      const user = await User.findById(req.params.id);
      if ((user.thoughts?.length ?? 0) > 0) {
        user.thoughts = await Thought.find({
          _id: { $in: user.thoughts },
        });
      }
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => {
        console.error(err);
        res.status(500).json(err);
      });
  },
  updateUser(req, res) {
    User.updateOne(
      {
        _id: req.params.id,
      },
      req.body
    )
      .then((user) => res.json(user))
      .catch((err) => {
        console.error(err);
        res.status(500).json(err);
      });
  },
  deleteUser(req, res) {
    User.deleteOne({
        _id : req.params.id
    })
    .then((user) => res.json(user))
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
  }
};
