/**
 *    © 2022 Abraham Mitiku
 *    Open Source MERN Dashboard Template
 * 
 */
// -----------------------------------------------------------------
import $ from 'jquery';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import { red, blue, teal} from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import FlagRoundedIcon from '@mui/icons-material/FlagRounded';
import PhoneEnabledRoundedIcon from '@mui/icons-material/PhoneEnabledRounded';
import Skeleton from '@mui/material/Skeleton';
import config from '../../../../constants/config';
import {getLocalStorage} from '../../../../utils/Storage';

const StyledBadge = styled(Badge)(({ theme }) => ({
'& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 1px ${theme.palette.background.paper}`,
    '&::after': {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    animation: 'ripple 1.2s infinite ease-in-out',
    border: '1px solid currentColor',
    content: '""',
    },
},
'@keyframes ripple': {
    '0%': {
    transform: 'scale(.8)',
    opacity: 1,
    },
    '100%': {
    transform: 'scale(2.4)',
    opacity: 0,
    },
},
}));

const Dashboard = props => {
  const userData = getLocalStorage('user');
  let profile = userData?userData: '';

    React.useEffect(()=>{
      $('title').html('Dashboard | GoWebBox');
      $('#nav-dashboard').css({
          backgroundColor: `#0099CC`,
          color: `#ffffff`
      })
      $('#mob-dashboard').css({
          backgroundColor: `#0099CC`,
          color: `#ffffff`
      })
      $(window).scrollTop(0,0);
  
  },[]);
  // on unmount
  React.useEffect( () =>
  () =>{
      $('#nav-dashboard').css({
          backgroundColor: `#181e2b`,
        
      })
      $('#mob-dashboard').css({
        backgroundColor: `#2e3951`,    
        color: `inherit`,   
      })
     
  }, [] );

    return (
    <>
    <Grid
     container
     justifyContent="center" 
     alignItems="flex-start"
     spacing={{xs: 0, md: -4}}
    >
        <Grid item xs={12} md={4} sx={{height:140}}> 
            <Box
            sx={{
            display: 'flex',
            justifyContent: 'center',
            p: 1,
            m: 1,
            mt: 2,
            backgroundColor: '#ffffff',
            border: 1,
            borderColor: `#e0e0e0`, 
            }}
            >
            <IconButton  sx={{ p: 0}}>
                <Stack direction="row" spacing={2}>
                  <StyledBadge
                      overlap="circular"
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      variant="dot"
                  >
                    <Avatar 
                    sx={{ bgcolor: blue[500],width: 135, height: 135 }} 
                    aria-label="profile-image"
                    alt={profile&&profile.firstName&&profile.firstName.charAt(0)} 
                    src={profile&&profile.profileObj&&profile.profileObj.photo? (profile.profileObj.photo.includes("https://lh3.googleusercontent.com/"))?
                    profile&&profile.profileObj.photo: 
                    `${config.WS_URL}images/profile/${profile.profileObj&&profile.profileObj.photo&&profile.profileObj.photo}`: 
                    profile&&profile.firstName.charAt(0)}
                    />
                  </StyledBadge>
                </Stack>
            </IconButton>
            </Box>  
            <Box
            sx={{
            justifyContent: 'center',
            textAlign: 'center',
            p: 2,
            m: 1,
            mt: 1,
            backgroundColor: `#ffffff`
            }}
            >
              <Typography 
              variant="h3" 
              color="primary"
              sx={{
                fontWeight: 600
              }}
              >
                {profile&&profile.firstName} {profile&&profile.lastName}
              </Typography>
              <Box
              sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              p: 1,
              mt: 2,
              mb:2,
              bgcolor: 'background.paper',
              borderRadius: 1,
              bgcolor: `rgba(0, 0, 0, 0.1)`,
              
              }}
              >
                <Box sx={{p:1}}>
                <Typography variant="h6" color="text.white" sx={{mt:-1}}>
                {profile&&profile.profileObj.bio?profile.profileObj.bio: ``}
                </Typography>
                </Box>
            </Box>
            <Divider/>
            <Box
            sx={{
            display: 'flex',
            justifyContent: 'space-between',
            textAlign: 'center',
            p: 1,
            mr: 1,
            mt:0,
            }}
            >
              <Typography variant="h6" color="secondary" sx={{fontWeight: 600}}>
              <LocationOnRoundedIcon/> {`LOCATION`}
              </Typography>
              <Typography sx={{ ml: 0, fontSize: 14, fontWeight: 600 }} component="div" className={`text-secondary`}>
                &nbsp;{profile&&profile.profileObj.location?profile.profileObj.location: `N/A`}
              </Typography>
            </Box>
            <Box
            sx={{
            display: 'flex',
            justifyContent: 'space-between',
            textAlign: 'center',
            p: 1,
            mr: 1,
            mt:0,
            }}
            >
              <Typography variant="h6" color="secondary" sx={{fontWeight: 600}}>
                <PhoneEnabledRoundedIcon/> {`CONTACT`}
              </Typography>
              <Typography sx={{ ml: 0, fontSize: 14, fontWeight: 600 }} component="div" className={`text-secondary`}>
                &nbsp;{profile&&profile.profileObj.phone?profile.profileObj.phone: `N/A`}
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={8} sx={{height:140}}>
            <Box
            sx={{
            display: 'flex',
            justifyContent: 'center',
            p: 1,
            m: 1,
            mt: 2,
            bgcolor: `#ffffff`,
            }}
            >

            </Box>
        </Grid>

    </Grid>
    </>
    );
};

export default Dashboard;   