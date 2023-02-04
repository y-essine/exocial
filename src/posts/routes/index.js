const router = require('express').Router();

const Post = require('@posts/model')

const AuthService = require('@auth/service');
const PostService = require('@posts/service');

const { validatePostsRequest, getAuthHeader, getQueryOptions } = require('@utils');

// const { getPostUser } = require('./custom/users');
// const { createdAt } = require('./custom/posts');



// get user posts
router.get('/', async (req, res) => {
    const token = getAuthHeader({ headers: req.headers })
    const { user, page, limit } = getQueryOptions({ query: req.query })
    validatePostsRequest({ token, user }, res);

    try {
        const userPosts = await PostService.getUserPosts(user, page, limit);
        return res.status(200).json(userPosts);

    } catch (err) {
        res.status(500).json({ error: err })
    }
})

// get user feed
router.get('/feed', async (req, res) => {
    const token = getAuthHeader({ headers: req.headers })
    const { user, page, limit } = getQueryOptions({ query: req.query })
    validatePostsRequest({ token, user }, res);

    try {
        const userFeed = await PostService.getUserFeed(user, page, limit);
        return res.status(200).json(userFeed);
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

//create post

router.post('/', async (req, res) => {
    const newPost = new Post(req.body)
    try {
        const savedPost = await newPost.save();
        res.status(201).json({ post: savedPost })
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