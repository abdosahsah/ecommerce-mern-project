import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';
import asyncHandler from 'express-async-handler';

export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email })

    if (user && (await user.matchPassword(password))) {
        res.status(200).json({ 
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    }

    else{
        res.status(400).json({ message: 'Incorrect information' })
    }
})

export const register = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExist = await User.findOne({ email })

    if (userExist) {
       res.status(400).json({ message: 'User already exist!' })
    }

    const user = await User.create({
        name,
        email,
        password
    })

    if (user) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)

        })
    }
    else{
        res.status(401).json({ message: 'Incorrect information' })
    }

})

export const userProfile = async(req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    }
    else{
        res.status(401).json({
            msg: 'Please sign in!'
        })
    }

}

export const updateUserProfile = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user_id)

    if(user) {
        user.name = req.user.name || user.name
        user.email = req.user.email || user.email
        if (req.user.password) {
            user.password = req.user.password
        }

        const updateUser = await user.save()

        res.status(200).json({
            _id: updateUser._id,
            name: updateUser.name,
            email: updateUser.email,
            isAdmin: updateUser.isAdmin
        })
    }
    else{
        res.status(400).json({ message: 'Something is wrong' })
    }

})


export const usersList = asyncHandler(async(req, res) => {
    const users = await User.find({})

    if(users) {
        res.status(200).json(users)
    }
    else{
        res.status(400).json({ message: 'Users not found' })
    }
})

export const deleteUser = asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id)

    if(user) {
        await user.remove()
        res.status(200).json({ message: 'User removed!' })
    }
    else{
        res.status(400).json({ message: 'User not found' })
    }
})


export const getUser = asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id)

    if(user) {
        res.status(200).json(user)
    }
    else{
        res.status(400).json({ message: 'User not found' })
    }
})

export const updateUser = asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id)

    if(user) {
        user.name = req.body.name || user.name
        user.emai = req.body.email || user.email
        user.isAdmin = req.body.isAdmin || user.isAdmin

        const userUpdate = await user.save()

        res.status(200).json({
            _id: userUpdate._id,
            name: userUpdate.name,
            email: userUpdate.email,
            isAdmin: userUpdate.isAdmin
        })
    }
    else{
        res.status(400).json({ message: 'User not found' })
    }
})