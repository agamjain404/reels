import React, { useContext } from 'react'
import { AuthContext } from '../../Context/AuthContext'
import { useNavigate } from 'react-router-dom';

function Feed() {

  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const logoutClick = async() => {
    await logout();
    navigate('/login');
  }
  return (
    <div>
      <h1> I am Feed. </h1>
      <button onClick={logoutClick}>Logout</button>
    </div>
  )
}

export default Feed
