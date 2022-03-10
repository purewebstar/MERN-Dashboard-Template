/**
 *    © 2022 Abraham Mitiku
 *    Open Source MERN Dashboard Template
 * 
 */
// -----------------------------------------------------------------
/**
 *     NOTIFICATION PAGE []
 */
//--------------------------------------------------------------------
import React from 'react';
import { useParams} from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const Notify = () => {
    const {id} = useParams();

    return (
        <>
          { 
            ((id) && (id == 1 || id == 0))?
            <>
            {
                // for new-account and reset-password notification
            }
            
            <Grid 
            container
            justifyContent="center"
            alignItems="center"
            spacing={1}
            >
                <Grid item xs={12} md={10} sx={{bgcolor: '#1c2331'}}>
                    <Box sx={{p:5, textAlign: 'center'}}>
                        {
                            (id && ( id==1))?
                            <>
                            <Typography variant="h2" sx={{ fontWeight: 600, color: `#FF8800`}} >
                                {`Reset Password`} 
                            </Typography> 
                            </>
                            :
                            <>
                            <Typography variant="h2" sx={{ fontWeight: 600, color: `#FF8800`}} >
                                {`New Account`} 
                            </Typography> 
                            </>
                        }
                        <Typography variant="h4" sx={{color: `#ffffff`, fontWeight: 600, mt:6}} >
                            {`Please Verify Your Email`} 
                        </Typography>
                        <Typography variant="h6" sx={{mt:2, fontWeight: 600}} color="secondary" >
                            {`We have sent a verification link to your email.`}
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
            </>
            :
            <>
                  ''
            </>
          }
        </>
    );
};

export default Notify;