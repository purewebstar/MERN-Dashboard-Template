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
import Rating from '@mui/material/Rating';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import FlagRoundedIcon from '@mui/icons-material/FlagRounded';
import PhoneEnabledRoundedIcon from '@mui/icons-material/PhoneEnabledRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import MarkChatUnreadRoundedIcon from '@mui/icons-material/MarkChatUnreadRounded';
import Skeleton from '@mui/material/Skeleton';
import config from '../../../../constants/config';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import Backdrop from '@mui/material/Backdrop';
import { useDispatch, useSelector } from 'react-redux';


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


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
    const dispatch = useDispatch();

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
            bgcolor: `#f5f5f5`,
            }}
            >
             {
                     props.loader?
                     <>
                      <Skeleton animation="wave" variant="circular" width={135} height={135} />
                     </>
                     :
                     <>
                    <IconButton  sx={{ p: 0 }}>
                      <Stack direction="row" spacing={2}>
                        <StyledBadge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            variant="dot"
                        >
                            <Avatar sx={{ bgcolor: blue[500],width: 135, height: 135 }} aria-label="profile-image"
                             
                            />
                        </StyledBadge>
                      </Stack>
                  </IconButton>
                     </> 
                   }
            </Box>    
            <Box
            sx={{
            justifyContent: 'center',
            textAlign: 'center',
            p: 1,
            m: 1,
            mt: 5
            }}
            >
              {
                props.loader?
                <>
                 <Skeleton animation="wave" height={20} width="50%" sx={{ml: 10}} />
                </>
                :
                <>
                <Typography variant="h3" className={`text-info`}>
                {props.profile&&props.profile.firstName} {props.profile&&props.profile.lastName}
                </Typography>
                </>
              }
              <Box
              sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              p: 1,
              mt: 2,
              mb:2,
              bgcolor: 'background.paper',
              borderRadius: 1,
              bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : 'grey.100'),
              color: (theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800'),
              border: '1px solid',
              borderColor: (theme) =>
              theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
              }}
              >
                <div className={`mt-4`}>
                <Typography variant="h6" color="text.white" sx={{mt:-1}}>
                 I am a full stack web developer and also graphics design from ethiopia. I have more than 4 years of experience.
                </Typography>
                </div>
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
              <Typography variant="h6" className={`text-info`} sx={{fontWeight: 500}}>
                <LocationOnRoundedIcon/> {`CITY`}
              </Typography>
              <Typography sx={{ ml: 0, fontSize: 14, fontWeight: 600 }} component="div" className={`text-secondary`}>
                &nbsp;{`ADDIS ABABA`}
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
              <Typography variant="h6" className={`text-info`} sx={{fontWeight: 500}}>
                <FlagRoundedIcon/> {`COUNTRY`}
              </Typography>
              <Typography sx={{ ml: 0, fontSize: 14, fontWeight: 600 }} component="div" className={`text-secondary`}>
                &nbsp;{`ETHIOPIA`}
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
              <Typography variant="h6" className={`text-info`} sx={{fontWeight: 500}}>
                <PhoneEnabledRoundedIcon/> {`CONTACT`}
              </Typography>
              <Typography sx={{ ml: 0, fontSize: 14, fontWeight: 600 }} component="div" className={`text-secondary`}>
                &nbsp;{`+251912353735`}
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