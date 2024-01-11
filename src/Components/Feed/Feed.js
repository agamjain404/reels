import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../Context/AuthContext'
import { useNavigate } from 'react-router-dom';
import UploadFile from './UploadFile';
import Posts from './Posts';
import { database } from '../../firebase';
import Appbar from './AppBar';

function Feed() {

  const [user, setUser] = useState(null);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(()=> {
    async function fetchData() {
      const user = (await database.users.doc(sessionStorage.getItem('userId')).get()).data();
      setUser(user);
    }
    fetchData();
  }, [])

  const logoutClick = async() => {
    await logout();
    navigate('/login');
  }
  return (
    <div>
      <Appbar userData={user}/>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
        {/* <div style={{width: '50%'}}>
          <h1> I am Feed. </h1>
          <button onClick={logoutClick}>Logout</button>
        </div> */}
        <UploadFile />
        <Posts user={user}/>
      </div>
    </div>
  )
}

export default Feed
