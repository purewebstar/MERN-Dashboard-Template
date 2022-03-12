/**
 *    © 2022 Abraham Mitiku
 *    Open Source MERN Dashboard Template
 * 
 */
// -----------------------------------------------------------------
import $ from 'jquery';
import React from 'react';

const Contact = () => {
 /**
   *  Your Contact page
   */
    React.useEffect(()=>{
        $('title').html('Contact | GoWebBox');
        $('#nav-contact').css({
            backgroundColor: `#0099CC`,
            color: `#ffffff`
        })
        $('#mob-contact').css({
            backgroundColor: `#0099CC`,
            color: `#ffffff`
        })
        $(window).scrollTop(0,0);
    
    },[]);
    // on unmount
    React.useEffect( () =>
    () =>{
        $('#nav-contact').css({
            backgroundColor: `#181e2b`,
          
        })
        $('#mob-contact').css({
          backgroundColor: `#2e3951`,    
          color: `inherit`,   
        })
       
    }, [] );

    return (
        <div>
            
        </div>
    );
};

export default Contact;