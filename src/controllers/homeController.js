const connections = require('../config/database');

const getHomepage = (req, res) => {
    return res.render('homepage');    
}

const getTestpage = (req, res) => {
    res.render('sample')
}

module.exports ={
    getHomepage, getTestpage
}