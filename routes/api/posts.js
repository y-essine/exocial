const router = require('express').Router();

const Post = require('../../models/posts/Post')

const User = require('../../models/User')

const { getPostUser } = require('./custom/users');
const { createdAt } = require('./custom/posts');


//create post

router.post('/', async (req, res) => {
    const newPost = new Post(req.body)
    try {
        const savedPost = await newPost.save();
        res.status(200).json({ post: savedPost })
    } catch (error) {
        console.log(error);
    }
})


//update post
router.put('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.updateOne({ $set: req.body })
            res.status(200).json({ message: 'Post has been updated' });
        } else {
            res.status(403).json({ message: 'You can only update your post' })
        }
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

//delete post
router.delete('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.author == req.body.userId) {
            await post.deleteOne();
            res.status(200).json({ message: 'Post has been deleted' });
        } else {
            res.status(403).json({ message: 'You can only delete your post' })
        }
    } catch (error) {
        res.status(500).json({ error: error }) 
    }
})




//get post
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post)
            return res.status(403).json({ message: 'post not found' })
        const postUser = await getPostUser(post.userId);
        res.status(200).json({ post: post, postUser: postUser });
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

//get (all) posts
router.post('/feed/all', async (req, res) => {
    try {
        let feed = [];

        const currentUser = await getPostUser(req.body.userId)
        if (!currentUser)
            return res.status(404).json({ error: 'User not found' });

        // my posts
        const userPosts = currentUser ? (await Post.find({ author: currentUser._id })
            .populate('author', 'username avatar firstname lastname createdAt')
            .populate('likes', 'avatar firstname lastname username')
            .sort({ createdAt: -1 })) : {};
        userPosts.forEach(element => {
            feed.push(element)
        });

        // followed posts
        await Promise.all(
            currentUser.followings.map(async (followedId) => {
                let postUser = await getPostUser(followedId);
                let posts = (postUser) ? (await Post.find({ author: followedId })
                    .populate('author', 'username avatar firstname lastname createdAt')
                    .populate('likes', 'avatar firstname lastname username')
                    .sort({ createdAt: -1 })) : {};
                posts.forEach(element => {
                    feed.push(element)
                });
            })
        );

        res.json(feed.sort(createdAt));

    } catch (error) {
        res.status(500).json({ error: error, message: 'Caught exception, error...' })
    }
})


// get user posts
router.get('/:id/posts', async (req, res) => {
    let feed = [];
    try {
        const userPosts = await (Post.find({ author: req.params.id })
            .populate('author', 'username avatar firstname lastname createdAt')
            .populate('likes', 'avatar firstname lastname username')
            .sort({ createdAt: -1 }));
        userPosts.forEach(element => {
            feed.push(element)
        });
        return res.status(200).json(feed)

    } catch (error) {
        res.status(500).json({ error: error })
    }
})


//like post
router.put('/:id/like', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post)
            return res.status(403).json({ message: 'post not found' })
        if (!post.likes.includes(req.body.userId)) {
            await post.updateOne({ $push: { likes: req.body.userId } })
            res.status(200).json({ message: 'Post liked' });
        } else {
            await post.updateOne({ $pull: { likes: req.body.userId } })
            res.status(200).json({ message: 'Post disliked' });
        }
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

//share post
router.put('/:id/share', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post)
            return res.status(403).json({ message: 'post not found' })
        if (!post.shares.includes(req.body.userId)) {
            await post.updateOne({ $push: { shares: req.body.userId } })
            res.status(200).json({ message: 'Post shared' });
        } else {
            await post.updateOne({ $pull: { shares: req.body.userId } })
            res.status(200).json({ message: 'Post unshared' });
        }
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

//report post
router.put('/:id/report', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post)

            return res.status(403).json({ message: 'post not found' })
        if (!post.reports.includes(req.body.userId)) {
            await post.updateOne({ $push: { reports: req.body.userId } })
            res.status(200).json({ message: 'Post reported' });
        } else {
            await post.updateOne({ $pull: { reports: req.body.userId } })
            res.status(200).json({ message: 'Post unreported' });
        }
    } catch (error) {
        res.status(500).json({ error: error })
    }
})



module.exports = router;