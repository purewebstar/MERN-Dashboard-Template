/**
 *    © 2022 Abraham Mitiku
 *    Open Source MERN Dashboard Template
 * 
 */
// -----------------------------------------------------------------
/**
 *     AMTopbar
 */
//--------------------------------------------------------------------
 import React from 'react';
 import { styled, useTheme, alpha } from '@mui/material/styles';
 import Box from '@mui/material/Box';
 import MuiAppBar from '@mui/material/AppBar';
 import Toolbar from '@mui/material/Toolbar';
 import Typography from '@mui/material/Typography';
 import IconButton from '@mui/material/IconButton'; 
 import siteLogo from '../../../assets/images/siteLogo.png';
 import { Link } from 'react-router-dom';
 import InputBase from '@mui/material/InputBase';
 import SearchIcon from '@mui/icons-material/Search';
 import Avatar from '@mui/material/Avatar';
 import Badge from '@mui/material/Badge';
 import NotificationsIcon from '@mui/icons-material/Notifications';
 import Tooltip from '@mui/material/Tooltip';
 import { teal, purple, blue} from '@mui/material/colors';
 import Stack from '@mui/material/Stack';
 import AMAccountMenu from './AMAccountMenu';
 import AMNotificationMenu from './AMNotificationMenu';
 import AddPhotoAlternateRoundedIcon from '@mui/icons-material/AddPhotoAlternateRounded';
 import config from '../../../constants/config';
 import { useDispatch, useSelector } from 'react-redux';
 import {GetProfile} from '../../../redux/actions/profileAction';
 import {readProfile} from '../../../api/profile.api';
 
 
const drawerWidth = 240;

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


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius, 
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '50%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '60%',
    [theme.breakpoints.up('lg')]: {
      width: 'auto',
    },
  },
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));


const AMTopbar = props =>{
    const dispatch = useDispatch();

  const userProfile = async ()=>{ 
   let payload = await readProfile.auth.byId().then((res)=>{
     const {data} = res;
     if (data.status) {
       let profileData = data.data?data.data[0]: [];
       localStorage.setItem('profile', JSON.stringify(profileData));
       return profileData;
     } 
   }).catch(err=>{
   })
   dispatch(GetProfile.AUTH.BYID(payload));
 }
  const PROFILE = useSelector(state => state.profile).byId;

  let profile = PROFILE? PROFILE : '';
  React.useEffect(()=>{
    userProfile();
  },[]);

  const [open, setOpen] = React.useState(false);
  const [openNotification, setOpenNotification] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorElNotification, setAnchorElNotification] = React.useState(null);
  const[notifiCount, setNotifiCount] = React.useState(2);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  }; 

  const handleOpenNotification = (event) => {
    setAnchorElNotification(event.currentTarget);
  };

  const handleCloseNotification = () => {
    setAnchorElNotification(null);
  }; 

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openList = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationCount = (count)=>{
    setNotifiCount(count);
  }
  return(
    <>
     <AppBar position="static" open={open}>
        <Toolbar>
            <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { sm: 'block' }}}
            >
            <Avatar 

            src={siteLogo}
            sx={{ width: 30, height: 30, mr:1}} 
            />
            </Typography>
            <Search
            sx={{
                ...(open && { display: 'none' }),
              }}
            >
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
             <Box sx={{ flexGrow: 0 }}/>
               <Box sx={{display: 'flex'}}>
                <Link to='/user'>
                  <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ display: { xs: 'none', sm: 'block' } , mt:2, color: `#ffffff`, fontWeight: 500}}    
                    style={{padding: '5px', borderRadius: '5%', marginLeft: '1px'}}
                    id="nav-dashboard"
                    
                  >
                  Dashboard
                  </Typography>
                </Link>
                <Link to='/user/order'  >
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{ display: { xs: 'none', sm: 'block' } , mt:2, color: `#ffffff`, fontWeight: 500}}    
                  style={{padding: '5px', borderRadius: '5%', marginLeft: '15px'}}
                  id="nav-order"
                  
                >
                Orders
                </Typography>
                </Link>
                <Link to='/user/blog'  >
                    <Typography
                      variant="h6"
                      noWrap
                      component="div"
                      sx={{ display: { xs: 'none', sm: 'block' } , mt:2, color: `#ffffff`, fontWeight: 500}}                   
                      style={{padding: '5px', borderRadius: '5%', marginLeft: '15px'}}
                      id="nav-blog"
                  
                    >
                      <AddPhotoAlternateRoundedIcon sx={{ fontSize: 38, p:1 }} style={{ backgroundColor: '#d32f2f ', color: '', borderRadius: '50%' }}/>
                    </Typography>
                  </Link>
                <Link to='/user/feedback'  >
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{ display: { xs: 'none', sm: 'block' } , mt:2, color: `#ffffff`, fontWeight: 500}}                 
                  style={{padding: '5px', borderRadius: '5%', marginLeft: '15px'}}
                  id="nav-feedback"
                  
                >
                Feedback
                </Typography>
                </Link>
                <Link to='/user/subscriber'  >
                    <Typography
                      variant="h6"
                      noWrap
                      component="div"
                      sx={{ display: { xs: 'none', sm: 'block' } , mt:2, color: `#ffffff`, fontWeight: 500}}                
                      style={{padding: '5px', borderRadius: '5%', marginLeft: '15px'}}
                      id="nav-subscriber"
                    >
                    Subscriber
                    </Typography>
                  </Link>
              </Box>
            <Box sx={{ flexGrow: 2}}/>
              <Box sx={{display: 'flex'}}>
                <IconButton
                  size="large"
                  aria-label="show notifications"
                  color="inherit"
                  onClick={handleOpenNotification}
                  aria-controls={openNotification ? 'fade-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={openNotification ? 'true' : undefined}
                >
                  <Badge badgeContent={notifiCount} color="error">
                    <NotificationsIcon sx={{ fontSize: 23 }}/>
                  </Badge>
                </IconButton>
                <AMNotificationMenu
                  openNotification={openNotification}
                  handleClose={handleCloseNotification}
                  anchorEl={anchorElNotification}
                  handleCount={handleNotificationCount}
                  />
                <Tooltip title="Account Setting" className={``}>
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 , mr:1}}>
                     <Stack direction="row" spacing={2}>
                      <StyledBadge
                          overlap="circular"
                          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                          variant="dot"
                        >
                          <Avatar 
                          alt={profile&&profile.firstName&&profile.firstName.charAt(0)} 
                          src={profile.photo?
                              config.WS_URL + 'images/profile/' + profile.photo: 
                              profile&&profile.firstName&&profile.firstName.charAt(0)}
                          sx={{width: 30, height: 30, bgcolor: blue[300]}}
                          />
                        </StyledBadge>
                      </Stack>
                  </IconButton>
                </Tooltip>

                <AMAccountMenu 
                handleCloseUserMenu={handleCloseUserMenu}
                anchorElUser={anchorElUser}
                profile={profile&&profile}
                />
            </Box>
          </Toolbar>
      </AppBar>
    </>
  )
};

export default AMTopbar;