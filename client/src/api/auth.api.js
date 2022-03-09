import instance from './index';

/**
 *  token renewal
 */
export const tokens = {
  renew: async(access) =>(
    await instance.post(`token/renew-access/${access}`)
  ),
};
 