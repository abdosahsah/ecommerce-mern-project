import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';


export const protect = asyncHandler(async (req, res, next) => {
    let auth = req.headers.authorization

    if (auth && auth.startsWith('Bearer')) {
        try {
            let token = auth.split(' ')[1];

            let decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.id).select('-password');

            next()

        } catch (error) {
            res.status(401).json({
                err: error,
                msg: 'Failed to connect!'
            })
        }
    }

    if (!auth) {
        res.status(401).json({ msg: 'Not authorized' })
    }

})

export const admin = asyncHandler((req, res, next) => {

    if (req.user && req.user.isAdmin) {
        next()
    }
    else{
        res.status(401).json({ message: 'Not autorized' })
    }
})
