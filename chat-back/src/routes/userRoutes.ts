import express from 'express';
import { registerUser, loginUser, searchUsers, getUserInfo, logoutUser } from '../controllers/userController';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/search', searchUsers);
router.get('/getuser', getUserInfo);

export default router;
