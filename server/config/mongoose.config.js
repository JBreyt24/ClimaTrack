const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/weatherDB', {

})
    .then(() => console.log('Main system, engaging server on port 8000'))
    .catch(err => console.log('Something went wrong when connecting to the database ', err));

