const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

//delete, update, save

router.get('/',userController.view);
router.get('/addquestion', userController.form);
router.post('/addquestion', userController.create);
router.get('/editcard/:card_id', userController.edit);//checking
router.post('/editcard/:card_id', userController.update);//checking
router.get('/:id',userController.delete);

module.exports = router;