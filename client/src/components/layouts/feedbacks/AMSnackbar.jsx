/**
 *    © 2022 Abraham Mitiku
 *    Open Source MERN Dashboard Template
 * 
 */
// -----------------------------------------------------------------
/**
 * AMBSnackbar
 * -> For alert message to display in different view [top-right, top-left | bottom-right, bottom-left]
 */
//--------------------------------------------------------------------
import React from 'react';
import PropTypes from 'prop-types';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Typography from '@mui/material/Typography';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AMSnackbar = ({alertText, alertTextColor, duration, anchorOrigin, open, handleClose}) => {

    const handleCloseSnackbar = () => {
      handleClose();
    };

    return (
    <>
    <Snackbar open={open} 
    autoHideDuration={duration?duration:10000} 
    onClose={handleCloseSnackbar} 
    anchorOrigin={
        anchorOrigin?
        {vertical: anchorOrigin.vertical, horizontal: anchorOrigin.horizontal}
        : { vertical: 'top', horizontal: 'right' }
    }>
        <Alert onClose={handleCloseSnackbar} severity={alertTextColor?alertTextColor: `success`} sx={{ width: '100%' }}>
            <Typography>
            {alertText?alertText: ` This is an Alert message!`}
            </Typography>
        </Alert>
    </Snackbar>
    </>
    );
};

AMSnackbar.propTypes = {
 alertText: PropTypes.string,
 alertTextColor: PropTypes.string,
 duration: PropTypes.number,
 anchorOrigin: PropTypes.object,
 open: PropTypes.bool
}

export default AMSnackbar;