import React, { useState, useEffect } from 'react';
import Axios from 'axios';


function Subscribe(props) {

    const [SubscribeNumber, setSubscribeNumber] = useState(0)
    const [Subscribed, setSubscribed] = useState(false) // false: 구독 X 상태, true: 구독 O 상태

    useEffect(() => {

        let variable = { userTo: props.userTo } // userTo는 해당 비디오 업로드한 유저

        // ----- 해당 비디오의 구독자 수
        Axios.post('/api/subscribe/subscribeNumber', variable)    // 비디오 업로드 한 유저의 Id를 통해 해당 유저를 구독한 사람의 수를 알 수 있음.
            .then(response => {
                if(response.data.success) {
                    setSubscribeNumber(response.data.subscribeNumber)
                } else {
                    alert('구독자 수 정보를 받아오지 못했습니다.')
                }
            })
        
        // ----- 내가 해당 비디오 업로드한 유저를 구독하는지에 대한 정보
        let subscribedVariable = { userTo: props.userTo, userFrom: localStorage.getItem('userId') }    // userFrom은 해당 비디오를 보고있는 나 자신(유저)에 대한 정보를 가져오기 위해 localStorage의 userId 이용

        Axios.post('/api/subscribe/subscribed', subscribedVariable)
        .then(response => {
            if(response.data.success) {
                setSubscribed(response.data.subscribed)
            } else {
                alert('정보를 받아오지 못했습니다.')
            }
        })

    }, [])


    const onSubscribe = () => {

        let subscribedVariable = {
            userTo: props.userTo,
            userFrom: props.userFrom
        }
        
        if(Subscribed) {   // --- 이미 구독 중이라면    ===>    구독 취소

            Axios.post('/api/subscribe/unSubscribed', subscribedVariable)
                .then(response => {
                    if(response.data.success) {
                        setSubscribeNumber(SubscribeNumber - 1)     // 구독 취소 ==> 원래 가지고 있던 SubscribeNumber 상태값 - 1
                        setSubscribed(!Subscribed)  // 원래의 Subscribed 상태와 반대가 되도록 함
                    } else {
                        alert('구독 취소 하는데 실패하였습니다.')
                    }
                })

        } else {           // --- 아직 구독하지 않은 경우   ===>    구독

            Axios.post('/api/subscribe/subscribe', subscribedVariable)
                .then(response => {
                    if(response.data.success) {
                        setSubscribeNumber(SubscribeNumber + 1)     // 새롭게 구독 ==> 원래 가지고 있던 SubscribeNumber 상태값 + 1
                        setSubscribed(!Subscribed)  // 원래의 Subscribed 상태와 반대가 되도록 함
                    } else {
                        alert('구독 하는데 실패하였습니다.') 
                    }
                })

        }

    }


    return (
        <div>
            <button 
                style={{
                    backgroundColor: `${Subscribed ? '#AAAAAA' : '#CC0000'}`, borderRadius: '4px',  // 구독한 상태라면 회색, 구독 안한 상태면 빨간색
                    color: 'white', padding: '10px 16px',
                    fontWeight: '500', fontSize: '1rem', textTransform: 'uppercase'
                }}
                onClick={onSubscribe}
            >
                {SubscribeNumber} {Subscribed ? 'Subscribed' : 'Subscribe'}   {/* 구독을 한 상태이면 Subscribed, 안하고 있다면 Subscribe라고 뜸 */}
            </button>
        </div>
    )
}

export default Subscribe