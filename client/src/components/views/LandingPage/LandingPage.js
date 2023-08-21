import React, {useEffect, useState} from 'react'
import { FaCode } from "react-icons/fa";
import { Card, Avatar, Col, Typography, Row } from 'antd';
import Axios from 'axios';
import moment from 'moment';

const { Title } = Typography;
const { Meta } = Card;

function LandingPage() {

    const [Video, setVideo] = useState([])  // 비디오들은 array에 담음

    // MongoDB에서 모든 비디오 데이터 가져오기
    useEffect(() => {

        Axios.get('/api/video/getVideos')
        .then(response => {
            if(response.data.success) {
                console.log(response.data)
                setVideo(response.data.videos)
            } else {
                alert('비디오 가져오기를 실패하였습니다.')
            }
        })
    
    }, [])

    const renderCards = Video.map((video, index) => {

        var minutes = Math.floor(video.duration / 60);
        var seconds = Math.floor(video.duration - minutes * 60);

        return <Col lg={6} md={8} xs={24}>  {/*24사이즈가 전체 열 사이즈*/}           
                <div style={{ position: 'relative' }}>
                    <a href={`/video/${video._id}`} > {/* 하나의 비디오에 해당하는 페이지로 이동하도록 video._id를 이용해서 링크를 걸어둠*/}
                        <img style={{ width: '100%', borderRadius: '10px' }} src={`http://localhost:5000/${video.thumbnail}`} alt="thumbnail" />
                        <div className='duration'
                            style={{
                                bottom: 0, right:0, position: 'absolute', margin: '4px', 
                                color: '#fff', backgroundColor: 'rgba(17, 17, 17, 0.8)', opacity: 0.8, 
                                padding: '2px 4px', borderRadius:'2px', letterSpacing:'0.5px', fontSize:'12px',
                                fontWeight:'500', lineHeight:'12px'
                            }}>
                            <span>{minutes} : {seconds}</span>
                        </div>
                    </a>
                </div>
            
            <br />
            <Meta
                avatar={
                    <Avatar src={video.writer.image} />     // Avatar는 user(writer) 이미지
                } 
                title={video.title}     // 비디오 제목
                description=""
            />
            <span>{video.writer.name} </span><br />
            <span style={{ marginLeft: '3rem' }}> {video.views} views</span>    {/* 비디오 본 사람 수 */}
            - <span> {moment(video.createdAt).format("MMM Do YY")} </span>  {/* 업데이트 */}
        </Col>

    })

    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
        <Title level={2} > Recommended </Title>
        <hr />
        <Row gutter={[32, 16]}>
            
            {renderCards}
            

        </Row>
    </div>
    )
}

export default LandingPage
