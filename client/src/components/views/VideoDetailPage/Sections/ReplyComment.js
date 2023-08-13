import React, { useState, useEffect } from 'react'
import SingleComment from './SingleComment'

function ReplyComment(props) {

    const [ChildCommentNumber, setChildCommentNumber] = useState(0)
    const [OpenReplyComments, setOpenReplyComments] = useState(false)
    useEffect(() => {

        let commentNumber = 0;  

        props.commentLists.map((comment) => {

            if(comment.responseTo === props.parentCommentId) {
                commentNumber ++
            }

        })

        setChildCommentNumber(commentNumber)
    
    }, [props.commentLists])      // commentNumber가 바뀔 때마다 즉, commentLists가 바뀔 때마다 useEffect 부분이 다시 실행될 수 있도록 하기 위해

    const renderReplyComment = (parentCommentId) => {
        
        return props.commentLists.map((comment, index) => (    // map을 통해 commentLists 에서 하나의 댓글을 가져옴
            <React.Fragment key={index}>
                {
                    comment.responseTo === (parentCommentId) &&   // ✨responseTo가 없는 1번째 depth 코멘트는 대상이 될 수 없음
                    <div style={{ width: '80%', marginLeft: '40px' }}>
                        <SingleComment refreshFunction={props.refreshFunction} comment={comment} postId={props.postId} />   
                        <ReplyComment commentLists={props.commentLists} postId={props.postId} parentCommentId={comment._id} refreshFunction={props.refreshFunction}/>  {/* 부모 컴포넌트로부터 props를 통해 비디오에 대한 모든 댓글 데이터를 받아옴 */}
                    </div>
                
                }
                </React.Fragment>
        
        ))

    }

    const onHandleChange = () => {
        setOpenReplyComments(!OpenReplyComments)
    }

    
 
    return ( 
        <div>
            
            {/* 2번째 depth 댓글부터 아래 문구가 화면에 렌터링되도록 */}
            {ChildCommentNumber > 0 &&
                <p style={{ fontSize: '14px', margin: 0, color: 'gray' }} onClick={onHandleChange}>
                View {ChildCommentNumber} more comment(s)
                </p>
            }
            
            {OpenReplyComments &&
                renderReplyComment(props.parentCommentId)
            }
            
            
        </div>
    )
}

export default ReplyComment