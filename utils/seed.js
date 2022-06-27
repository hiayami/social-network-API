const connection = require('../config/connection');
const { Thought, User } = require('../models');
const usersData = require('../seeds/users.json')
const thoughtsData = require('../seeds/thoughts.json')
const reactionsData = require('../seeds/reactions.json')

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  await Promise.all([
    Thought.deleteMany({}),
    User.deleteMany({}),
  ])

  const users = usersData.map(({ first, last }) => ({
    username: `${first}_${last}`,
    email: `${first.toLowerCase()}.${last.toLowerCase()}@example.com`,
    thoughts: [],
    friends: [],
  }))

  const thoughts = thoughtsData.map(({ text }) => {
    const user = users[Math.floor(Math.random() * users.length)]
    return {
      reactions: [],
      thoughtText: text,
      username: user.username,
    }
  })

  reactionsData.forEach(({ body }) => {
    const user = users[Math.floor(Math.random() * users.length)]
    const thought = thoughts[Math.floor(Math.random() * thoughts.length)]
    thought.reactions.push({
      reactionBody: body,
      username: user.username,
    })
  })

  const thoughtDocs = await Thought.insertMany(thoughts)

  // Get user associated to thought and insert thought._id into user's
  // `thoughts` column
  for (const thoughtDoc of thoughtDocs) {
    const u = users.find(u => u.username === thoughtDoc.username)
    if (u) {
      u.thoughts.push(thoughtDoc._id)
    }
  }

  // Insert users to generate IDs. Then, re-query users, assign
  // friends to each user, and update each document
  const userDocs = await User.insertMany(users)
  userDocs.forEach(userDoc => {
    otherUsers = userDocs.filter(doc => doc._id !== userDoc._id)
    const friend = otherUsers[Math.floor(Math.random() * otherUsers.length)]
    if (!userDoc.friends.find(_id => friend._id)) {
      userDoc.friends.push(friend._id)
      friend.friends.push(userDoc._id)
    }
  })
  await Promise.all(userDocs.map(doc => User.updateOne({ _id: doc._id }, { friends: doc.friends })))
  
  console.info('Seeding complete! 🌱');
  process.exit(0);
});

