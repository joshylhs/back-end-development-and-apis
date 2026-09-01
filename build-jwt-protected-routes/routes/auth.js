import express from "express";
import bcrypt from 'bcryptjs';
import { randomUUID } from 'crypto';
import { findByEmail, readUsers, writeUsers } from '../utils/db.js';
import {signToken} from '../utils/jwt.js';
import authenticate from '../middleware/authenticate.js';
import { blacklistToken } from '../utils/token-blacklist.js';

const router = express.Router();
export default router;

router.get('/profile', authenticate, (req, res) => {
    // const user = await findByEmail(req.user.email);
    res.status(200).json({user: req.user});
});

router.post('/register', async (req, res) => {
    const {email, password} = req.body;
    if (!email || !password) {
        res.status(400).json({message: 'Email and password are required'});
    } else {
        const user = await findByEmail(email);
        if (user) {
            res.status(409).json({message: 'User already exists'});
            return;
        }

        const passwordHash = await bcrypt.hash(password, 10);
        const id = randomUUID();
        const role = 'user';
        const newUser = {
            email, 
            passwordHash,
            id,
            role
        };

        await writeUsers([...(await readUsers()), newUser]);
        const token = signToken({id, email, role});
        res.status(201).json({message: 'User created', token});
    }
});

router.post('/login', async (req, res) => {
    const {email, password} = req.body;
    if (!email || !password) {
        res.status(400).json({message: 'Email and password are required'});
        return;
    } else {
        const user = await findByEmail(email);
        
        if (!user) {
            res.status(401).json({message: 'Invalid credentials'});
            return;
        }

        const match = await bcrypt.compare(password, user.passwordHash);
        if (!match) {
            res.status(401).json({message: 'Invalid credentials'});
            return;
        } else {
            const token = signToken({id: user.id, email: user.email, role: user.role});
            res.status(200).json({message: 'Login successful', token});
        }
    }
});

router.post('/logout', authenticate, (req, res) => {
    blacklistToken(req.headers.authorization.split(" ")[1]);
    res.json({message: 'Logout successful'});
});