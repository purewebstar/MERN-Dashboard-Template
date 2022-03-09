/**
 * 
 * 
 */
import React from 'react';
import {Outlet} from 'react-router-dom';
import Topbar from './appbar/Topbar';
import Bottombar from './appbar/Bottombar';

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
    <Topbar />

    {
    /**
     * Outlet, contains all PrivateLayout {children},
     * Directories:
     * Views -> Auth -> [Dashboard, profile, blog, ...etc]
     */
    }

    <Outlet />

    {
    /**
     *  [Bottombar Navigation For Smaller devices [Mobile, Tablets, ..etc]
     * [Dashboard, order, blog , ... etc]
     * 
     */
    }
    <Bottombar/>
   </>
  );
}

export default PrivateLayout;
