const express = require('express');
const router = express.Router();

const { Like } = require("../models/Like");
const { Dislike } = require("../models/Dislike");

//=================================
//             Like
//=================================

router.post('/getLikes', (req, res) => {
    
    let variable = {}

    if(req.body.videoId) {  // videoId가 들어간 정보일 경우
        variable = { videoId: req.body.videoId }
    } else {
        variable = { commentId: req.body.commentId }
    }

    Like.find(variable)
        .exec((err, likes) => {
            if(err) return res.status(400).send(err)
            res.status(200).json({ success: true, likes })
        })     

});


router.post('/getDislikes', (req, res) => {
    
    let variable = {}

    if(req.body.videoId) {  // videoId가 들어간 정보일 경우
        variable = { videoId: req.body.videoId }
    } else {
        variable = { commentId: req.body.commentId }
    }

    Dislike.find(variable)
        .exec((err, dislikes) => {
            if(err) return res.status(400).send(err)
            res.status(200).json({ success: true, dislikes })
        })     

});


router.post('/upLike', (req, res) => {
    
    let variable = {}

    if(req.body.videoId) {  // videoId가 들어간 정보일 경우
        variable = { videoId: req.body.videoId, userId: req.body.userId }   // videoId와 userId가 같이 매칭되는 것을 넣는 과정 필요하므로 2개 필요
    } else {
        variable = { commentId: req.body.commentId, userId: req.body.userId }
    }


    // Like Collection에 클릭 정보를 넣어줌

    const like = new Like(variable)

    like.save((err, likeResult) => {
        if(err) return res.json({ success:false, err })
    })

            // 만약 Dislike 이 이미 클릭되어있을 경우, Dislike을 1 줄여줌
            Dislike.findOneAndDelete(variable)
                .exec((err, disLikeResult) => {
                    if(err) return res.status(400).json({ success: false, err })
                    res.status(200).json({ success: true })
                })

});


router.post('/unLike', (req, res) => {
    
    let variable = {}

    if(req.body.videoId) {  // videoId가 들어간 정보일 경우
        variable = { videoId: req.body.videoId, userId: req.body.userId }
    } else {
        variable = { commentId: req.body.commentId, userId: req.body.userId }
    }

    Like.findOneAndDelete(variable)
        .exec((err, result) => {
            if(err) return res.status(400).json({ success: true, err })
            res.status(200).json({ success: true })
        })
    
});


router.post('/unDislike', (req, res) => {
    
    let variable = {}

    if(req.body.videoId) {  // videoId가 들어간 정보일 경우
        variable = { videoId: req.body.videoId, userId: req.body.userId }
    } else {
        variable = { commentId: req.body.commentId, userId: req.body.userId }
    }

    Dislike.findOneAndDelete(variable)
        .exec((err, result) => {
            if(err) return res.status(400).json({ success: true, err })
            res.status(200).json({ success: true })
        })
    
});


router.post('/upDislike', (req, res) => {
    
    let variable = {}

    if(req.body.videoId) {  // videoId가 들어간 정보일 경우
        variable = { videoId: req.body.videoId, userId: req.body.userId }
    } else {
        variable = { commentId: req.body.commentId, userId: req.body.userId }
    }


    // Dislike Collection에 클릭 정보를 넣어줌

    const dislike = new Dislike(variable)

    dislike.save((err, dislikeResult) => {
        if(err) return res.json({ success:false, err })
    })

            // 만약 Like 이 이미 클릭되어있을 경우, Like을 1 줄여줌
            Like.findOneAndDelete(variable)
                .exec((err, likeResult) => {
                    if(err) return res.status(400).json({ success: false, err })
                    res.status(200).json({ success: true })
                })

});

module.exports = router;
