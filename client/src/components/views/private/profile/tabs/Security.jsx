import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import { Grid } from '@mui/material';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import {updateAccount} from '../../../../../api/user.api';
import {setLocalStorage} from '../../../../../utils/Storage';
import AMSnackbar from '../../../../../components/layouts/feedbacks/AMSnackbar';

const Security = props => { 

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
          SECURITY SETTING
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
          // SECURITY SETTING FORMS
        }
        <Grid item xs={12} md={8}>
          <Box
          sx={{
            mt:2,
            p:3,          
            borderRadius: 2,
            mb:2,
            bgcolor: `#ffffff`,
          }}
        >      
          <Divider sx={{mt:1, mb:4}} textAlign="left">
          <Chip label="PASSWORD" color={`secondary`} variant="outlined" sx={{fontSize: 9, fontWeight: 500}}/>
          </Divider>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              mb:1,
            }}
            
            >
            Old Password
          </Typography>
          <TextField        
          label="Old password" 
          size="small"
          type="password"
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
             New Password
            </Typography>
          <TextField 
          label="new password" 
          size="small"
          type="password"
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
            Confirm Password
            </Typography>
          <TextField 
          label="confirm password" 
          size="small"
          type="password"
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
            >
             Update Password
            </Button>
            <Link to="/auth/forgot-password" target={`_blank`}>
            <Typography variant="h6" 
            sx={{
              fontWeight: 600,
              mb:1,
            }}>
              {"Forgot Password?"}
            </Typography>
          </Link>
        </Box>

        </Grid>
       </Grid>
        </>
    );
};

export default Security;