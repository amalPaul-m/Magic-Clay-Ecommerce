import { User } from '../models/user.js';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { generateOtp } from '../utils/generateOtp.js';

export const login = async (req,res) => {
    const { email, password } = req.body;

    try {

        const userData = await User.getUserByEmail({email})
        if(!userData){
            return res.status(404).json({ message : 'Invalid Email or Password'});
        }
        const isMatch = await bcrypt.compare(password, userData.password);
        if(!isMatch){
            return res.status(404).json({ message : 'Invalid Email or Password'});
        }
        
    } catch (error) {
        return res.status(500).json({ message: 'Server error' });  
    }
}

export const register = async (req,res) => {
    const { name, email, password } = req.body;

    try {
        const userData = await User.getUserByEmail(email);
        if(userData){
            return res.status(400).json({ message: 'User Already Exists'});
        }
        const encryptedPassword = await bcrypt.hash(password, 10);
        const newUser = {
            name,
            email,
            password: encryptedPassword
        };
        await User.createUser(newUser);
        generateOtp(email);
        return  res.status(201).json({ message: 'User Registered Successfully'});
    } catch (error) {
        return res.status(500).json({ message: 'server error' });
    }
}

export const verifyOtp = async (req,res) => {
    const {otp} = req.body;

    try {
        const userData = await User.getUserByOtp(otp);
        if(!userData){
            return res.status(400).json({message: 'user not found'})
        }

        if(userData.otp!==otp || userData.otpExpire < Date.now()) {
            return res.status(400).json({message: 'Invalid Otp'})
        }

        await User.clearOtp(userData.email);
        return res.status(200).json({message: 'otp verified, logged in successfuly'})
        
    } catch (error) {
       return res.status(500).json({message: 'server error'})
    }
}