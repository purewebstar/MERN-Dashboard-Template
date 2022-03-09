import instance from './index';

/**
 * 
 * User-Account [Register,Login]
 * 
 */ 

export const register = {
    // local account register
    local: async(firstName, lastName, email, password) =>(
        await instance.post('account/sign-up/local', {firstName, lastName, email, password})
    )
}

export const login = {
    // local account login
    local: async(email, password) =>(
        await instance.post('account/login/local', {email, password})
    ),  
    // google
    google: async(email,firstName,lastName, imageUrl) =>(
        await instance.post('account/google',{email,firstName,lastName, imageUrl})
    ),
};

/*
* Account verification api endpoints
*/
export const verifyAccount = {
    newAccount: async(id) => (
        await instance.post(`account/verify/new-account/${id}`)
    ),
    resetPassword: async(email) => (
        await instance.post(`account/verify/reset-password`,{email})
    ),
}
/**
 *  read Account
 */
export const readAccount = {
    byId: async() => (
        await instance.get(`account/auth/read`) // authorized api route
    )
}
/**
 *  update Account
 */
export const updateAccount = {
    updatePassword: async (oldPassword, newPassword)=> (
        await instance.patch(`account/auth/update-password`, {oldPassword, newPassword}) // authorized api route
    ),
    newAccount: async (token)=> (
        await instance.patch(`account/new-account`, {token})
    ),
    checkResetPassword: async(token) => (
        await instance.patch(`account/check-reset-password`, {token})
    ),
    resetPassword: async(newPassword, token) => (
        await instance.patch(`account/reset-password`, {newPassword, token})
    ),
};