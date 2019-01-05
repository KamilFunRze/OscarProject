

const loginController = require('../controllers').loginController;

const app = require('express');
const router = app.Router();


router.post('/login', loginController.login);

router.get('/logout',loginController.logout);

router.get('/users',loginController.getAllUsers);

router.get('/users/:userId',loginController.getUser);

router.post('/users',loginController.addUser);

router.put('/users/:userId',loginController.updateUser);

module.exports = router;
