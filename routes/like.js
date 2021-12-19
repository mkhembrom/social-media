const { Router } = require('express');
const { likePost, numberOfLikePost } = require('../controller/likeController');
const verify = require('../utils/check-auth');
const router = Router();

router.post('/post/:id/like', verify, likePost);
router.get('/post/:id/countLike', numberOfLikePost);

module.exports = router;