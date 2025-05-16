const express = require('express');
const answer = require('../../network/answers');
const controller = require('./index');
const router = express.Router();

router.post('/Login', Login);


 async function Login(req, res, next)  {
   try {
       const token = await controller.Login(req.body.user,req.body.password);
       answer.success(req, res, token,200);
   } catch (error) {
         next(error);
   }
}; 


module.exports = router;