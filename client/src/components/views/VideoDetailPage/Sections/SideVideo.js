import React, {useEffect, useState} from 'react'
import Axios from 'axios'

function SideVideo() {

    const [sideVideos, setsideVideos] = useState([])

    useEffect(() => {

        Axios.get('/api/video/getVideos')
        .then(response => {
            if(response.data.success) {
                console.log(response.data.videos)
                setsideVideos(response.data.videos)
            } else {
                alert('비디오 가져오기를 실패하였습니다.')
            }
        })
    
    }, [])

    const renderSideVideo = sideVideos.map((video, index) => {  // 카드 template이 여러 개 있으므로 map 사용, 모든 sideVideo 데이터를 넣어줌

        var minutes = Math.floor(video.duration / 60);
        var seconds = Math.floor(video.duration - minutes * 60);

        return (
            // --- 한개의 카드 template
            <div key={index} style={{ display: 'flex', marginTop: '1rem', padding: '0 2rem' }}>
                <div style={{ width: '40%', marginRight: '1rem' }}>
                    <a href={`/video/${video._id}`}>
                        <img style={{ width: '100%', borderRadius: '7px' }} src={`http://localhost:5000/${video.thumbnail}`} alt="thumbnail" />
                    </a>
                </div>
    
                <div style={{ width: '50%' }}>
                    <a href={`/video/${video._id}`} style={{ color: 'gray' }}>
                        <span style={{ fontSize: '1rem', color: 'black' }}>{video.title}</span><br />
                        <span>{video.writer.name} </span><br />
                        <span>{video.views} views </span><br />
                        <span>{minutes} : {seconds } </span>
                    </a>
                </div>
            </div>
        )
    })      

    return (
        <React.Fragment>
            <div style={{ marginTop:'3rem' }}></div>
            {renderSideVideo}


        </React.Fragment>
        
       
    )
}

export default SideVideo