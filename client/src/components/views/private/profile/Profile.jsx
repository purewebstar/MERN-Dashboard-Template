/**
 *    © 2022 Abraham Mitiku
 *    Open Source MERN Dashboard Template
 * 
 */
// -----------------------------------------------------------------
import $ from 'jquery';
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import SecurityRoundedIcon from '@mui/icons-material/SecurityRounded';
import Avatar from '@mui/material/Avatar';
import { blue, teal} from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';
import ProfileTabPane from './tabs/Profile';
import SecurityTabPane from './tabs/Security';
import { useDispatch, useSelector } from 'react-redux';
import {GetProfile} from '../../../../redux/actions/profileAction';
import {readProfile, createProfile} from '../../../../api/profile.api';
import config from '../../../../constants/config';
import {Link, useNavigate} from 'react-router-dom'; 
import Grid from '@mui/material/Grid';
import {tokens} from '../../../../api/auth.api';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {setLocalStorage, getLocalStorage} from '../../../../utils/Storage';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import AMBackdrop from '../../../../components/layouts/feedbacks/AMBackdrop'; 

const Input = styled('input')({
  display: 'none',
});

const TabPanel = props =>{
  const { children, value, index, ...other } = props;

  return ( 
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`vertical-tabpanel-${index}`}
    aria-labelledby={`vertical-tab-${index}`}
    {...other}
    style={{width: `100%`}}
  >
    {value === index && (
      <Box sx={{ p: 2, ml:{xs: 0, md:0} }}>
        <Typography>{children}</Typography>
      </Box>
    )}
  </div>
  );
}
 
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const a11yProps = index =>{
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const Profile = props => {
  const userData = getLocalStorage('user');
  let profile = userData?userData: '';
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
  const renewToken = async()=>{
    let payload = await tokens.renew().then((res)=>{
      const {data} = res;
      if (data.status) {
        // if success, remove old token and replace with a renewed
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
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const photoFile = React.useRef(null);
  const handleOpenFileDialog = ()=>{
    photoFile.current.click();
  }
  const handleOnFileChange = async (e)=>{
    setOpenDrop(true);
    e.preventDefault();
    const formData = new FormData()
    formData.append('photo', e.target.files[0])
    let payload = await createProfile.photo(formData).then((res)=>{
      const {data} = res;
      if(data.status){
        userProfile();
        handleClose()
        setTimeout(()=>{        
          setOpenDrop(false);
        },1500) // you can change this delay ...
      }
      }).catch(err=>{
        if(err.message === 'Request failed with status code 401'){
          renewToken();
          handleOnFileChange();
        }
        handleClose();
        setOpenDrop(false);
      });
      return payload;
    
  }

  const userProfile = async ()=>{ 
   let payload = await readProfile.auth.byId().then((res)=>{
     const {data} = res;
     if (data.status) {
       let profileData = data.data?data.data[0]: [];
       setLocalStorage('user', profileData);
       return profileData;
     } 
   }).catch(err=>{
    if(err.message === 'Request failed with status code 401'){
      renewToken();
      userProfile()
     }
   })
   dispatch(GetProfile.USERID(payload));
 }
  const PROFILE = useSelector(state => state.profile).userId;
//  let profile = PROFILE? PROFILE : '';
 // console.log(profile)
  React.useEffect(()=>{
    userProfile();
  },[]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  let joined = profile&&profile.joined&&profile.joined;
  let joinedFormatted = new Date(joined);
  const [openDrop, setOpenDrop] = React.useState(false);
  return (
   <>
   <AMBackdrop
    open={openDrop}
    />
   <Grid  
    container
    justifyContent="center"
    alignItems="center" 
    spacing={3}
    sx={{ 
        mb:0
    }}
    className={``}
    >
        <Grid item xs={0} md={12}>

        </Grid>
        <Grid item xs={12} md={10}>                 
        <Box
        sx={{ 
        display: 'flex',
        justifyContent: 'space-between',
        maxWidth: `100%`,
        mt: -2,
        p:2,
        borderRadius: 1,
        bgcolor: '#fafafa',
        border: 1,
        borderColor: `#e0e0e0`,
        }}
        >
        <Box
        sx={{
            display: 'flex',
            justifyContent: '',
        }}
        >
        <IconButton>
            <Avatar 
            alt={profile&&profile.firstName&&profile.firstName.charAt(0)} 
            src={profile.profileObj&&profile.profileObj.photo?(profile.profileObj.photo.includes("https://lh3.googleusercontent.com/"))?
            profile&&profile.profileObj.photo:
            `${config.WS_URL}images/profile/${profile.profileObj&&profile.profileObj.photo&&profile.profileObj.photo}`: 
            profile&&profile.firstName&&profile.firstName.charAt(0)}
            sx={{
                width: 90, height: 90, 
                bgcolor: blue[700],
            }}
            />
        </IconButton>
        <Box
        sx={{
            p:2,
        }}
        >
        <Typography
        variant="h4"
        sx={{
            fontWeight: 600,
            color: `#000000`,
        }}
        >
        {profile&&profile.firstName?profile.firstName: ``} {profile&&profile.lastName?profile.lastName: ``}
        </Typography>
        <Typography
        sx={{
            fontWeight: 600,
        }}

        >
        joined: <b style={{color: teal[600]}} >{joinedFormatted?joinedFormatted.toDateString(): ``}</b>
        </Typography>
        </Box>

        </Box>
        <Box
          sx={{

          }}
        >
          <IconButton
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          >
            <CloudUploadIcon color="error" sx={{fontSize: 23}}/>
          </IconButton>
          <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
          >
        <MenuItem onClick={handleOpenFileDialog}>Upload Picture</MenuItem>
        </Menu>
        <Input type="file" accept="image/x-png,image/gif,image/jpeg" ref={photoFile} onChange={handleOnFileChange} />
        </Box>
        </Box>
        <Box
        sx={{
        mt:1,
        display: {xs: 'block', md: 'none'},
        bgcolor: `#ffffff`,
        }}
        >
        <Tabs 
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons
            allowScrollButtonsMobile
            textColor={`secondary`} 
            indicatorColor={ `secondary`}
            aria-label="xs tab for settings"
            >
            <Tab icon={<AccountCircleRoundedIcon sx={{fontSize: 25}} />} aria-label="profile" {...a11yProps(0)} />
            <Tab icon={<SecurityRoundedIcon sx={{fontSize: 25}} />} aria-label="security"  {...a11yProps(1)}/>
            </Tabs>

        </Box>
        <Box
        sx={{ flexGrow: 1, display: 'flex', height: `100%`}}
        >
        <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            textColor={`secondary`} 
            indicatorColor={`secondary`}
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: 'divider', width:200, mb:10, mt:4, display: {xs: `none`, md: 'block'} }}
            className={`text-left`}
        >
            <Tab icon={<AccountCircleRoundedIcon sx={{fontSize: 20}} />} iconPosition="start" label="Profile"  sx={{fontSize: 10, fontWeight:700,mt:4,mr: `auto`}} {...a11yProps(0)} />
            <Tab icon={<SecurityRoundedIcon sx={{fontSize: 20}} />} iconPosition="start" label="Security"  sx={{fontSize: 10, fontWeight:700,mt:-3, mr: `auto`}} {...a11yProps(1)} />       
        </Tabs>
        
        <TabPanel value={value} index={0}>
            <ProfileTabPane
            handleProfile={userProfile}
            profile={profile&&profile}
            />
        </TabPanel>
        <TabPanel value={value} index={1}>
            <SecurityTabPane
            handleProfile={userProfile}
            profile={profile&&profile}
            /> 
        </TabPanel>
        </Box>
        </Grid>               
    </Grid>
   
   </>
  );
}

export default Profile;