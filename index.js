const { urlencoded } = require('express');
const express = require('express');
const app = express();

const postRouter = require('./routes/post');
const authRouter = require('./routes/auth');
const likeRouter = require('./routes/like');
const commentRouter = require('./routes/comment');
const followRouter = require('./routes/follow');

app.use(express.json());
app.use(urlencoded({ extended: true }));

app.use('/api/v1', postRouter);
app.use('/api/v1', likeRouter);
app.use('/api/v1', commentRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1', followRouter);

app.get('/', (req, res) => {
  res.send('Hello world');
})

app.listen(4000, () => {
  console.log(`server is running at http://localhost:4000`);
})
