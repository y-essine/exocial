import Api from './api';

const postService = {
    getFeedPosts: (user, page = 1, limit = 10) => Api.get(`/posts/feed?u=${user._id}&p=${page}&l=${limit}`),
    getUserPosts: (user, page = 1, limit = 10) => Api.get(`/posts?u=${user._id}&p=${page}&l=${limit}`),
    getPost: (id) => Api.get(`/posts/${id}`),
    createPost: (data) => Api.post('/posts', data),
    updatePost: (id, data) => Api.put(`/posts/${id}`, data),
    deletePost: (id) => Api.delete(`/posts/${id}`)
};

export default postService;