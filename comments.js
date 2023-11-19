// Create web server
// 1. Create a new express app
// 2. Create a route handler for GET requests to /
// 3. Listen on port 4001 for incoming requests
// 4. Print a message when the server starts listening

// 1. Create a new express app
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { randomBytes } = require('crypto'); // crypto is a built in library
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

// 2. Create a route handler for GET requests to /
app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

// 3. Create a route handler for POST requests to /
app.post('/posts/:id/comments', async (req, res) => {
  // generate a random id
  const commentId = randomBytes(4).toString('hex');
  const { content } = req.body;

  // get the comments array for the post
  const comments = commentsByPostId[req.params.id] || [];

  // push new comment to the comments array
  comments.push({ id: commentId, content, status: 'pending' });

  // set the comments array to the post
  commentsByPostId[req.params.id] = comments;

  // send event to event bus
  await axios.post('http://event-bus-srv:4005/events', {
    type: 'CommentCreated',
    data: {
      id: commentId,
      content,
      postId: req.params.id,
      status: 'pending'
    }
  });

  // send back the comment to the client
  res.status(201).send(comments);
});

// 4. Listen on port 4001 for incoming requests
app.listen(4001, () => {
  console.log('Listening on 4001');
});

// Path: index.js
// Create event bus
// 1. Create a new express app
// 2. Create a route handler for GET requests to /
// 3. Listen on port 4005 for incoming requests
// 4. Print a message when the server starts listening

// 1. Create a new express app
const express = requiregit add comments.js