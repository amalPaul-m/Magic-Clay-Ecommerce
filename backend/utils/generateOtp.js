import { User } from '../models/user.js';
import crypto from 'crypto';
import { sendOtp } from './sendOtp.js';

export const generateOtp = async (email) => {

    try {
        const user = await User.getUserByEmail({email});

        if(!user){
           throw new Error('USER_NOT_FOUND');
        }

        const otp = crypto.randomInt(100000,999999).toString();
        const otpExpire = Date.now() + 10*60*1000;

        await User.updateOtp(email, otp, otpExpire);
        await sendOtp(email,otp);
        
    } catch (error) {
        console.log(error);
    }
}