const { Router } = require('express');
const { createComment, deleteComment } = require('../controller/commentController');
const verify = require('../utils/check-auth');
const router = Router();

router.post('/post/:id/createComment', verify, createComment);
router.post('/post/:id/deleteComment', verify, deleteComment);

module.exports = router;