
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