
const initialState = {
    userId: null,
};

const profileReducer = (state = initialState, action)=>{
    switch(action.type){
        case 'GET_PROFILE_BY_USER_ID': 
            return {
                ...state,
                byUserId: action.payload
            };
        default:
            return state;
    }
};

export default profileReducer;