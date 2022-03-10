/**
 *    © 2022 Abraham Mitiku
 *    Open Source MERN Dashboard Template
 * 
 */
// -----------------------------------------------------------------
/**
 *     RESET PASSWORD PAGE
 */
//--------------------------------------------------------------------
import React from 'react';
import FormControl from '@mui/material/FormControl';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
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
import MuiAlert from '@mui/material/Alert';
import { updateAccount} from '../../../../api/user.api';
import AMBackdrop from '../../../layouts/feedbacks/AMBackdrop';
import AMSnackbar from '../../../layouts/feedbacks/AMSnackbar';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const Reset = props =>{
    const [openDrop, setOpenDrop] = React.useState(false);
    const [error, setError] = React.useState('');
    const [errorColor, setErrorColor] = React.useState('secondary');
    const [passwordMatch, setPasswordMatch] = React.useState('Confirm Password')
    const [errorMatch, setErrorMatch] = React.useState('error');
    const [match, setMatch] = React.useState(false);
    const [passwordStrength, setPasswordStrength] = React.useState(null);

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
     if(password.trim() !== confirmPassword.trim()){
      setErrorMatch('error')
      setPasswordMatch('* Mismatch')
      setMatch(false);
      return;
     }
   }

    const handleResetPassword = async (e) => {
      setOpenDrop(true)
      e.preventDefault();
      if(!values.newPassword || !values.confirmPassword || values.newPassword!==values.confirmPassword){
        setError('Password mismatch!');
        setOpenDrop(false)
        return;
      }
      let token = JSON.parse(localStorage.getItem('verifyToken'));
      await updateAccount.resetPassword(values.newPassword,token).then((res)=>{
          const {data} = res;
          if (data.status) {
              setOpen(true)
              setTimeout(()=>{
                props.history.push('/auth/login');
              },2500)
          } 
      }).catch(err=>{
          setError('Something went wrong!');
          setOpenDrop(false)
          setOpen(true)
      });
       
    }


    const [values, setValues] = React.useState({
        newPassword: '',
        confirmPassword: '',
        showPassword: false,
        showConfirmPassword: false,
      });
    
      const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
        handleCheckPasswordStrength(values.newPassword);
        handlePasswordMatch(values.newPassword, values.confirmPassword);
      }
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
    
      const [open, setOpen] = React.useState(false);

      const handleClose = (event, reason) => {
        setError('');
        setOpen(false);
      };

  return(
   <>
      <AMBackdrop
      open={openDrop}
      />
      <Container component="main" maxWidth="xs">
        <Box
        sx={{
        marginTop: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: 2,
        bgcolor: '#ffffff',
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
              p:1,
              mt:-6,
              borderRadius: 2,
              backgroundColor: '#1c2331',
            }}
            >
            <Avatar sx={{m: 'auto', bgcolor: '#e65100' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h5" sx={{fontWeight: 400, mb:1, mt:1, textAlign: 'center',color: `#ffffff`}}>
             Change Password
            </Typography>
            </Box>
          </Box>
          <Box component="form" onSubmit={handleResetPassword} noValidate sx={{ mt: -3, p:4, width:`100%` }}>
              <Grid 
              container
              justifyContent='center'
              alignItem="center"
              columnGap={1}
              spacing={0}
              sx={{width: `100`}}
              >
                <Grid item xs='10'>
                <FormControl
                color={errorColor}
                sx={{width: '100%', mt:3 }}
                 variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password" sx={{fontSize:12}}>{passwordStrength?`* ${passwordStrength}`: `New Password`}</InputLabel>
                <OutlinedInput
                id="outlined-adornment-password"
                type={values.showPassword ? 'text' : 'password'}
                value={values.newPassword}
                onChange={handleChange('newPassword')}
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
                label="New Password"
                />
            </FormControl>
                <FormControl 
                color={errorMatch}
                sx={{width: '100%', mt:2 }} 
                variant="outlined"
                >
                <InputLabel htmlFor="outlined-adornment-password" sx={{fontSize:12}}>{passwordMatch}</InputLabel>
                <OutlinedInput
                id="outlined-adornment-password"
                sx={{fontSize:12}}
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
                label="Confirm Password"
                />
            </FormControl>
                 <Button
                type="submit"
                fullWidth
                variant="contained"
                color={`secondary`}
                disabled={
                  ((values.newPassword !== values.confirmPassword) || (passwordStrength&&passwordStrength.trim() === 'Weak'))?
                  true: false
                }
                sx={{ mt: 0, mb: 1,mt:2, height: 41 }}
                >
                Change Password
                </Button>
               
              </Grid>
            </Grid>
          </Box>
          </Box>
          <AMSnackbar
          open={open}
          alertText={`Something went wrong`}
          alertTextColor={`success`}
          handleClose={handleClose}
          />
      </Container>
   </>
  )
};
export default Reset;