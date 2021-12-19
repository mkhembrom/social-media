const { Router } = require('express');
const { login, register, totalNumberOfUser } = require('../controller/authController');
const router = Router();

router.post('/login', login);
router.post('/register', register);

router.get('/user', totalNumberOfUser);

module.exports = router;
