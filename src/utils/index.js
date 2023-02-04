const getAuthHeader = ({ headers }) => {
    const authHeader = headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return null;
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
        return null;
    }
    return token;
}

const getQueryOptions = ({ query }) => {
    const user = query.user || query.u || null;
    const page = query.page || query.p || 1;
    const limit = query.limit || query.l || 10;
    return { user, page, limit };
}

const validatePostsRequest = ({ token, user, tokenOnly = false }, res) => {
    if (!user && !tokenOnly) {
        return res.status(400).json({ error: 'No user id provided' })
    }
    if (!token) {
        return res.status(400).json({ error: 'Invalid auth token' })
    }
}

module.exports = {
    getAuthHeader,
    getQueryOptions,
    validatePostsRequest
}