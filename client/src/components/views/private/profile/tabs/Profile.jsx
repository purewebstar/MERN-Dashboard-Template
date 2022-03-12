import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { Grid } from '@mui/material';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import {createProfile} from '../../../../../api/profile.api';
import AMSnackbar from '../../../../../components/layouts/feedbacks/AMSnackbar';
import {tokens} from '../../../../../api/auth.api';
import {setLocalStorage} from '../../../../../utils/Storage';
import {useNavigate} from 'react-router-dom';

const Profile = props => {
  const[values, setValues] = React.useState({
    phone: '',
    bio: '', 
    location: '',
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

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handlePersonal = async(e)=>{
    e.preventDefault();
    let payload = await createProfile.personal(values.location, values.phone, values.bio).then((res)=>{
      const {data} = res;
      if(data.status){ 
        setOpenSnackbar(true);
        setErrorColor('success')
        setError(data.message)
        props.handleProfile(); 
      }
      }).catch(err=>{
        if(err.message === 'Request failed with status code 401'){
          renewToken();
          handlePersonal();
         }
         setOpenSnackbar(true);
        setErrorColor('error')
        setError('Unable to update!');
      });
      return payload;
  }

  const[error, setError] = React.useState(null);
  const[errorColor, setErrorColor] = React.useState(null);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
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
          PROFILE SETTING
          </Typography>
       </Box>
       <Grid
       container
       justifyContent="space-between"
       alignItems="flex-start"
       spacing={2}
       sx={{
         mt:2,
       }}
  
       >

        {
          // PROFILE SETTING FORMS
        }
        <Grid item xs={12} md={8}>
          
        <Box
          component="form" 
          onSubmit={handlePersonal}
          sx={{
            mt:2,
            p:3,          
            borderRadius: 2,
            mb:5,
            bgcolor: `#ffffff`,
          }}
        >      
          <Divider sx={{mt:1, mb:4}} textAlign="left">
          <Chip label="PERSONAL" color={`secondary`} variant="outlined" sx={{fontSize: 9, fontWeight: 500}}/>
          </Divider>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              mb:1,
            }}
            
            >
            Phone
          </Typography>
          <TextField        
          label="Phone"
          defaultValue={props.profile&&props.profile.profileObj.phone&&props.profile.profileObj.phone}
          onChange={handleChange('phone')}
          size="small"
          sx={{
            mb:1,
            width: `100%`,
          }} 
          />
          <Typography
            variant="h5"
            sx={{
                fontWeight: 600,
                mb:1,
                mt:2, 
            }}
            
            >
            Bio
            </Typography>
            <TextareaAutosize
              defaultValue={props.profile&&props.profile.profileObj.bio&&props.profile.profileObj.bio}
              onChange={handleChange('bio')}
              maxRows={4}
              aria-label="maximum height"
              placeholder="About Yourself"
              style={{ width: `100%`, height:100 }}
      
            />
          <Typography
            variant="h5"
            sx={{
                fontWeight: 600,
                mb:1,
                mt:1,
            }}
            
            >
            Location
            </Typography>
          <TextField 
          defaultValue={props.profile&&props.profile.profileObj.location&&props.profile.profileObj.location}
          onChange={handleChange('location')}
          label="Location"
          size="small"
          sx={{
            mb:1,
            width: `100%`,
          }} 
           />
           <br/>
           <Button
            type="submit"
            variant="contained"
            color={`secondary`}
            sx={{ mt: 2, mb: 1, height: 37 }}
            className={`border-two text-white`}
            >
             Update Personal
            </Button>
        </Box>
        </Grid>
        <Grid item xs={0} md={2}></Grid>
       </Grid>
        </>
    );
};

export default Profile;