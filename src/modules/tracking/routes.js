const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.get('/:folio', controller.orderTrackingController);
router.put('/:folio/status', controller.changeTrackingState);
router.get('/', controller.getAllTransactions); // ✅ corrección aquí

module.exports = router;
