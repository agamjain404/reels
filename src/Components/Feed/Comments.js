import React, { useEffect, useState } from 'react'
import { database } from '../../firebase';
import { CircularProgress } from '@mui/material';
import Avatar from '@mui/material/Avatar';


function Comments({ postData }) {
  const [comments, setComments] = useState(null);

  useEffect(() => {
    async function fetchComments() {
        let arr = [];
        for (let i =0; i < postData.comments.length; i++) {
            let data = await database.comments.doc(postData.comments[i]).get();
            arr.push(data.data());
        }
        setComments(arr);
    }
    fetchComments();
  }, [postData])

  return (
    <div>
      {
        comments === null ? <CircularProgress/> :
        <>
            {
                comments.map((comment, index) => (
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <Avatar alt="Profile" src={comment.userProfileImage} />
                        <p>
                            <span style={{ fontWeight: 'bold', marginLeft: '8px' }}>
                                {comment.userName}
                            </span>
                            &nbsp;
                            &nbsp;
                            <span>
                                {comment.text}
                            </span>
                        </p>
                    </div>
                ))
            }
        </>
      }
    </div>
  )
}

export default Comments
