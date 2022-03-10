/**
 *    © 2022 Abraham Mitiku
 *    Open Source MERN Dashboard Template
 * 
 */
// -----------------------------------------------------------------
/**
 *     AMNotificationMenu
 */
//--------------------------------------------------------------------
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Typography from '@mui/material/Typography';
import CircleNotificationsRoundedIcon from '@mui/icons-material/CircleNotificationsRounded';
import MailRoundedIcon from '@mui/icons-material/MailRounded';
import MarkEmailReadRoundedIcon from '@mui/icons-material/MarkEmailReadRounded';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import { teal, purple, blue, green, red} from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

const fakeNotification = [
    {
        _id: '2343',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80',
        content: 'Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea.',
        displayName: 'Laurent Michael',
        createdSince: 'now',
        read: false,
    },
    {
        _id: '992',
        avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80',
        content: 'Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea.',
        displayName: 'John Perrier',
        createdSince: '3 hours ago.',
        read: false,
    },
    {
        _id: '5375',
        avatar: 'https://www.forcepoint.com/sites/default/files/woman-updated.jpg?timestamp=1600297134',
        content: 'Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea.',
        displayName: 'Katerine Johnson',
        createdSince: 'yesterday.',
        read: true,
    },
    {
        _id: '43',
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR49RWVvh86n2L8o8kJEPMEQqg55vs8dXfprgm2OHQFjoln6PPkdbtGu4-vyqIvmPRJK4c&usqp=CAU',
        content: 'Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea.',
        displayName: 'Erica Gran',
        createdSince: '3 days ago.',
        read: true,
    }
]


const AMNotificationMenu = props => {

  return (
    <Menu
    sx={{ mt: '35px' }}
    id="menu-appbar" 
    anchorEl={props.anchorEl}
    anchorOrigin={{
    vertical: 'top',
    horizontal: 'right',
    }}
    keepMounted
    transformOrigin={{
    vertical: 'top',
    horizontal: 'right',
    }}
    open={Boolean(props.anchorEl)}
    onClose={props.handleClose}
    >
        <Paper sx={{ width: 350, maxWidth: '100%', height: 470, maxWidth: `100%`, mt: -1, mb:-1 }}>
        <MenuList dense>
            <MenuItem sx={{justifyContent: 'center'}}>
                <Typography
                variant="h4"
                noWrap            
                sx={{fontWeight:700, color: `#000000`}}                    
                >
                {`NOTIFICATIONS`}
                </Typography>
            </MenuItem>
                <Box
                sx={{
                display: 'flex',
                justifyContent: 'space-between',
                p:2,
                mt: -1,
                mb: -1
                }}
                >
                    <div style={{display: 'flex'}}>
                    <CircleNotificationsRoundedIcon 
                    sx={{fontSize: 20}}
                    color="secondary"
                    />&nbsp;
                    <Typography
                    variant="h6"          
                    sx={{fontWeight:500,color:`#000000`}}                  
                    >
                    
                    {`MOST RECENT`}
                    </Typography>
                    </div>

                    <Link to='/user/notification'  onClick={props.handleClose} >
                        <Typography
                        variant="h6"
                        color="secondary"
                        >
                        {`View All`}
                        </Typography>
                    </Link>
                </Box>
            <Divider color="secondary" />
            {
                        fakeNotification&&fakeNotification.map((n,index)=>{
                            return(
                                <React.Fragment key={index.toString()}>
                                <Box
                                sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                alignContent: 'flex-start',
                                p: 1,
                                height:85,
                                borderRadius: 1,
                                backgroundColor: (n&&n.read&&n.read)?`#fafafa`: `rgba(0, 188, 212, 0.1)`
                                }}
                                >
                                    <IconButton sx={{mr:1, mt:1}}>
                                        <Avatar 
                                        alt={n&&n.avatar&&n.avatar}
                                        src={n&&n.avatar&&n.avatar}
                                        sx={{
                                        mt: -5 ,width: 30, height: 30, 
                                        bgcolor: (n&&n.avatar)?'':(index==0)?green[500]: (index==1)?red[300]:
                                        (index==2)?blue[300]: (index==3)?teal[300]:purple[300]
                                        }}
                                        />
                                    </IconButton>
                                    <Box>
                                        <Typography
                                        variant="h6"
                                        color="primary"
                                        sx={{
                                            fontWeight: 600
                                        }}
                                        >
                                        {n&&n.displayName&&n.displayName.charAt(0).toUpperCase()}{n&&n.displayName&&n.displayName.slice(1)}
                                        </Typography>
                                        <Typography
                                        
                                        sx={{
                                            color: `#616161`,
                                            mt:1,
                                            fontWeight: 300,
                                            fontSize: 11,
                                        }}
                                        >
                                        {n&&n.content&&n.content.substr(0,40)} ...
                                        </Typography>
                                        <Box
                                        >
                                            <Typography
                                            sx={{                                    
                                                fontWeigt:600,
                                            }}
                                            className={`text-white`}
                                            >
                                            {n.createdSince&&n.createdSince}
                                            </Typography>
                                        
                                        </Box>
                                        <Box
                                            sx={{                                   
                                                mt: -2,
                                                ml: -7,
                                            }}
                                            >
                                            <Typography sx={{ flexGrow: 1 }}></Typography>
                                            
                                            <Tooltip title={(n&&n.read)?``: `Mark As Read`}
                                                >
                                                {
                                                    (n&&n.read)?
                                                    <>
                                                    <IconButton

                                                    >
                                                    <MarkEmailReadRoundedIcon onClick={props.handleClose}
                                                    sx={{
                                                        fontSize: 20,
                                                        color:  blue[500],
                                                        
                                                        }}
                                                    />
                                                    </IconButton>
                                                    </>
                                                    :
                                                    <>
                                                    <IconButton 
                                                
                                                    
                                                    >
                                                    <MailRoundedIcon 
                                                    id={n&&n._id}
                                                    sx={{
                                                        fontSize: 18,
                                                        color:  blue[500]
                                                    }}
                                                    />
                                                    </IconButton>                            
                                                    </>
                                                }
                                                </Tooltip>
                                            </Box>
                                    </Box>
                                </Box>
                                <Divider sx={{bgcolor:  blue[300]}} />
                            </React.Fragment>
                            )
                        }
                        )
                    }
        </MenuList>
        </Paper>
    </Menu>
  );
}

export default AMNotificationMenu;