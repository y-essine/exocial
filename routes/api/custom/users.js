const User = require('../../../models/User');

const { SECRETKEY } = require('../../../config');

const getUser = async (id) => {
    try {
        const user = await User.findById({$eq: id});
        if (!user)
            return json({ message: 'user not found' });
        const { password, updatedAt, ...other } = user._doc;
        return other;
    } catch (err) {
        return json({ message: err })
    }
}

const getPostUser = async (id) => {
    try {
        const user = await User.findById(id)
        if (!user)
            return json({ message: 'user not found' });
        const { username, email, bio, password, updatedAt, ...other } = user._doc;
        return other;
    } catch (err) {
        return json({ message: err })
    }
}


module.exports = { getUser, getPostUser };