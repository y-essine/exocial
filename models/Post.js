const { Schema, model } = require('mongoose');

const PostSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
        max: 500,
    },
    likes: {
        type: Array,
        default: []
    }
},
    { timestamps: true }
)

const PostModel = model('post', PostSchema);

module.exports = PostModel;