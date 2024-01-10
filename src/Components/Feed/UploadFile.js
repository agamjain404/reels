import React, { useState } from 'react'
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import MovieIcon from '@material-ui/icons/Movie'
import LinearProgress from '@mui/material/LinearProgress';
import { storage, database } from '../../firebase';
import {v4 as uuidv4} from "uuid";

function UploadFile() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = async(file) => {
    if (file == null) {
        setError('Please select a file First');
        setTimeout(() => {
            setError('');
        }, 2000)
        return;
    } else if (file.size/(1024*1024) > 100) {
        setError("This video is very big");
        setTimeout(() => {
            setError('');
        }, 2000)
        return;
    }
    const uid = uuidv4();
    const user = (await database.users.doc(sessionStorage.getItem('userId')).get()).data();
    console.log(user);
    setLoading(true);
    const uploadTask = storage.ref(`/posts/${uid}/${file.name}`).put(file);
    uploadTask.on('state_changed', fn1, fn2, fn3);
    function fn1 (snapshot) {
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes)*100;
        console.log(`Upload is ${progress} done`);
    }

    function fn2 (error) {
        setError(error.message);
        setTimeout(() => {
            setError('')
        }, 2000)
        setLoading(false)
        return;
    }

    function fn3 () {
        uploadTask.snapshot.ref.getDownloadURL().then((url) => {
            const obj = {
                likes: [],
                comments: [],
                postId: uid,
                postUrl: url,
                userName: user.fullname,
                userProfile: user.profileUrl,
                userId: user.userId,
                createdAt: database.getTimeStamp()
            }
            database.posts.add(obj).then(async(ref) => {
                const res = await database.users.doc(user.userId).update({
                    postIds: user.postIds ? [...user.postIds, ref.id] : [ref.id]
                })
            }).then(() => {
                setLoading(false)
            }).catch((err) => {
                setError(err);
                setTimeout(() => {
                    setError('');
                }, 2000)
                setLoading(false);
            })
        })
        setLoading(false)
    }
  }

  return (
    <div>
      {
        error !== '' ? <Alert severity="error">{error}</Alert> :
        <>
            <input type='file' accept='video/*' id="upload-input" onChange={(event) =>handleChange(event.target.files[0])} style={{display: 'none'}}/>
            <label htmlFor='upload-input'>
                <Button
                    variant='outlined'
                    color='secondary'
                    component="span"
                    disabled={loading}
                >
                    <MovieIcon/>&nbsp;
                    Upload Video
                </Button>
            </label>
            {
                loading && <LinearProgress color="secondary" style={{marginTop: '3%'}} />
            }
        </>
      }
    </div>
  )
}

export default UploadFile
