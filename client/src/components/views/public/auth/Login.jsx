/**
 *    © 2022 Abraham Mitiku
 *    Open Source MERN Dashboard Template
 * 
 */
// -----------------------------------------------------------------
/**
 *     SIGN IN / Login page
 */
//--------------------------------------------------------------------
import React from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import {login} from '../../../../api/user.api';
import {setLocalStorage} from '../../../../utils/Storage';
import GoogleLogin from 'react-google-login';
import {setCookie} from '../../../../utils/Cookies';
import config from '../../../../constants/config';
import FormControl from '@mui/material/FormControl';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button'; 
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import GoogleIcon from '@mui/icons-material/Google';
import { blue, red} from '@mui/material/colors';
import AMBackdrop from '../../../layouts/feedbacks/AMBackdrop';
import AMAlert from '../../../layouts/feedbacks/AMAlert';

const Login = props =>{
  let navigate = useNavigate();
  let location = useLocation();
  const [error, setError] = React.useState("");
  const [errorColor, setErrorColor] = React.useState('error');
  const [open, setOpen] = React.useState(false);
  const [required, setRequired] = React.useState({
    email: false,
    password: false,
  })
  const handleClose = () => {
    setOpen(false);
  };

  /**
   * 
   * LOCAL LOGIN
   */
  const handleLocalLogin = async (e) => {
  setError('');
  setAlertOpen(true);
  setOpen(true);
  setRequired({
    ...required,
    email: false,
  });
  setRequired({
    ...required, 
    password: false,
  });
  e.preventDefault();
  if(!(values.email && values.password)){
    let isEmail, isPassword;
    if(!values.email){
      isEmail = true;
    }
    if(!values.password){
      isPassword = true;
    }
    setRequired({
      ...required,
      email: isEmail,
      password: isPassword,
    });
    setOpen(false)
    return;
  }

  await login.local(values.email, values.password).then((res)=>{
    const {data} = res;
    if (data.status) {
      setError("Success, redirecting ...");
      setErrorColor('success');
      setLocalStorage("access", data.accessToken);
      setLocalStorage("user", data.data);
      setCookie('refresh', data.refreshToken, 7)
      setTimeout(()=>{
        setOpen(false)
        let from = location.state?.from?.pathname || "/user";
        navigate(from, { replace: true });
      },500)   
    }
    else{
      setTimeout(()=>{
        setOpen(false)
        navigate('/auth/notification/1') // notify to verify email address if not verified
      },500)
    }
    }).catch(err=>{
      setOpen(false)

      if(err.message === 'Request failed with status code 404'){
        setError('User is not exist!');
        setErrorColor('error');
      }
      else{
        setError('Error, Please try later!');
        setErrorColor('error');
      }
  });
      
       
  }
/**
   * 
   * GOOGLE LOGIN
   */
  const handleGoogleLogin = async(response) => {
    setOpen(true);
      let email = response.profileObj && response.profileObj.email;
      let firstName = response.profileObj && response.profileObj.givenName;
      let lastName = response.profileObj && response.profileObj.familyName;
      let imageUrl = response.profileObj && response.profileObj.imageUrl;
      
      await login.google(email, firstName, lastName, imageUrl).then((res)=>{
        const {data} = res;
        if (data.status) {
          setError("Success, redirecting ...");
          setErrorColor('success');
          setLocalStorage("access", data.accessToken);
          setLocalStorage("user", data.data);
          setCookie('refresh', data.refreshToken, 7)
          setTimeout(()=>{
            setOpen(false)
            let from = location.state?.from?.pathname || "/user"; 
            navigate(from, { replace: true });
          },500);
        } 
    }).catch(err=>{
      setOpen(false);
      
    });
    setError("You're offline.");
    setErrorColor('error');
  }

  const [values, setValues] = React.useState({
    email: '',
    password: '',
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setRequired({
      ...required,
      [prop]: false
    });
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [alertOpen, setAlertOpen] = React.useState(true);
  return(
   <>
      <AMBackdrop
      open={open}
      />
      <Container component="main" maxWidth="xs" >
        <Box
        sx={{
        marginTop: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: 1,
        bgcolor: '#fafafa',
        border: 1,
        borderColor: `#e0e0e0`,
        mt:6,
        }}
        >
          <Box
          sx={{
          width: `100%`,
          p:2,
          }}
          >
            <Box
            sx={{
              p:2,
              mt:-6,
              borderRadius: 2,
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
              border: 1,
              borderColor: `#e0e0e0`,
            }}
            >
            <Avatar sx={{m: 'auto', bgcolor: '#e65100' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h5" sx={{fontWeight: 700, mb:1, mt:1, textAlign: 'center', color: '#b71c1c'}}>
              Sign In
            </Typography>
            <Button variant="contained"
            color={`error`}  sx={{height:40, width: `100%`}}>
              <GoogleIcon sx={{fontSize: 25}} />  &nbsp; &nbsp;<b >Continue with Google</b>
            </Button>
            </Box>
          </Box>
          <Box component="form" onSubmit={handleLocalLogin} noValidate sx={{ mt: -3, p:4 }}>
              <Grid 
              container
              justifyContent='center'
              alignItem="center"
              columnGap={1}
              spacing={0}
              >
                <Grid item xs='10'>
                 {
                   error?
                   <>
                   <AMAlert
                    alertTextColor={errorColor}
                    alertText={error}
                   />
                   </>
                   :
                   <>
                   
                   </>
                 }
                 <FormControl sx={{width: '100%', mt:2 }} variant="outlined"
                  color={required.email?'error': 'primary'} focused={required.email?true: false}
                 >
                  <InputLabel htmlFor="outlined-adornment-lastname" sx={{fontSize:12}}>{required.email? '* Required': 'Email'}</InputLabel>
                  <OutlinedInput
                    type={`email`}
                    value={values.email}
                    onChange={handleChange('email')}
                    sx={{fontSize:12}}
                    id="email"
                    label="Email Address" 
                    name="email"
                  />
                  </FormControl>
                  <FormControl sx={{width: '100%', mt:2 }} variant="outlined"
                  color={required.password?'error': 'primary'} focused={required.password?true: false}
                  >
                  <InputLabel htmlFor="outlined-adornment-password" sx={{fontSize:12}}>{required.password? '* Required': 'Password'}</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={values.showPassword ? 'text' : 'password'}
                    value={values.password}
                    onChange={handleChange('password')}
                    sx={{fontSize:12}}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {values.showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>
                <Button
                type="submit"
                fullWidth
                variant="contained"
                color={`secondary`}
                sx={{ mt: 3, mb: 1, height: 41 }}
                >
                Sign In
                </Button>
               
              </Grid>
              <Grid container>
                <Grid item xs>
                  <Link href="/auth/forgot-password" variant="body2" sx={{fontSize: 12, color: blue[600], fontWeight: 700}}>
                    <Typography variant="h6">
                      Forgot password?
                    </Typography>
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/auth/register" variant="body2" sx={{fontSize: 12, color: red[600], fontWeight: 600}}>
                    <Typography variant="h6" color="info">
                      Not Registered? <b style={{color: blue[600]}}>Sign Up</b>
                    </Typography>
                  </Link> 
                </Grid>
                </Grid>
                </Grid>

          </Box>
          </Box>
      </Container>

   </>
  )
};
export default Login;