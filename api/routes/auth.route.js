import express from 'express';
import { signup, signin, generateOTP, signOut } from '../controller/auth.controller.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.get("/signout", signOut)
router.post('/generateOTP', generateOTP);


export default router;