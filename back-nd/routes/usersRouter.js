import express from 'express';
const usersRouter = express.Router();
import { protect, admin } from '../middlewares/protectUsers.js'

import { login, register, userProfile, updateUserProfile, usersList, deleteUser, getUser, updateUser } from '../controllers/users.js'

usersRouter.post('/login', login);
usersRouter.post('/register', register);
usersRouter.get('/profile', protect, userProfile);
usersRouter.get('/userslist', protect, admin, usersList);
usersRouter.put('/profile', protect, updateUserProfile);
usersRouter.delete('/user/:id', protect, admin, deleteUser);
usersRouter.get('/user/:id', protect, admin, getUser);
usersRouter.put('/user/:id', protect, admin, updateUser);


export default usersRouter