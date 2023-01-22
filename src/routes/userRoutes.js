const express = require('express');
const { registerUser, authorizeUser, updateAccount } = require('../controllers/userControllers');
const { protectAPI } = require('../middleware/authenticateMiddleware');
const router = express.Router();

router.route('/').post(registerUser);
router.route('/login').post(authorizeUser);
router.route('/account').post(protectAPI, updateAccount);


module.exports = router;