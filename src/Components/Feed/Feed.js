import React, { useEffect, useState } from 'react'
import UploadFile from './UploadFile';
import Posts from './Posts';
import { database } from '../../firebase';
import Appbar from './AppBar';

function Feed() {

  const [user, setUser] = useState(null);

  useEffect(()=> {
    async function fetchData() { 
      const userId = sessionStorage.getItem('userId');
      const user = await database.users.doc(userId).get();
      const userData = user.data();
      setUser(userData); 
    }
    fetchData().catch(console.error);
  }, [])

  return (
    <div>
      <Appbar userData={user}/>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
        <UploadFile />
        <Posts user={user}/>
      </div>
    </div>
  )
}

export default Feed
