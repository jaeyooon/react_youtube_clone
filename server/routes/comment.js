const express = require('express');
const router = express.Router();

const { Comment } = require("../models/Comment");

//=================================
//             Comment
//=================================

router.post('/saveComment', (req, res) => {
    
    const comment = new Comment(req.body)       // 클라이언트에서 가져온 모든 정보를 변수 comment에 넣어줌

    comment.save((err, comment) => {    // comment에 대한 정보를 MongoDB에 저장
        if(err) return res.json({ success: false, err })

        Comment.find({'_id' : comment._id}) // comment._id로 comment를 찾고,
            .populate('writer')     // 해당 comment를 작성한 유저에 대한 모든 정보를 가져옴
            .exec((err, result) => {
                if(err) return res.json({ success: false, err })
                res.status(200).json({ success: true, result })
            })
    })      

});



module.exports = router;
