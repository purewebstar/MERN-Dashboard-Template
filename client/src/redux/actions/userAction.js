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