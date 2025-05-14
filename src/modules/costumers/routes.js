const express = require('express');
const answer = require('../../network/answers');
const controller = require('./controller');
const router = express.Router();

router.get('/', function (req, res)  {
   const GetAll = controller.GetAll();
   answer.success(req, res, GetAll,200);
}
);

module.exports = router;