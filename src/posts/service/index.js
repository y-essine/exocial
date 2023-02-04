const Posts = require('@posts/model');
const User = require('@users/model');

const getUserPosts = async (userId, page, limit) => {
    const options = {
        page,
        limit,
        sort: { createdAt: -1 },
        populate: [
            { path: 'author', select: 'username avatar firstname lastname' },
            { path: 'likes', select: 'username avatar' }
        ]
    }
    const userPosts = await Posts.paginate({ author: userId }, options);
    return userPosts["docs"]; // return only the docs
}

const getUserFeed = async (userId, page, limit) => {
    const options = {
        page,
        limit,
        sort: { createdAt: -1 },
        populate: [
            { path: 'author', select: 'username avatar firstname lastname' },
            { path: 'likes', select: 'username avatar' }
        ]
    }
    const user = await User.findById(userId).select('followings'); // get user followings
    const userFeed = await Posts.paginate({ author: { $in: user.followings } }, options);
    return userFeed["docs"];
}



module.exports = PostService = {
    getUserPosts,
    getUserFeed
};