/**
 *    © 2022 Abraham Mitiku
 *    Open Source MERN Dashboard Template
 * 
 */
// -----------------------------------------------------------------
import $ from 'jquery';
import React from 'react';

const Feedback = () => {
 /**
   *  Your Feedback page
   */
    React.useEffect(()=>{
        $('title').html('Feedback | GoWebBox');
        $('#nav-feedback').css({
            backgroundColor: `#0099CC`,
            color: `#ffffff`
        })
        $('#mob-feedback').css({
            backgroundColor: `#0099CC`,
            color: `#ffffff`
        })
        $(window).scrollTop(0,0);
    
    },[]);
    // on unmount
    React.useEffect( () =>
    () =>{
        $('#nav-feedback').css({
            backgroundColor: `#181e2b`,
          
        })
        $('#mob-feedback').css({
          backgroundColor: `#2e3951`,    
          color: `inherit`,   
        })
       
    }, [] );

    return (
        <div>
            
        </div>
    );
};

export default Feedback;