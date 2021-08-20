const express = require('express');
const testController = require('../controllers/testController');

const router = express.Router();

router.post('/reset', testController.resetDataBase);
router.post('/init', testController.initDataBase);

module.exports = router;
