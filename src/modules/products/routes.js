const express = require('express');
const answer = require('../../network/answers');
const controller = require('./controller');
const router = express.Router();

router.get('/', function (req, res)  {
   const GetAll = controller.GetAll();
   answer.success(req, res, GetAll,200);
}
);

router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const result = await controller.addProduct(data);
        res.status(201).json({ message: 'Producto agregado', result });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;