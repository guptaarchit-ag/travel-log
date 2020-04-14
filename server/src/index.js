const express = require('express');
const morgan = require('morgan'); // it will show logs of request
const helmet = require('helmet'); // to secure the app
const cors = require('cors'); //cross-ogirin resource sharing header
const mongoose = require('mongoose');

require('dotenv').config('development');

const middlewares = require('./middlewares');
const logs = require('./api/logs'); 

const app = express();

mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(morgan('common'));
app.use(helmet());
app.use(cors({
    origin: process.env.CORS_ORIGIN, // in our browser, only request coming from this origin can reach our backend 
})); 

app.use(express.json()); // this is a body parsing middleware

app.get('/', (req, res) => {
    res.json({
        message: "Hello User. This is a t est.",
    });
});

app.use('/api/logs', logs); 

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

const port = process.env.PORT || 1337;
app.listen(port,()=>{
    console.log(`Listening on http://localhost:${port}`);
}); 

