/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Menu } from 'antd';
import axios from 'axios';
import { USER_SERVER } from '../../../Config';
import { withRouter } from 'react-router-dom';
import { useSelector } from "react-redux";
import { Avatar } from 'antd'


function RightMenu(props) {
  const user = useSelector(state => state.user)

  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then(response => {
      if (response.status === 200) {
        props.history.push("/login");
      } else {
        alert('Log Out Failed')
      }
    });
  };

  if (user.userData && !user.userData.isAuth) {   // 로그인하지 않은 사람들은 이곳이 렌터링됨
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="mail">
          <a href="/login" style={{marginTop:'10px'}}>Signin</a>
        </Menu.Item>
        <Menu.Item key="app">
          <a href="/register">Signup</a>
        </Menu.Item>
      </Menu>
    )
  } else {  // 로그인한 사람들은 이곳이 렌더링됨
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="upload">
          <a href="/video/upload">
              <span className="material-symbols-outlined" style={{display: 'flex', alignItems: 'center', marginBottom: '10px'}}>
                video_call
              </span>
          </a>
        </Menu.Item>
        <Menu.Item key="logout">
          <a onClick={logoutHandler} style={{marginTop:'10px'}}>Logout</a>
        </Menu.Item>
        <Menu.Item>
            { user.userData &&
            <div style={{ marginBottom: '10px' }}>
                <Avatar src={user.userData.image} alt="user_image" />
                <span style={{ marginLeft: '10px', marginBottom: '10px' }}>{user.userData.name}</span>
            </div>
            }
        </Menu.Item>
      </Menu>
    )
  }
}

export default withRouter(RightMenu);

