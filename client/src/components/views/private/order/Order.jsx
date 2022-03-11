import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Button from '@mui/material/Button';  
import Chip from '@mui/material/Chip';
import { red, blue, green, teal, purple} from '@mui/material/colors';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Link } from 'react-router-dom';
import AMTable from '../../../../components/layouts/data-displays/AMTable'

const Order = () => {
    const [alignment, setAlignment] = React.useState('left');
    const[role, setRole] = React.useState(false);
    const [accept, setAccept] = React.useState(false);

    const handleAcceptOrderSwitch = ()=>{
       setAccept(!accept);
    }

    const handleAlignment = (event, newAlignment) => {
      if (newAlignment !== null) {
        setAlignment(newAlignment);
      }
    };
    // on mount
    React.useEffect(()=>{
        
    
    },[]);
    // on unmount
    React.useEffect( () =>
    () =>{
        
    }, [] );

    return (
    <>
    <Grid 
    container
    justifyContent="flex-start"
    alignItems="center" 
    spacing={1}
    sx={{
    mt:2
    }}
    >
            <Grid item xs={0} md={2}>
            
            </Grid>
            <Grid item xs={11} md={8}>
                <Box 
                sx={{
                display: 'flex',
                justifyContent: 'space-between',
                p:1,
                bgcolor: `#ffffff`,
                borderRadius: 1,
                bgcolor: '#fafafa',
                border: 1,
                borderColor: `#e0e0e0`,
                }}
                >
                    <ToggleButtonGroup
                    value={alignment}
                    exclusive
                    onChange={handleAlignment}
                    aria-label="text alignment"
                    color="primary"
                   
                    sx={{
                        height: 40,
                        mt:1 ,
                        bgcolor: `#ffffff`,
                    }}
                    >
                        <ToggleButton value="left" aria-label="left aligned" className={`border border-primary`}>
                        <Typography variant="h6" >ALL</Typography>
                        </ToggleButton>
                        <ToggleButton value="center" aria-label="centered" className={`border border-primary`}>
                        <Typography variant="h6" >DRAFT</Typography>
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Box>
            </Grid>
            
    </Grid>
    <Grid 
        container
        justifyContent="flex-start"
        alignItems="center" 
        spacing={3}
        sx={{
            mt:0,
            mb:1
        }}
        >
        <Grid item xs={0} md={1}>
        
        </Grid>
        <Grid item xs={12} md={10} className={``}>
            <Box
            sx={{
                display: 'flex',
                justifyContent: 'flex-end',
            }}
            >

            <Box
            sx={{

            }}
            >
                <Button
                type="submit"
                variant="contained"
                color={`secondary`}
                sx={{  mb:1, fontSize: 12, mr:1, mt:1 }}
                endIcon={<AddCircleOutlineIcon />}
                size={`small`}
                >
                Create Order
                </Button>  
            </Box>
            </Box>
            <AMTable
            />                    
        </Grid>  
        <Grid item xs={0} md={1}>
        
        </Grid>             
</Grid>
    </>
    );
};

export default Order;