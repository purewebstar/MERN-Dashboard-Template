/**
 *    © 2022 Abraham Mitiku
 *    Open Source MERN Dashboard Template
 * 
 */
// -----------------------------------------------------------------
/**
 *     Forgot Password page - []
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
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import {verifyAccount} from '../../../../api/user.api';
import AMBackdrop from '../../../layouts/feedbacks/AMBackdrop';

const Forgot = props =>{
    const [open, setOpen] = React.useState(false);
    const [error, setError] = React.useState('');
    const handleConfirmEmail = async (e) => {
      e.preventDefault();
      if(!values.email){
        setError('')
        return; 
      }
    await verifyAccount.resetPassword(values.email).then((res)=>{
          const {data} = res;
          if (data.status) {
            setError("");
            setTimeout(()=>{
              window.location.href = '/auth/notification/0'
            },200)
          } 
      }).catch(err=>{
          setError('Email not found!');
      });     
    }

    const [values, setValues] = React.useState({
      email: '',
    });
  
    const handleChange = (prop) => (event) => {
      setValues({ ...values, [prop]: event.target.value });
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
            <Typography variant="h5" sx={{fontWeight: 400, mb:1, mt:1,textAlign: 'center',color: `#ffffff`}}>
            Forgot Password?
            </Typography>
            </Box>
          </Box>
          <Box component="form" onSubmit={handleConfirmEmail} noValidate sx={{ mt: -1, p:4, width:`100%` }}>
              <Grid 
              container
              justifyContent='center'
              alignItem="center"
              columnGap={1}
              spacing={0}
              sx={{width: `100`}}
              >
                <Grid item xs='10'>
                 <FormControl sx={{width: '100%', mt:1 }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-email" sx={{fontSize:12}}>Email</InputLabel>
                  <OutlinedInput
                    sx={{fontSize:12}}
                    type={`email`}
                    value={values.email}
                    onChange={handleChange('email')}
                    id="email"
                    label="Email Address"
                    name="email"
                  />
                  </FormControl>
                
                 <Button
                type="submit"
                fullWidth
                variant="contained"
                color={`secondary`}
                sx={{ mt: 0, mb: 1,mt:2, height: 41 }}
                >
                Verify Email
                </Button>
               
              </Grid>
            </Grid>
          </Box>
          </Box>
      </Container>
   </>
  )
};
export default Forgot;