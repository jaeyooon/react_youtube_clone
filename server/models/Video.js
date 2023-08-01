const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const videoSchema = mongoose.Schema({
    
    writer: {
        type: Schema.Types.ObjectId,    // 이런식으로 writer의 Id를 넣는 이유는 Id만 넣더라도  
        ref: 'User'                     // User모델(User.js)로 가서 모든 정보들을 가져올 수 있음
    },
    title: {
        type: String,
        maxlength: 50
    },
    description: {
        type: String
    },
    privacy: {
        type: Number    //  0: privacy  1: public
    },
    filePath : {
        type: String
    },
    catogory: {
        type: String
    },
    views : {
        type: Number,
        default: 0      // views가 처음에 0부터 시작하므로
    },
    duration :{
        type: String
    },
    thumbnail: {
        type: String
    }

}, { timestamps: true })    // 이렇게 해야 만든 날짜와 업데이트한 날짜가 표시됨


const Video = mongoose.model('Video', videoSchema);

module.exports = { Video }