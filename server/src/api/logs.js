const { Router } = require('express');

const LogEntry = require('../models/LogEntry');

const {
    API_KEY,
} = process.env;

// So this was just the beginning, but then we want to create a log that will list all logs
const router = Router();
/*
router .get('/', (req,res) => {
    res.json({
        message: '🌍',
    });
});
*/
router.get('/', async(req,res,next) => {
    try {
        const entries = await LogEntry.find();
        res.json(entries);          
    } catch (error) {
        next(error);
    }
});

// Now when you request GET log, instead of responding with 1 we will respond with all entries

router.post('/', async(req,res,next) => {
    try {
        if(req.get('X-API-KEY') !== API_KEY){
            res.status(401);
            throw new Error('UnAuthorized');
        }
        const logEntry = new LogEntry(req.body);
        const createdEntry = await logEntry.save(); 
        res.json(createdEntry);
    } catch (error) {
        if(error.name === 'ValidationError'){
            res.status(422);
        }
        next(error);
    }
});

module.exports = router; 