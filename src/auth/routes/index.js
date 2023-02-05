const router = require('express').Router();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('@users/model');

const { SECRETKEY } = require('@config');

router.get('/user', async (req, res) => {
    let token = req.headers.token;

    jwt.verify(token, SECRETKEY, (err, decoded) => {
        if (err) return res.status(201).json({
            message: 'not authorized'
        })
        //token is valid
        User.findOne({ _id: decoded.usedid }, (err, user) => {
            if (err) return console.log(err);
            return res.status(200).json({
                user: user
            })
        })
    })
})

router.post('/login', async (req, res) => {
    try {
        const newUser = new User({
            username: req.body.username,
            password: req.body.password,
        })

        await User.findOne({ username: newUser.username }, async (err, user) => {
            if (err) return res.status(500).json({ err: err });
            //check username exists
            if (!user)
                return res.status(201).json({
                    message: 'user not found'
                })

            //check pw
            const isCorrect = await bcrypt.compare(newUser.password, user.password)
            if (!isCorrect)
                return res.status(201).json({
                    message: 'wrong pw'
                })

            //all good
            let token = jwt.sign({ usedid: user._id }, SECRETKEY);
            return res.status(200).json({
                title: 'login success',
                token: token
            })
        }).clone().catch((err) => { console.log(err) })
    } catch (error) {
        console.log(error);
    }
})

router.post('/signup', async (req, res) => {
    const newUser = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        password: await bcrypt.hash(req.body.password, 10),
        email: req.body.email
    })

    User.findOne({ username: newUser.username }, async (err, user) => {
        if (err) return res.status(500).json({ err: err });
        //check username exists
        if (user) return res.status(201).json({
            message: 'user already exists'
        })
        //all good
        try {
            const user = newUser.save();
            if (!user) throw new Error('Something went wrong saving user');
            return res.status(200).json(user);
        } catch (error) {
            console.log(error);
        }
    }).clone().catch((err) => { console.log(err) })


})


module.exports = router;
