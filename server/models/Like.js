const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likeSchema = mongoose.Schema({
   userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
   },
   commentId: {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
   },
   videoId: {
        type: Schema.Types.ObjectId,
        ref: 'Video'
   }

}, { timestamps: true })    // 이렇게 해야 만든 날짜와 업데이트한 날짜가 표시됨


const Like = mongoose.model('Like', likeSchema);

module.exports = { Like }