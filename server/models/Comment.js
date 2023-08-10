const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: 'Video'
    },
    responseTo: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    content: {
        type: String
    }

}, { timestamps: true })    // 이렇게 해야 만든 날짜와 업데이트한 날짜가 표시됨


const Comment = mongoose.model('Comment', commentSchema);

module.exports = { Comment }