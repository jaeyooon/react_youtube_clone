import Axios from 'axios'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'    /* functional component이므로 redux hook을 사용 */


function Comment(props) {

    const videoId = props.postId  // 부모 컴포넌트로부터 postId를 가져옴

    const user = useSelector(state => state.user);  // redux의 state에서 user 정보를 가져옴, 변수 user에는 해당 유저에 대한 모든 정보가 담겨있음
    const [commentValue, setcommentValue] = useState("")

    const handleClick = (event) => {
        setcommentValue(event.currentTarget.value)
    }

    // submit 버튼을 누를 때마다 페이지가 리프레쉬되는게 기본적인 동작인데
    // 그 동작이 일어나지 않도록 하기 위해 event.preventDefault()를 해줌!
    const onSubmit = (event) => {
        event.preventDefault();

        const variables = {
            content: commentValue,
            writer: user.userData._id,  // redux 사용해서 유저의 Id를 가져옴, localStorage를 이용해서 userId를 가져오는 방법도 있음
            postId: videoId
        }

        Axios.post('/api/comment/saveComment', variables)   // variables라는 property를 넣어줌
        .then(response => {
            if(response.data.success) {
                console.log(response.data.result)
            } else {
                alert('코멘트를 저장하지 못했습니다.')
            }
        })
    }

  return (
    <div>
        <br />
        <p> Replies</p>
        <hr />

        {/* Comment Lists */}


        {/* Root Comment Form */}

        <form style={{ display: 'flex' }} onSubmit={onSubmit}>
            <textarea 
                style={{ width: '100%', borderRadius: '5px' }}
                onChange={handleClick}    //comment를 타이핑하여 작성할 때마다 반응이 나타나도록 
                value={commentValue}
                placeholder='코멘트를 작성해주세요.'
            />
            <br />
            <button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>Submit</button>
        </form>
    </div>
  )
}

export default Comment