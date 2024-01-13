import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { database } from '../../firebase';
import { CircularProgress, Typography } from '@mui/material';
import Appbar from './AppBar';
import Dialog from '@mui/material/Dialog';
import Card from '@mui/material/Card';
import './Posts.css';
import CommentLike from './CommentLike';
import AddComment from './AddComment';
import Comments from './Comments';
import './Profile.css'

function Profile() {

  const {id} = useParams();
  const [userData, setUserData] = useState(null);
  const [posts, setPosts] = useState(null);
  const [open, setOpen] = useState(null);

  const handleClickOpen = (id) => {
    setOpen(id);
  };

  const handleClose = () => {
    setOpen(null);
  };


  useEffect(() => {
    database.users.doc(id).onSnapshot((snap) => {
        setUserData(snap.data());
    })
  }, [id]);

  useEffect(() => {
    async function fetchPostsData() {
        if (userData && userData.postIds) {
            let pArr = [];
            for(let i=0; i< userData.postIds.length; i++) {
                let postData = await database.posts.doc(userData.postIds[i]).get();
                pArr.push({...postData.data(), postId: postData.id});
            }
            setPosts(pArr);
        }
    }
    fetchPostsData();
  })

  return (
    <>
        {
            userData == null ?
            <CircularProgress/> :
            <>
                <Appbar userData={userData}/>
                <div className='spacer'>

                </div>
                <div className='container'>
                    <div className='upper-part'>
                        <div className='profile-img'>
                            <img alt='' src={userData.profileUrl}/>
                        </div>
                        <div className='info'>
                            <Typography variant='h5'>
                                Email : {userData.email}
                            </Typography>
                            <Typography variant='h6'>
                                Posts : {userData?.postIds?.length || 0}
                            </Typography>
                        </div>
                    </div>
                    <hr style={{ marginTop: '3rem', marginBottom: '3rem' }}/>
                    {
                        posts !== null ? 
                        <div className='profile-videos'>
                            {
                                posts.map((post, index) => (
                                    <React.Fragment key={index}>
                                        <div className='videos'>
                                            <video muted="muted" onClick={() => handleClickOpen(post.postId)}>
                                                <source src={post.postUrl}/>
                                            </video>
                                            <Dialog
                                                open={open === post.postId}
                                                onClose={handleClose}
                                                aria-labelledby="alert-dialog-title"
                                                aria-describedby="alert-dialog-description"
                                                fullWidth={true}
                                                maxWidth='md'
                                            >
                                                <div className='modal-container'>
                                                    <div className='video-modal-container'>
                                                    <video autoPlay={true} muted="muted" controls>
                                                            <source src={post.postUrl}/>
                                                    </video>
                                                    </div>
                                                    <div className='comment-container'>
                                                        <Card className='card1' style={{padding: '1rem'}}>
                                                            <Comments postData={post}/>
                                                        </Card>
                                                        <Card variant='outlined' className='card2'>
                                                            <Typography style={{ padding: '0.4rem' }}>
                                                                {post.likes.length === 0 ? '' : `Liked by ${post.likes.length} users.`}
                                                            </Typography>
                                                            <div style={{display: 'flex'}}>
                                                                <CommentLike postData={post} userData={userData} style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}></CommentLike>
                                                                <AddComment userData={userData} postData={post}/>
                                                            </div>
                                                        </Card>
                                                    </div>
                                                </div>
                                            </Dialog>
                                        </div>
                                    </React.Fragment>
                                ))
                            }
                        </div> :
                        <></>
                    }
                </div>
            </>
        }
    </>
  )
}

export default Profile
