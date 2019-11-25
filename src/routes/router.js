const router = require('express').Router();
const RevendedorController = require('../controllers/RevendedorController.js');
const CashbackController = require('../controllers/CashbackController.js');
const CompraController = require('../controllers/CompraController.js');

router.get('/', (req, res) => res.send("BOTICARIO - TESTE DEV"));
router.post('/revendedor/', RevendedorController.create);
router.get('/revendedor/:email', RevendedorController.validate);

router.get('/cashback/:cpf', CashbackController.get);

router.get('/compra/', CompraController.get);
router.post('/compra/', CompraController.create);
router.delete('/compra/:id', CompraController.delete);
router.patch('/compra/:id', CompraController.edit);

module.exports = router;