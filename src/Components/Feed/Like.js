import React, { useEffect, useState } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { database } from '../../firebase';
import './Posts.css'

function Like({ userData, postData }) {
  const [like, setLike] = useState(null);
  
  useEffect(() => {
    const check = postData.likes.includes(userData.userId) ? true : false
    setLike(check);
  }, [postData]);

  const handleLike = () => {
    if (like === true) {
        let narr = postData.likes.filter((el) => el != userData.userId);
        database.posts.doc(postData.postId).update({
            likes: narr
        })
    } else {
        let narr = [...postData.likes, userData.userId];
        database.posts.doc(postData.postId).update({
            likes: narr
        })
    }
  }
  return (
    <div>
      {
        like !== null ?
        <>
            {
                like === true ? <FavoriteIcon className={`icons-styling like`} onClick={handleLike}/>: <FavoriteIcon className={`icons-styling unlike`} onClick={handleLike}/>
            }
        </> :
        <></> 
      }
    </div>
  )
}

export default Like
