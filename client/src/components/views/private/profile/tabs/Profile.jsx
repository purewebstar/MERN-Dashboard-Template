import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { Grid } from '@mui/material';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import {updateProfile, createProfile} from '../../../../../api/profile.api';
import {setLocalStorage, getLocalStorage} from '../../../../../utils/Storage';
import { styled } from '@mui/material/styles';
import AMSnackbar from '../../../../../components/layouts/feedbacks/AMSnackbar';

const Input = styled('input')({
  display: 'none',
});


const Profile = props => {
  const photoFile = React.useRef(null);
  const[values, setValues] = React.useState({
    firstName: '',
    lastName: '',
    bio: '', 
    phone: '',
    city: '',
    country: '',
  }) 
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handlePersonal = async(e)=>{
    e.preventDefault();
    let address = {}
    address.city = values.city;
    address.country = values.country;
    let payload = await createProfile.personal(address, values.phone, values.bio).then((res)=>{
      const {data} = res;
      if(data.status){
        setOpenSnackbar(true);
        setErrorColor('success')
        setError(data.message)
        props.handleProfile();
      }
      }).catch(err=>{
        setErrorColor('error')
        setError('Unable to update!');
      });
      return payload;
  }
  const handleOpenFileDialog = ()=>{
    photoFile.current.click();
  }
  const handleOnFileChange = async (e)=>{
    e.stopPropagation();
    e.preventDefault();
    const formData = new FormData()
    formData.append('photo', e.target.files[0])
    let payload = await createProfile.photo(formData).then((res)=>{
      const {data} = res;
      if(data.status){
        setOpenSnackbar(true);
        props.userProfile();
        setAnchorEl(null);
        setErrorColor('success')
        setError(data.message)
        return;
      }
      }).catch(err=>{
        setErrorColor('error')
        setError('Unable to update!');
        setAnchorEl(null);
      });
      return payload;
    
  }


  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const[error, setError] = React.useState(null);
  const[errorColor, setErrorColor] = React.useState(null);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

    return (
        <>
         
         <AMSnackbar
         open={openSnackbar}
         alertText={error}
         alertColor={errorColor}
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
            First Name
          </Typography>
          <TextField        
          label="First Name"
          defaultValue={props.profile&&props.profile.firstName&&props.profile.firstName}
          onChange={handleChange('firstName')}
          size="small"
          sx={{
            mb:1,
            width: `100%`,
          }} 
          />
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              mb:1,
              mt:1,
            }}
            
            >
            Last Name
            </Typography>
          <TextField 
          defaultValue={props.profile&&props.profile.lastName&&props.profile.lastName}
          onChange={handleChange('lastName')}
          size="small"
          label="Last Name"
          sx={{
            mb:1,
            width: `100%`,
          }} 
          />
          <Typography
            variant="h6"
            sx={{
                fontWeight: 600,
                mb:1,
            }}
            className={`text-secondary`}
            >
            Please provide your true First and Last name.
            </Typography>
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
              defaultValue={props.profile&&props.profile.bio&&props.profile.bio}
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