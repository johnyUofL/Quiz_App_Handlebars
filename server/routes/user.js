const express = require('express');
const router = express.Router();
const appController = require('../controllers/appController');


//views
router.get('/',appController.view);
//router.get('/edit',appController.edit);
router.get('/play',appController.play);
router.get('/help',appController.help);

//delete, update, save
router.get('/addquestion', appController.form);
router.post('/addquestion', appController.create);
router.get('/editcard/:card_id', appController.edit);//checking
router.post('/editcard/:card_id', appController.update);//checking
router.get('/:id',appController.delete);

module.exports = router;