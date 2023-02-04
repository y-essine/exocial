const User = require('@users/model');
const router = require('express').Router();
const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken');

const { SECRETKEY } = require('@config');


// const { getUserByToken } = require('./custom/users');

//update user
router.put('/:id', async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, 10)
            } catch (err) {
                return res.status(500).json({ message: err })
            }
        }
        try {
            const user = await User.findByIdAndUpdate({ $eq: req.params.id }, {
                $set: req.body,
            });
            res.status(200).json({ message: 'Account updated.' })
        } catch (err) {
            res.status(500).json({ message: err })
        }
    } else {
        return res.status(403).json({ message: 'You can only update your account' })
    }
})

// update user profile by token
router.put('/:id/edit', async (req, res) => {
    try {
        let token = req.body.token;
        if (token) {
            jwt.verify(token, SECRETKEY, async (err, decoded) => {
                if (err) return res.status(201).json({
                    message: 'not authorized'
                })
                //token is valid
                const user = await User.findOne({ _id: decoded.usedid });

                if (user._id === req.params.id || user.isAdmin) {
                    try {
                        //take everything but the token
                        const { token, ...other } = req.body;
                        console.log(other);
                        //update the user
                        const user = await User.findByIdAndUpdate(req.params.id, {
                            $set: other,
                        });
                        console.log("Profile updated.");
                        res.status(200).json({ message: 'Profile updated.' })
                    } catch (err) {
                        res.status(500).json({ message: err })
                    }
                }
                else {
                    return res.status(400).json({ message: 'Failed to validate' });
                }

            })

        }
        else res.status(400).json('nah bro')
    } catch (error) {
        res.status(500).json(error)
    }
})

//delete user 
router.delete('/:id', async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {

        try {
            const user = await User.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: 'Account deleted.' })
        } catch (err) {
            res.status(500).json({ message: err })
        }
    } else {
        return res.status(403).json({ message: 'You can only delete your account' })
    }
})

//get user
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user)
            return res.status(201).json({ message: 'user not found' });
        const { password, updatedAt, ...other } = user._doc;
        return res.status(200).json({ user: other });
    } catch (err) {
        return res.status(500).json({ message: err })
    }
})

//get user by username
router.get("/username/:username", async (req, res) => {
    try {
        const user = await (User.findOne({ username: req.params.username })
            .populate('followers', 'username avatar firstname lastname')
            .populate('followings', 'username avatar firstname lastname'))
        if (!user)
            return res.status(201).json({ message: 'user not found' });
        const { password, updatedAt, ...other } = user._doc;
        return res.status(200).json({ user: other });
    } catch (err) {
        return res.status(500).json({ message: err })
    }
})


//follow user
router.put('/:id/follow', async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById({ $eq: req.body.userId });
            if (!user.followers.includes(req.body.userId)) {
                await user.updateOne({ $push: { followers: req.body.userId } })
                await currentUser.updateOne({ $push: { followings: req.params.id } })
                res.status(200).json({ message: 'User is now followed' })
            } else {
                res.status(201).json({ message: 'You already followed the user' })
            }
        } catch (error) {

        }
    }
    else {
        res.status(201).json({ message: 'You cannot follow yourself' })
    }
})

//unfollow user
router.put('/:id/unfollow', async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById({ $eq: req.params.id });
            const currentUser = await User.findById({ $eq: req.body.userId });
            if (user.followers.includes(req.body.userId)) {
                await user.updateOne({ $pull: { followers: req.body.userId } })
                await currentUser.updateOne({ $pull: { followings: req.params.id } })
                res.status(200).json({ message: 'User is now unfollowed' })
            } else {
                res.status(201).json({ message: 'You are not following the user' })
            }
        } catch (error) {

        }
    }
    else {
        res.status(201).json({ message: 'You cannot follow yourself' })
    }
})


module.exports = router;