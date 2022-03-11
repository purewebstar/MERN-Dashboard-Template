/**
 *    © 2022 Abraham Mitiku
 *    Open Source MERN Dashboard Template
 * 
 */
// -----------------------------------------------------------------
/**
 *  ACCOUNT/USER ACTIONS
 */

 export const GetUser = {
    BYID: (payload)=>{
        return{
            type: 'GET_USER_BY_ID',
            payload: payload
        }
    }
}