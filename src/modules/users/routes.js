const express = require('express');
const answer = require('../../network/answers');
const controller = require('./index');
const router = express.Router();
const security = require('./security');

router.get('/', GetAll);
router.get('/:id', GetOne);
router.put('/', Delete);

router.post('/', security(), Add);

async function GetAll(req, res)  {
   try {
       const items = await controller.GetAll().then((items) => {
       answer.success(req, res, items,200);
   }); 
   } catch (error) {
         next(error);
   }
};

 async function GetOne(req, res)  {
   try {
       const items = await controller.GetOne(req.params.id);
       answer.success(req, res, items,200);
   } catch (error) {
         next(error);
   }
}; 

 async function Add(req, res, next)  {
   try {
       const items = await controller.Add(req.body);
       if(req.body.id == 0){
         message='Elemento creado correctamente';
         }else{
         message='Elemento actualizado correctamente';
         }
       answer.success(req, res, message, 201);
   } catch (error) {
      next(error);
   }
}; 

 async function Delete(req, res, next)  {
   try {
       const items = await controller.Delete(req.body);
       answer.success(req, res, 'Elemento eliminado correctamente',200);
   } catch (error) {
      next(error);
   }
}; 

module.exports = router;