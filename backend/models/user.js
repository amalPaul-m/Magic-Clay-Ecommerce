import { pool } from '../config/db.js';

const createUser = async (user) => {
    const { name, email, password } = user;
    await pool.query(
        'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
        [name, email, password]
    )
}

const getUserByEmail = async (email) => {
    const [rows] = await pool.query(
        'SELECT * FROM users WHERE email = ?', 
        [email]
    );
    return rows[0];
}

const getUserByOtp = async (otp) => {
  const [rows] = await pool.query(
    'SELECT * FROM users WHERE otp = ?',
    [otp]
  );
  return rows[0];
};

const updateOtp = async (email, otp, otpExpire) => {
  await pool.query(
    'UPDATE users SET otp = ?, otp_expire = ? WHERE email = ?',
    [otp, otpExpire, email]
  );
};

const clearOtp = async (email) => {
  await pool.query(
    'UPDATE users SET otp = NULL, otp_expire = NULL WHERE email = ?',
    [email]
  );
};

export const User = {
    createUser,
    getUserByEmail,
    getUserByOtp,
    updateOtp,
    clearOtp
};