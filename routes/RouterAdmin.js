const express = require('express');
const controllerAdmin = require('../controller/adminController.js');
const router = express.Router();

router.get('/',controllerAdmin.create);
router.post('/create',controllerAdmin.save);


module.exports= router;  