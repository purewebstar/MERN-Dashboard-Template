/**
 *    © 2022 Abraham Mitiku
 *    Open Source MERN Dashboard Template
 * 
 */
// -----------------------------------------------------------------
const initialState = {
    byId: null
}

const userReducer = (state = initialState, action)=>{
    switch(action.type){
        case 'GET_USER_BY_ID':
           return{
               ...state,
               byId: action.payload
           }
        default:
            return state;
    }
};

export default userReducer;