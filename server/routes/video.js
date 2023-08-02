const express = require('express');
const router = express.Router();
const { Video } = require("../models/Video");    // MongoDB에 업로드 된 비디오 데이터를 저장하기 위해 Video 모델 import

const { auth } = require("../middleware/auth");
const path = require('path');
const multer = require("multer");
var ffmpeg = require("fluent-ffmpeg");


// STROAGE MULTER CONFIG
let storage = multer.diskStorage({
    destination: (req, file, cb) => {   // 파일을 올리면 어디에 저장할지 설정
        cb(null, "uploads/");   // 파일을 uploads 폴더에 저장
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`); // 파일명 형식은 '현재날짜_파일이름'
    },
})

const fileFilter = (req, file, cb) => { // 비디오만 업로드할 수 있도록 하기위해
    const typeArray = file.mimetype.split('/');
    const fileType = typeArray[1];

    if(fileType == 'mp4') {
        cb(null, true);
    } else {
        cb({msg:'mp4 파일만 업로드 가능합니다.'}, false);
    }
   }
   

const upload = multer({ storage: storage, fileFilter: fileFilter }).single("file")  // 파일은 하나만 올릴 수 있게 해서 upload라는 변수에 넣어둠 

//=================================
//             Video
//=================================

router.post('/uploadfiles', (req, res) => {
    
    // client에서 받은 비디오를 서버에 저장함.
    // 파일 저장을 위한 dependency인 multer 다운로드
    upload(req, res, err => {
        if(err) {
            return res.json({ success: false, err })    // success: false를 에러 메시지와 함께 보냄
        }
        return res.json({ success: true, url: res.req.file.path, fileName: res.req.file.filename })    // 파일이 uploads 폴더에 저장된 경로를 url에 넣어서 client에 보내줌
    })
})


router.post('/uploadVideo', (req, res) => {
    
    // 비디오 정보들을 MongoDB에 저장함.

    const video = new Video(req.body)     // client에서 보낸 모든 variables가 req.body에 담겨 있음

    video.save((err, doc) => {  // MongoDB 메서드로 데이터를 DB에 저장
        if(err) return res.json({ success: false, err })
        res.status(200).json({ success: true })      // status 200 성공 메세지와 함께 json형식으로 success: true 라고 보내줌
    })        

})


router.get('/getVideos', (req, res) => {
    
    // 비디오를 DB에서 가져와서 클라이언트에 보냄.

    Video.find()    // Video Collection에 있는 모든 비디오 데이터를 가져옴!
        .populate('writer') // populate를 해줘야 모든 writer 정보를 가져올 수 있음
        .exec((err, videos) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({ success: true, videos }) // success: true와 함께 모든 비디오 데이터를 클라이언트에 보냄
        })
})



router.post('/thumbnail', (req, res) => {
    
    // 썸네일 생성하고 비디오 러닝타임도 가져오기

    let thumbsFilePath ="";
    let fileDuration = ""

    // ----- 비디오 정보 가져오기
    ffmpeg.setFfmpegPath("C:\\Program Files\\ffmpeg\\bin\\ffmpeg.exe");

    ffmpeg.ffprobe(req.body.url, function(err, metadata){
        console.dir(metadata);  // all metadata
        console.log(metadata.format.duration);

        fileDuration = metadata.format.duration;    // fileDuration은 비디오 러닝타임
    })

    // ----- 썸네일 생성
    ffmpeg(req.body.url)    // req.body.url는 client로부터 온 비디오 저장 경로
    .on('filenames', function (filenames) { // 비디오 썸네일 파일 이름 생성
        console.log('Will generate ' + filenames.join(', '))
        console.log(filenames)

        thumbsFilePath = "uploads/thumbnails/" + filenames[0];
    })
    .on('end', function () { // end는 썸네일을 생성하고 난 후에 할 것들
        console.log('Screenshots taken');
        return res.json({ success: true, thumbsFilePath: thumbsFilePath, fileDuration: fileDuration});   // 썸네일 생성 성공했을 경우
    })                                                                                  
    .on('error', function (err) {   // 썸네일 생성 실패했을 경우
        console.error(err);
        return res.json({ success: false, err });
    })
    .screenshots({  // 옵션을 주는 것
        // Will take screens at 20%, 40%, 60% and 80% of the video
        count: 3,   // 3개의 썸네일을 띄울 수 있음
        folder: 'uploads/thumbnails',   // 해당 경로에 썸네일이 저장됨
        size:'320x240', // 썸네일 사이즈
        // %b input basename ( filename w/o extension )
        filename:'thumbnail-%b.png' // 썸네일 파일 이름 형식
    });


})



module.exports = router;
