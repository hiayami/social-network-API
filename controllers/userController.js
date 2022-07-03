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
  async getUserById(req, res) {
    try {
      const user = await User.findById(req.params.id);
      const thoughts = user.thoughts?.length > 0
        ? await Thought.find({ _id: { $in: user.thoughts } })
        : []
      const friends =
        user.friends?.length > 0
          ? await User.find({ _id: { $in: user.friends } })
          : [];
      res.json({
        ...user.toJSON(),
        friends: Object.values(friends),
        thoughts: Object.values(thoughts),
      });
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
      _id: req.params.id,
    })
      .then((user) => res.json(user))
      .catch((err) => {
        console.error(err);
        res.status(500).json(err);
      });
  },
  async addFriend(req, res) {
    try {
      const user = await User.findById(req.params.id);
      const friend = await User.findById(req.params.friendId);
      if (!user.friends.includes(req.params.friendId)) {
        user.friends.push(req.params.friendId);
        friend.friends.push(req.params.id);
      }
      const result = await user.save();
      await friend.save();
      res.json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
  async removeFriend(req, res) {
    try {
      const user = await User.findById(req.params.id);
      const friend = await User.findById(req.params.friendId);
      const friendidx = user.friends.indexOf(req.params.friendId);
      const useridx = friend.friends.indexOf(req.params.friendId);
      if (friendidx > -1) {
        user.friends.splice(friendidx, 1);
        friend.friends.splice(useridx, 1);
      }
      const result = await user.save();
      await friend.save();
      res.json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
};
