const { Router } = require('express');
const { follow, unfollow } = require('../controller/followController');
const verify = require('../utils/check-auth');
const router = Router();

router.post('/user/:id/follow', verify, follow);
router.post('/user/:id/unfollow', verify, unfollow);

module.exports = router;