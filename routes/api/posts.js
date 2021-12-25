const router = require('express').Router();

const Post = require('../../models/Post')

const User = require('../../models/User')

const { getUser, getPostUser } = require('./custom/getUser');


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
        if (post.userId === req.body.userId) {
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
        const currentUser = await getPostUser(req.body.userId)
        if (!currentUser)
            return res.status(404).json({ error: 'User not found' });
        const userPosts = currentUser ? (await Post.find({ userId: currentUser._id }).sort({ createdAt: -1 })) : {};
        const formatPosts = (userPosts, currentUser) => {
            return { postUser: currentUser, posts: userPosts }
        }
        const myPosts = formatPosts(userPosts, currentUser);

        const followedPosts = await Promise.all(
            currentUser.followings.map(async (followedId) => {
                let postUser = await getPostUser(followedId);
                let posts = (postUser) ? (await Post.find({ userId: followedId }).sort({ createdAt: -1 })) : {};
                return { postUser, posts };
            })
        );

        let feed = followedPosts;
        feed.push(myPosts)
        res.json(feed);

    } catch (error) {
        res.status(500).json({ error: error, message: 'dirabomek' })
    }
})


module.exports = router;