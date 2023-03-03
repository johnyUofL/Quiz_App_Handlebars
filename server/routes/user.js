const express = require('express');
const router = express.Router();
const appController = require('../controllers/appController');


//views
router.get('/',appController.homeView);
router.get('/edit',appController.editView);
router.get('/play',appController.playView);
router.get('/help',appController.helpView);

//delete, update, save
router.get('/addquestion', appController.form);
router.post('/addquestion', appController.create);
router.get('/editcard/:card_id', appController.edit);//checking
router.post('/editcard/:card_id', appController.update);//checking
router.get('/edit/:id',appController.delete);

module.exports = router;