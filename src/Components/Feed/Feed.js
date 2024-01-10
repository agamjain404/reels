import React, { useContext } from 'react'
import { AuthContext } from '../../Context/AuthContext'
import { useNavigate } from 'react-router-dom';
import UploadFile from './UploadFile';

function Feed() {

  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const logoutClick = async() => {
    await logout();
    navigate('/login');
  }
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
      <div style={{width: '50%'}}>
        <h1> I am Feed. </h1>
        <button onClick={logoutClick}>Logout</button>
      </div>
      <UploadFile />
    </div>
  )
}

export default Feed
