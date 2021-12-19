const { Router } = require('express');
const { createPost, getPost, getPostById, updatePost, deletePost} = require('../controller/postController');
const verify = require('../utils/check-auth');
const router = Router();

router.post('/post', verify, createPost);
router.get('/post', getPost);
router.get('/post/:id', getPostById);
router.put('/post/:id', verify, updatePost);
router.delete('/post/:id', verify, deletePost);

module.exports = router;
