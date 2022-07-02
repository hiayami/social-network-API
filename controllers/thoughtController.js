const { User, Thought } = require("../models");

module.exports = {
  getAllThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => {
        console.error(err);
        res.status(500).json(err);
      });
  },
  async getThoughtsById(req, res) {
    try {
      const thought = await Thought.findById(req.params.id);
      res.json(thought);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
  async createThought(req, res) {
    //TODO: push the created thought's _id to the associated user's thoughts array field
    Thought.create(req.body)
      .then((thought) => res.json(thought))
      .catch((err) => {
        console.error(err);
        res.status(500).json(err);
      });
  },
  updateThought(req, res) {
    Thought.updateOne(
      {
        _id: req.params.id,
      },
      req.body
    )
      .then((thought) => res.json(thought))
      .catch((err) => {
        console.error(err);
        res.status(500).json(err);
      });
  },
  deleteThought(req, res) {
    Thought.deleteOne({
      _id: req.params.id,
    })
      .then((thought) => res.json(thought))
      .catch((err) => {
        console.error(err);
        res.status(500).json(err);
      });
  },
  async createReaction(req, res) {
    try {
      const thought = await Thought.findById(req.params.id);
      if (!thought.reactions) {
        thought.reactions = [];
      }
      thought.reactions.push(req.body);
      const result = await thought.save();
      res.json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
  async deleteReaction(req, res) {
    try {
      const thought = await Thought.findById(req.params.id);
      const idx =
        thought?.reactions?.findIndex(
          (reaction) => reaction._id.toString() === req.params.reactionId
        ) ?? -1;
      if (idx > -1) {
        thought?.reactions?.splice(idx, 1);
      }
      const result = await thought.save();
      res.json(result);
    } catch (err) {
      console.error(err);
      res.staus(500).json(err);
    }
  },
};
