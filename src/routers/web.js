const express = require('express');
const {getHomepage, getTestpage} = require('../controllers/homeController')
const router = express.Router();

//khai bao route
router.get('/', getHomepage);

router.get('/test', getTestpage)

module.exports = router