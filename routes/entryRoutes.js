const express = require('express');
const { getEntries, makeEntry } = require('../controllers/entryControllers');
const { protectAPI } = require('../middleware/authenticateMiddleware');
const router = express.Router();


router.route('/').get(protectAPI, getEntries);
router.route('/make').post(protectAPI, makeEntry);
// router.route('/:id').get().put().delete();



module.exports = router;