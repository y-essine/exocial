const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const PostSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    content: {
        type: String,
        required: true,
        max: 500,
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }],
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'comment',
        default: []
    }]
},
    { timestamps: true }
)

PostSchema.plugin(mongoosePaginate);

const PostModel = model('post', PostSchema);

module.exports = PostModel;