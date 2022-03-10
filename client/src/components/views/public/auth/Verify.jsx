/**
 *    © 2022 Abraham Mitiku
 *    Open Source MERN Dashboard Template
 * 
 */
// -----------------------------------------------------------------
/**
 *    VERIFICATION PAGE [sends user token and verifies]
 * -> [new account verification, forgot password verification]
 * 
 * ! This page will load or comes from User Email Inbox ... 
 * ! Redirects from user email [gmail ,..] inbox link
 */
//--------------------------------------------------------------------
import React from 'react';
import { useParams} from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import AMBackdrop from '../../../layouts/feedbacks/AMBackdrop';
import { updateAccount} from '../../../../api/user.api';
import {setLocalStorage} from '../../../../utils/Storage';

const Verify = () => {
    const {id, token} = useParams();
    const [open, setOpen] = React.useState(true);
    const [success, setSuccess] = React.useState(false);

    const verifyNewAccount = async(token)=>{
      
        await updateAccount.newAccount(token).then((res)=>{
           const {data} = res;
           if (data.status) {
              setTimeout(()=>{
                setOpen(false)
              },1500)
              setSuccess(true);
               setTimeout(()=>{
                 window.location.href = '/auth/login'
               },2500)
           } 
       }).catch(err=>{
          setTimeout(()=>{
            setOpen(false)
          },1500)
           setSuccess(false);
       });
     }
     const verifyResetPassword = async(token)=>{
      
        await updateAccount.checkResetPassword(token).then((res)=>{
           const {data} = res;
           if (data.status) {
            setTimeout(()=>{
              setOpen(false)
            },1500)
              setSuccess(true);
              setLocalStorage('verifyToken', data.verifyToken);
               setTimeout(()=>{
                 window.location.href = '/auth/reset-password'
               },2500)
           } 
       }).catch(err=>{
        setTimeout(()=>{
          setOpen(false)
        },1500)
           setSuccess(false);
       });
     }
     React.useEffect(()=>{
       if(id && token){
         if(id === '1' || id==1){
        verifyNewAccount(token);
          }
          else if(id === '0' || id===0){
       verifyResetPassword(token);
          }
       }
     },[]); 

    return (
        <>
        <AMBackdrop
        open={open}
        />
          {
            ((id && token) && (id == 1 || id == 0))?
            <>
            {
                // for new-account verify
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
                      {
                        (open)?
                        <>
                        <Typography variant="h4" sx={{color: `#ffffff`, fontWeight: 600, mt:6}} >
                        {`Verifying Your Email Address`}
                        </Typography>
                        <Typography variant="h6" sx={{mt:2, fontWeight: 600}} color="secondary" >
                        {`Please wait a sec ...`}
                        </Typography>
                        </>
                        :
                        <>
                        
                        </>

                      }
  
                    </Box>
                </Grid>
            </Grid>
            {
                (!open)?
                <Grid 
                container
                justifyContent="center"
                alignItems="center"
                spacing={1}
                sx={{mt:0}}
                >
                    <Grid item xs={12} md={10} sx={{bgcolor: '#1c2331'}}>
                        <Box sx={{p:5, textAlign: 'center'}}>
                        {
                          (success)?
                          <>
                          <Typography variant="h3" sx={{color: `#00C851`, fontWeight: 600}} >
                                {`Verification Success!`}
                            </Typography>
                            <Typography variant="h6" color='secondary' sx={{mt:2, fontWeight: 600}} >
                                {`Redirecting to Login Page ...`}
                            </Typography>
                          </>
                          :
                          <>
                            <Typography variant="h3" sx={{color: `#ff4444`, fontWeight: 600}} >
                                {`Verification Error!`}
                            </Typography>
                            <Typography variant="h6" color="secondary" sx={{ mt:2, fontWeight: 600}}>
                                {`Please try again!`}
                            </Typography>
                          </>
                        }
                        </Box>
                    </Grid>
                </Grid>
                :

                <>
                
                </>
            }
            </>
            :
            <>
                  ''
            </>
          }
        </>
    );
};

export default Verify;