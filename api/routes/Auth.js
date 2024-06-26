import express from 'express';
import { signup } from '../Controllers/AuthController.js';

const router = express.Router()

router.post('/signup',signup)
// router.post('/login',login)

export default router;