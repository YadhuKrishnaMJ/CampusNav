const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const locations = require('./routes/locations');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/campus-navigation');

app.use('/api/locations', locations);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
