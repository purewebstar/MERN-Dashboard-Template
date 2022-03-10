/**
 *    © 2022 Abraham Mitiku
 *    Open Source MERN Dashboard Template
 * 
 */
// -----------------------------------------------------------------
/**
 * AMBAlert
 * -> For alert message to display
 */
//--------------------------------------------------------------------
import React from 'react';
import PropTypes from 'prop-types';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

const AMAlert = ({alertTextColor, alertCloseIcon, alertText, iconButtonColor, iconButtonSize}) => {

  const [alertOpen, setAlertOpen] = React.useState(true);

    return (
    <>
    <Collapse in={alertOpen}>
        <Alert
        variant="outlined" 
        severity={alertTextColor?alertTextColor: `error`}
        action={
        <IconButton
            aria-label="close"
            severity={iconButtonColor?iconButtonColor: `error`}
            size={iconButtonSize?iconButtonSize: `medium`}
            onClick={() => {
            setAlertOpen(false);
            }}
        >
        {
            (alertCloseIcon)?
            <>
             <alertCloseIcon />
            </>
            :
            <>
            <CloseRoundedIcon color="inherit" sx={{fontSize: 14}} />
            </>
        }
        </IconButton>
        }
        sx={{ mb: 0, fontSize: 13 }}
        >
            {alertText?alertText: `This is an alert Message!`}
        </Alert>
    </Collapse>
    </>
    );
};

AMAlert.propTypes = {
 alertText: PropTypes.string,
 alertCloseIcon: PropTypes.element,
 alertTextColor: PropTypes.string,
 iconButtonColor: PropTypes.string,
 iconButtonSize: PropTypes.string,
}

export default AMAlert;