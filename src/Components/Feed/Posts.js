import React, { useEffect, useState } from 'react'
import { database } from '../../firebase';
import { CircularProgress } from '@mui/material';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import Avatar from '@mui/material/Avatar';
import Video from './Video';
import Like from './Like';
import Dialog from '@mui/material/Dialog';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './Posts.css';
import CommentLike from './CommentLike';
import AddComment from './AddComment';
import Comments from './Comments';

function Posts({user}) {
  const [posts, setPosts] = useState(null);
  const [open, setOpen] = useState(null);

  const handleClickOpen = (id) => {
    setOpen(id);
  };

  const handleClose = () => {
    setOpen(null);
  };

  useEffect(() => {
    let pArr = [];
    
    const unsub = database.posts.orderBy('createdAt', 'desc').onSnapshot((querySnapshot) => {
        pArr = [];
        querySnapshot.forEach((doc) => {
            let data = {...doc.data(), postId: doc.id}
            pArr.push(data);
        })
        setPosts(pArr);
    })
    return unsub;
  }, []);


  return (
    <div>
      {
        posts === null || user == null ? <CircularProgress/> :
        <div className='video-container'>
            {
                posts.map((post, index) => (
                    <React.Fragment key={index}>
                        <div className='videos'>
                            <Video src={post.postUrl}/>
                            <div className='fa' style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                <Avatar alt="Profile" src={user.profileUrl} style={{ marginLeft: '25px' }} />
                                <h4>{user.fullname}</h4>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <Like userData={user} postData={post}/>
                                <ChatBubbleIcon className='chat-styling' onClick={() => handleClickOpen(post.postId)}/>
                            </div>
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
                                                {post.likes.length == 0 ? '' : `Liked by ${post.likes.length} users.`}
                                            </Typography>
                                            <div style={{display: 'flex'}}>
                                                <CommentLike postData={post} userData={user} style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}></CommentLike>
                                                <AddComment userData={user} postData={post}/>
                                            </div>
                                        </Card>
                                    </div>
                                </div>
                            </Dialog>
                        </div>
                    </React.Fragment>
                ))
            }
        </div>
      }
    </div>
  )
}

export default Posts
