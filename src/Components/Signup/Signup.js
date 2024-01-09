import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import insta from './../../Assets/Instagram.JPG';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { AuthContext } from '../../Context/AuthContext';
import { makeStyles } from '@mui/styles';
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from 'react';
import { storage } from '../../firebase';
import { database } from '../../firebase';
import './Signup.css';

export default function Signup() {

  const useStyles = makeStyles({
    text1: {
        color: 'grey',
        textAlign: 'center'
    },
    card2: {
        height: '4vh',
        margin: '2%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
  })
  const classes = useStyles();

  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signup } = useContext(AuthContext);

  const handleSignup = async () => {
    if (profile == null) {
        setError('Please upload profile image first');
        setTimeout(() => {
            setError('');
        }, 2000);
        return;
    }

    try {
        setError('');
        setLoading(true)
        const userObj = await signup(email, password);
        const uid = userObj.user.uid;
        const uploadTask = storage.ref(`/users/${uid}/ProfileImage`).put(profile);
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
                console.log(url);
                database.users.doc(uid).set({
                    email: email,
                    userId: uid,
                    fullname: name,
                    profileUrl: url,
                    createdAt: database.getTimeStamp()
                })
            })
            setLoading(false)
            navigate('/');
        }
    } catch(err) {
        setError(err.message);
        setTimeout(() => {
            setError('')
        }, 2000)
        setLoading(false)
        return;
    }
  }
  return (
    <div className='signupWrapper'>
        <div className='signupCard'>
            <Card variant='outlined'>
                <div className='insta-logo'>
                    <img src={insta} alt='Instagram' />
                </div>
                <CardContent>
                    <Typography className={classes.text1} variant="subtitle1">
                        Sign up to see photos and videos from your friends.
                    </Typography>
                    {error !== '' && <Alert severity="error">{error}</Alert>
    }
                    <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth={true} margin="dense" size='small' value={email} onChange={(event)=>setEmail(event.target.value)}/>
                    <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth={true} margin="dense" size='small' value={password} onChange={(event)=>setPassword(event.target.value)}/>
                    <TextField id="outlined-basic" label="Full Name" variant="outlined" fullWidth={true} margin="dense" size='small' value={name} onChange={(event)=>setName(event.target.value)}/>
                    <Button color="secondary" fullWidth={true} variant='outlined' margin="dense" startIcon={<CloudUploadIcon/>} component="label">
                        <input type='file' accept='image/*' hidden onChange={(event) => setProfile(event.target.files[0])}/>
                        { profile ? 'Profile uploaded successfully!'  : 'Upload Profile Image' }
                    </Button>
                </CardContent>
                <CardActions>
                    <Button color='primary' fullWidth={true} variant='contained' disabled={loading} onClick={handleSignup}>SIGN UP</Button>
                </CardActions>
                <CardContent>
                    <Typography className={classes.text1} variant="subtitle1">
                        By Signing up, you agree to our Terms, Data and Cookies Policy.
                    </Typography>
                </CardContent>
            </Card>
            <Card variant='outlined' className={classes.card2}>
                <CardContent style={{ marginTop: '0.5rem' }}>
                    <Typography className={classes.text1} variant="subtitle1">
                        Having an account ? <Link to='/login' style={{ textDecoration: 'none' }}>Login</Link>
                    </Typography>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}