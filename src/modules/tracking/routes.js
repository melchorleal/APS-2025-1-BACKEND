const express = require('express');
const router = express.Router();
const {orderTrackingController} = require('./controller');

router.get('/:folio', orderTrackingController);






module.exports = router;