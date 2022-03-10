/**
 *    © 2022 Abraham Mitiku
 *    Open Source MERN Dashboard Template
 * 
 */
// -----------------------------------------------------------------
/**
 *     AMAccountMenu
 */
//--------------------------------------------------------------------
import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { teal, blue} from '@mui/material/colors';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import SettingsPowerRoundedIcon from '@mui/icons-material/SettingsPowerRounded';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ListItemIcon from '@mui/material/ListItemIcon';
import config from '../../../constants/config';
import {useNavigate} from 'react-router-dom';
import {deleteCookie} from '../../../utils/Cookies';


const AMAccountMenu = props => {
    let navigate = useNavigate();
    
    const handleLogout = async(e)=>{
      e.preventDefault();

      window.localStorage.removeItem('access');
      deleteCookie('refresh');

      setTimeout(()=>{
        navigate('/auth/login')
      },300)
    }
    return (
        <Menu
            sx={{ mt: '35px' }}
            id="menu-appbar"
            anchorEl={props.anchorElUser}
            anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
            }}
            open={Boolean(props.anchorElUser)}
            onClose={props.handleCloseUserMenu}
        
        >
            <Paper sx={{ width: 240, maxWidth: '100%', mt: -3, mb:-1}}>
            <MenuList>
                <MenuItem>
                <Box
                    sx={{
                    mx: 'auto',
                    width: 200,
                    p: 1,
                    mb: -2,
                    textAlign: 'center',
                    fontWeight: '700',
                    }}
                >
                    <Avatar 
                    alt={props.profile.userObj&&props.profile.userObj.firstName&&props.profile.userObj.firstName.charAt(0)} 
                    src={props.profile?
                        config.WS_URL + 'images/profile/' + props.profile.userObj.photo: 
                        props.profile&&props.profile.userObj.firstName&&props.profile.userObj.firstName.charAt(0)}
                    sx={{width: 50, height: 50, p: 0, mb:1, mt:1, mb:1, left: '35%'}}
                    />
                    <Typography
                    variant="h6"
                    noWrap
                    component="div"    
                    sx={{color: `#000000`, fontWeight: 600, mb:1, mt:2}}            
                    >
                   {props.profile&&props.profile.userObj.displayName} {`Abrilojson`}
                    </Typography>
                </Box>
                </MenuItem> 
                <Divider />
                <MenuItem onClick={props.handleCloseUserMenu}>
                <Link to='/user/profile' style={{display: `flex`}} >
                <ListItemIcon>
                   <ManageAccountsIcon
                    sx={{fontSize: 22}}
                    />
                </ListItemIcon>
                <Typography
                        variant="h6"
                        noWrap
                        component="div"               
                        id="nav-settings"
                        sx={{color: `#000000`, fontWeight: 600}}
                    >
                    Profile
                </Typography>
                </Link>
                </MenuItem>
                <MenuItem onClick={props.handleCloseUserMenu}>
                <Link to='/user/profile' style={{display: `flex`}} >
                <ListItemIcon>
                   <AttachMoneyIcon
                    sx={{fontSize: 22}}
                    />
                </ListItemIcon>
                <Typography
                        variant="h6"
                        noWrap
                        component="div"               
                        id="nav-billing"
                        sx={{color: `#000000`, fontWeight: 600}}
                    >
                   Billing
                </Typography>
                </Link>
                </MenuItem>
                <Divider />
                <MenuItem>
                <ListItemIcon onClick={handleLogout}>
                  <SettingsPowerRoundedIcon
                     sx={{fontSize: 22}}
                    />
                </ListItemIcon>
                <Typography
                        variant="h6"
                        noWrap
                        component="div"               
                        id="nav-logout"
                        sx={{color: `#000000`, fontWeight: 600}}
                    >
                    Logout
                    </Typography>
                </MenuItem>
            </MenuList>
            </Paper>
        </Menu>
    );
};

export default AMAccountMenu;