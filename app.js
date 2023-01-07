const express = require('express');
const app = express();
const cors = require('cors');
const compression = require('compression');
const morgan = require('morgan');
const contactRouter = require('./routers/contactRouter');

app.use(express.json());
app.use(compression());
app.use(cors());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.get('/', (req, res) => res.send('<h3>Server running...</h3>'));
app.use('/api/contact', contactRouter);

module.exports = app;