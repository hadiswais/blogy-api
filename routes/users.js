const express = require('express');
const userController = require('../controllers/user.controller');
const imageController = require('../controllers/imageProfile.controller');
const imageUpload = require('../helpers/uploader');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login)

router.get('/:id/images/:imageId', imageController.getImage);
router.post('/:id/images/', auth, imageUpload.upload.single('image'), imageController.createImage);
router.patch('/:id/images/:imageId', auth, imageUpload.upload.single('image'), imageController.updateImage);
router.delete('/:id/images/:imageId', auth, imageController.deleteImage);

module.exports = router;
