const express = require('express');
const { getEntries, makeEntry, getEntryById, changeEntry, removeEntry} = require('../controllers/entryControllers');
const { protectAPI } = require('../middleware/authenticateMiddleware');
const router = express.Router();


router.route('/').get(protectAPI, getEntries);
router.route('/make').post(protectAPI, makeEntry);
router
  .route('/:id')
  .get(protectAPI, getEntryById)
  .put(protectAPI, changeEntry)
  .delete(protectAPI, removeEntry);



module.exports = router;