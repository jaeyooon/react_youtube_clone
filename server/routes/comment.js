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


router.post('/getComments', (req, res) => {
    
   Comment.find({ "postId" : req.body.videoId })
   .populate('writer')
   .exec((err, comments) => {   // postId에 해당하는 비디오의 모든 코멘트 정보들이 comments에 담김
        if(err) return res.status(400).send(err)
        res.status(200).json({ success: true, comments })
   })
 
});


router.post('/deleteComment', (req, res) => {
    
    Comment.deleteOne({_id: req.body.commentId})
    .exec((err, result) => {
        if(err) res.json({success: false, err})
        return res.status(200).json({ success: true})
    })

});



module.exports = router;
