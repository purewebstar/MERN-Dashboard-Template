import React from 'react';
import {Outlet} from 'react-router-dom';
import AMFooter from './appbar/AMFooter';
const PublicLayout = () =>{

  return (
   <>
    {
    /**
     * 
     * Here you can add Topbar for different navigations of public views
     * [Home, Contact, About Us, ... etc]
     * 
     */
    }
    {
    /**
     * Outlet, contains all publiclayout {children},
     * Directories:
     * Views -> Auth -> [Login, Register, Forgot, Reset, Notify, Verify]
     */
    }
    <Outlet />
    <AMFooter/>
   </>
  );
}

export default PublicLayout;
