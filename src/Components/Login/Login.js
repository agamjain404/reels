import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import insta from './../../Assets/Instagram.JPG';
import { makeStyles } from '@mui/styles';
import { CarouselProvider, Slider, Slide, Image } from 'pure-react-carousel';
import { Link, useNavigate } from "react-router-dom";
import bg from './../../Assets/insta.png';
import './Login.css';
import 'pure-react-carousel/dist/react-carousel.es.css';
import img1 from './../../Assets/img1.jpg'
import img2 from './../../Assets/img2.jpg'
import img3 from './../../Assets/img3.jpg'
import img4 from './../../Assets/img4.jpg'
import img5 from './../../Assets/img5.jpg'
import { AuthContext } from '../../Context/AuthContext';
import { useContext, useState } from 'react';

export default function Login() {
  const useStyles = makeStyles({
    text1: {
        color: 'grey',
        textAlign: 'center'
    },
    text2: {
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
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = async() => {
    try {
        setError('');
        setLoading(true);
        await login(email, password);
        setLoading(false);
        navigate('/');
    } catch (error) {
        setError(error.message);
        setTimeout(() => {
            setError('');
        }, 2000);
        setLoading(false);
    }
  }

  return (
    <div className='loginWrapper'>
        <div className='imgcar' style={{ backgroundImage: 'url('+bg+')', backgroundSize: 'cover' }}>
            <div className='car'>
            <CarouselProvider
                visibleSlides={1}
                totalSlides={5}
                naturalSlideHeight={423}
                naturalSlideWidth={238}
                hasMasterSpinner
                isPlaying={true}
                infinite={true}
                dragEnabled={false}
                touchEnabled={false}
            >
                <Slider>
                    <Slide index={0}><Image src={img1}/></Slide>
                    <Slide index={1}><Image src={img2}/></Slide>
                    <Slide index={2}><Image src={img3}/></Slide>
                    <Slide index={3}><Image src={img4}/></Slide>
                    <Slide index={4}><Image src={img5}/></Slide>
                </Slider>
            </CarouselProvider>
            </div>
        </div>
        <div className='loginCard'>
            <Card variant='outlined'>
                <div className='insta-logo'>
                    <img src={insta} alt='Instagram' />
                </div>
                <CardContent>
                    {error !== '' && <Alert severity="error">{error}</Alert>
    }
                    <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth={true} margin="dense" size='small' value={email} onChange={(event) => setEmail(event.target.value)}/>
                    <TextField id="outlined-basic" label="Password" type='password' variant="outlined" fullWidth={true} margin="dense" size='small' value={password} onChange={(event) => setPassword(event.target.value)}/>
                    <Typography className={classes.text2} color='primary' variant="subtitle1">
                        Forgot Password?
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button color='primary' fullWidth={true} variant='contained' disabled={loading} onClick={handleLogin}>LOG IN</Button>
                </CardActions>
            </Card>
            <Card variant='outlined' className={classes.card2}>
                <CardContent style={{ marginTop: '0.5rem' }}>
                    <Typography className={classes.text1} variant="subtitle1">
                        Don't have an account ? <Link to='/signup' style={{ textDecoration: 'none' }}>Sign Up</Link>
                    </Typography>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}