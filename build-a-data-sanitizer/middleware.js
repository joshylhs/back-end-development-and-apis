import express from 'express';
import {Router} from 'express';

const router = express.Router();

const inputCleaner = (req, res, next) => {
    if (req.body.username) {
        req.body.username = req.body.username.toLowerCase();
    }

    if (req.body.comment) {
        req.body.comment = req.body.comment.replace(/<[^>]*>/g, '');
    }
    next();
};


const inputValidator = (req, res, next) => {
    if (!req.body.username || req.body.username.length < 3) {
        res.redirect('/form?error=Username must be at least 3 characters.')
    } else {
        next();
    }
};


router.get('/', (req, res) => {
    res.redirect('/form')
});

router.get('/form', (req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

router.post('/submit', inputCleaner, inputValidator, (req, res) => {
    res.send(`Username: ${req.body.username}, Comment: ${req.body.comment}`);
})

export {inputCleaner, inputValidator, router};