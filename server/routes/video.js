const express = require('express');
const router = express.Router();
// const { Video } = require("../models/Video ");

const { auth } = require("../middleware/auth");
const path = require('path');
const multer = require("multer");


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



module.exports = router;
