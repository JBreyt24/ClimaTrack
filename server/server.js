const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
require('./config/mongoose.config');

// Middleware
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SECRET_KEY));

// Routes
require('./routes/location.routes')(app);
require('./routes/user.routes')(app);

// ---------------------------------------------------------------------

app.listen(8000, () => console.log ('Server initialized on port 8000'))

