import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import SecurityRoundedIcon from '@mui/icons-material/SecurityRounded';
import Avatar from '@mui/material/Avatar';
import { blue} from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';
import ProfileTabPane from './tabs/Profile';
import SecurityTabPane from './tabs/Security';
import { useDispatch, useSelector } from 'react-redux';
import {GetProfile} from '../../../../redux/actions/profileAction';
import {readProfile} from '../../../../api/profile.api';
import config from '../../../../constants/config';
import { Button } from '@mui/material';
import {Link, useNavigate} from 'react-router-dom';
import Grid from '@mui/material/Grid';
import {tokens} from '../../../../api/auth.api';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {setLocalStorage} from '../../../../utils/Storage';

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
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
  const renewToken = async()=>{
    let payload = await tokens.renew().then((res)=>{
      const {data} = res;
      if (data.status) {
        setLocalStorage('access', JSON.stringify(data.access));
        return;
      } 
    }).catch(err=>{ 
      //
      navigate('/auth/user')
    })
    return;
  }
  const userProfile = async ()=>{ 
   let payload = await readProfile.auth.byId().then((res)=>{
     const {data} = res;
     if (data.status) {
       let profileData = data.data?data.data[0]: [];
       setLocalStorage('profile', JSON.stringify(profileData));
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
  const PROFILE = useSelector(state => state.profile).byId;
  let profile = PROFILE? PROFILE : '';
  console.log(profile)
  React.useEffect(()=>{
    userProfile();
  },[]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
   <>
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
            src={profile.photo?
            config.WS_URL + 'images/profile/' + profile.photo: 
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
        {profile&&profile.firstName?profile.firstName: ``} {profile&&profile.lastName?profile.lastName: ``} {`Abraham Mitiku`}
        </Typography>
        <Typography
        variant="h6"
        sx={{
            fontWeight: 600,
        }}

        >
        joined: <b className={`text-success`}>{profile&&profile.email?profile.email : ``}</b>
        </Typography>
        </Box>

        </Box>
        <Box
          sx={{

          }}
        >
          <IconButton>
          <CloudUploadIcon color="secondary" sx={{fontSize: 23}}/>
          </IconButton>

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
            profile={profile}
            />
        </TabPanel>
        <TabPanel value={value} index={1}>
            <SecurityTabPane
            handleProfile={userProfile}
            profile={profile}
            /> 
        </TabPanel>
        </Box>
        </Grid>               
    </Grid>
   
   </>
  );
}

export default Profile;