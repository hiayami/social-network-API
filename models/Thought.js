const { Schema, model } = require("mongoose");
const { schema: reactionSchema } = require("./Reaction");

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: () => new Date(),
      get: (t) => t.toUTCString(),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions?.count ?? 0;
});

const Thought = model("thought", thoughtSchema);

module.exports = {
  model: Thought,
  schema: thoughtSchema,
};
