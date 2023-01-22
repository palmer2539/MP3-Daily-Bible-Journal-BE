const express = require('express');
const { getEntries, makeEntry, getEntryById, changeEntry, removeEntry} = require('../controllers/entryControllers');
const { protectAPI } = require('../middleware/authenticateMiddleware');
const router = express.Router();
const app = express();
const cors=require("cors");
const corsOptions ={ origin:'*', methods:'GET,PUT,POST,DELETE,OPTIONS' , credentials:true, optionSuccessStatus:200,}

app.use(cors(corsOptions)) 

router.route('/').get(protectAPI, getEntries);
router.route('/make').post(protectAPI, makeEntry);
router
  .route('/:id')
  .get(getEntryById)
  .put(protectAPI, changeEntry)
  .delete(protectAPI, removeEntry);



module.exports = router;