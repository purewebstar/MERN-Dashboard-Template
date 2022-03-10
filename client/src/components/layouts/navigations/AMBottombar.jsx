/**
 *    © 2022 Abraham Mitiku
 *    Open Source MERN Dashboard Template
 * 
 */
// -----------------------------------------------------------------
/**
 *     AMBottomBar
 */
//--------------------------------------------------------------------
import React from "react";
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Fab from '@mui/material/Fab';
import ShoppingBagRoundedIcon from '@mui/icons-material/ShoppingBagRounded';
import ChatRoundedIcon from '@mui/icons-material/ChatRounded';
import PeopleOutlineRoundedIcon from '@mui/icons-material/PeopleOutlineRounded';
import DashboardIcon from '@mui/icons-material/DashboardRounded';
import AddPhotoAlternateRoundedIcon from '@mui/icons-material/AddPhotoAlternateRounded';
import { Link } from 'react-router-dom';
import MoreIcon from '@mui/icons-material/MoreVert';


const StyledFab = styled(Fab)({
  position: 'absolute',
  zIndex: 1,
  top: -23,
  left: 0,
  right: 0,
  margin: '0 auto', 
  backgroundColor: '#d32f2f',
});

const AMBottombar = props =>{

  return(
      <>
        <AppBar className={`bottom-navigation`} position="fixed" sx={{ top: 'auto', bottom: 0 }} style={{backgroundColor: '#181e2b', display: 'none'}}>
        <Toolbar>
            <Link to='/user'>
              <IconButton color="inherit" aria-label="open drawer" id="mob-dashboard" sx={{mr: 1, backgroundColor: `#2e3951`}}>
                <DashboardIcon color="secondary" sx={{ fontSize: 25 }} />
              </IconButton>
            </Link> 
            <Link to='/user/order'>
            <IconButton color="inherit" aria-label="open drawer" id="mob-order" sx={{mr: 1,backgroundColor: `#2e3951`}}>
                <ShoppingBagRoundedIcon color="secondary" sx={{ fontSize: 25 }}/>
            </IconButton>
            </Link>
            <Link to='/user/blog'>
            <StyledFab  aria-label="add">
                <AddPhotoAlternateRoundedIcon sx={{ fontSize: 30, color: '#ffffff' }}  id="mob-blog"/>
              </StyledFab>
            </Link>
          <Box sx={{ flexGrow: 1 }} />
          <Link to='/user/feedback'>
          <IconButton color="inherit" aria-label="open drawer" id="mob-feedback" sx={{mr: 1,backgroundColor: `#2e3951`}}>
             <ChatRoundedIcon color="secondary" sx={{ fontSize: 25 }}/>
          </IconButton>
          </Link>
          <Link to='/user/subscriber'>
          <IconButton color="inherit" aria-label="open drawer" id="mob-subscriber" sx={{backgroundColor: `#2e3951`}}>
            <PeopleOutlineRoundedIcon color="secondary" sx={{ fontSize: 25 }} />
          </IconButton>
          </Link>
        <IconButton
        >
        <MoreIcon sx={{ fontSize: 23, color: `#ffffff` }}  />
        </IconButton>
        </Toolbar>
        </AppBar>
      </>
  )
};
export default AMBottombar;