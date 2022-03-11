/**
 *    © 2022 Abraham Mitiku
 *    Open Source MERN Dashboard Template
 * 
 */
// -----------------------------------------------------------------
/**
 *  PROFILE ACTIONS
 */

 export const GetProfile = {

    USERID: (payload)=>{
        return{
            type: 'GET_PROFILE_BY_USER_ID',
            payload: payload
        }
    },

}