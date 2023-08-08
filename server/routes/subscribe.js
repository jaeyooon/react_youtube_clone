const express = require('express');
const router = express.Router();

const { Subscriber } = require("../models/Subscriber");

//=================================
//             Subscribe
//=================================

router.post('/subscribeNumber', (req, res) => {
    
    Subscriber.find({ 'userTo': req.body.userTo })
    .exec((err, subscribe) => { // subscribe에는 userTo를 구독하는 모든 케이스의 정보를 담고있음.
        if(err) return res.status(400).send(err);
        return res.status(200).json({ success: true, subscribeNumber: subscribe.length }) // subscribe.length를 통해 구독자 수를 알 수 있음.
    })

});


router.post('/subscribed', (req, res) => {
    
    Subscriber.find({ 'userTo': req.body.userTo, 'userFrom': req.body.userFrom })
    .exec((err, subscribe) => { // userTo와 userFrom 둘 다 포함된 데이터가 있다면 👉 내가 비디오 업로드 유저를 구독하고 있는 것 👉 subscribe.length는 1이 되는것
        if(err) return res.status(400).send(err);

        let result = false  // result = false이면 내가 구독을 안하고 있다는 의미
        if(subscribe.length !== 0) {    // 내가 비디오 업로드한 유저를 구독하고 있다면
            result = true
        }
        return res.status(200).json({ success: true, subscribed: result })
    })
   
});


router.post('/unSubscribed', (req, res) => {
    
    // 이미 구독 중인 상태이므로 Subscriber Collection(DB)에  userTo와 userFrom 데이터가 담겨있음
    // userTo와 userFrom을 찾아서 없애줌으로서 💡구독 취소를 해줌   
    Subscriber.findOneAndDelete({ userTo: req.body.userTo, userFrom: req.body.userFrom })
    .exec((err, doc) => {
        if(err) return res.status(400).json({ success: false, err })
        res.status(200).json({ success: true, doc })    // 성공할 경우 Subscriber Collection에서 가져온 doc를 보내줌
    })
   
});


router.post('/subscribe', (req, res) => {
    
    // 새롭게 구독하는 경우이므로 DB에 userTo와 userFrom을 저장해야함
    const subscribe = new Subscriber(req.body)

    subscribe.save((err, doc) => {
        if(err) return res.json({ success: false, err })
        res.status(200).json({ success: true })
    })
   
});


module.exports = router;
