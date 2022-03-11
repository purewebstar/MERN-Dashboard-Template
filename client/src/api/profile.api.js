/**
 *    © 2022 Abraham Mitiku
 *    Open Source MERN Dashboard Template
 * 
 */
// -----------------------------------------------------------------
import instance from './index';

/**
 *  create profile
 */
export const createProfile = {
    personal: async( address, phone, bio) =>(
        await instance.post(`profile/auth/create-personal`, {address, phone, bio}) // authorized api route
    ),
    photo: async(formData) =>(
        await instance.post(`profile/auth/upload-photo`,formData) // authorized api route
    ),

};
 
export const readProfile = {
   auth: {
    byId: async() => (
        await instance.get(`profile/auth/read-profile`) // authorized api route
    ),
   },

};
