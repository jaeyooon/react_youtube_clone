import React, { useEffect, useState } from 'react'
import { Row, Col, List, Avatar } from 'antd'; // 반응형 웹을 위해
import Axios from 'axios';
import SideVideo from './Sections/SideVideo';

function VideoDetailPage(props) {

    const videoId = props.match.params.videoId  // videoId 가져옴
    const variable = { videoId: videoId }

    const [VideoDetail, setVideoDetail] = useState([])
    
    useEffect(() => {
        
        Axios.post('/api/video/getVideoDetail', variable) // variable에 videoId를 담아서 이를 통해 해당 비디오를 MongoDB에서 가져옴
            .then(response => {
                if(response.data.success) {
                    setVideoDetail(response.data.videoDetail)
                } else {
                    alert('비디오 정보를 가져오는데 실패하였습니다.')
                }
            })

    }, [])

    if(VideoDetail.writer) {
        return ( 
            <Row gutter={[16, 16]}>
                {/* ----- 하나의 비디오 영상 나오는 부분 ----- */}
                <Col lg={18} xs={24}>
    
                <div style={{ width: '100%', padding: '3rem 4rem' }}>
                    <video style={{ width: '100%' }} src={`http://localhost:5000/${VideoDetail.filePath}`} controls />    {/* 백서버는 5000 */}
    
                    <List.Item
                        actions
                    >
                        <List.Item.Meta 
                            avatar={<Avatar src={VideoDetail.writer.image} />}
                            title={VideoDetail.writer.name}
                            description={VideoDetail.description}
                        /> 
                    </List.Item>
    
                    {/* Comments */}
    
    
                </div>
                </Col>
                {/* ----- Side Videos 나오는 부분 ----- */}
                <Col lg={6} xs={24}>
                    <SideVideo />
                </Col>
            </Row>
      )
    } else {
        return (
            <div>...loading</div>
        )
    }
   
}

export default VideoDetailPage