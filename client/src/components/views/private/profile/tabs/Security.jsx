import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import { Grid } from '@mui/material';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import {updateAccount} from '../../../../../api/user.api';
import {tokens} from '../../../../../api/auth.api';
import {setLocalStorage} from '../../../../../utils/Storage';
import AMSnackbar from '../../../../../components/layouts/feedbacks/AMSnackbar';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';

const Security = props => { 
  const[values, setValues] = React.useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
    showOldPassword: false,
    showNewPassword: false,
    showConfirmPassword: false,
  }) 
  const navigate = useNavigate();
  const renewToken = async()=>{
    let payload = await tokens.renew().then((res)=>{
      const {data} = res;
      if (data.status) {
        window.localStorage.removeItem('access');
        setLocalStorage('access', data.access);
        return;
      } 
    }).catch(err=>{ 
      //
      navigate('/auth/login')
    })
    return;
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
     setStrengthColor('success')

    } else if(mediumPassword.test(password)) {
        // medium strength
        setPasswordStrength(' Medium');
        setStrengthColor('warning')
    } else {
      //
      setPasswordStrength(' Weak')
      setStrengthColor('error')
    }
   }

  const handleUpdatePassword = async(e)=>{
    //
    e.preventDefault();
    let payload = await updateAccount.updatePassword(values.oldPassword, values.newPassword).then((res)=>{
      const {data} = res;
      if(data.status){ 
        setErrorColor('success')
        setError('Password upated successfully!')
        setOpenSnackbar(true);
        // removing filed values
        setValues({
          ...values,
          oldPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
        props.handleProfile(); 
      }
      }).catch(err=>{
        if(err.message === 'Request failed with status code 401'){
          renewToken();
          setTimeout(()=>{
            handleUpdatePassword();
          }, 200)
         }
        setErrorColor('error')
        setError('Unable to update!');
        setOpenSnackbar(true);
      });
      return payload;
  }

  const [passwordStrength, setPasswordStrength] = React.useState(null);
  const [strengthColor, setStrengthColor] = React.useState('secondary');
  const [error, setError] = React.useState(null);
  const [errorColor, setErrorColor] = React.useState(null);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [passwordMatch, setPasswordMatch] = React.useState('Confirm Password')
  const [errorMatch, setErrorMatch] = React.useState('error');
  const [match, setMatch] = React.useState(false);

  const [required, setRequired] = React.useState({
    newPassword: false,
    confirmPassword: false,
  })

  const handleChange = (prop) => (event) => {
    setRequired({
      ...required,
      [prop]: false
    });
    setValues({ ...values, [prop]: event.target.value });
    if(prop != 'oldPassword'){
      handleCheckPasswordStrength(values.newPassword);
      handlePasswordMatch(values.newPassword, values.confirmPassword);
    }
  };

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

  const handleClickShowOldPassword = () => {
    setValues({
      ...values,
      showOldPassword: !values.showOldPassword,
    });
  };
  const handleMouseDownOldPassword = (event) => { 
    event.preventDefault();
  };

  const handleClickShowNewPassword = () => {
    setValues({
      ...values,
      showNewPassword: !values.showNewPassword,
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
   const handleSnackBar = ()=>{
     setOpenSnackbar(false)
   }
    return (
        <>

         <AMSnackbar
         open={openSnackbar}
         alertText={error}
         alertColor={errorColor}
         handleClose={handleSnackBar}
         />
         <Box
        sx={{
          textAlign: 'left',
          mt:5,
        }}
       >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
          }}
          >
          SECURITY SETTING
          </Typography>
       </Box>
       <Grid
       container
       justifyContent="space-between"
       alignItems="flex-start"
       spacing={2}
       sx={{
         mt:2,
         mb:8,
       }}
  
       >
        {
          // SECURITY SETTING FORMS
        }
        <Grid item xs={12} md={8}>
          <Box
          sx={{
            mt:2,
            p:3,          
            borderRadius: 2,
            mb:2,
            bgcolor: `#ffffff`,
          }}
          component="form" onSubmit={handleUpdatePassword}
        >      
          <Divider sx={{mt:1, mb:4}} textAlign="left">
          <Chip label="PASSWORD" color={`secondary`} variant="outlined" sx={{fontSize: 9, fontWeight: 500}}/>
          </Divider>
          <FormControl sx={{width: '100%' }} 
          variant="outlined"
          size="small"
          >
          <InputLabel htmlFor="outlined-adornment-password">{ `old password`}</InputLabel>
          <OutlinedInput
            id="outlined-adornment-old-password"
            type={values.showOldPassword ? 'text' : 'password'}
            value={values.oldPassword}
            onChange={handleChange('oldPassword')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle old password visibility"
                  onClick={handleClickShowOldPassword}
                  onMouseDown={handleMouseDownOldPassword}
                  edge="end"
                >
                  {values.showOldPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="newPassword"
          />
        </FormControl>
          <FormControl sx={{width: '100%', mt:2 }} 
          variant="outlined"
          color={strengthColor}
          size="small"
          >
          <InputLabel htmlFor="outlined-adornment-password">{passwordStrength?`* ${passwordStrength}`: `new password`}</InputLabel>
          <OutlinedInput
            id="outlined-adornment-new-password"
            type={values.showNewPassword ? 'text' : 'password'}
            value={values.newPassword}
            onChange={handleChange('newPassword')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle new password visibility"
                  onClick={handleClickShowNewPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showNewPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="newPassword"
          />
        </FormControl>
          <FormControl sx={{width: '100%', mt:2 }} variant="outlined"
          color={errorMatch} size="small"
          >
          <InputLabel htmlFor="outlined-adornment-confirmPassword">{passwordMatch}</InputLabel>
          <OutlinedInput
            id="outlined-adornment-confirm-Password"
            type={values.showConfirmPassword ? 'text' : 'password'}
            value={values.confirmPassword}
            onChange={handleChange('confirmPassword')}
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
           <br/>
           <Button
            type="submit"
            variant="contained"
            color={`secondary`}
            sx={{ mt: 2, mb: 1, height: 37 }}
            >
             Update Password
            </Button>
            <Link to="/auth/forgot-password" target={`_blank`}>
            <Typography variant="h6" 
            sx={{
              fontWeight: 600,
              mb:1,
            }}>
              {"Forgot Password?"}
            </Typography>
          </Link>
        </Box>

        </Grid>
       </Grid>
        </>
    );
};

export default Security;