const express = require('express');
const router = express.Router();
const Location = require('../models/Location');

router.get('/', async (req, res) => {
    const locations = await Location.find();
    res.send(locations);
});

module.exports = router;
