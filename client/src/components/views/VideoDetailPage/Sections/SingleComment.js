import React, { useState } from 'react'
import { Comment, Avatar, Button, Input } from 'antd';
import Axios from 'axios';
import { useSelector } from 'react-redux'

const { TextArea } = Input;

function SingleComment(props) {

    const user = useSelector(state => state.user);
    // 이미 있는 댓글에 대해 댓글을 또 작성하려고 할 때만 댓글 창이 열리도록 상태 관리
    const [OpenReply, setOpenReply] = useState(false)   // 처음에는 reply to 댓글 창이 열려있지 않도록 false로!
    const [CommentValue, setCommentValue] = useState("")

    const onClickReplyOpen = () => {    // Reply to 를 클릭하면 토글 기능(열렸다, 닫혔다 함)
        setOpenReply(!OpenReply)
    }

    const onHandleChange = (event) => {
        setCommentValue(event.currentTarget.CommentValue)
    }

    const onSubmit = (event) => {
        event.preventDefault();

        // 댓글 작성하는 유저 정보, 댓글 내용 등을 모아서 백앤드에  request 보냄
        // ✨누군가의 댓글에 대해 또 댓글을 작성하는 경우도 있으므로(대댓글) variables에 responseTo property 필요! 
        const variables = {
            content: CommentValue,
            writer: user.userData._id,  // redux 사용해서 유저의 Id를 가져옴, localStorage를 이용해서 userId를 가져오는 방법도 있음
            postId: props.postId,    // ✨부모 컴포넌트인 Comment.js에서 postId 가져옴
            responseTo: props.comment._id
        }

        Axios.post('/api/comment/saveComment', variables)   // variables라는 property를 넣어줌
        .then(response => {
            if(response.data.success) {
                console.log(response.data.result)
                setCommentValue("")
                props.refreshFunction(response.data.result) // ✨저장된 댓글을 부모 컴포넌트(VideoDetailPage)에 업데이트 하기위해
            } else {
                alert('코멘트를 저장하지 못했습니다.')
            }
        })
    }

    const actions = [
        <span onClick={onClickReplyOpen} key="comment-basic-reply-to"> Reply to</span>
    ]

    return (
        <div>
            <Comment 
                actions={actions}
                author={props.comment.writer.name}
                avatar={<Avatar src={props.comment.writer.image} alt />}
                content={<p> {props.comment.content}</p>}   
            />


            {OpenReply &&       // OpenReply가 true일 때만 댓글 창이 열리도록
                <form style={{ display: 'flex' }} onSubmit={onSubmit}>
                <textarea 
                    style={{ width: '100%', borderRadius: '5px' }}
                    onChange={onHandleChange}    //comment를 타이핑하여 작성할 때마다 반응이 나타나도록 
                    value={CommentValue}
                    placeholder='코멘트를 작성해주세요.'
                />
                <br />
                <button style={{ width: '20%', height: '52px' }} onClick={onSubmit} >Submit</button>
                </form>
            }
            
        </div>
    )
}

export default SingleComment