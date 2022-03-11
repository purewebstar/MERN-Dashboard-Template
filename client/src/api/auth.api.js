/**
 *    © 2022 Abraham Mitiku
 *    Open Source MERN Dashboard Template
 * 
 */
// -----------------------------------------------------------------
import instance from './index';
import {getCookie} from '../utils/Cookies';

const token = (getCookie('refresh'));
/**
 *  token renewal
 */
export const tokens = {
  renew: async() =>(
    await instance.post(`token/renew-access/${token}`)
  ),
};
 