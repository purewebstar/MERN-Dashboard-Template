/**
 *    © 2022 Abraham Mitiku
 *    Open Source MERN Dashboard Template
 * 
 */
// -----------------------------------------------------------------
/**
 *      AMBACKDROP 
 */
//--------------------------------------------------------------------
import React from 'react';
import PropTypes from 'prop-types';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const AMBackdrop = props => {
   

    return (
    <>
        <Backdrop
        sx={{ 
        color: (props.color?props.color: '#fff'), 
        zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={props.open}
        >
        {
            (props.progressComponent)?
            <>
            <props.progressComponent/>
            </>
            :
            <>
            <CircularProgress color="inherit" />
            </>
        }
        </Backdrop>
    </>
    );
};

AMBackdrop.propTypes = {
  color: PropTypes.string,
  open: PropTypes.bool,
  progressComponent: PropTypes.element
};

export default AMBackdrop;