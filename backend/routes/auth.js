import express from 'express';
import { login, register, verifyOtp } from '../controllers/auth.js';

const router =  express.Router();

//Login Page

router.post('/login', login);

//Register Page

router.post('/register', register);

//Verify Otp

router.post('/verify-otp', verifyOtp);

export default router;