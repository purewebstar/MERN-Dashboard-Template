import { Box, Typography, Grid, Link, Divider, AppBar } from '@mui/material';
import React from 'react';

const Footer = () => {

    return (
    <>
    <AppBar position="fixed" sx={{ top: 'auto', bottom: 0 }}>
    <Box
    sx={{
    display: 'flex',
    justifyContent: 'space-between',
    mb:1,
    p:2,
    }}
    >
    <Box
    sx={{

    }}
    >
    <Typography
    sx={{
    fontWeight: 600
    }}
    >
    © 2022 Abraham Mitiku
    </Typography>
    </Box>
    <Box
    sx={{
    display: 'flex'
    }}
    >
        <Link href={`https://github.com/abriilo/MERN-Dashboard-Template`} target="_blank" >
            <Typography
            sx={{
            fontWeight: 600
            }}
            color="secondary"
            >
            Documentation
            </Typography>
        </Link>
        <Link  href={`https://abraham-mitiku.com`} target="_blank" sx={{ml: 3}}>
            <Typography
            sx={{
            fontWeight: 600
            }}
            color="secondary"
            >
            About
            </Typography>
        </Link>
        <Link  href={`https://abraham-mitiku.com/blog`} target="_blank" sx={{ml: 3}}>
            <Typography
            sx={{
            fontWeight: 600
            }}
            color="secondary"
            >
            Blog
            </Typography>
        </Link>
    </Box>
    </Box>
    </AppBar>
    </>
    );
};

export default Footer;