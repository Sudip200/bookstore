import dotenv from 'dotenv';
dotenv.config();

const config = {
  jwtSecret: process.env.JWT_SECRET || '123',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1h',
  saltRounds:process.env.SALT_ROUND || 10
};

export default config;