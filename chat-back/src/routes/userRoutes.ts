import express from 'express';
import { registerUser, loginUser, searchUsers, getUserInfo } from '../controllers/userController';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/search', searchUsers);
router.get('/getuser', getUserInfo);

export default router;
