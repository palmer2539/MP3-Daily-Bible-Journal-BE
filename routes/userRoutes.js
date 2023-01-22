const express = require('express');
const { registerUser, authorizeUser, updateAccount } = require('../controllers/userControllers');
const { protectAPI } = require('../middleware/authenticateMiddleware');
const router = express.Router();
const app = express();
const cors=require("cors");
const corsOptions ={ origin:'*', methods:'GET,PUT,POST,DELETE,OPTIONS' , credentials:true, optionSuccessStatus:200,}

app.options('*', cors(corsOptions))
app.use(cors(corsOptions)) 

router.route('/').post(registerUser);
router.route('/login').post(authorizeUser);
router.route('/account').post(protectAPI, updateAccount);


module.exports = router;