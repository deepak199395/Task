const express = require('express');
const multer = require('multer');
const uploadUserImage = require('../Controller/imageController');
const router = express.Router();

const storage = multer.memoryStorage();
const singleUpload = multer({ storage }).single('file');

// Define the route with the middleware and controller
router.put('/upload-image', singleUpload,uploadUserImage );

module.exports = router;
