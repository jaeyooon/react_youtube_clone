import React, { useEffect, useState } from 'react';
import { Tooltip, Icon } from 'antd';
import Axios from 'axios';


function LikeDislikes(props) {

    const [Likes, setLikes] = useState(0)
    const [Dislikes, setDislikes] = useState(0)
    const [LikeAction, setLikeAction] = useState(null)
    const [DisLikeAction, setDisLikeAction] = useState(null)

    let variable = {}
        
    
    if(props.video) {    // video에 대한 좋아요 & 싫어요일 경우
            variable = { videoId: props.videoId, userId: props.userId }  // 부모 컴포넌트인 VideoDetailPage로부터 가져옴
    } else {         // comment에 대한 좋아요 & 싫어요일 경우
            variable = { commentId: props.commentId , userId: props.userId } // 부토 컴포넌트인 SingleComment로부터 가져옴
    }

    useEffect(() => {
        Axios.post('/api/like/getLikes', variable)
        .then(response => {
            if(response.data.success) {

                // 얼마나 많은 좋아요를 받았는지
                setLikes(response.data.likes.length)
                // 내가 이미 좋아요를 눌렀는지
                response.data.likes.map(like => {   // response.data.likes: 사람들의 비디오나 코멘트에 모든 좋아요 정보
                    if(like.userId === props.userId) {  // props.userId: localStorage에서 가져온 유저(현재 로그인한 유저) Id 가 모든 좋아요 정보 중에 포함되어 있을 경우
                        setLikeAction('liked')  // 이미 좋아요를 눌렀다고 표시해줌
                    }
                })

            } else {
                alert('Like에 정보를 가져오지 못했습니다.')
            }
        })


        Axios.post('/api/like/getDislikes', variable)
        .then(response => {
            if(response.data.success) {

                // 얼마나 많은 싫어요를 받았는지
                setDislikes(response.data.dislikes.length)
                // 내가 이미 싫어요를 눌렀는지
                response.data.dislikes.map(dislike => {   
                    if(dislike.userId === props.userId) {  
                        setDisLikeAction('disliked')  // 이미 싫어요를 눌렀다고 표시해줌
                    }
                })

            } else {
                alert('DisLike에 정보를 가져오지 못했습니다.')
            }
        })
    }, [])

    const onLike = () => {

        if(LikeAction === null) {   // --- 아직 좋아요 버튼이 클릭되어 있지 않을 경우

            Axios.post('/api/like/upLike', variable)
                .then(response => {
                    if(response.data.success) {

                        setLikes(Likes + 1)     // 죻아요 1 올리기
                        setLikeAction('liked')  // 좋아요 이모티콘 채우기

                        if(DisLikeAction !== null) {    // 싫어요가 이미 클릭되어 있었다면
                            setDisLikeAction(null)  // null로 초기화
                            setDislikes(Dislikes - 1)   // 싫어요 1 내리기
                        }

                    } else {
                        alert('Like을 올리지 못하였습니다.')
                    }
                })
        } else {        // --- 좋아요 버튼이 이미 클릭되어 있을 경우

            Axios.post('/api/like/unLike', variable)
                .then(response => {
                    if(response.data.success) {

                        setLikes(Likes - 1)     // 죻아요 1 내리기
                        setLikeAction(null)

                    } else {
                        alert('Like을 내리지 못하였습니다.')
                    }
                })
        }

    }


    const onDisLike = () => {

        if(DisLikeAction !== null) {    // 싫어요 버튼이 이미 클릭되어 있을 경우

            Axios.post('/api/like/unDislike', variable)
            .then(response => {
                if(response.data.success) {

                    setDislikes(Dislikes - 1)
                    setDisLikeAction(null)

                } else {
                    alert('dislike을 지우지 못했습니다.')
                }
            })

        } else {

            Axios.post('/api/like/upDislike', variable)
            .then(response => {
                if(response.data.success) {

                    setDislikes(Dislikes + 1)
                    setDisLikeAction('disliked')

                    if(LikeAction !== null) {   // 좋아요가 이미 클릭되어 있다면
                        setLikeAction(null)
                        setLikes(Likes - 1)
                    }

                } else {
                    alert('dislike을 반영하지 못했습니다.')
                }
            })

        }

    }

    return (
        <div>
            <span key="comment-basic-like">
                <Tooltip title="Like">
                    <Icon type="like"
                        theme={LikeAction === 'liked' ? 'filled' : 'outlined'}
                        onClick={onLike}
                    />
                </Tooltip>
            <span style={{ paddingLeft: '8px', cursor: 'auto' }}> {Likes} </span>
            </span>&nbsp;&nbsp;

            <span key="comment-basic-dislike">
                <Tooltip title="Dislike">
                    <Icon type="dislike"
                        theme={DisLikeAction === 'disliked' ? 'filled' : 'outlined'}
                        onClick={onDisLike}
                    />
                </Tooltip>
            <span style={{ paddingLeft: '8px', cursor: 'auto' }}> {Dislikes} </span>
            </span>&nbsp;&nbsp;
        </div>
    )
}

export default LikeDislikes