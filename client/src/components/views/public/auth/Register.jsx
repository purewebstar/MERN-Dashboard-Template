/**
 *    © 2022 Abraham Mitiku
 *    Open Source MERN Dashboard Template
 * 
 */
// -----------------------------------------------------------------
/**
 *     SIGN UP / Register page
 */
//--------------------------------------------------------------------
import React from 'react';
import {register, login} from '../../../../api/user.api';
import {useNavigate, useLocation} from 'react-router-dom';
import {setLocalStorage} from '../../../../utils/Storage';
import {setCookie} from '../../../../utils/Cookies';
import GoogleLogin from 'react-google-login';
import { styled } from '@mui/material/styles';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import VpnKeyRoundedIcon from '@mui/icons-material/VpnKeyRounded';
import PersonPinRoundedIcon from '@mui/icons-material/PersonPinRounded';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import GoogleIcon from '@mui/icons-material/Google';
import config from '../../../../constants/config'
import { teal, blue, red} from '@mui/material/colors';
import AMBackdrop from '../../../layouts/feedbacks/AMBackdrop';

const steps = ['Personal', 'Password'];

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
  }),
}));

const ColorlibStepIcon = (props) =>{
  const { active, completed, className } = props;

  const icons = {
    1: <PersonPinRoundedIcon />,
    2: <VpnKeyRoundedIcon />,
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

const Register = props =>{
   let navigate = useNavigate();
   let location = useLocation();
   const [error, setError] = React.useState("");
   const [checkbox, setCheckbox] = React.useState(false);
   const [errorColor, setErrorColor] = React.useState('secondary');
   const [passwordMatch, setPasswordMatch] = React.useState('Confirm Password')
   const [errorMatch, setErrorMatch] = React.useState('error');
   const [errorEmail, setErrorEmail] = React.useState('secondary');
   const [match, setMatch] = React.useState(false);
   const [validEmail, setValidEmail] = React.useState(false);
   const [passwordStrength, setPasswordStrength] = React.useState(null);
   const [open, setOpen] = React.useState(false);
   const [alertOpen, setAlertOpen] = React.useState(true);
   const [required, setRequired] = React.useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    confirmPassword: false,
  })
  /**
   *  VALIDATING EMAIL
   */
  const validateEmail = ()=>{
    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(values.email.match(mailformat)){
      setValidEmail(true);
      setErrorEmail('success');
    }
    else{
      setValidEmail(false);
      setErrorEmail('error');
    }
  }

  /**
   *  CHECKING PASSWORD STRENGTH [WEAK, MEDIUM & STRENGTH]
   */
   const handleCheckPasswordStrength = (password)=>{
    let strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})');
    let mediumPassword = new RegExp('((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))');
    if(strongPassword.test(password)) {
     // strong strength
     setPasswordStrength(' Strong')
     setErrorColor('success')

    } else if(mediumPassword.test(password)) {
        // medium strength
        setPasswordStrength(' Medium');
        setErrorColor('warning')
    } else {
      //
      setPasswordStrength(' Weak')
      setErrorColor('error')
    }
   }
   /**
    *  CHECKING PASSWORD MATCH
    */
   const handlePasswordMatch = (password, confirmPassword)=>{
     if(password.trim() === confirmPassword.trim()){
       setErrorMatch('success')
      setPasswordMatch('* Match')
      setMatch(true)
      return;
     }
     if(password.trim() != confirmPassword.trim()){
      setErrorMatch('error')
      setPasswordMatch('* Mismatch')
      setMatch(false);
      return;
     }
   }
  //console.log(passwordStrength + '  ' + errorColor)
   const handleClose = () => {
     setOpen(false);
   };

   const handleRegister = async (e) => {
    setError('');
    setAlertOpen(true);
    setOpen(true);
    setRequired({
      ...required,
      firstName: false,
      lastName: false,
      email: false,
      password: false,
      confirmPassword: false,
    });
    e.preventDefault();
    if(!(values.firstName && values.lastName && values.email && values.password && values.confirmPassword)){
      let isFirstName, isLastName, isEmail, isPassword, isConfirmPassword;
      if(!values.firstName){
        isFirstName = true;
      }
      if(!values.lastName){
        isLastName = true;
      }
      if(!values.email){
        isEmail = true;
      }
      if(!values.password){ 
        isPassword = true;
      }
      if(!values.password){
        isConfirmPassword = true;
      }
      setRequired({
        ...required,
        firstName: isFirstName,
        lastName: isLastName,
        email: isEmail,
        password: isPassword,
        confirmPassword: isConfirmPassword
      });
    }
    await register.local(values.firstName, values.lastName, values.email,values.password).then((res)=>{
      
      const {data} = res;
      if (data.status) {
          setError("");
          setTimeout(()=>{
            navigate('/auth/notification/0') // notify to verify email address if not verified
          },2000);       
        } 
      }).catch(err=>{
          setOpen(false); 
          setError('Invalid input data!');
      });     
      setOpen(false); 
    }
  
    const handleGoogleRegister = async(response) => {
        setOpen(true);
        let email = response.profileObj&&response.profileObj.email;
        let firstName = response.profileObj&&response.profileObj.givenName;
        let lastName = response.profileObj&&response.profileObj.familyName;
        let imageUrl = response.profileObj&&response.profileObj.imageUrl;
        await login.google(email, firstName, lastName, imageUrl).then((res)=>{
          const {data} = res;
          if (data.status) {
            setLocalStorage("access", data.accessToken);
            setCookie('user', data.data, 7)
            setTimeout(()=>{
              setOpen(false)
              setCookie('refresh', data.refreshToken, 7)
              let from = location.state?.from?.pathname || "/user"; 
              navigate(from, { replace: true });
            },1500);    
          } 
      }).catch(err=>{
        setOpen(false);
      });
      setOpen(false);
    }

    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());

    const isStepOptional = (step) => {
      return step === 1;
    };

    const isStepSkipped = (step) => {
      return skipped.has(step);
    };

    const handleNext = () => {
      let newSkipped = skipped;
      if (isStepSkipped(activeStep)) {
        newSkipped = new Set(newSkipped.values());
        newSkipped.delete(activeStep);
     }
     setActiveStep((prevActiveStep) => prevActiveStep + 1);
     setSkipped(newSkipped);
    };
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

  const [values, setValues] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    showPassword: false,
    showConfirmPassword: false,
  });


  const handleChange = (prop) => (event) => {
    setRequired({
      ...required,
      [prop]: false
    });
    setValues({ ...values, [prop]: event.target.value });
    if(activeStep === 0){
      validateEmail();
    }
    if(activeStep === 1){

      if(prop === 'password'){
        handleCheckPasswordStrength(values.password);
      }
      handlePasswordMatch(values.password, values.confirmPassword);
    }
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

  const handleClickShowConfirmPassword = () => {
    setValues({
      ...values,
      showConfirmPassword: !values.showConfirmPassword,
    });
  };

  const handleMouseDownConfirmPassword = (event) => {
    event.preventDefault(); 
  };
  return(
    <>
      <AMBackdrop
      open={open}
      />
       <Container component="main" maxWidth="xs">
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
              Sign Up
            </Typography>
            <Button variant="contained"
            color={`error`}  sx={{height:40, width: `100%`}}>
              <GoogleIcon sx={{fontSize: 25}} />  &nbsp; &nbsp;<b >Continue with Google</b>
            </Button>
            </Box>
          </Box>
          <Box component="form" onSubmit={handleRegister} noValidate sx={{ mt: -4, p:4, width: `100%` }}>
              <Stepper activeStep={activeStep}  alternativeLabel connector={<ColorlibConnector />}>
                {steps.map((label, index) => {
                  const stepProps = {};
                  if (isStepSkipped(index)) {
                    stepProps.completed = false;
                  }
                  return (
                    <Step key={label} {...stepProps}> 
                      <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                    </Step>
                  );
                })}
              </Stepper>
                {activeStep === steps.length ? (
                  <React.Fragment>
                    <Typography variant="h4" sx={{ mt: 2, textAlign: `center`, fontWeight: 700, color: teal[600] }}>
                      Account Form is completed!
                    </Typography>
                    <Typography variant="h6" sx={{ mt: 1, textAlign: `center`, fontWeight: 400 }}>
                      After Clicking <b style={{color: blue[500]}}>Create New Account</b>
                       Button below, We will sent a <b style={{color: red[500]}}>verification link</b> to your email address.
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                      <Box sx={{ flex: '1 1 auto' }} />
                      <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="secondary"
                      sx={{ mt: 0, mb: 1, height: 38 }}
                      >
                      CREATE NEW ACCOUNT
                      </Button>
                    </Box>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    {
                      (activeStep === 0)?
                      <>
                      <Grid 
                      container
                      justifyContent='center'
                      alignItem="center"
                      columnGap={1}
                      spacing={0}
                      >
                        <Grid item xs='10'>
                        <FormControl sx={{width: '100%', mt:2 }} variant="outlined"
                        color={required.firstName?'error': 'primary'} focused={required.firstName?true: false}
                        >
                          <InputLabel htmlFor="outlined-adornment-firstname" sx={{fontSize:12}}>{required.firstName? '* Required': 'First Name'}</InputLabel>
                          <OutlinedInput
                            id="text"
                            type={`text`}
                            value={values.firstName}
                            onChange={handleChange('firstName')}
                            label="First-Name"
                            name="firstName"
                            sx={{fontSize: 14}}
                          />
                          </FormControl>
                          <FormControl sx={{width: '100%', mt:2 }} variant="outlined"
                           color={required.lastName?'error': 'primary'} focused={required.lastName?true: false}
                          >
                          <InputLabel htmlFor="outlined-adornment-lastname" sx={{fontSize:12}}>{required.lastName? '* Required': 'Last Name'}</InputLabel>
                          <OutlinedInput
                            id="text"
                            type={`text`}
                            value={values.lastName}
                            onChange={handleChange('lastName')}
                            label="Last-Name"
                            name="lastName"
                            sx={{fontSize:12}}
                          />
                          </FormControl>
                          <FormControl sx={{width: '100%', mt:2 }} variant="outlined"
                          color={errorEmail} 
                          focused={validEmail?true: false}
                          >
                          <InputLabel htmlFor="outlined-adornment-lastname" sx={{fontSize:12}}>{required.email? '* Required': 'Email'}</InputLabel>
                          <OutlinedInput
                            type={`email`}
                            value={values.email}
                            onChange={handleChange('email')}
                            id="email"
                            label="Email Address"
                            name="email"
                            sx={{fontSize:12}}
                          />
                          </FormControl>
                        </Grid>                    
                      </Grid>
                      </>
                      :
                      <>
                      <Grid 
                      container
                      justifyContent='center'
                      alignItem="center"
                      columnGap={1}
                      spacing={0}
                      >
                        <Grid item xs='10'>
                         <FormControl sx={{width: '100%', mt:3 }} 
                         variant="outlined"
                         color={errorColor}
                         
                         >
                          <InputLabel htmlFor="outlined-adornment-password" sx={{fontSize:12}}>{passwordStrength?`* ${passwordStrength}`: `password`}</InputLabel>
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
                         <FormControl sx={{width: '100%', mt:2 }} variant="outlined"
                         color={errorMatch}
                         >
                          <InputLabel htmlFor="outlined-adornment-confirmPassword" sx={{fontSize:12}}>{passwordMatch}</InputLabel>
                          <OutlinedInput
                            id="outlined-adornment-confirmPassword"
                            type={values.showConfirmPassword ? 'text' : 'password'}
                            value={values.confirmPassword}
                            onChange={handleChange('confirmPassword')}
                            sx={{fontSize:12}}
                            endAdornment={
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowConfirmPassword}
                                  onMouseDown={handleMouseDownConfirmPassword}
                                  edge="end"
                                >
                                  {values.showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                              </InputAdornment>
                            }
                            label="confirmPassword"
                          />
                        </FormControl>
                        <FormControlLabel
                        control={<Checkbox 
                        color="secondary" 
                        checked={checkbox}
                        onChange={() => setCheckbox(!checkbox)} />}
                        label="I agree with the Terms & Conditions"                    
                        />
                        </Grid>

                      </Grid>
                      </>
                    }
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                      <Button
                        color="inherit"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        sx={{ mr: 1, fontSize: 13 }}
                      >
                        Back
                      </Button>
                      <Box sx={{ flex: '1 1 auto' }} />
                     {
                       (activeStep==0)?
                       <>
                         <Button 
                        disabled={
                          (values.firstName && values.lastName && values.email)?
                          false: true
                        } 
                        onClick={handleNext} sx={{fontSize: 11 }} 
                        variant="contained" 
                        color="secondary">
                          {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                        </Button>
                       </>
                       :
                       <>
                        <Button 
                      disabled={
                        (values.password && values.confirmPassword && (passwordStrength&&passwordStrength.trim() != 'Weak') && (values.password === values.confirmPassword) && checkbox)?
                        false: true
                      } 
                      onClick={handleNext} sx={{fontSize: 11 }} 
                      variant="contained" 
                      color="secondary">
                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                      </Button>
                       </>
                     }
                    </Box>
                  </React.Fragment>
                )}
          </Box>
          </Box>
      </Container>

   </>
  )
};
export default Register;