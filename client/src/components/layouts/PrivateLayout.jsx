/**
 *    © 2022 Abraham Mitiku
 *    Open Source MERN Dashboard Template
 * 
 */
// -----------------------------------------------------------------
/**
 * 
 * 
 */
import React from 'react';
import {Outlet} from 'react-router-dom';
import AMTopbar from './navigations/AMTopbar';
import AMBottombar from './navigations/AMBottombar';

const PrivateLayout = () =>{

  return (
   <>
    {
    /**
     * 
     * Here you can add Topbar for different navigations of private views
     * [Dashboard, profile, blog , ... etc]
     * 
     */
    }
    <AMTopbar />

    {
    /**
     *  [Bottombar Navigation For Smaller devices [Mobile, Tablets, ..etc]
     * [Dashboard, order, blog , ... etc]
     * 
     */
    }
    <AMBottombar/>
    {
    /**
     * Outlet, contains all PrivateLayout {children},
     * Directories:
     * Views -> Auth -> [Dashboard, profile, blog, ...etc]
     */
    }

    <Outlet />

   </>
  );
}

export default PrivateLayout;
